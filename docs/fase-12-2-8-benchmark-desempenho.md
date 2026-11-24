# Fase 12.2.8 — Benchmark de desempenho e profiling

## 1. Objetivo, classificação e escopo

Estabelecer linha de base reproduzível do laboratório esquemático e piloto respiratório, com medidas de carregamento, renderização, recursos e repetição, sem mudar modelos, funcionalidades ou arquitetura.

**Classificação: APROVADA COM RESSALVAS** para a construção da linha de base e as regressões aqui descritas. Os resultados não aprovam desempenho ou estabilidade em dispositivos físicos; a variação das amostras, a tendência de heap e a falha de nova tentativa do módulo lazy exigem investigação. Nenhuma otimização de produto foi aplicada e a fase 12.2.9 não foi iniciada.

## 2. Estado inicial e ambiente

No início: branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD `3797202`; `src/App.tsx`, `src/components/Lab3D.tsx`, `src/index.css` modificados; piloto, GLBs, relatórios e testes anteriores não rastreados. Relatório 12.2.7 examinado. As alterações anteriores foram preservadas. Não se alterou código da aplicação nesta fase.

Linux x86-64 em sandbox, 2 processadores lógicos visíveis; modelo de CPU, memória efetivamente disponível e GPU física desconhecidos. Chromium headless **153.0.8010.0**, ANGLE Vulkan **SwiftShader Device (Subzero)**, software, `--enable-unsafe-swiftshader`, Playwright. Vite local 5175, build de produção servido localmente pela prévia 5180; sem throttling deliberado de rede ou CPU. Não representa smartphone, tablet, GPU ou tela física. A automação e instrumentação introduzem overhead; não houve amostragem estatística suficiente ou controle de carga da máquina.

| Item | Linha de base encontrada |
|---|---|
| Vite | `vite.config.ts`: plugins React e Tailwind; servidor dev `0.0.0.0`, porta configurada 5173, `allowedHosts: true`. A instância usada estava em 5175. |
| Versões instaladas | React 19.3.1; Three.js 0.187.0; R3F 9.8.2; Drei 10.7.9. |
| Entradas | `App.tsx` e `pages/Library.tsx` usam `LazyLab3D`; este importa `Lab3D` sob demanda. Sistema respiratório oferece abertura de `RespiratoryPilot`, também lazy. |
| Carregamento | Ao entrar no piloto, `useGLTF(RESPIRATORY_URLS)` carrega os três URLs em paralelo; `Promise.all` suspende os grupos até os três completarem. Não há aparecimento individual progressivo das peças. |
| Cache e propriedade | R3F/suspend-react guarda resultado pela lista ordenada; hierarquias são clonadas, geometrias compartilhadas e materiais clonados por grupo. `dispose={null}` protege compartilhados; cleanup chama `dispose` nos materiais próprios. Falha GLB reconhecida remove chave rejeitada para nova tentativa. |
| Renderer | `Canvas` R3F sem configuração especial de frameloop, DPR ou sombras no piloto; OrbitControls com damping. Uma luz ambiente e uma direcional; sombras desligadas no renderer medido. |
| Cena inteira | 94 objetos totais, 65 malhas e geometrias, 14 materiais distintos, 65 draw calls e 274.830 triângulos no frame medido; `renderer.info.memory.textures` = 1. Esse contador não é a contagem de texturas dos GLBs. |
| Build | `index` 940,07 kB; `Lab3D` 1.023,18 kB; `RespiratoryPilot` 9,25 kB, minificados sem gzip. Medida de tamanho, não tempo. Aviso Vite de chunks >500 kB. |

Os caminhos de modelos e métricas da cena foram verificados no código e no navegador. A tela inicial e laboratório esquemático não requisitaram GLBs no teste de produção; o piloto requisitou três juntos. Cache de sucesso evita novas entradas de recurso na reentrada testada na mesma página. Isso não prova comportamento em outras abas, reload, rede ou navegador.

## 3. Metodologia e interpretação

Arquivos reproduzíveis `tests/benchmark-1228.mjs`, `tests/phases-1228.mjs`, `tests/memory-1228.mjs`, `tests/resize-1228.mjs`, `tests/failures-1228.mjs` e `tests/production-load-1228.mjs`; dados brutos em `auditoria-piloto/fase-12-2-8/`. Iniciar Vite e build/preview; `LD_LIBRARY_PATH=/tmp/lib`, `CHROMIUM_PATH=/tmp/chromium` e `TEST_BASE_URL` conforme ambiente. Instrumentação temporária via interceptação de módulo dev adiciona uma sonda `useThree`/`useFrame` e listeners de descarte, sem modificar arquivos da aplicação; a medição de carregamento de produção não injeta sonda. Browser e perfis são novos por viewport.

FPS é **taxa de callbacks requestAnimationFrame observados na página**, não tempo GPU, nem necessariamente apresentação de frames; média = intervalos / duração, mínimo instantâneo = 1000 / maior intervalo, pico = maior intervalo entre callbacks. Janela alvo 2,2–2,5 s, poucas amostras em taxas baixas. A janela real pode começar após o relógio inicial; os valores isolados sofreram transientes/atrasos e não são comparação confiável de FPS. `gl.info.render` é amostra do último frame, podendo refletir frame anterior se a cena acabou de mudar. Os números no JSON são valores individuais, sem IC. Todos os tempos de clique/espera incluem automação e escalonamento.

Primeiro frame significa **primeiro callback `useFrame` da sonda** após clique no piloto, não confirmação de pixels do modelo. Cena utilizável é aproximação: desaparecimento do status de carregamento, não prova de primeiro frame completo. Per-model decode e instante exato de pixels visíveis não foram instrumentados; não derivar esses tempos por subtração. As respostas GLB são contabilizadas por `PerformanceResourceTiming`; tempos são locais e não incluem obrigatoriamente parsing, construção de cena ou upload GPU.

## 4. Renderização responsiva

Um ciclo frio por viewport, DPR emulado 1, Canvas de 480 px CSS de altura, cena completa sem seleção. `heap` é `performance.memory.usedJSHeapSize` pontual, antes de GC controlado, não GPU. Sem física; controles de giro/zoom/reset foram acionados em cada largura, mas não foram medidos numericamente por largura neste script. A regressão de câmera faz medição numérica separada.

| Viewport | Canvas pixels | FPS médio | Média intervalo ms | Pico intervalo ms | FPS mín. instantâneo | Heap MB decimal |
|---|---:|---:|---:|---:|---:|---:|
| 360×800 | 326×480 | 3,64 | 275,0 | 549,9 | 1,82 | 109,3 |
| 390×844 | 356×480 | 3,61 | 277,1 | 333,3 | 3,00 | 129,1 |
| 768×1024 | 702×480 | 2,77 | 361,1 | 416,7 | 2,40 | 123,8 |
| 1024×768 | 326×480 | 2,63 | 380,5 | 399,9 | 2,50 | 109,5 |
| 1366×768 | 668×480 | 3,67 | 272,2 | 283,4 | 3,53 | 109,6 |
| 1920×1080 | 710×480 | 3,69 | 270,8 | 516,7 | 1,94 | 129,3 |

O tamanho do canvas não cresce monotonicamente com a largura da janela por causa do layout. Não se pode concluir que o custo cresce ou diminui monotonicamente com resolução a partir dessas seis amostras. Em `tests/resize-1228.mjs`, DPR emulado 2, redimensionamentos sucessivos 1366→390→768→1920 atualizaram `camera.aspect` para largura/altura CSS; buffer passou de 1336×960 a 712×960, 1404×960 e 1420×960; um botão de giro permaneceu acionável. Não mede FPS em DPR 2 nem mudanças de orientação em aparelhos físicos.

### Fases de interação em 1366×768, execução separada

| Estado | FPS rAF médio | Média intervalo ms | Pico ms | Mínimo instantâneo FPS |
|---|---:|---:|---:|---:|
| Dashboard sem laboratório | 47,92 | 20,87 | 516,6 | 1,94 |
| Laboratório esquemático | 41,76 | 23,95 | 99,9 | 10,01 |
| Piloto, cena completa | 21,20 | 47,16 | 550,1 | 1,82 |
| Dez seleções consecutivas | 4,78 | 209,34 | 916,5 | 1,09 |
| Brônquio isolado | 3,11 | 321,41 | 650,0 | 1,54 |
| Mostrar todas/limpar | 2,10 | 476,66 | 716,7 | 1,40 |
| Arrasto e scroll | 3,94 | 253,84 | 783,3 | 1,28 |
| Volta ao esquemático | 59,60 | 16,78 | 33,3 | 30,03 |
| Saída ao Dashboard | 60,00 | 16,67 | 16,8 | 59,52 |

As dez seleções levaram 8.653 ms de relógio, incluindo Playwright e espera de renderizações; não é latência pura da interface. O piloto completo desta execução obteve 21,20 callbacks/s, muito diferente de 3,67 na outra, demonstrando forte instabilidade do ensaio e impossibilidade de reivindicar FPS típico. Em 1366 o snapshot após isolar mostrou 2 draw calls e 1.509 triângulos versus 65 e 274.830 na cena inteira, mas o FPS da janela de isolamento não demonstrou melhora; devem ser usados como contagens de cena, não promessa de desempenho. Outras larguras capturaram contadores de frame antigo após isolar; `visibleMeshes=2` foi observado, mas contadores divergentes foram mantidos no JSON e não interpretados como resultado sincronizado.

## 5. Carregamento, GLBs e cache

### Tamanhos e tempo de rede — produção local, 1366×768, uma amostra

| GLB | Bytes | Rede ms | Malhas | Geometrias únicas | Materiais originais | Texturas GLB | Decode/primeira aparição |
|---|---:|---:|---:|---:|---:|---:|---|
| `lung.glb` | 10.941.068 | 125,0 | 58 | 58 | 6 | 0 | não medidos individualmente |
| `trachea.glb` | 1.184.804 | 26,3 | 3 | 3 | 2 | 0 | não medidos individualmente |
| `main-bronchus.glb` | 422.208 | 12,0 | 4 | 4 | 3 | 0 | não medidos individualmente |
| Total | 12.548.080 | paralela, não somar | 65 | 65 | 11 | 0 | suspensão conjunta |

Contagens dos GLBs foram extraídas com `GLTFLoader` local percorrendo malhas e IDs únicos. Os materiais de arquivo não equivalem aos 14 clones únicos da cena. Medição de rede no loopback não prevê conectividade real. No teste de produção: aplicação até `networkidle` 583 ms; clique no laboratório até botão de sistema 409 ms; abertura do piloto até status oculto 826 ms. App recebeu chunk principal e CSS; ao entrar no laboratório recebeu chunk `Lab3D`; somente ao abrir piloto recebeu chunk `RespiratoryPilot` e os três GLBs. Não se mediu rede em conexão externa.

| Viewport | App até networkidle ms | Entrada lab ms | Primeiro callback R3F ms | Pronto proxy ms | Reentrada piloto ms |
|---|---:|---:|---:|---:|---:|
| 360×800 | 974 | 1.025 | 787 | 1.138 | 167 |
| 390×844 | 946 | 840 | 463 | 836 | 185 |
| 768×1024 | 908 | 988 | 469 | 830 | 182 |
| 1024×768 | 901 | 697 | 531 | 888 | 370 |
| 1366×768 | 913 | 722 | 449 | 802 | 226 |
| 1920×1080 | 939 | 1.167 | 426 | 804 | 239 |

Tabela é modo desenvolvimento instrumentado, não comparável diretamente à amostra de produção. Reentrada na mesma página manteve três entradas de rede GLB, sugerindo reutilização do cache; não houve requisição duplicada observada. Também não se provou descarregamento completo após navegação.

A 12.2.7 registrou mudança de chunk Lab3D 952,41→1.023,18 kB e piloto 80,50→9,25 kB após tornar loader compartilhado. Não há benchmark controlado anterior à extração no mesmo ambiente, portanto **efeito em tempo não é mensurável aqui**; as medições anteriores e atuais não constituem comparação causal.

## 6. Memória e dez ciclos

`tests/memory-1228.mjs` abriu Dashboard → laboratório → piloto, selecionou cinco estruturas, isolou/restaurou, moveu/resetou câmera, retornou ao esquema e ao Dashboard; repetiu dez vezes, cerca de dois minutos. Executou `HeapProfiler.collectGarbage` e `Runtime.getHeapUsage` CDP após sair. A sonda solta a referência do estado R3F ao desmontar, mas mantém mapas de UUIDs/eventos, que também crescem com a instrumentação. Não foi feito heap snapshot ou análise de dominadores.

| Estado após GC | Heap JS usado | Backing storage CDP |
|---|---:|---:|
| Antes do primeiro laboratório | 15.941.732 B | 11.784.945 B |
| Após ciclo 1 | 40.372.768 B | 56.159.607 B |
| Após ciclo 10 | 45.363.752 B | 56.159.615 B |

O aumento do ciclo 1 ao 10 é 4.990.984 B (~4,99 MB); aumento inicial também inclui módulos e cache esperados. Os valores CDP são categorias distintas e não devem ser somados sem conhecer sua sobreposição. Não se sabe quanto da tendência vem de instrumentação, Vite/React dev, bibliotecas, browser ou recursos retidos. Não foi demonstrado vazamento nem estabilização assintótica.

Em cada ciclo, 65 UUIDs de geometria foram os mesmos, coerente com cache; 14 materiais presentes na cena receberam evento `dispose` ao sair (140 UUIDs distintos no total). Foram contados 280 clones criados na instrumentação em dev/StrictMode; os 140 não observados em cena não tiveram descarte individual comprovado. Não se sabe se são coletados nem se foram enviados à GPU. Após navegação, zero canvas no DOM; ausência do elemento não comprova que contexto GPU, listeners, timers ou animações foram liberados. Não foi medido número de listeners/timers ou bytes de memória GPU; esses itens permanecem pendentes. Não descarte cache/recursos compartilhados sem avaliação de propriedade e concorrência.

## 7. WebGL, falhas e GPU

A cena completa medida tem 65 draw calls, 274.830 triângulos, 65 geometrias e uma textura no contador do renderer; ambiente e luz direcional, sem sombras. Na seleção, partes não selecionadas passam a opacidade 0,25 e material transparente, alterando o trabalho de renderização; não foi isolado seu custo por profiling GPU. DPR 2 quadruplica a área de pixels em relação ao DPR 1 com mesmo CSS, mas não se mediu o custo resultante. Bytes GPU, tempo GPU e uso de hardware não estão disponíveis.

Teste **simulado** controlado `WEBGL_lose_context` em Chromium/SwiftShader: evento `lost`, `isContextLost=true`; após `restoreContext`, evento `restored`, `isContextLost=false`, amostra 65 chamadas/274.830 triângulos e botão Traqueia respondeu. Não é perda real de GPU, não confirma integridade visual por comparação de pixels nem recuperação em todos os drivers/navegadores. Inicialização WebGL realmente indisponível, processo GPU finalizado e pressão de memória não foram testados.

Em dev, bloqueio da requisição do módulo piloto produziu fallback; voltar e tentar com rede liberada ainda falhou e não houve segunda requisição (ver ocorrência P-02). É uma falha simulada de módulo Vite, não teste de chunk de produção nem do GLB. Falhas de GLB e recuperação da 12.2.7 foram reexecutadas separadamente com sucesso.

## 8. Ocorrências e recomendações

### P-01 — MÉDIA — taxa de callbacks baixa e variável no ambiente medido
- **Sintoma/evidência:** cena completa em SwiftShader no conjunto responsivo: 2,63–3,69 callbacks/s, picos de intervalo 283–550 ms; outra execução produziu 21,20 callbacks/s. Reproduzir com `benchmark-1228.mjs` e `phases-1228.mjs` nas condições indicadas.
- **Arquivos:** `RespiratoryPilot.tsx`, `RespiratoryCamera.tsx`, modelos e configuração R3F. **Causa provável:** carga da cena, rasterização por software, concorrência e automação; não foi isolada a contribuição de cada fator. **Impacto:** fluidez deficiente no sandbox testado; impacto em GPU física não medido.
- **Recomendação:** benchmark repetido de produção em GPU física, tracing CPU/GPU e cenários isolando transparência, resolução e draw calls; sem redução de anatomia ou funcionalidades. **Correção imediata:** não, causalidade e benefício de qualquer mudança não comprovados.

### P-02 — MÉDIA — reentrada após falha de módulo lazy em desenvolvimento
- **Sintoma/evidência:** `failures-1228.mjs` aborta a primeira requisição de `RespiratoryPilot.tsx`; fallback permite sair, mas reabrir após restaurar a rede falha e contador permanece 1. **Arquivos:** `Lab3D.tsx`, `React.lazy` e carregamento Vite. **Causa provável:** promessa rejeitada de importação/lazy permanece associada ao componente; não foi isolada entre React e module loader.
- **Impacto:** indisponibilidade do piloto na mesma sessão simulada; laboratório esquemático continua acessível. **Recomendação:** confirmar em build de produção e navegadores com falha transitória de chunk; projetar recuperação explícita sem loop nem perda de dados. **Correção imediata:** não nesta fase de profiling; simulação de módulo dev não comprova comportamento de produção, e mudança de lazy exige testes próprios.

### P-03 — hipótese, sem gravidade atribuída — tendência crescente de heap após GC
- **Evidência/reprodução:** +4,99 MB de heap entre ciclo 1 e 10 em `memory-1228.mjs`; mapas de instrumentação também crescem. **Arquivos candidatos:** ciclo de vida piloto, cache R3F, React/Vite e sonda. **Causa e impacto:** não determinados; não classificar como vazamento confirmado. **Recomendação:** comparar produção sem sonda persistente, heap snapshots/dominadores após GC, ciclos mais longos e listeners; medir GPU em hardware. **Correção imediata:** não comprovada.

## 9. Correções, comparação e regressão

Não foram feitas correções nem alterações na aplicação: medições identificaram riscos, mas não demonstraram uma otimização segura com causa e benefício isolados. Portanto não há comparação antes/depois de otimização. A comparação entre cena completa e isolada acima é comparação de estados existentes, não resultado de correção.

- Build e lint passaram; persiste aviso de chunk >500 kB e um aviso preexistente do store. Não foram instaladas dependências.
- Testes da fase 12.2.7: raycast de isolamento, retry após GLB, materiais independentes, três reentradas/clique real em malha, controles reais e fallback passaram. Teclado 360/768/1440 passou usando cópia temporária do teste anterior com evidências direcionadas à pasta 12.2.8, sem substituir suas capturas.
- `tests/inspect-respiratory.mjs` passou inspeção e hashes. Auditoria confirmou **90 aulas, 597 questões, 586 flashcards**, IDs, SM-2 e domínio 30/50/20; SSR 28/28, store/jsdom 25/25, incluindo XP e round-trip JSON, e interações jsdom de avaliações/flashcards passaram. Conquistas foram verificadas por presença em SSR e preservação do código, não por todos os desbloqueios. Testes usam perfis isolados e não apagam progresso do usuário.
- SHA-256 preservados: pulmão `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab`; traqueia `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae`; brônquios `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa`.
- A primeira execução do ensaio de memória falhou por import de named export React inexistente na resposta Vite; sonda corrigida para default export e os dez ciclos passaram. A primeira execução do teste de produção teve erro de sintaxe no próprio script; corrigido e executado com sucesso. `chromium --version` sem `LD_LIBRARY_PATH` falhou por biblioteca ausente; repetido com o caminho correto. Nenhuma dessas falhas é atribuída à aplicação.

## 10. Limitações, riscos e recomendações para 12.2.9

Não foram executados teste físico, sessão de horas, carregamento externo, perfis de CPU/GPU com traces, heap snapshots/dominadores, inventário de listeners/timers, teste de falha real de GPU/inicialização WebGL, verificação de pixels após recuperação, decode individual, primeiro pixel individual, benchmark de DPR 2, experiência com rede real ou falha de chunk de produção. Métricas de memória GPU não estavam disponíveis. São necessárias várias repetições com protocolo, distribuição e aquecimento definidos para conclusões de desempenho.

Na próxima fase, **somente após autorização**, recomendar: validar P-02 em produção; investigar P-03 com heap snapshots em produção, eliminando retenção da sonda; medir em hardware físico representativo e explorar causas do P-01 sem sacrificar anatomia, acessibilidade ou funcionalidades. Persistem validação anatômica especializada, acessibilidade com usuários reais e divergência de nomenclatura NIH/HRA documentadas anteriormente.

Arquivos criados nesta fase: seis scripts `tests/*-1228.mjs`, dados/capturas em `auditoria-piloto/fase-12-2-8/` e este documento. Nenhum arquivo da aplicação, modelo, currículo ou dependência foi modificado; nenhum commit criado. Aguardar autorização explícita para continuar.
