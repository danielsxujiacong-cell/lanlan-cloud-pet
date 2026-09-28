(function () {
  "use strict";

  const config = window.LANLAN_SUPABASE || {};
  const button = document.getElementById("feed-button");
  const status = document.getElementById("feed-status");
  const totalCount = document.getElementById("total-count");
  const todayCount = document.getElementById("today-count");
  const petFrame = document.getElementById("pet-frame");
  const petPhoto = document.getElementById("pet-photo");
  const feedFloat = document.getElementById("feed-float");
  let feeding = false;
  let statusTimer;
  let floatTimer;

  function showPetPhoto() {
    if (petPhoto.naturalWidth <= 1 || petPhoto.naturalHeight <= 1) {
      petPhoto.remove();
      return;
    }
    petPhoto.classList.add("is-ready");
  }
  petPhoto.addEventListener("load", showPetPhoto);
  petPhoto.addEventListener("error", () => petPhoto.remove());
  if (petPhoto.complete) {
    if (petPhoto.naturalWidth > 0) showPetPhoto();
    else petPhoto.remove();
  }

  function isConfigured() {
    return typeof config.url === "string" && /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.url.trim()) &&
      typeof config.anonKey === "string" && config.anonKey.trim() !== "" && !config.anonKey.includes("YOUR_");
  }

  function showStatus(message, kind) {
    window.clearTimeout(statusTimer);
    status.textContent = message;
    status.className = "feed-status" + (kind ? " " + kind : "");
    if (kind === "success" || kind === "error") {
      statusTimer = window.setTimeout(() => {
        status.textContent = " ";
        status.className = "feed-status";
      }, 2600);
    }
  }

  function localDayBounds() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return { start: start.toISOString(), end: end.toISOString() };
  }

  async function cloudCount(filters) {
    const endpoint = new URL("/rest/v1/feed_events", config.url);
    endpoint.searchParams.set("select", "id");
    endpoint.searchParams.set("limit", "1");
    for (const [key, value] of Object.entries(filters || {})) endpoint.searchParams.set(key, value);

    const response = await fetch(endpoint, {
      headers: {
        apikey: config.anonKey,
        Prefer: "count=exact"
      }
    });
    if (!response.ok) throw new Error("count request failed");

    const contentRange = response.headers.get("content-range") || "";
    const match = contentRange.match(/\/(\d+)$/);
    if (!match) throw new Error("count header missing");
    return Number(match[1]);
  }

  async function refreshCounts() {
    if (!isConfigured()) {
      totalCount.textContent = "—";
      todayCount.textContent = "—";
      showStatus("完成 Supabase 设置后就能开始投喂", "");
      return;
    }

    const { start, end } = localDayBounds();
    const [total, today] = await Promise.all([
      cloudCount(),
      cloudCount({ created_at: "gte." + start, and: "(created_at.lt." + end + ")" })
    ]);
    totalCount.textContent = total.toLocaleString("zh-CN");
    todayCount.textContent = today.toLocaleString("zh-CN");
    if (status.textContent === "正在连接云端…") showStatus("云端数据已同步", "");
  }

  async function insertFeed() {
    const response = await fetch(new URL("/rest/v1/feed_events", config.url), {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: "{}"
    });
    if (!response.ok) throw new Error("feed insert failed");
  }

  function playHappyFeedback() {
    petFrame.classList.remove("happy");
    feedFloat.classList.remove("pop");
    void petFrame.offsetWidth;
    petFrame.classList.add("happy");
    feedFloat.classList.add("pop");
    window.clearTimeout(floatTimer);
    floatTimer = window.setTimeout(() => feedFloat.classList.remove("pop"), 1000);
    if (typeof navigator.vibrate === "function") navigator.vibrate(28);
  }

  button.addEventListener("click", async () => {
    if (feeding) return;
    feeding = true;
    button.disabled = true;
    button.classList.add("is-pressed");
    window.setTimeout(() => button.classList.remove("is-pressed"), 180);
    const enabledAt = Date.now() + 500;

    try {
      if (!isConfigured()) throw new Error("Supabase is not configured");
      await insertFeed();
      playHappyFeedback();
      showStatus("蓝蓝开心地收下啦，谢谢你！", "success");
      try {
        await refreshCounts();
      } catch (_error) {
        showStatus("已经投喂成功，统计稍后同步", "");
      }
    } catch (_error) {
      showStatus("投喂失败，请再试一次", "error");
    } finally {
      window.setTimeout(() => {
        feeding = false;
        button.disabled = false;
      }, Math.max(0, enabledAt - Date.now()));
    }
  });

  refreshCounts().catch(() => showStatus("云端连接失败，请检查 Supabase 设置", "error"));
  if (isConfigured()) window.setInterval(() => refreshCounts().catch(() => {}), 10000);
})();
