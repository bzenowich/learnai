/**
 * Client-Side Progress Tracking for LearnAI Lessons
 * Uses localStorage to persist completed lessons and displays checkmarks in navigation.
 */

const STORAGE_KEY = "learnai_completed_lessons";

function getCompletedLessons() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCompletedLessons(lessons) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
  } catch (e) {
    console.error("Failed to save progress to localStorage", e);
  }
}

function normalizePath(path) {
  // Normalize trailing slash, index.html, and base url
  return path.replace(/\/index\.html$/, "/").replace(/\/$/, "");
}

function isLessonPage() {
  const path = window.location.pathname;
  return /module-\d\d/.test(path);
}

function updateSidebarCheckmarks() {
  const completed = new Set(getCompletedLessons());
  const navLinks = document.querySelectorAll(".md-nav__link");
  
  let totalLessons = 0;
  let completedCount = 0;

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    
    // Resolve full path
    const url = new URL(href, window.location.href);
    const normalized = normalizePath(url.pathname);

    if (/module-\d\d/.test(normalized)) {
      totalLessons++;
      const isDone = completed.has(normalized);
      if (isDone) completedCount++;

      // Check if checkmark already exists
      let badge = link.querySelector(".learnai-nav-check");
      if (isDone) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "learnai-nav-check";
          badge.innerHTML = " ✓";
          badge.title = "Completed";
          link.appendChild(badge);
        }
      } else {
        if (badge) {
          badge.remove();
        }
      }
    }
  });

  // Update progress meter in sidebar title if present
  let progressMeter = document.querySelector(".learnai-progress-meter");
  if (totalLessons > 0) {
    const pct = Math.round((completedCount / totalLessons) * 100);
    if (!progressMeter) {
      const navHeader = document.querySelector(".md-nav--primary > .md-nav__title");
      if (navHeader) {
        progressMeter = document.createElement("div");
        progressMeter.className = "learnai-progress-meter";
        navHeader.appendChild(progressMeter);
      }
    }
    if (progressMeter) {
      progressMeter.innerHTML = `
        <div class="learnai-progress-label">Course Progress: ${completedCount}/${totalLessons} (${pct}%)</div>
        <div class="learnai-progress-bar"><div class="learnai-progress-fill" style="width: ${pct}%"></div></div>
      `;
    }
  }
}

function renderLessonCompletionWidget() {
  if (!isLessonPage()) return;

  const currentPath = normalizePath(window.location.pathname);
  const completed = new Set(getCompletedLessons());
  const isDone = completed.has(currentPath);

  // Check if widget already rendered
  let container = document.getElementById("learnai-completion-widget");
  if (!container) {
    container = document.createElement("div");
    container.id = "learnai-completion-widget";
    container.className = "learnai-completion-box";

    // Insert before footer or at the end of article content
    const article = document.querySelector("article.md-content__inner");
    if (article) {
      article.appendChild(container);
    }
  }

  container.innerHTML = `
    <div class="learnai-completion-content">
      <div class="learnai-completion-info">
        <h4>${isDone ? "🎉 Lesson Completed!" : "Finished reading?"}</h4>
        <p>${isDone ? "Great work! Your progress is saved. Click to mark incomplete if needed." : "Mark this lesson complete to track your progress across the course."}</p>
      </div>
      <button type="button" class="learnai-complete-btn ${isDone ? "is-completed" : ""}" id="learnai-toggle-complete">
        ${isDone ? "✓ Completed" : "Mark as Complete ✓"}
      </button>
    </div>
  `;

  const btn = document.getElementById("learnai-toggle-complete");
  if (btn) {
    btn.onclick = () => {
      const list = getCompletedLessons();
      const set = new Set(list);
      if (set.has(currentPath)) {
        set.delete(currentPath);
      } else {
        set.add(currentPath);
      }
      saveCompletedLessons(Array.from(set));
      renderLessonCompletionWidget();
      updateSidebarCheckmarks();
    };
  }
}

function initProgress() {
  updateSidebarCheckmarks();
  renderLessonCompletionWidget();
}

if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    initProgress();
  });
} else {
  document.addEventListener("DOMContentLoaded", initProgress);
}
