# Fase 12.2.5 — Correção da interface mobile

## Classificação

**APROVADA COM RESSALVAS** para os cenários de navegador automatizados descritos. O conflito reproduzido foi corrigido e as verificações solicitadas passaram em Chromium headless; nenhum dispositivo físico, recorte de tela real, navegador móvel real ou tecnologia assistiva foi testado. Isso não aprova anatomia, desempenho ou expansão e não autoriza a Fase 12.2.6.

## Escopo e estado inicial

Branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD local `3797202`. Antes da fase, `src/App.tsx` e `src/components/Lab3D.tsx` estavam modificados; piloto, GLBs, relatórios, capturas e testes das fases anteriores estavam não rastreados. As alterações pendentes foram preservadas; consultados relatórios [12.2.4](fase-12-2-4-preparacao-validacao-externa.md) e [12.2.3](fase-12-2-3-diagnostico-otimizacao.md). Trabalhou-se apenas na sobreposição mobile do piloto. Não houve commit, mudança de geometria, de GLB, de currículo ou de progressão.

## Diagnóstico

A captura de página inteira da 12.2.4 sugeria uma barra sobre a etiqueta, mas capturas de página inteira com elementos sticky podem ser ambíguas. Reproduzimos em **captura de viewport**, não apenas imagem de página inteira: em 360×800, ao rolar a etiqueta para y=20 px, o cabeçalho mobile (`position: sticky; top: 0; z-index: 40`) ocupou y=0–49 px; a etiqueta ocupou y=20–72 px. `document.elementFromPoint` atingiu o cabeçalho, não a etiqueta. [Antes: captura real do viewport](../auditoria-piloto/fase-12-2-5/antes-360-viewport.png). Portanto houve sobreposição real no estado de rolagem testado. A barra é o **cabeçalho superior**, não um rodapé. A etiqueta já ficava fora do canvas; o problema era sua posição no fluxo sob o cabeçalho sticky, não um problema da geometria.

## Correção e implicações

- `src/App.tsx`: adicionada a classe `mobile-header` ao cabeçalho existente; menu e navegação preservados.
- `src/components/RespiratoryPilot.tsx`: `useLayoutEffect` marca o documento enquanto o piloto está montado e remove a marca ao desmontar; também funciona quando o piloto é aberto por Sistemas do Corpo. A correção não altera modelos nem controles 3D.
- `src/index.css`: abaixo de 1024 px, apenas enquanto o piloto está montado, o cabeçalho passa de sticky para **static** (no fluxo normal) e usa `env(safe-area-inset-*)` com limites mínimos nos lados e no topo. Ao sair, navegar para outra página ou ocorrer fallback, a marca é removida e o cabeçalho volta a ser sticky. Em 1024 px ou mais, o cabeçalho mobile continua oculto e a barra lateral existente permanece.

**Troca consciente:** em mobile o menu continua acessível no topo, mas durante o piloto não acompanha a rolagem; é necessário voltar ao topo para abri-lo. Isso evita que o cabeçalho cubra etiqueta ou comandos. Fora do piloto mantém-se o comportamento anterior. `index.html` mantém o viewport existente sem `viewport-fit=cover`; o valor real de safe-area e comportamento de recortes em aparelhos físicos continuam pendentes. Não se pressupõe que valores `env()` tenham sido efetivamente exercitados no headless.

## Testes por resolução

`tests/mobile-1225.mjs`, Chromium headless/WebGL SwiftShader, Vite local, páginas com perfis isolados. A tabela mostra ausência de sobreposição com o cabeçalho e hit-test da etiqueta; também foram exercitados ocultar/mostrar, cinco seleções por lista, painel, isolar/mostrar todas, reset, retorno ao esquema e ausência de overflow horizontal/erros de página. Os elementos Isolar, Restaurar câmera, Ocultar etiqueta, botão e título da estrutura selecionada foram rolados e testados por `elementFromPoint`. A checagem é pontual e não prova que **todo** o texto ou todos os estados de rolagem sejam visíveis em qualquer aparelho.

| Viewport | Resultado | Evidência |
|---|---|---|
| 360×800 | Passou; etiqueta em y=20–72, cabeçalho fora do viewport; hit-test atingiu etiqueta. | [viewport](../auditoria-piloto/fase-12-2-5/depois-360-viewport.png) |
| 375×812 | Passou; sem cobertura ou overflow nos pontos testados. | [viewport](../auditoria-piloto/fase-12-2-5/depois-375-viewport.png) |
| 390×844 | Passou; sem cobertura ou overflow nos pontos testados. | [viewport](../auditoria-piloto/fase-12-2-5/depois-390-viewport.png) |
| 414×896 | Passou; sem cobertura ou overflow nos pontos testados. | [viewport](../auditoria-piloto/fase-12-2-5/depois-414-viewport.png) |
| 768×1024 | Passou; sem cobertura ou overflow nos pontos testados. | [viewport](../auditoria-piloto/fase-12-2-5/depois-768-viewport.png) |
| 1024×768 | Passou; cabeçalho mobile oculto e sidebar presente. | [viewport](../auditoria-piloto/fase-12-2-5/depois-1024-viewport.png) |
| 1440×900 | Passou; cabeçalho mobile oculto e sidebar presente. | [viewport](../auditoria-piloto/fase-12-2-5/depois-1440-viewport.png) |

Em todas as larguras, ao sair do piloto a classe temporária deixou de existir; nas cinco menores o cabeçalho voltou a `sticky`. `tests/mobile-lifecycle-1225.mjs` verificou a entrada pelo sistema respiratório na página Sistemas do Corpo, navegação pelo menu após retornar ao topo, limpeza da classe e fallback ao bloquear a traqueia em 390 px. Confirma comportamento nesses fluxos, não em todas as condições de erro possíveis.

## Regressão

- `npm run build` passou; mantém o alerta de chunks >500 kB. `npm run lint` passou com um aviso preexistente no store.
- `tests/inspect-respiratory.mjs` confirmou hashes, parsing e contagens dos GLBs; **274.830 triângulos** e arquivos originais preservados.
- SSR 28/28, store/jsdom 25/25, auditoria de **90 aulas, 597 questões e 586 flashcards** e interações jsdom de avaliações/flashcards passaram. SM-2, XP, persistência e exportação/importação foram exercitados nos testes existentes, em perfis isolados.
- `tests/materials-1223.mjs`: seleção e materiais independentes passaram. `tests/pilot-reentry-1223.mjs`: clique direto e três retornos passaram. `tests/real-controls-1222.mjs`: controles do canvas e reset numérico passaram. `tests/fallback-1222.mjs`: bloqueio de GLB e retorno ao esquema passaram.
- `tests/audit-respiratory-browser.mjs` passou em 360, 390, 768, 1024 e 1440 px, incluindo resposta ao quiz do laboratório esquemático; as duas larguras adicionais 375 e 414 foram cobertas pelo teste mobile acima, que confirma disponibilidade do quiz, mas não responde a ele.

Reprodução dos testes de browser: iniciar Vite para o workspace e definir `TEST_BASE_URL`, `CHROMIUM_PATH` e, se necessário, `LD_LIBRARY_PATH`; nesta sessão foram usados `http://127.0.0.1:5175`, `/tmp/chromium` e `/tmp/lib`. Playwright Core/Chromium são externos, sem dependência adicionada. O comando de SSR/jsdom usou `npx tsx` e configuração JSX temporária. Capturas e testes estão em `auditoria-piloto/fase-12-2-5/`, `tests/mobile-1225.mjs` e `tests/mobile-lifecycle-1225.mjs`.

## Limitações e próximos passos

Sem mobile físico, Safari/Android reais, variações de zoom do sistema, recortes/safe areas reais, leitor de tela ou gestos reais; a conformidade de acessibilidade e a experiência de retorno ao menu precisam de validação. Não há prova de ausência de sobreposição em todos os estados ou dimensões. A validação anatômica e o benchmark físico permanecem pendentes das fases anteriores. A próxima fase só começa com autorização expressa do usuário.
