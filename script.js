(() => {
  const CURRICULUM_URL = "https://curriculo-ricardo-five.vercel.app/";
  const MONTA_HEALTH_URL = "https://monta-health.vercel.app/";

  const projectCases = {
    "Data Science Dashboard": {
      problem:
        "A análise de ocorrências exige consolidar dados, aplicar filtros e interpretar padrões sem depender de consultas manuais dispersas.",
      solution:
        "Dashboard full stack com Flask, PostgreSQL/Supabase, filtros combináveis, gráficos, exportação CSV e pipeline de classificação com scikit-learn.",
      result:
        "Aplicação publicada com API no Render, indicadores, tabela paginada, métricas do modelo, documentação técnica e integração contínua.",
    },
    "AutoWash Smart": {
      problem:
        "Um lava a jato automatizado precisa integrar cadastro, identificação, pagamento e acompanhamento operacional em uma jornada simples.",
      solution:
        "MVP em React com landing page, cadastro, totem, lavagem, self-service, mini shop e fluxos simulados de QR Code e reconhecimento facial.",
      result:
        "Protótipo navegável publicado na Vercel, com dashboard administrativo, indicadores operacionais e demonstração do fluxo completo do serviço.",
    },
    "iCanada Reparos": {
      problem:
        "A assistência precisava apresentar seus serviços com clareza, facilitar o contato e fortalecer sua presença digital local.",
      solution:
        "Site institucional responsivo com carrosséis por toque e arraste, integração com WhatsApp, SEO local e dados estruturados.",
      result:
        "Site oficial em produção, com domínio e DNS gerenciados pela Cloudflare e deploy automático integrado à Vercel.",
    },
    "Aurora Stay Iceland": {
      problem:
        "Uma plataforma de hospedagem precisa permitir que o usuário encontre, compare e avance pela reserva sem perder contexto durante a navegação.",
      solution:
        "Interface React com busca, filtros, detalhes das acomodações, fluxo de reserva responsivo, rotas administrativas e animações.",
      result:
        "Experiência navegável publicada na Vercel, demonstrando a jornada de descoberta, consulta e reserva de hospedagens.",
    },
    "Cinescope Catalog": {
      problem:
        "Catálogos extensos precisam organizar títulos e informações para que a consulta permaneça rápida, clara e adequada a diferentes telas.",
      solution:
        "Interface responsiva de consulta com cards organizados, hierarquia visual objetiva e navegação voltada à descoberta de filmes.",
      result:
        "Catálogo publicado na Vercel com experiência funcional de consulta e código-fonte disponível publicamente no GitHub.",
    },
    "Gerenciamento Forense": {
      problem:
        "Informações e fluxos administrativos precisam ser organizados para facilitar o controle, a consulta e o acompanhamento das atividades.",
      solution:
        "Estrutura de dashboard voltada à centralização dos registros e à consulta das informações em uma interface única.",
      result:
        "Projeto em evolução, com código público e preparação em andamento para atualização da experiência e futura publicação online.",
    },
    "Monta Health": {
      problem:
        "O contexto, os atores, as necessidades e as restrições de um potencial produto de saúde ainda precisam ser descobertos sem transformar hipóteses em requisitos e sem antecipar tratamento de dados sensíveis.",
      solution:
        "Fundação documental para conduzir Discovery neutro e rastreável, reunindo visão de produto, blueprint, arquitetura conceitual, governança, compliance, roteiro de entrevista e gates de decisão.",
      result:
        "Base documental estruturada e publicada, com controles de preparação definidos e avanço condicionado a evidências, consentimentos, revisões e aprovações; o produto permanece em Concepção sem implementação autorizada.",
    },
  };

  const normalizeCurriculumLinks = () => {
    document
      .querySelectorAll('a[href*="curriculo-ricardo-five.vercel.app"]')
      .forEach((link) => {
        link.href = CURRICULUM_URL;
      });
  };

  const removeRedundantProfileLinks = () => {
    document
      .querySelector('.site-header nav a[href*="curriculo-ricardo"]')
      ?.remove();
    document
      .querySelector('.hero-actions a[href*="linkedin.com"]')
      ?.remove();
  };

  const simplifyFooterNavigation = () => {
    const navigation = document.querySelector("footer nav");

    if (!navigation) {
      return;
    }

    navigation.innerHTML = `
      <a href="#projetos">Projetos</a>
      <span class="footer-separator" aria-hidden="true">·</span>
      <a href="#sobre">Sobre</a>
      <span class="footer-separator" aria-hidden="true">·</span>
      <a href="#contato">Contato</a>
    `;
  };

  const createCaseItem = (label, text) => {
    const item = document.createElement("div");
    item.className = "project-case__item";

    const heading = document.createElement("span");
    heading.textContent = label;

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    item.append(heading, paragraph);
    return item;
  };

  const createMontaHealthCard = () => {
    const projectGrid = document.querySelector(".project-grid");

    if (!projectGrid || projectGrid.querySelector('[data-project="monta-health"]')) {
      return;
    }

    const content = projectCases["Monta Health"];
    const card = document.createElement("article");
    card.className = "project-card case-study monta-health-card";
    card.dataset.tags = "online";
    card.dataset.project = "monta-health";

    const topline = document.createElement("div");
    topline.className = "project-topline";

    const scope = document.createElement("span");
    scope.textContent = "Discovery + Arquitetura + Governança";

    const status = document.createElement("strong");
    status.textContent = "Documentação publicada";
    topline.append(scope, status);

    const title = document.createElement("h3");
    title.textContent = "Monta Health";

    const caseStudy = document.createElement("div");
    caseStudy.className = "project-case";
    caseStudy.setAttribute(
      "aria-label",
      "Problema, solução e resultado do projeto",
    );
    caseStudy.append(
      createCaseItem("Problema", content.problem),
      createCaseItem("Solução", content.solution),
      createCaseItem("Resultado", content.result),
    );

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const demoLink = document.createElement("a");
    demoLink.href = MONTA_HEALTH_URL;
    demoLink.target = "_blank";
    demoLink.rel = "noreferrer";
    demoLink.textContent = "Demo online";
    actions.append(demoLink);

    card.append(topline, title, caseStudy, actions);
    projectGrid.append(card);
  };

  const updatePortfolioMetrics = () => {
    document.querySelectorAll(".metric-strip article").forEach((article) => {
      const label = article.querySelector("span")?.textContent.trim().toLowerCase();
      const value = article.querySelector("strong");

      if (!value) {
        return;
      }

      if (label === "projetos") {
        value.textContent = "11";
      }

      if (label === "projetos online") {
        value.textContent = "9";
      }
    });
  };

  normalizeCurriculumLinks();
  removeRedundantProfileLinks();
  createMontaHealthCard();
  updatePortfolioMetrics();

  document.querySelectorAll(".project-card").forEach((card) => {
    const title = card.querySelector("h3")?.textContent.trim();
    const content = projectCases[title];

    if (!content || card.classList.contains("case-study")) {
      return;
    }

    const summary = card.querySelector(":scope > p");
    const list = card.querySelector(":scope > ul");
    const actions = card.querySelector(":scope > .project-actions");
    const caseStudy = document.createElement("div");

    caseStudy.className = "project-case";
    caseStudy.setAttribute(
      "aria-label",
      "Problema, solução e resultado do projeto",
    );
    caseStudy.append(
      createCaseItem("Problema", content.problem),
      createCaseItem("Solução", content.solution),
      createCaseItem("Resultado", content.result),
    );

    summary?.remove();
    list?.remove();
    card.classList.add("case-study");

    if (actions) {
      actions.before(caseStudy);
    } else {
      card.append(caseStudy);
    }
  });

  const coreScript = document.createElement("script");
  coreScript.src = "script-core.js?v=20260728-1";
  coreScript.async = false;
  coreScript.addEventListener("load", simplifyFooterNavigation);
  coreScript.addEventListener("error", () => {
    simplifyFooterNavigation();
    document.documentElement.classList.add("theme-ready");
  });
  document.head.append(coreScript);
})();
