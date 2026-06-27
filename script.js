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

const setupHomeNavigation = () => {
  const homeLink = document.querySelector(".brand");

  if (!homeLink) {
    return;
  }

  homeLink.addEventListener("click", (event) => {
    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  });
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

const ensureStylesheet = (href, marker) => {
  if (document.querySelector(`link[${marker}]`)) {
    return;
  }

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = href;
  stylesheet.setAttribute(marker, "true");
  document.head.append(stylesheet);
};

const ensurePortfolioStylesheets = () => {
  ensureStylesheet("theme.css", "data-theme-stylesheet");
  ensureStylesheet("final.css", "data-final-stylesheet");
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
setupHomeNavigation();

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

applyTheme();
ensurePortfolioStylesheets();
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

const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const projectCards = Array.from(document.querySelectorAll(".project-card"));

projectCards.forEach((card) => {
  const hasDemoLink = Array.from(
    card.querySelectorAll(".project-actions a"),
  ).some((link) => link.textContent.trim().toLowerCase() === "demo online");

  if (hasDemoLink) {
    const tags = new Set((card.dataset.tags || "").split(/\s+/).filter(Boolean));
    tags.add("demo");
    card.dataset.tags = Array.from(tags).join(" ");
  }
});

const applyProjectFilter = (selectedButton) => {
  const filter = selectedButton.dataset.filter || "todos";

  filterButtons.forEach((button) => {
    const isActive = button === selectedButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  projectCards.forEach((card) => {
    const tags = new Set((card.dataset.tags || "").split(/\s+/).filter(Boolean));
    const shouldShow = filter === "todos" || tags.has(filter);
    card.classList.toggle("hidden", !shouldShow);
  });
};

filterButtons.forEach((button) => {
  button.type = "button";
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active")),
  );
  button.addEventListener("click", () => applyProjectFilter(button));
});
