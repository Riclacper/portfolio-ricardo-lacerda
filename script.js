(() => {
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

  removeRedundantProfileLinks();

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