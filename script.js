console.log("Interview Ready is live 🚀");

/* -----------------------------------------------------------
   THEME (day / night) — persists user choice, respects system,
   and auto-injects a toggle button into the navbar of any page
   that includes this script.
----------------------------------------------------------- */
(function initTheme() {
  const STORAGE_KEY = "ir-theme";
  const root = document.documentElement;

  const saved = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* ignore */ }
  }

  function buildToggleButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle day / night theme");
    btn.setAttribute("title", "Toggle day / night theme");
    btn.innerHTML =
      '<span class="icon-moon" aria-hidden="true">🌙</span>' +
      '<span class="icon-sun"  aria-hidden="true">☀️</span>';
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
    });
    return btn;
  }

  function injectToggle() {
    if (document.querySelector(".theme-toggle")) return;
    const host =
      document.querySelector(".nav-links") ||
      document.querySelector(".home-nav-links") ||
      document.querySelector(".navbar") ||
      document.querySelector(".home-nav");
    if (host) host.appendChild(buildToggleButton());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectToggle);
  } else {
    injectToggle();
  }

  // Follow system preference only while the user hasn't chosen manually.
  if (!saved && window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) setTheme(e.matches ? "dark" : "light");
    });
  }
})();
