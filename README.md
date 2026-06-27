# Portfólio Ricardo Lacerda Pereira

[Ver portfólio online](https://portfolio-ricardo-lacerda.vercel.app/)

Portfólio profissional estático para apresentação de projetos, demos publicadas, repositórios e competências técnicas.

## Status

**Concluído e publicado.** O deploy de produção é realizado automaticamente pela Vercel a partir da branch `main`.

## Recursos

- Apresentação profissional e resumo técnico.
- Oito projetos catalogados e cinco demos online.
- Filtros por projetos com demo, sistemas e sites.
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
- `script.js`: tema, filtros, favicon e retorno ao topo.

## Executar localmente

Na raiz do projeto, execute:

```bash
python3 -m http.server 8080
```

Depois, acesse `http://localhost:8080` no navegador.
