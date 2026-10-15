/**
 * Cyber-Candyland Art Style Decorator
 * Maintains a consistent visual thread of the AI Architecture Quest across all modules and sections.
 * Automatically decorates each lesson with an illustrated Candyland waypoint banner and progress track.
 */

(function () {
  const ZONE_INFO = [
    { id: 0, name: "NumPy Launchpad", icon: "⚡", color: "#06b6d4" },
    { id: 1, name: "Vector & Matrix Plains", icon: "📐", color: "#10b981" },
    { id: 2, name: "Token & Embedding Grove", icon: "🌌", color: "#f59e0b" },
    { id: 3, name: "Transformer Attention Spire", icon: "🔮", color: "#a855f7" },
    { id: 4, name: "Prompt & Context Canyon", icon: "📜", color: "#ec4899" },
    { id: 5, name: "RAG Vault & MCP Forge", icon: "🛠️", color: "#0ea5e9" },
    { id: 6, name: "Agentic Loop-de-Loop", icon: "🔄", color: "#eab308" },
    { id: 7, name: "The Autonomous Citadel", icon: "👑", color: "#f43f5e" },
  ];

  const LESSON_MAP = {
    "0.1": { zone: 0, step: 1 },
    "1.1": { zone: 1, step: 2 },
    "1.2": { zone: 1, step: 3 },
    "1.3": { zone: 1, step: 4 },
    "1.4": { zone: 1, step: 5 },
    "1.5": { zone: 1, step: 6 },
    "2.1": { zone: 2, step: 7 },
    "2.2": { zone: 2, step: 8 },
    "2.3": { zone: 2, step: 9 },
    "3.1": { zone: 3, step: 10 },
    "3.2": { zone: 3, step: 11 },
    "3.3": { zone: 3, step: 12 },
    "3.4": { zone: 3, step: 13 },
    "3.5": { zone: 3, step: 14 },
    "4.1": { zone: 4, step: 15 },
    "4.2": { zone: 4, step: 16 },
    "5.1": { zone: 5, step: 17 },
    "5.2": { zone: 5, step: 18 },
    "5.3": { zone: 5, step: 19 },
    "5.4": { zone: 5, step: 20 },
    "6.1": { zone: 6, step: 21 },
    "6.2": { zone: 6, step: 22 },
    "6.3": { zone: 6, step: 23 },
    "6.4": { zone: 6, step: 24 },
    "6.5": { zone: 6, step: 25 },
    "7.1": { zone: 7, step: 26 },
    "7.2": { zone: 7, step: 27 },
  };

  function detectLesson() {
    const h1 = document.querySelector("article h1");
    if (!h1) return null;
    const match = h1.textContent.match(/([0-7]\.[1-5])/);
    if (!match) return null;
    const num = match[1];
    const data = LESSON_MAP[num];
    if (!data) return null;
    const zone = ZONE_INFO[data.zone];
    return {
      num,
      step: data.step,
      zone: data.zone,
      zoneName: zone.name,
      zoneIcon: zone.icon,
      zoneColor: zone.color,
      h1Element: h1
    };
  }

  function getBaseUrl() {
    const depth = (window.location.pathname.match(/\//g) || []).length;
    // MkDocs root relative path
    const metaRoot = document.querySelector('meta[name="page-root"]');
    if (metaRoot) return metaRoot.getAttribute("content");
    // Default relative navigation from module-XX/Y.Z/
    return "../..";
  }

  function renderWaypointBanner(info) {
    if (document.querySelector(".candyland-waypoint-banner")) return;

    const banner = document.createElement("div");
    banner.className = "candyland-waypoint-banner";
    banner.style.setProperty("--zone-color", info.zoneColor);

    const rootPath = getBaseUrl();
    const mapUrl = `${rootPath}/#ai-architecture-map`;
    const emblemSrc = `${rootPath}/assets/images/zones/zone-${info.zone}.svg`;

    // Mini 8-realm progress pip track
    let pipsHtml = "";
    ZONE_INFO.forEach((z, idx) => {
      const isPast = idx < info.zone;
      const isCurrent = idx === info.zone;
      const pipClass = isCurrent ? "pip current" : (isPast ? "pip completed" : "pip");
      pipsHtml += `<span class="${pipClass}" title="Zone ${z.id}: ${z.name}" style="--pip-color: ${z.color};"></span>`;
    });

    banner.innerHTML = `
      <div class="waypoint-emblem-wrap">
        <img src="${emblemSrc}" alt="${info.zoneName}" class="waypoint-emblem" loading="lazy" />
      </div>
      <div class="waypoint-details">
        <div class="waypoint-top-line">
          <span class="waypoint-tile-pill">Tile ${info.num}</span>
          <span class="waypoint-zone-title">${info.zoneIcon} ${info.zoneName}</span>
          <a href="${mapUrl}" class="waypoint-map-btn" title="View location on the Candyland Architecture Map">
            <span>🗺️ Map</span>
          </a>
        </div>
        <div class="waypoint-sub-line">
          <span class="waypoint-progress-label">Step ${info.step} of 27 along the Quest</span>
          <div class="waypoint-pips-track">${pipsHtml}</div>
        </div>
      </div>
    `;

    // Insert right after the lesson H1 header
    if (info.h1Element && info.h1Element.nextSibling) {
      info.h1Element.parentNode.insertBefore(banner, info.h1Element.nextSibling);
    }
  }

  function decorateHomeCards() {
    // On the homepage, decorate the 8 module cards with the zone indicators
    const cards = document.querySelectorAll(".grid.cards > ul > li");
    if (!cards || cards.length === 0) return;

    cards.forEach((card, idx) => {
      if (idx >= ZONE_INFO.length) return;
      if (card.dataset.candylandDecorated) return;
      card.dataset.candylandDecorated = "true";

      const zone = ZONE_INFO[idx];
      card.style.setProperty("--card-zone-color", zone.color);
      card.classList.add("candyland-decorated-card");

      const rootPath = getBaseUrl();
      const badge = document.createElement("div");
      badge.className = "candyland-card-badge";
      badge.innerHTML = `
        <span class="card-zone-tag" style="background-color: ${zone.color}; color: #0f172a;">
          ${zone.icon} Zone ${zone.id}: ${zone.name}
        </span>
      `;
      card.insertBefore(badge, card.firstChild);
    });
  }

  function initDecorations() {
    const lesson = detectLesson();
    if (lesson) {
      renderWaypointBanner(lesson);
    } else {
      decorateHomeCards();
    }
  }

  // Hook into document load and Material for MkDocs instant navigation
  if (typeof document$ !== "undefined") {
    document$.subscribe(initDecorations);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDecorations);
  } else {
    initDecorations();
  }
})();
