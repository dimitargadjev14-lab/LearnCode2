(() => {
  const STORAGE_KEY = "neonTheme";
  const THEME_BLUE = "blue";
  const THEME_GREEN = "green";

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const initialTheme = savedTheme === THEME_GREEN ? THEME_GREEN : THEME_BLUE;

  const applyTheme = (theme) => {
    document.body.classList.toggle("theme-green", theme === THEME_GREEN);
    const toggleButtons = document.querySelectorAll("[data-theme-toggle]");
    toggleButtons.forEach((button) => {
      button.textContent = theme === THEME_GREEN
        ? "Switch to Blue Neon"
        : "Switch to Green Neon";
    });
  };

  applyTheme(initialTheme);

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (!target.matches("[data-theme-toggle]")) {
      return;
    }

    const isGreen = document.body.classList.contains("theme-green");
    const nextTheme = isGreen ? THEME_BLUE : THEME_GREEN;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
})();
