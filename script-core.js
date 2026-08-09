const FAVICON_HREF = "favicon.svg?v=2";
const THEME_STORAGE_KEY = "portfolio-theme";
const INITIAL_VISIBLE_PROJECTS = 4;
const themeModes = ["auto", "light", "dark"];
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ensureFavicon = () => {
  document.querySelectorAll('link[rel~="icon"]').forEach((icon) => icon.remove());

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.sizes = "any";
  favicon.href = FAVICON_HREF;
  document.head.append(favicon);
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
};

const setupHomeNavigation = () => {
  const homeLink = document.querySelector(".brand");

  if (!homeLink) {
    return;
  }

  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToTop();

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  });
};

const setupBackToTop = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Voltar ao topo");
  button.title = "Voltar ao topo";
  document.body.append(button);

  const updateVisibility = () => {
    const isVisible = window.scrollY > 480;
    button.classList.toggle("is-visible", isVisible);
    button.tabIndex = isVisible ? 0 : -1;
    button.setAttribute("aria-hidden", String(!isVisible));
  };

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateVisibility();
        ticking = false;
      });
    },
    { passive: true },
  );

  button.addEventListener("click", () => {
    scrollToTop();
    button.blur();
  });

  updateVisibility();
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
setupBackToTop();

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
const projectGrid = document.querySelector(".project-grid");
const filterResults = document.querySelector(".filter-results");
let activeProjectFilter = "todos";
let areAllProjectsVisible = false;
let projectsToggle;
let projectsToggleWrapper;

const getMatchingProjects = () =>
  projectCards.filter((card) => {
    const tags = new Set((card.dataset.tags || "").split(/\s+/).filter(Boolean));
    return activeProjectFilter === "todos" || tags.has(activeProjectFilter);
  });

const updateProjectsDisplay = () => {
  const matchingProjects = getMatchingProjects();

  projectGrid?.classList.toggle("is-filtered", activeProjectFilter !== "todos");

  projectCards.forEach((card) => {
    const matchingIndex = matchingProjects.indexOf(card);
    const matchesFilter = matchingIndex !== -1;
    const isWithinInitialLimit = matchingIndex < INITIAL_VISIBLE_PROJECTS;
    const shouldShow =
      matchesFilter && (areAllProjectsVisible || isWithinInitialLimit);

    card.classList.toggle("hidden", !shouldShow);
  });

  if (filterResults) {
    const suffix = matchingProjects.length === 1 ? "projeto encontrado" : "projetos encontrados";
    filterResults.textContent = `${matchingProjects.length} ${suffix}`;
  }

  if (!projectsToggle || !projectsToggleWrapper) {
    return;
  }

  const hasMoreProjects = matchingProjects.length > INITIAL_VISIBLE_PROJECTS;
  projectsToggleWrapper.hidden = !hasMoreProjects;
  projectsToggle.setAttribute("aria-expanded", String(areAllProjectsVisible));
  projectsToggle.querySelector("span").textContent = areAllProjectsVisible
    ? "Ver menos projetos"
    : "Ver mais projetos";
  projectsToggle.querySelector("i").textContent = areAllProjectsVisible ? "↑" : "↓";
};

const createProjectsToggle = () => {
  if (!projectGrid || projectCards.length <= INITIAL_VISIBLE_PROJECTS) {
    return;
  }

  projectGrid.id ||= "project-grid";
  projectsToggleWrapper = document.createElement("div");
  projectsToggleWrapper.className = "projects-toggle-wrap";

  projectsToggle = document.createElement("button");
  projectsToggle.type = "button";
  projectsToggle.className = "projects-toggle";
  projectsToggle.setAttribute("aria-controls", projectGrid.id);
  projectsToggle.setAttribute("aria-expanded", "false");
  projectsToggle.innerHTML = `
    <span>Ver mais projetos</span>
    <i aria-hidden="true">↓</i>
  `;

  projectsToggle.addEventListener("click", () => {
    areAllProjectsVisible = !areAllProjectsVisible;
    updateProjectsDisplay();
  });

  projectsToggleWrapper.append(projectsToggle);
  projectGrid.after(projectsToggleWrapper);
};

const applyProjectFilter = (selectedButton) => {
  activeProjectFilter = selectedButton.dataset.filter || "todos";
  areAllProjectsVisible = false;

  filterButtons.forEach((button) => {
    const isActive = button === selectedButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateProjectsDisplay();
};

filterButtons.forEach((button) => {
  button.type = "button";
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active")),
  );
  button.addEventListener("click", () => applyProjectFilter(button));
});

createProjectsToggle();
updateProjectsDisplay();
