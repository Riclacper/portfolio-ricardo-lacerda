# Relatório de auditoria do portfólio

**Projeto:** Portfólio Ricardo Lacerda Pereira  
**Data da análise:** 9 de agosto de 2026  
**Escopo:** visão geral, segurança, UX/UI, responsividade, padronização dos cards e atualização das informações dos projetos em desenvolvimento.

## 1. Resumo executivo

O portfólio tem uma proposta profissional clara: apresenta Ricardo como desenvolvedor Full Stack, demonstra capacidade de levar uma necessidade até o deploy e usa projetos reais e demonstrativos como principal prova de competência. A identidade visual é consistente, há temas claro/escuro/automático, estados de foco, preferência por movimento reduzido, filtros e uma boa variedade de projetos.

O principal problema não é falta de conteúdo, mas a forma como ele foi acumulado. Parte relevante da página é corrigida ou criada por JavaScript depois que o HTML carrega: o card **Monta Health**, a experiência profissional, a conversão de seis cards para o formato de case, as métricas, a navegação e alguns links. Isso cria duas versões do portfólio — a fonte HTML e a interface após a execução dos scripts — e já produziu divergências visíveis nos números, no README e na marcação.

### Avaliação geral

| Área | Nota | Diagnóstico |
| --- | ---: | --- |
| Posicionamento e conteúdo | 8/10 | Proposta clara, bons cases e evidências de projetos reais. |
| UX/UI | 7/10 | Boa hierarquia e recursos úteis; cards longos e padrões de interação inconsistentes reduzem a leitura rápida. |
| Responsividade | 7/10 | Há breakpoints e cuidados específicos, mas a quantidade de sobrescritas aumenta o risco de regressão. |
| Acessibilidade | 7/10 | Foco visível, `prefers-reduced-motion`, rótulos e botões adequados; faltam validação sistemática e melhor semântica para ações indisponíveis. |
| Segurança | 7/10 | Superfície pequena por ser um site estático e não há entrada de usuário; cabeçalhos e política de conteúdo não estão documentados no repositório. |
| Manutenibilidade | 5/10 | Conteúdo duplicado entre HTML e JS, oito folhas CSS efetivas e correções em cascata. |
| Confiabilidade das informações | 6/10 | O conteúdo recente está rico, porém métricas, README, HTML inicial e estado renderizado divergem. |

### Prioridades recomendadas

1. **P0 — concluído nesta etapa:** cards, métricas e experiência profissional passaram a ter o HTML como fonte de verdade.
2. **P0 — concluído nesta etapa:** as mutações de conteúdo foram removidas do carregamento; o JavaScript ficou responsável pela interação.
3. **P1 — em andamento:** os cards agora separam maturidade e acesso; projetos privados ainda dependem de validação do proprietário.
4. **P1 — concluído nesta etapa:** os cards compartilham estrutura, badges de status e ordem consistente de ações.
5. **P1 — validar produção** com Lighthouse, axe, HTML Validator e testes em larguras reais.
6. **P2 — consolidar CSS/JS** e definir cabeçalhos de segurança na hospedagem.

## 2. Metodologia e limitações

Foram examinados `index.html`, `script.js`, `script-core.js`, `README.md` e todas as folhas de estilo do repositório. Também foram consultados os metadados e READMEs dos repositórios públicos do perfil `Riclacper` em 9 de agosto de 2026.

Os projetos **iCanada Gestão**, **RJ Prime Gestão** e **Monta Health** não aparecem entre os repositórios públicos consultados. Portanto, este relatório não presume funcionalidades além das declaradas no próprio portfólio. Antes de publicar alterações de escopo, status, stack ou resultados desses produtos, o proprietário deve validar as fichas sugeridas na seção 8.

As URLs públicas hospedadas em Vercel, Render, Netlify, LinkedIn e no domínio iCanada não puderam ser verificadas a partir do ambiente de auditoria porque o proxy retornou HTTP 403. Os links de repositórios GitHub responderam HTTP 200. Assim, “online” neste relatório significa **declarado como online no código**, não disponibilidade comprovada ponta a ponta.

## 3. Visão geral e arquitetura de conteúdo

### Pontos fortes

- O hero comunica atuação, entrega e stack sem depender de jargão excessivo.
- O fluxo “Requisitos → Interface → Sistema → Aplicação publicada” sustenta bem a narrativa profissional.
- Os cases no formato **Problema / Solução / Resultado** mostram raciocínio de produto, e não apenas ferramentas.
- A experiência como fundador da iCanada Reparos conecta tecnologia a uma operação real.
- Há variedade suficiente para demonstrar web, mobile, APIs, dados e visão de produto.
- Os projetos simulados geralmente explicitam suas limitações, prática importante para credibilidade.

### Problemas encontrados

#### 3.1 Duas fontes de verdade

Antes desta etapa, o HTML declarava **10 projetos e 8 online**, enquanto `script.js` mudava os números para **11 e 9** depois de inserir Monta Health. O README ainda informava **nove projetos e sete demos/ambientes online**. Além disso:

- Monta Health só existia após JavaScript;
- a seção de experiência profissional só existia após JavaScript;
- seis cards começavam como parágrafo/lista no HTML e viravam case por JavaScript;
- links e o rodapé eram normalizados ou reescritos em tempo de execução.

**Impacto:** pior indexação, conteúdo inconsistente se o script falhar, testes mais difíceis e alto risco de o autor atualizar uma camada e esquecer as demais.

**Situação atual:** o conteúdo essencial foi consolidado no HTML. `script-core.js` cuida somente de comportamento — tema, filtro, expansão, favicon e navegação.

#### 3.2 Validação estrutural

Uma inspeção posterior confirmou que o card RJ Prime Gestão e a seção Sobre possuem fechamento coerente de seus contêineres no arquivo atual. A verificação automatizada com o parser utilizado na auditoria também não encontrou tags remanescentes. Portanto, a indicação anterior de dois blocos estruturalmente incorretos foi removida deste relatório.

**Recomendação:** substituir a verificação ad hoc por um validador HTML conforme o padrão WHATWG e executá-lo continuamente, porque um parser tolerante não equivale a uma validação normativa.

#### 3.3 Métricas frágeis

“Projetos”, “Projetos online” e o resumo do README são números manuais. A classificação “online” também não é totalmente uniforme: o JavaScript adiciona a tag `demo` apenas quando o texto exato da ação é “Demo online”, embora a interface nem ofereça um filtro “Demo”.

**Recomendação:** calcular métricas a partir da fonte única dos projetos e adotar estados enumerados, em vez de inferir categorias pelo texto do botão.

#### 3.4 SEO e compartilhamento

Além de `title`, descrição, idioma e viewport, esta etapa adicionou URL canônica, metadados Open Graph básicos, autor, robots, Twitter Card e JSON-LD `Person`. Os cases essenciais também estão no HTML inicial, tornando previews e indexação menos dependentes da execução de JavaScript. Ainda falta uma imagem social dedicada.

**Recomendação remanescente:** criar uma imagem social dedicada e, se necessário, complementar o JSON-LD com `WebSite`.

## 4. Segurança

### Aspectos positivos

- O site é estático e não coleta dados nem processa formulários, reduzindo muito a superfície de ataque.
- Os cases são conteúdo estático, sem interpolação de entradas externas.
- Os únicos blocos atribuídos por `innerHTML` são controles constantes locais, sem conteúdo de usuário.
- Links externos existentes usam `rel="noreferrer"`, que nos navegadores atuais também evita acesso de `window.opener`; ainda assim, `noopener noreferrer` é mais explícito.
- O acesso a `localStorage` é protegido para cenários em que armazenamento esteja bloqueado.

### Riscos e melhorias

#### 4.1 Cabeçalhos de segurança não versionados — prioridade alta

Não há configuração de deploy no repositório para demonstrar políticas como:

- `Content-Security-Policy`;
- `Strict-Transport-Security`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `frame-ancestors` via CSP.

Como os cabeçalhos de produção não puderam ser consultados no ambiente, isso é uma lacuna de evidência, não a afirmação de que estejam ausentes em produção.

**Recomendação:** versionar `vercel.json` ou configuração equivalente. A CSP precisa considerar Google Fonts; uma alternativa mais simples e privada é hospedar a fonte localmente e restringir `font-src`/`style-src` a `'self'`.

#### 4.2 Dependência de terceiros

O carregamento de Inter pelo Google Fonts expõe disponibilidade e metadados de conexão a um terceiro. Os `preconnect` melhoram desempenho, mas não eliminam o risco de privacidade/disponibilidade.

**Recomendação:** avaliar fonte local WOFF2 com fallback de sistema. Se Google Fonts for mantido, documentar a decisão e ajustar a CSP.

#### 4.3 Links externos

Padronizar todos os links com `target="_blank"` para `rel="noopener noreferrer"`. Para ações indisponíveis, não usar `<a role="button" aria-disabled="true">` sem `href`: prefira texto/badge “Acesso privado” ou `<button disabled>` quando houver ação futura.

#### 4.4 Integridade e cadeia de entrega

Não há dependências npm neste portfólio, o que é positivo. Porém, não existe verificação automática do HTML, links, acessibilidade ou cabeçalhos antes do deploy.

**Recomendação:** adicionar CI leve com HTML validator, link checker, lint de CSS/JS e uma auditoria Lighthouse em URL local.

## 5. UX/UI e acessibilidade

### O que funciona bem

- Navegação curta e orientada às tarefas principais.
- CTAs do hero têm prioridade visual compreensível.
- Tema automático, claro e escuro respeita escolha persistida.
- Estados `:focus-visible` estão previstos para links e botões.
- `prefers-reduced-motion` é considerado tanto no CSS quanto no scroll em JavaScript.
- Botões de filtro recebem `aria-pressed` e o botão “Ver mais” usa `aria-expanded`/`aria-controls`.
- Texto dos cases contextualiza problema e resultado, diferencial relevante para recrutadores e clientes.

### O que deve melhorar

#### 5.1 Escaneabilidade dos cards — prioridade alta

Cases com três parágrafos extensos, especialmente em cards de largura reduzida, exigem muita leitura antes de chegar à ação. A grade assimétrica alterna cards de uma e duas colunas conforme `nth-child`; ao filtrar ou inserir um projeto, o destaque visual muda por posição, não por importância editorial.

**Recomendação:** limitar cada campo a aproximadamente 160–220 caracteres, exibir “Solução” e “Resultado” no resumo e deixar detalhes expandidos ou em página de case. Definir destaque por classe/dado explícito, nunca pela posição do card.

#### 5.2 Status ambíguos

São usados “Sistema em homologação”, “MVP em desenvolvimento”, “Demo online”, “MVP funcional”, “MVP publicado”, “Projeto em produção”, “Em evolução” e “Protótipo Exploratório v0”. Alguns misturam maturidade, disponibilidade e tipo de entrega.

**Recomendação:** separar dois campos:

- **maturidade:** Conceito, Protótipo, MVP, Homologação, Produção;
- **acesso:** Demo pública, Site público, Código público, Privado.

Isso permite que “MVP · Demo pública” e “Homologação · Privado” sejam comparáveis.

#### 5.3 Filtros e contagem

O usuário vê quatro cards e precisa expandir a lista, mas os filtros não mostram quantidades nem anunciam quantos resultados foram exibidos. O filtro “Online” reúne sites, protótipos e sistemas, enquanto “Sites” e “Sistemas” são tipos; as categorias não pertencem ao mesmo eixo conceitual.

**Recomendação:** usar filtros combináveis ou apresentar um eixo único: “Todos (11)”, “Produtos/Sistemas”, “Sites” e “Dados”. Disponibilidade pode virar um badge, não um filtro. Adicionar região `aria-live` discreta para anunciar resultados.

#### 5.4 Ações inconsistentes

Os rótulos variam entre “Demo online”, “Acessar aplicação”, “Acessar dashboard”, “Site oficial” e “Abrir protótipo”. Cadastro de Obras possui três ações; RJ Prime apenas uma; iCanada Gestão mostra dois controles desabilitados.

**Recomendação:** ordenar e nomear sempre:

1. `Ver projeto` ou `Abrir demo`;
2. `Ver código`;
3. `Ver API`, somente quando realmente necessário.

Em projetos privados: badge “Projeto privado” e, opcionalmente, “Ver estudo de caso”.

#### 5.5 Navegação alterada após carregamento

O HTML traz currículo no cabeçalho e LinkedIn no hero, mas o JavaScript remove ambos. Essa mudança pode causar deslocamento visual e torna o comportamento sem JavaScript diferente.

**Recomendação:** decidir a navegação final no HTML e remover mutações corretivas.

## 6. Responsividade

### Evidências positivas

- O documento define viewport e largura mínima de 320 px.
- Existem breakpoints principais em 960 px e 640 px para cabeçalho, hero, grids, cards e rodapé.
- O grid passa de três para duas e uma coluna.
- Textos permitem quebra de palavras longas.
- Alvos de toque recebem dimensões mínimas em regras de refinamento.
- A animação do fluxo tem variantes para tablet/mobile e modo sem movimento.

### Pontos de atenção

1. **CSS em cascata excessiva:** `final.css` importa seis arquivos, além de `styles.css` e `theme.css`. Vários seletores de hero, grid e cards são redefinidos em diferentes arquivos. O resultado atual pode funcionar, mas a previsibilidade é baixa.
2. **Cabeçalho mobile:** `styles.css` prevê navegação horizontal com `overflow-x: auto`; `theme.css` depois força `overflow-x: visible !important`. Essa oposição indica correção localizada e pode gerar corte ou compressão em 320 px, traduções, zoom de 200% ou nomes maiores.
3. **Grade por `nth-child`:** a largura desktop muda de acordo com a posição e não com o conteúdo; filtros apenas ocultam cards sem reordenar a pseudo-sequência visual.
4. **Cards longos:** em 320–375 px, três blocos de case mais ações produzem rolagem extensa e dificultam comparação.
5. **`overflow-x: hidden` no body:** pode mascarar elementos que escapam da viewport, em vez de revelar a regressão.
6. **Ausência de teste visual automatizado:** não há evidência de capturas em 320, 375, 768, 1024 e 1440 px, nem teste com zoom de 200%.

### Matriz mínima recomendada

| Cenário | Verificação |
| --- | --- |
| 320 × 568 | Cabeçalho sem corte, filtros quebrando linha, ações com toque confortável. |
| 375 × 812 | Hero, fluxo e cards sem overflow; leitura e espaçamento. |
| 768 × 1024 | Grid de duas colunas, cards com alturas coerentes e ordem lógica. |
| 1024 × 768 | Transição do breakpoint e navegação completa. |
| 1440 × 900 | Comprimento de linha, densidade e hierarquia dos destaques. |
| Zoom 200% | Reflow sem rolagem horizontal e conteúdo/controles preservados. |
| Teclado | Ordem de foco, filtros, “Ver mais”, links externos e voltar ao topo. |
| Movimento reduzido | Ausência de animações decorativas persistentes. |

## 7. Padrão proposto para os cards

### Estrutura única

Todos os projetos devem nascer com a mesma estrutura na fonte de dados/HTML:

1. **Tipo:** Sistema, Mobile, Site, Dados ou Discovery;
2. **Título**;
3. **Maturidade + acesso:** dois badges independentes;
4. **Papel:** por exemplo “Product Architect / Tech Lead” ou “Desenvolvimento Full Stack”;
5. **Problema:** uma frase;
6. **Solução:** uma ou duas frases;
7. **Resultado/evidência:** uma frase verificável, evitando resultado comercial não medido;
8. **Stack:** lista curta, com no máximo cinco tecnologias principais;
9. **Ações:** demo/site, código e documentação, nessa ordem.

### Modelo editorial

```text
[Sistema]                              [MVP] [Demo pública]
Nome do projeto
Papel: Desenvolvimento Full Stack

Problema — uma frase sobre a necessidade real.
Solução — o que foi construído e a principal decisão técnica.
Evidência — o que está disponível ou foi validado, sem promessas não mensuradas.

React · Node.js · PostgreSQL
[Abrir demo] [Ver código]
```

### Regras de conteúdo

- “Resultado” deve ser uma evidência: publicado, testado, integrado ou validado. Evitar alegar ganho sem métrica.
- Informar claramente simulações: sem pagamento real, sem prontuário, sem autenticação real etc.
- Não misturar stack com status na mesma linha.
- Usar capitalização consistente: Node.js, scikit-learn, GitHub, PostgreSQL.
- Usar `https://` canônico e barra final de modo consistente.
- Mostrar “Código privado” como badge, não como link desabilitado.
- Manter no máximo 6 projetos em destaque; os demais podem ficar em “Outros projetos”.

## 8. Atualização das informações dos projetos

### Situação confirmável pelos repositórios públicos

| Projeto | Ajuste recomendado |
| --- | --- |
| Emprega Safe | Atualizar a stack curta para **React + Node.js + MongoDB** e mencionar análise por regras locais, com IA apenas quando ativada. O README público também evidencia equipe; o card deve indicar “Projeto em equipe” para não sugerir autoria individual integral. |
| Cadastro de Obras | Corrigir o README deste portfólio: o backend público declara **Express + Mongoose + MongoDB**, não PostgreSQL/Supabase. Manter React Native/Expo/TypeScript no frontend e Node.js no backend. |
| Data Science Dashboard | O conteúdo está alinhado ao README público: Flask, PostgreSQL/Supabase, scikit-learn, CI e dados sintéticos. Recomenda-se chamar o projeto de **Dashboard Forense** ou registrar “Data Science Dashboard — Dashboard Forense” para alinhar título do portfólio e repositório. |
| AutoWash Smart | Manter “MVP demonstrativo” e explicitar no card que backend, hardware, pagamento, QR Code e reconhecimento facial são simulados. O README público informa testes unitários, uma evidência melhor do que apenas “dados locais”. |
| Aurora Stay Iceland | Substituir “plataforma” por **protótipo acadêmico** ou “SPA demonstrativa”; explicitar dados locais, sem backend, autenticação ou pagamento real. |
| Gerenciamento Forense | O repositório público não recebe push desde junho de 2025, embora o card diga “Em evolução”. Usar “Código legado em revisão” ou confirmar atividade atual antes de manter esse status. |
| iCanada Reparos | O repositório público foi atualizado em junho de 2026 e declara homepage Vercel; o domínio oficial usado pelo portfólio deve ser validado manualmente após a limitação do proxy. |
| Cinescope Catalog | O repositório público e sua homepage estão coerentes com o card; enriquecer stack real no lugar de “Catálogo web”. |

### Projetos privados ou não localizados publicamente

Antes de editar o conteúdo publicado, confirmar estas fichas:

#### iCanada Gestão

- Status real: homologação interna, piloto ou produção?
- Frontend/API/banco estão publicados, ainda que privados?
- Stack vigente: React/Vite, Node.js/Express, Supabase PostgreSQL/Auth e Resend?
- Há usuário real, volume de ordens ou etapa validada que possa virar evidência?
- Texto recomendado enquanto não houver validação: **“Homologação · Projeto privado”**.

#### RJ Prime Gestão

- O deploy Render está ativo e possui dados apenas demonstrativos?
- SQLite é definitivo para o MVP ou migração está em curso?
- Existe autenticação e isolamento multiacademia efetivo?
- A aplicação trata dados pessoais reais?
- Texto recomendado enquanto em desenvolvimento: **“MVP · Demo restrita/pública”**, conforme o acesso real.

#### Monta Health

- Confirmar que continua sem backend, banco, autenticação e integrações clínicas.
- Manter em destaque o uso exclusivo de dados sintéticos e que não é prontuário eletrônico.
- Evitar “Online” como sinônimo de produto disponível; usar **“Protótipo · Demo pública”**.
- Informar stack de implementação separadamente do papel de Product Architect/Tech Lead.

### Contagens após revisão

Não manter números fixos até que cada projeto tenha `access` e `maturity` definidos. Pela interface renderizada atual, a intenção é apresentar **11 projetos** e **9 acessos online**, mas essa segunda contagem não foi confirmada em produção. O README deve ser atualizado automaticamente ou evitar números perecíveis.

## 9. Plano de ação

### Próximo passo recomendado

O ciclo curto de **integridade da fonte de conteúdo** foi executado. A página agora entrega cards, métricas, experiência e navegação essenciais sem depender de JavaScript.

Ordem de execução:

1. ~~mover o card Monta Health e a experiência profissional para o HTML inicial~~ — concluído;
2. ~~converter definitivamente todos os cards para Problema/Solução/Resultado~~ — concluído;
3. ~~remover as rotinas que criavam ou reescreviam conteúdo~~ — concluído;
4. ~~manter no JavaScript apenas comportamento interativo~~ — concluído;
5. sincronizar métricas e README — concluído com 11 projetos e 9 acessos declarados;
6. validar a página com JavaScript habilitado e desabilitado — concluído em Chromium nas larguras de 320, 375, 768 e 1440 px.

**Próxima ação:** validar com o proprietário os estados dos projetos privados e complementar a validação automatizada com Lighthouse e axe. Nesta etapa foram adicionados badges separados de maturidade/acesso, filtros de tipo com contagens e anúncio acessível dos resultados.

### P0 — integridade (imediato)

- Adicionar validação HTML normativa ao fluxo de qualidade.
- Mover Monta Health e experiência profissional para o HTML/fonte única.
- Remover correções de conteúdo executadas no carregamento.
- Unificar métricas e eliminar divergências do README.
- Validar HTML e navegação sem JavaScript.

### P1 — qualidade da experiência (próximo ciclo)

- Manter o padrão único de card e o vocabulário maturidade/acesso implementados.
- Resumir cases e destacar evidências verificáveis.
- Corrigir informações públicas listadas na seção 8.
- Manter os filtros por tipo, suas contagens e o anúncio acessível dos resultados.
- Testar breakpoints, teclado, zoom e temas com Lighthouse/axe.
- Adicionar metadados sociais e dados estruturados.

### P2 — robustez e manutenção

- Consolidar as oito folhas CSS em camadas claras: tokens/base, layout, componentes e utilitários/responsivo.
- Manter o JavaScript consolidado em `script-core.js`, sem voltar a carregar um script por outro.
- Remover regras contraditórias e `!important` de correção.
- Versionar cabeçalhos de segurança e hospedar a fonte localmente.
- Criar CI para HTML, CSS, JavaScript, acessibilidade e links.

## 10. Critérios de aceite sugeridos

- HTML válido e conteúdo principal completo com JavaScript desativado.
- Uma única fonte de dados gera cards, contagens e documentação.
- Todos os cards contêm tipo, maturidade, acesso, papel, problema, solução, evidência, stack e ações.
- Nenhum status “em desenvolvimento/evolução” é publicado sem confirmação do proprietário.
- Nenhum projeto demonstrativo sugere integrações ou tratamento real de dados quando são simulados.
- Sem rolagem horizontal a 320 px ou zoom de 200%.
- Navegação completa por teclado e auditoria axe sem violações críticas/sérias.
- Lighthouse executado em mobile e desktop, com metas registradas no projeto.
- Links e deploys verificados automaticamente ou revisados antes de cada publicação.
- Cabeçalhos de segurança documentados e testados em produção.

## 11. Conclusão

O portfólio já possui bons ativos: narrativa orientada a entrega, projetos variados, preocupação com acessibilidade e cases que mostram visão de negócio. O ganho mais importante agora virá de **reduzir a complexidade acidental**. Levar o conteúdo definitivo para uma única fonte, padronizar maturidade/acesso e tornar cada afirmação verificável aumentará simultaneamente credibilidade, SEO, segurança operacional, responsividade e velocidade de manutenção.

Após as correções P0/P1, recomenda-se uma segunda auditoria visual na URL de produção com acesso aos projetos privados ou a uma ficha de status fornecida pelo proprietário.

## 12. Análise visual comparativa com o perfil do GitHub

### Resposta objetiva

**Sim, vale realizar um upgrade visual**, mas não uma troca completa de identidade. O portfólio já possui uma linguagem moderna, responsiva e coerente com desenvolvimento de produto. O melhor caminho é importar do perfil do GitHub a sensação de **dashboard técnico**, a síntese visual e a apresentação editorial dos projetos, preservando a navegação, a legibilidade e os cases Problema/Solução/Resultado do site.

### O que torna o perfil do GitHub mais moderno

A análise do README público e dos SVGs do perfil `Riclacper`, consultados em 9 de agosto de 2026, identificou quatro elementos que produzem essa percepção:

1. **Hero gráfico próprio:** `profile-hero.svg` cria uma abertura mais autoral do que um cabeçalho baseado somente em texto.
2. **Dashboard visual:** `github-overview.svg`, o gráfico público de contribuições e `skills-dashboard.svg` condensam atividade, áreas técnicas e recorrência em uma leitura rápida.
3. **Capas consistentes de projetos:** seis SVGs usam o mesmo formato 600 × 210, permitindo comparação visual imediata e dando aos projetos aparência de coleção/produto.
4. **Hierarquia editorial forte:** blocos de stack, badges, gráficos, destaques e detalhes expansíveis alternam densidade e evitam uma sequência composta apenas por parágrafos.

Essa modernidade não vem apenas dos gráficos. Ela resulta principalmente da combinação entre **arte própria, dados resumidos, repetição de padrões e contraste entre blocos**.

### O que não deve ser copiado literalmente

- Não transformar o portfólio em uma reprodução do README ou em uma parede de badges.
- Não carregar imagens de serviços externos para cada tecnologia; isso aumenta dependências, ruído e risco de layout.
- Não usar porcentagens de domínio ou barras de habilidade sem metodologia verificável.
- Não duplicar o gráfico de contribuições como evidência principal: atividade pública não representa todo o trabalho, especialmente projetos privados.
- Não substituir os cases textuais por capas; as capas devem facilitar a entrada, enquanto problema, solução e evidência sustentam a credibilidade.
- Não adicionar animações contínuas a todos os gráficos. Movimento deve indicar estado ou interação e respeitar `prefers-reduced-motion`.

### Upgrade recomendado

#### 1. Hero com painel de atividade — prioridade alta

Manter o título “Do problema ao deploy”, mas transformar o lado visual em um **painel de entrega** mais rico:

- status dos projetos por maturidade: Protótipo, MVP, Homologação e Produção;
- quantidade de sistemas, sites e projetos de dados;
- stack recorrente organizada em Front-end, Back-end/Dados e Qualidade/Cloud;
- pequenos sparklines ou barras discretas, produzidos com HTML/CSS ou SVG local;
- indicação explícita de que os indicadores descrevem o portfólio, não proficiência absoluta.

O fluxo de entrega atual pode permanecer abaixo desse painel ou ser incorporado como uma linha temporal compacta.

#### 2. Capas para os projetos em destaque — prioridade alta

Adicionar uma área visual de proporção fixa aos cards principais, seguindo a consistência das capas do GitHub, mas adaptada ao site:

- ilustração abstrata ou miniatura real do produto;
- nome, segmento e principal resultado;
- cores por categoria, mantendo a mesma base visual;
- SVGs locais, leves e acessíveis;
- `aspect-ratio` fixo para evitar deslocamento de layout.

Não é necessário criar capas para os 11 projetos de uma vez. Recomenda-se começar por iCanada Gestão, Emprega Safe, Monta Health e Data Science Dashboard.

#### 3. Dashboard de atuação — prioridade média

Criar uma seção entre métricas e projetos com gráficos baseados somente nos projetos cadastrados:

- **distribuição por tipo:** 7 sistemas, 3 sites e 1 projeto de dados;
- **distribuição por maturidade:** calculada pelos atributos `data-maturity`;
- **disponibilidade:** demo pública, site público, código público e privado;
- **tecnologias recorrentes:** contagem derivada da ficha única dos projetos.

Os dados devem vir da mesma fonte dos cards. O gráfico pode ser implementado em SVG/HTML e CSS, sem biblioteca pesada. Cada visualização precisa de alternativa textual e contraste suficiente nos dois temas.

#### 4. Stack com organização visual — prioridade média

Substituir a lista extensa e uniforme de habilidades por três grupos compactos:

- Front-end & Mobile;
- Back-end & Dados;
- Qualidade, Cloud & Ferramentas.

Ícones podem ser usados com moderação e hospedados localmente. Tecnologias recorrentes devem receber maior destaque por frequência comprovada nos projetos, não por uma nota subjetiva.

#### 5. Motion e profundidade — prioridade baixa

- animação curta de entrada apenas na primeira visualização;
- realce do segmento do gráfico relacionado ao filtro selecionado;
- hover com profundidade sutil nas capas;
- contadores sem animação longa;
- fallback completo para movimento reduzido e dispositivos sem hover.

### Divergência de conteúdo identificada

O perfil do GitHub apresenta como destaques **EmpregaSafe, Monta Gestão, iCanada Gestão, Monta Health, Global Career OS e JH Prime Sistema**. O portfólio atual apresenta outro conjunto e ainda usa **RJ Prime Gestão**. Antes do upgrade visual, é necessário confirmar:

- se “RJ Prime Gestão” foi renomeado para “JH Prime Sistema”;
- se Monta Gestão e Global Career OS devem entrar no portfólio;
- quais projetos formam o conjunto oficial de destaques;
- quais cards podem usar capa pública e quais precisam preservar confidencialidade;
- se os textos resumidos do GitHub representam o estado atual ou apenas uma apresentação comercial.

Essa sincronização editorial é mais importante do que criar gráficos, pois um design moderno amplifica tanto informações corretas quanto inconsistências.

### Direção visual recomendada

| Elemento | Manter do portfólio | Incorporar do GitHub |
| --- | --- | --- |
| Identidade | verde/ciano, temas, grid técnico e tipografia limpa | gradientes controlados e artes SVG autorais |
| Hero | mensagem “Do problema ao deploy” e CTA principal | painel visual com resumo técnico |
| Projetos | cases, filtros, badges de maturidade/acesso | capas consistentes para destaques |
| Dados | métricas simples e verificáveis | gráficos compactos e explicados |
| Stack | relação com projetos reais | agrupamento por área e síntese visual |
| Movimento | redução de movimento já implementada | microinterações funcionais, não decorativas |

### Sequência de implementação

1. Validar os projetos oficiais e a possível relação RJ Prime/JH Prime.
2. Criar um protótipo de hero/dashboard em HTML/CSS/SVG local.
3. Criar quatro capas-piloto para os projetos principais.
4. Testar os dois temas, teclado, movimento reduzido e larguras de 320 a 1440 px.
5. Medir Lighthouse antes e depois para impedir regressão de desempenho.
6. Somente depois expandir as capas e gráficos para outras áreas.

### Decisão recomendada

Realizar o upgrade em uma **evolução incremental**, não em um redesign integral. A primeira entrega deve conter apenas o novo painel do hero e quatro capas-piloto. Esse recorte produz impacto visual perceptível, aproxima o site da linguagem moderna do GitHub e mantém baixo o risco de desempenho, acessibilidade e excesso de informação.

### Implementação realizada

A primeira etapa do upgrade foi concluída mantendo exatamente os projetos que já estavam no portfólio:

- novo dashboard visual com distribuição por tipo, maturidade e stack recorrente;
- gráficos leves em HTML e CSS, sem biblioteca ou serviço externo;
- alternativas textuais acessíveis para os gráficos;
- quatro capas-piloto para iCanada Gestão, Monta Health, Emprega Safe e Data Science Dashboard;
- capas construídas em CSS local, sem adicionar peso de imagens ou requisições de terceiros;
- adaptação para temas claro/escuro, tablets, smartphones e movimento reduzido;
- manutenção integral dos cases Problema/Solução/Resultado e dos filtros existentes.

Os nomes e o conjunto de projetos não foram sincronizados com os destaques diferentes do GitHub, conforme orientação do proprietário. Os gráficos utilizam somente os 11 cards atuais como referência.

## 13. Evolução das seções finais

As seções Sobre, Experiência profissional e Contato foram revisadas para acompanhar a nova linguagem visual sem ampliar artificialmente as informações profissionais:

- **Sobre:** posicionamento mais direto, disponibilidade profissional visível e competências agrupadas em Produto/Interface, APIs/Dados e Qualidade/Entrega;
- **Experiência:** leitura em formato de trajetória atual, responsabilidades separadas em Operação, Gestão e Produto e sinais qualitativos sem métricas inventadas;
- **Contato:** proposta de conversa mais objetiva, e-mail público destacado e quatro caminhos claros — e-mail, currículo, GitHub e LinkedIn;
- **Navegação:** Experiência passou a integrar cabeçalho e rodapé no desktop, permanecendo acessível pelo fluxo da página em telas pequenas;
- **Responsividade:** os novos blocos foram verificados de 320 a 1440 px sem overflow horizontal.

A revisão evita uma lista extensa e uniforme de tecnologias, conecta a experiência empresarial ao desenvolvimento dos produtos e oferece uma ação de contato imediata sem formulário ou coleta adicional de dados.
