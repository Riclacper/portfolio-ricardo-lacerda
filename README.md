# Portfólio Ricardo Lacerda Pereira

[Ver portfólio online](https://portfolio-ricardo-lacerda.vercel.app/)

Portfólio profissional estático para apresentação de projetos, demos publicadas, repositórios e competências técnicas.

## Status

**Concluído e publicado.** O deploy de produção é realizado automaticamente pela Vercel a partir da branch `main`.

## Recursos

- Apresentação profissional e resumo técnico.
- Onze projetos catalogados e nove demos/ambientes declarados como online.
- Dashboard visual com distribuição por tipo, maturidade e stack recorrente.
- Capas autorais em CSS para quatro projetos em destaque.
- Seções Sobre, Experiência e Contato com narrativa profissional, competências agrupadas e CTA direto por e-mail.
- Destaque para o sistema **iCanada Gestão**, com React/Vite, Node.js/Express, Supabase PostgreSQL/Auth, Cloudflare Pages, Render e Resend API.
- **Cadastro de Obras** com frontend Expo/TypeScript publicado na Vercel, API Node.js/Express com MongoDB e demo pública navegável.
- **Data Science Dashboard** publicado com Flask, PostgreSQL/Supabase, scikit-learn, frontend responsivo e CI automatizado.
- Stack demonstrada: React, React Native, Expo, TypeScript, Node.js, Express, MongoDB/Mongoose, JWT, Python, Flask, scikit-learn, PostgreSQL, Supabase, Jest e Resend.
- Filtros com contagens para sistemas, sites e projetos de dados.
- Links para GitHub, LinkedIn e projetos publicados.
- Tema automático, claro e escuro com preferência persistida.
- Layout responsivo para desktop, tablet e smartphone.
- Navegação por âncoras com compensação do cabeçalho.
- Estados de foco, redução de movimento e filtros acessíveis.
- Favicon vetorial com monograma RL.

## Estrutura

- `index.html`: conteúdo e estrutura semântica.
- `styles.css`: layout e identidade visual principal.
- `theme.css`: temas claro, escuro e seletor de tema.
- `final.css`: ajustes finais de navegação e acessibilidade.
- `dashboard-visuals.css`: dashboard técnico, gráficos e capas dos destaques.
- `script-core.js`: tema, filtros, expansão dos projetos, favicon e retorno ao topo.

## Executar localmente

Na raiz do projeto, execute:

```bash
python3 -m http.server 8080
```

Depois, acesse `http://localhost:8080` no navegador.
