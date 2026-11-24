# Fase 12.2.3 — Diagnóstico e otimização controlada

Data 21/11/2026; branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD local `3797202`. As alterações das fases anteriores estavam sem commit. Este trabalho não integra outros sistemas e não faz commit. Histórico preservado: [12.1](fase-12-1-curadoria-3d.md), [12.2](fase-12-2-piloto-respiratorio.md), [12.2.1](fase-12-2-1-auditoria.md), [12.2.2](fase-12-2-2-validacao-final-respiratorio.md). O [plano antes da intervenção](fase-12-2-3-plano.md) registra hipótese, risco e licença.

## 1. Decisão

**Recomendação técnica: necessita de validação externa.** Uma otimização conservadora reduziu materiais instanciados, mas não demonstrou melhoria de FPS ou redução de draw calls; faltam testes em GPU e dispositivos reais e metas acordadas de desempenho. **Avaliação anatômica: inconclusiva**, sem parecer especializado. Não aprovar expansão. Os resultados de 4,5/4,7 callbacks RAF/s da 12.2.2 eram de SwiftShader e não representam FPS em hardware físico.

## 2. Diagnóstico dos potenciais gargalos

Instrumentação temporária na resposta Vite do componente real expõe `renderer.info` e percorre a cena; não altera arquivos de produção. Cenário completo sem seleção, 1440×900, pixel ratio 1: **65 malhas, 65 draw calls, 274.830 triângulos, 65 geometrias, 2 programas WebGL e 65 materiais únicos** antes da mudança. Selecionar o brônquio mantém 65 calls/triângulos e mostra 4 programas compilados acumulados. Isolá-lo mostra 2 calls e 1.509 triângulos; geometrias mantidas em cache. São contadores de renderização, não medições de tempo de GPU/CPU nem de vazamento.

- **Triângulos/draw calls:** quantidade relevante; hipótese de custo de rasterização e submissão, não medição de contribuição individual. Juntar malhas pode afetar seleção, material e ordenação transparente; não aplicado.
- **Materiais/shaders:** clones originais por malha e `needsUpdate` incondicional a cada seleção geravam trabalho redundante. Os shaders PBR `MeshStandardMaterial` usam luz ambiente e uma direcional; número de programas não mede complexidade nem tempo de shader. Medição após abaixo. O cache interno de programas varia com estados; 4 é contagem acumulada nessa sessão, não shaders executados por frame.
- **Texturas/sombras:** GLBs não declaram imagens/texturas; `renderer.info.memory.textures` relata 1 textura interna, sem atribuição verificada. Sombras desativadas, portanto não há shadow maps a eliminar. Não trocar iluminação ou materiais PBR sem avaliação visual.
- **Transparência:** ao selecionar, outras estruturas ficam em opacidade 0,25; aumenta trabalho de blending/ordenação e pode alterar percepção espacial. Sem isolamento experimental de seu custo não é possível atribuir o baixo RAF somente a isso. Isolamento diminui chamadas renderizadas, mas não reduz automaticamente cache ou custo de carregamento.
- **Raycasting e React:** há cinco grupos selecionáveis que contêm 65 malhas. Seleção/ponteiro podem disparar interseções e atualizações; não houve perfil de tempo por raycast nem contagem de renders React, logo não há conclusão sobre seu peso. O controle com damping atualiza em frames; nenhum comportamento global foi alterado.
- **Renderizador/ambiente:** Chromium 153 headless, WebGL SwiftShader, Vite dev, 2 CPUs virtuais Intel Xeon 2.60 GHz. SwiftShader roda em software: execução de rasterização e shaders usa CPU do ambiente, e a automação/coagendamento pode afetar RAF. Não há medição confiável de GPU física, tempo de CPU individual ou separação causal entre draw calls, triângulos, transparência e sistema.

## 3. Intervenções isoladas

### Reutilização de materiais

Em `RespiratoryPilot.tsx`, cada grupo selecionável mantém um mapa próprio de clones por material original, em vez de um clone por malha. Não compartilha clones entre estruturas; `dispose` ocorre uma vez por clone. Mudança de `transparent` só marca `needsUpdate` quando o valor muda; opacidade e emissividade continuam atualizadas por seleção. **Esperado:** menos objetos e trabalho repetido; não se esperava necessariamente menos chamadas nem triângulos. **Riscos:** mistura de destaque/opacity entre estruturas e alteração visual; testes verificaram independência dos materiais entre os cinco grupos, emissividade, transparência, retorno, isolamento e três remontagens. Não se mede vazamento em uso prolongado. Nenhuma alteração no arquivo, na geometria ou nos materiais da fonte; alterações de visualização são explicitadas nos créditos. A licença individual CC BY 4.0 permite adaptação sob atribuição; conferir revisão jurídica para distribuição. Reversão: a cópia de comparação `tests/fixtures/respiratory-pilot-12-2-2.tsx.txt` foi reconstruída a partir da versão anterior lida e das alterações aplicadas (não havia commit); pode ser comparada com o componente atual antes de restaurá-la. Os GLBs não dependem da otimização.

### Etiqueta

A etiqueta sobreposta ao centro da malha foi substituída por uma identificação textual dedicada **abaixo e fora do canvas**, com `aria-live` e botão Ocultar/Mostrar; o destaque e o painel permanecem. Isso evita que uma caixa oculte a peça pequena; não há agora ligação espacial direta por linha ou marcador. Apenas uma seleção existe por vez, portanto não há múltiplas etiquetas simultâneas. A seleção por malha/lista continua. Tela pequena foi verificada por DOM/layout em viewport headless, não em hardware ou leitor de tela físico. A etiqueta não é prova de que a estrutura esteja correta; para análise da junção veja o dossiê.

### Alternativas não aplicadas

- Redução/união de malhas ou geometria: exige preservar fronteiras de seleção, materiais, transparência, normas e revisão anatômica. Sem alteração agora.
- Luz, sombras, shaders ou pixel ratio: sombras já desligadas; reduzir qualidade visual sem benchmarking físico não é justificado. Luz original preservada.
- Texturas: não há imagens nos GLB; conversão de texturas não reduz esses arquivos.
- Draco/Meshopt: podem reduzir transferência, mas exigem decodificador, CPU, teste de fidelidade, compatibilidade de loader/licença e comparação de tempo até primeiro quadro; nenhum teste de conversão controlado com revisão de malhas foi realizado. Nenhum benefício foi comprovado, não adicionar dependência nem substituir recursos.

## 4. Comparação antes/depois

Uma execução por condição, separadas no tempo, mesmo computador virtual, Chromium 153, SwiftShader, viewport 1440×900 e Vite local. `tests/profile-1223.mjs` usa RAF enquanto mouse é movido em etapas com pausas, e depois roda alternada; durações e carga do sistema diferem. `renderer.info.render` reporta último frame, programas e memória são contadores do renderer, heap é aproximação Chromium da página, não GPU. [Dados antes](../auditoria-piloto/fase-12-2-3/antes-metricas.json), [dados depois](../auditoria-piloto/fase-12-2-3/depois-metricas.json). Os valores não são FPS apresentados na tela e não sustentam inferência estatística.

| Indicador | Antes | Depois |
|---|---:|---:|
| Tempo até networkidle da página local | 1.037 ms | 971 ms |
| Clique até indicador de modelos oculto | 1.582 ms | 1.349 ms |
| RAF/s durante arrastos | 3,69 | 3,06 |
| RAF/s durante rodas | 5,49 | 6,55 |
| Draw calls / triângulos completos | 65 / 274.830 | 65 / 274.830 |
| Materiais únicos visíveis completos | 65 | 14 |
| Geometrias / texturas reportadas | 65 / 1 | 65 / 1 |
| Programas WebGL após seleção | 4 | 4 |
| Isolamento brônquio: draw calls / triângulos | 2 / 1.509 | 2 / 1.509 |
| Heap JS aproximado no perfil completo | 116.000.000 bytes | 116.000.000 bytes |
| GLBs codificados localmente | 12.548.080 bytes | 12.548.080 bytes |

**Interpretação:** 65→14 é contagem observada, não redução medida de consumo de memória ou de chamadas. Tempos isolados variam e status oculto não é primeiro quadro útil; RAF oscilou em ambas as direções e **não comprova ganho**. A mudança não resolveu o risco principal de fluidez; 12,55 MB e 274.830 triângulos ainda superam as metas exploratórias da 12.1. Sem medidas de GPU, hardware físico, rede móvel, distribuição estatística ou consumo de energia. Não declarar desempenho adequado em aparelhos limitados.

[Captura anterior](../auditoria-piloto/fase-12-2-3/antes-selecionado.png) e [posterior](../auditoria-piloto/fase-12-2-3/depois-selecionado.png) mostram o brônquio selecionado e a etiqueta antes/depois. Visualmente o destaque e transparência continuam, e a caixa não cobre mais a peça. Isso não é teste pixel a pixel ou validação anatômica; enquadramento pequeno ainda dificulta identificação.

## 5. Preparação de avaliação anatômica

O [dossiê de avaliação especializada](fase-12-2-3-avaliacao-anatomica.md) reúne as seis vistas solicitadas, mais duas vistas de junções, legendas, hipóteses de eixos e checklist. Fontes: [OpenStax, Anatomia e Fisiologia 22.2](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs) e [Ryan et al., 2017, DOI 10.21037/jtd.2017.08.116](https://pmc.ncbi.nlm.nih.gov/articles/PMC5696545/). Pulmões assimétricos, anéis e ramificações são observáveis; isso não comprova os lobos, lateralidade, continuidade ou dimensões. Transparência pode ocultar ou criar aparência de interseções. Traqueia/brônquios HRA v1.0 derivam de pulmão v1.2, enquanto pulmão é v1.3: compatibilidade precisa de revisão. Sem avaliação especializada, **sem aprovação anatômica**.

## 6. NIH/HRA, licenças e hashes

Consulta novamente realizada: [NIH 3DPX-021008](https://3d.nih.gov/entries/3DPX-021008) descreve Lung Male, Visible Human Male, objeto HRA v1.3; páginas [download 1](https://3d.nih.gov/entries/download/21008/1) e [download 2](https://3d.nih.gov/entries/download/21008/2) mostram `3d-vh-f-lung.glb`, apesar do título masculino. As submissões/processamentos são diferentes (26484 e 43519); não se sabe se o nome é erro, se os binários são iguais, ou que espécime contém o arquivo NIH. O [objeto HRA v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/) identifica DOI `10.48539/HBM737.FFBT.876`, publicado em 2023-06-15, criadoras Kristen Browne e Heidi Schlehlein, CC BY 4.0; [metadata HRA](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/lung-male/v1.3/raw/metadata.yaml) lista `3d-vh-m-lung.glb`. Histórico do repositório oficial: adição `216dc8e6837012966bba13997e16cdbfe31cb65e` em 2023-06-08 e atualizações `69349645f228d1f8cc4b31ce4bbecc40cb2fced1` e `f7f852635701dbe7bab837c6fee391d75800d58f` em 11 e 12/06. Isso não prova conteúdo NIH.

| GLB local | Blob HRA conferido | SHA-256 |
|---|---|---|
| Pulmão | `dbbfdaf4cc51ea7d75cb0887b8fa003b8da9c00a` | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` |
| Traqueia | `06ebbd9354ff122ad38fffece39b7768e8f8475d` | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` |
| Brônquios | `7f9e7c6e981ef044f848844afb914f0b206c2a3d` | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` |

Identidade entre cópias HRA foi verificada por blobs (e hashes locais), não com arquivos NIH; download direto NIH não estava disponível neste ambiente. Diferença afeta rastreabilidade do NIH, não prova que a cópia HRA usada é a de outro objeto. As três fontes individuais e créditos CC BY 4.0 constam na [12.2.2](fase-12-2-2-validacao-final-respiratorio.md); créditos, versões, DOIs e indicação de adaptação de visualização permanecem no piloto. Não é parecer jurídico.

## 7. Testes e regressão

- `npm run build`: passou, com alerta de chunks >500 kB. `npm run lint`: 0 erros, 1 aviso preexistente no store. `tests/inspect-respiratory.mjs`: hashes e contagens originais passaram.
- SSR 28/28, store/jsdom 25/25; 90 aulas, 597 questões e 586 cartões, IDs, SM-2 e domínio 30/50/20; testes jsdom de avaliação e flashcards passaram. Sem alterações no currículo ou armazenamento.
- `tests/materials-1223.mjs`: cinco seleções; materiais não compartilhados entre estruturas, opacidade e emissividade corretas e restauração após limpar. `tests/pilot-reentry-1223.mjs`: três entradas, clique direto na geometria e retorno ao esquema sem `pageerror`.
- `tests/real-controls-1222.mjs`: rotacionar horizontal e verticalmente, roda, pan e reset numérico no canvas real com 5 amostras e tolerância 1e-6 passaram. `tests/fallback-1222.mjs`: bloqueio da traqueia, aviso e retorno ao esquema passaram.
- `tests/audit-respiratory-browser.mjs`: em 360/390/768/1024/1440 px, seleção pela lista, painel, etiqueta fora do canvas, ocultar/mostrar, isolar/mostrar todas, giro/roda, botão reset, lazy load, quiz do esquema e ausência de overflow/pageerror passaram. Após mudança de etiqueta, primeira execução do teste falhou porque o seletor ainda procurava no contêiner antigo; foi ajustado ao novo local e a execução completa passou. A execução não prova legibilidade física nem mudanças de pixels em cada largura.
- Os scripts Playwright exigem `playwright-core` e Chromium externos, `TEST_BASE_URL` e `CHROMIUM_PATH`; aqui `/tmp/chromium`, `LD_LIBRARY_PATH=/tmp/lib`, porta 5175. Não foram adicionadas dependências. SSR/jsdom usam `npx tsx` com tsconfig temporário JSX automático conforme 12.2.2. Testes em hardware físico não ocorreram.

## 8. Pendências e fronteiras

Revisão anatômica independente das vistas e junções; validação de eixos, escala e origem NIH; teste com usuários e dispositivos físicos (gestos, acessibilidade e fluidez); perfil repetido de CPU/GPU, raycasting, render, memória e rede em build de produção; decisão baseada em dados antes de compressão ou otimização geométrica. O esquema e fallback permanecem; não se conclui ausência de vazamentos em uso prolongado. Nenhum commit ou início de nova fase.
