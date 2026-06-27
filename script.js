const FAVICON_HREF = "favicon.svg?v=2";
const THEME_STORAGE_KEY = "portfolio-theme";
const INITIAL_VISIBLE_PROJECTS = 4;
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    button.blur();
  });

  updateVisibility();
};

const setupProjectOrder = () => {
  const grid = document.querySelector(".project-grid");

  if (!grid) {
    return;
  }

  const cards = Array.from(grid.querySelectorAll(".project-card"));
  const findCard = (title) =>
    cards.find((card) => card.querySelector("h3")?.textContent.trim() === title);

  const iCanadaCard = findCard("iCanada Reparos");
  const cinescopeCard = findCard("Cinescope Catalog");

  if (!iCanadaCard || !cinescopeCard) {
    return;
  }

  const cinescopePosition = document.createComment("cinescope-position");
  grid.replaceChild(cinescopePosition, cinescopeCard);
  grid.replaceChild(cinescopeCard, iCanadaCard);
  grid.replaceChild(iCanadaCard, cinescopePosition);
};

const simplifyFooter = () => {
  document.querySelector(".footer-note")?.remove();

  const navigation = document.querySelector("footer nav");

  if (!navigation) {
    return;
  }

  const projectLink = navigation.querySelector('a[href="#projetos"]');

  if (projectLink && !navigation.querySelector('a[href="#sobre"]')) {
    const aboutLink = document.createElement("a");
    aboutLink.href = "#sobre";
    aboutLink.textContent = "Sobre";
    projectLink.after(aboutLink);
  }

  const links = Array.from(navigation.querySelectorAll("a"));
  const githubLink = links.find((link) => link.href.includes("github.com"));
  const linkedinLink = links.find((link) => link.href.includes("linkedin.com"));

  if (githubLink && linkedinLink && !navigation.querySelector(".footer-separator")) {
    const separator = document.createElement("span");
    separator.className = "footer-separator";
    separator.textContent = "|";
    separator.setAttribute("aria-hidden", "true");
    separator.style.color = "var(--muted-2)";
    linkedinLink.before(separator);
  }
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
setupProjectOrder();
simplifyFooter();

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
let activeProjectFilter = "todos";
let areAllProjectsVisible = false;
let projectsToggle;
let projectsToggleWrapper;

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

const getMatchingProjects = () =>
  projectCards.filter((card) => {
    const tags = new Set((card.dataset.tags || "").split(/\s+/).filter(Boolean));
    return activeProjectFilter === "todos" || tags.has(activeProjectFilter);
  });

const updateProjectsDisplay = () => {
  const matchingProjects = getMatchingProjects();

  projectCards.forEach((card) => {
    const matchingIndex = matchingProjects.indexOf(card);
    const matchesFilter = matchingIndex !== -1;
    const isWithinInitialLimit = matchingIndex < INITIAL_VISIBLE_PROJECTS;
    const shouldShow =
      matchesFilter && (areAllProjectsVisible || isWithinInitialLimit);

    card.classList.toggle("hidden", !shouldShow);
  });

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
