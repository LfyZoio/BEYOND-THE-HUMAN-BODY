# Fase 12.2.7 — Auditoria de arquitetura e estabilidade 3D

**Classificação: APROVADA COM RESSALVAS** para os cenários automatizados especificados. Duas falhas reproduzidas foram corrigidas; a estabilidade de longa duração e o comportamento em hardware físico continuam sem comprovação. Não autoriza início da 12.2.8.

## Preparação e escopo

Branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD `3797202`. No início, `src/App.tsx`, `src/components/Lab3D.tsx` e `src/index.css` estavam modificados; piloto, GLBs, documentação, testes e evidências de fases anteriores estavam não rastreados. Consultados relatórios 12.2.5 e 12.2.6 e preservado o trabalho pendente. Não houve commit, alteração de modelo ou refatoração ampla.

## Arquitetura encontrada

- `LazyLab3D` carrega `Lab3D` com `React.lazy`/`Suspense`. `Lab3D` mantém laboratório esquemático, quiz e store; o piloto é outro `lazy`, exibido somente após ação no sistema respiratório. A troca desmonta o canvas anterior, mas preserva o estado do componente `Lab3D` enquanto ele está montado. `PilotBoundary` captura erros de renderização/carregamento e apresenta retorno ao esquemático. Não é um mecanismo universal para exceções em handlers assíncronos nem substitui tratamento de perda de contexto WebGL.
- `RespiratoryPilot` usa React Three Fiber `Canvas`, luzes, `Suspense`, `useGLTF` do Drei e Three.js. Os três GLBs são buscados ao entrar no piloto, usando uma chave de cache composta pelos URLs ordenados; carregamento ocorre em paralelo via `Promise.all` do R3F. `ready` indica conclusão do componente de modelos, não validação da imagem; carregamento do módulo e dos modelos têm status separados. O teste observou ausência de requisição da traqueia até abrir o piloto, não auditou toda a rede em produção.
- `Models` encontra nós específicos por nome; um nó ausente lança erro. Clona hierarquia sem alterar geometria GLB, compartilhando geometrias de origem e clonando materiais por grupo selecionável (14 materiais únicos na cena anterior). Seleção altera emissividade, opacidade e `transparent`; `needsUpdate` só muda na troca de transparência. Isolamento controla visibilidade. `useMemo` evita reconstruir grupos a cada seleção; mudanças de estado ainda re-renderizam piloto e `Models`, não foi medida sua frequência/custo.
- O recurso de geometria permanece associado ao cache `useGLTF`; `dispose={null}` evita que o reconciliador descarte recursos compartilhados dos `primitive`s. Os materiais clonados têm descarte explícito no cleanup de efeito. A retenção de GLBs no cache é deliberada e facilita reentrada, mas aumenta memória enquanto a página permanece aberta; não é prova de vazamento. Os GLBs atuais não contêm imagens/texturas incorporadas; a contagem do renderer não deve ser confundida com conteúdo do GLB.
- `RespiratoryCamera` usa `OrbitControls`, alvo/estado inicial explícitos, reset com consumo de inércia e passos discretos de teclado; depende da API de `OrbitControls`. Raycasting do R3F percorre objetos interativos; nomes internos dos nós HRA são acoplamento aos arquivos atuais. As versões instaladas auditadas: React 19.3.1, Three 0.187.0, R3F 9.8.2, Drei 10.7.9. Nenhuma dependência foi adicionada.

## Ocorrências e correções

### A-01 — ALTA — seleção de estrutura oculta durante isolamento — corrigida nos cenários testados

**Evidência:** `tests/raycast-isolation-1227.mjs`, Chromium 1440×900: selecionar Traqueia, isolar, clicar no canvas em aproximadamente 45% da largura e altura; antes da correção o selecionado mudou para Pulmão direito, que estava oculto. `Raycaster.intersectObject` da versão instalada percorre descendentes sem filtrar `visible`; R3F aplica o raycast sobre os grupos interativos. Isso pode trocar o objeto isolado e confundir a exploração anatômica.

**Correção:** `RespiratoryPilot.tsx` mantém `visible` e remove o handler de clique dos grupos ocultos; grupos visíveis continuam interativos. Depois, a mesma varredura pontual de cliques na região central não trocou a traqueia. `pilot-reentry-1223.mjs` confirmou clique direto no modelo visível; testes de seleção/material e isolamento também passaram. Risco residual: cobertura amostral, não todas as vistas, interseções e dispositivos. Geometria, transformações e materiais originais dos GLBs não foram alterados.

### A-02 — MÉDIA — nova tentativa após falha transitória de GLB mantinha erro em cache — corrigida no cenário testado

**Evidência:** `tests/stability-1227.mjs` abortou uma requisição da traqueia; fallback apareceu. Após retorno e liberação da rede, abrir novamente produziu outra falha sem nova requisição: contador 1. A promise rejeitada de `useLoader` permanece na chave da lista completa de URLs. Isso impede recuperação na mesma sessão após falha transitória.

**Correção:** `respiratoryAssets.ts` centraliza a chave ordenada; em `Lab3D.tsx`, `componentDidCatch` limpa essa chave somente para mensagens de falha de carregamento dos URLs do piloto. Usuário retorna ao esquemático e tenta abrir novamente; o boundary é remontado. Após correção o teste registrou duas requisições e carregamento completo; o erro inicial no console é esperado pela falha induzida. Uma falha persistente continua mostrando fallback, sem loop automático. Risco: identificação depende do formato da mensagem implementado pela versão instalada do R3F; mudanças de biblioteca exigem reteste. Falhas de importação do chunk lazy, contexto WebGL perdido e erros diferentes não são cobertos por esta recuperação. Limpar a chave rejeitada não é política geral de descarte do cache bem-sucedido; outras requisições em voo numa falha parcial não foram medidas.

**Impacto no bundle:** importar `useGLTF` no boundary deslocou código compartilhado do chunk do piloto para `Lab3D`: build imediatamente antes da correção tinha Lab3D 952,41 kB e piloto 80,50 kB; após, aproximadamente 1.023,18 kB e 9,25 kB, minificados sem gzip. O laboratório continua lazy e os GLBs continuam sob demanda, mas parte do código do loader é carregada ao abrir o laboratório esquemático. Sem alegação de ganho de desempenho; recomenda-se medir produção antes de novas decisões de divisão de bundle.

## Estabilidade e ciclo de vida

`tests/lifecycle-1227.mjs` instrumenta somente respostas de módulos Vite em teste, sem alterar o código entregue. Em cada uma de cinco entradas, foram feitas três sequências das cinco seleções, isolamento/retorno, giro, aproximação, reset, limpeza e saída: 75 seleções e cinco ciclos, sem `pageerror`. As 65 geometrias identificadas tinham os mesmos UUIDs nas cinco reentradas (cache compartilhado); `renderer.info.memory` no canvas ativo registrou 65 geometrias e 1 textura em cada ciclo. Não mede a memória do processo/GPU após desmontagem, nem comprova ausência de vazamento.

A instrumentação observou 28 clones de material criados por entrada em modo de desenvolvimento com `StrictMode`, mas 14 materiais efetivamente presentes na cena; todos os materiais presentes receberam evento `dispose` após saída (70 UUIDs distintos descartados após cinco entradas). Os 14 clones adicionais por entrada não apareceram na cena amostrada nem tiveram evento de descarte registrado; criação durante renderização duplicada/abandonada é uma possibilidade, e objetos sem upload/referências podem ser coletados, mas não foi medido seu alcance/GC. O teste inicial que comparou número bruto de criações com número bruto de eventos falhou: eventos de dispose podem repetir e criações podem ser descartadas antes do commit; foi substituído por verificação por UUID dos materiais efetivamente na cena. Isso não prova que objetos descartados pelo React não acumulem, nem que toda memória GPU tenha sido liberada. Recomenda-se heap snapshots após GC controlado e teste de produção em hardware físico antes de declarar ausência de vazamentos.

Cinco ciclos automatizados são um teste de repetição limitado, não sessão prolongada; não se realizou ensaio de horas, benchmark físico ou teste de pressão de memória. Não foram instrumentados descarte do contexto WebGL, eventos de contexto perdido nem recuperação em background de celular.

## Testes de regressão

- `EXPECT_FIXED=1 LD_LIBRARY_PATH=/tmp/lib node tests/raycast-isolation-1227.mjs`: passou varredura pontual no isolamento; antes encontrou seleção invisível.
- `tests/stability-1227.mjs`: GLB não requisitado antes da entrada; falha induzida, fallback, retorno e recuperação após rede restabelecida passaram.
- `tests/lifecycle-1227.mjs`: cinco reentradas e 75 seleções, descarte observado por UUID e cache descritos acima.
- `tests/materials-1223.mjs`: cinco seleções, materiais independentes, transparência/destaque e limpeza passaram; `tests/pilot-reentry-1223.mjs`: três reentradas e clique real em malha passaram.
- `tests/real-controls-1222.mjs`: rotação, zoom, pan e reset numérico do canvas passaram; `tests/keyboard-access-1226.mjs`: teclado em 360/768/1440 passou; `tests/fallback-1222.mjs`: falha de GLB e retorno passaram. Testes usam Chromium headless `/tmp/chromium`, SwiftShader, Vite local `http://127.0.0.1:5175` e `LD_LIBRARY_PATH=/tmp/lib`; Playwright instalado no ambiente sem alteração de dependência. As capturas de teclado são geradas pelo teste existente nas pastas da fase anterior.
- `npm run build` e `npm run lint` passaram: alerta de chunk >500 kB e aviso preexistente de spread no store. `tests/inspect-respiratory.mjs` passou parsing/inspeção. Auditoria de conteúdo confirmou 90 aulas, 597 questões, 586 flashcards, IDs e SM-2/domínio 30/50/20; SSR 28/28, store/jsdom 25/25 e interações de avaliação/flashcards passaram com config JSX temporária e perfis isolados. Isso cobre os cenários dos testes, não todas as combinações possíveis.

## Modelos, preservação e riscos futuros

Os três GLBs mantêm SHA-256 anteriores: pulmão `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab`, traqueia `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae`, brônquios `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa`. Inspeção: 224.765 + 44.042 + 6.023 = 274.830 triângulos; sem alteração de geometrias ou modelos. Não foram modificados currículo, store, persistência, XP, conquistas, avaliações ou JSON.

Riscos futuros: cache de GLB deliberadamente retido; clones criados em renderização sob StrictMode e cleanup/GC requerem medição mais profunda; custo de 274.830 triângulos e bundle grande em aparelhos modestos; dependência de nomes dos nós e do formato de erro do R3F; recuperação de WebGL/contexto e falha de chunk não verificadas; falta de estudo de acessibilidade com pessoas, continuidade anatômica por especialista e resolução da divergência NIH/HRA já documentadas. Recomenda-se testar builds de produção, perfis de memória/GC e sessões longas em dispositivos reais, sem descarte de cache ou otimização especulativos que quebrem geometria compartilhada.

## Arquivos desta fase

Modificados nesta fase: `src/components/RespiratoryPilot.tsx`, `src/components/Lab3D.tsx`. Criados: `src/components/respiratoryAssets.ts`, `tests/raycast-isolation-1227.mjs`, `tests/stability-1227.mjs`, `tests/lifecycle-1227.mjs` e este relatório. Outras alterações no Git pertenciam a trabalho anterior e foram preservadas. A execução do teste de teclado regenerou suas capturas anteriores; não foi realizado commit. Aguardar autorização explícita para a próxima fase.
