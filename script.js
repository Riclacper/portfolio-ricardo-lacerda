const FAVICON_HREF = "favicon.svg?v=2";
const THEME_STORAGE_KEY = "portfolio-theme";
const themeModes = ["auto", "light", "dark"];
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const ensureFavicon = () => {
  document.querySelectorAll('link[rel~="icon"]').forEach((icon) => icon.remove());

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.sizes = "any";
  favicon.href = FAVICON_HREF;
  document.head.append(favicon);
};

const readStoredTheme = () => {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return themeModes.includes(storedTheme) ? storedTheme : "auto";
  } catch {
    return "auto";
  }
};

const saveTheme = (theme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Mantém o tema apenas durante a sessão quando o armazenamento está bloqueado.
  }
};

const getResolvedTheme = (mode) => {
  if (mode === "auto") {
    return systemTheme.matches ? "dark" : "light";
  }

  return mode;
};

const getThemeDescription = (mode) => {
  const descriptions = {
    auto: "Automático",
    light: "Claro",
    dark: "Escuro",
  };

  return descriptions[mode];
};

const ensureThemeStylesheet = () => {
  if (document.querySelector('link[data-theme-stylesheet]')) {
    return;
  }

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "theme.css";
  stylesheet.dataset.themeStylesheet = "true";
  document.head.append(stylesheet);
};

const ensureMobileMenuStyles = () => {
  if (document.querySelector("style[data-mobile-menu-styles]")) {
    return;
  }

  const styles = document.createElement("style");
  styles.dataset.mobileMenuStyles = "true";
  styles.textContent = `
    @media (max-width: 640px) {
      .site-header nav {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
        overflow-x: visible;
        padding: 6px;
      }

      .site-header nav a {
        min-width: 0;
        padding-right: 6px;
        padding-left: 6px;
        text-align: center;
      }

      .site-header nav .theme-toggle {
        grid-column: 1 / -1;
        width: 100%;
      }
    }
  `;

  document.head.append(styles);
};

const ensureThemeColorMeta = () => {
  let themeColor = document.querySelector('meta[name="theme-color"]');

  if (!themeColor) {
    themeColor = document.createElement("meta");
    themeColor.name = "theme-color";
    document.head.append(themeColor);
  }

  return themeColor;
};

ensureFavicon();

const themeColorMeta = ensureThemeColorMeta();
let themeMode = readStoredTheme();
let themeToggle;

const updateThemeToggle = () => {
  if (!themeToggle) {
    return;
  }

  const description = getThemeDescription(themeMode);
  themeToggle.querySelector(".theme-toggle__text").textContent = description;
  themeToggle.setAttribute("aria-label", `Tema atual: ${description}. Alterar tema.`);
  themeToggle.title = `Tema: ${description}`;
};

const applyTheme = () => {
  const resolvedTheme = getResolvedTheme(themeMode);

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themeMode = themeMode;
  document.documentElement.style.colorScheme = resolvedTheme;
  themeColorMeta.content = resolvedTheme === "dark" ? "#08111b" : "#f4f8fa";
  updateThemeToggle();
};

const createThemeToggle = () => {
  const navigation = document.querySelector(".site-header nav");

  if (!navigation) {
    return;
  }

  themeToggle = document.createElement("button");
  themeToggle.type = "button";
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = `
    <span class="theme-toggle__icon" aria-hidden="true"></span>
    <span class="theme-toggle__text"></span>
  `;

  themeToggle.addEventListener("click", () => {
    const currentIndex = themeModes.indexOf(themeMode);
    themeMode = themeModes[(currentIndex + 1) % themeModes.length];
    saveTheme(themeMode);
    applyTheme();
  });

  navigation.append(themeToggle);
  updateThemeToggle();
};

ensureThemeStylesheet();
ensureMobileMenuStyles();
applyTheme();
createThemeToggle();

const handleSystemThemeChange = () => {
  if (themeMode === "auto") {
    applyTheme();
  }
};

if (typeof systemTheme.addEventListener === "function") {
  systemTheme.addEventListener("change", handleSystemThemeChange);
} else {
  systemTheme.addListener(handleSystemThemeChange);
}

window.requestAnimationFrame(() => {
  document.documentElement.classList.add("theme-ready");
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const shouldShow = filter === "todos" || tags.includes(filter);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});
