# Fase 12.2.1 — Auditoria do piloto respiratório

**Situação: não aprovada para expansão.** Piloto continua experimental. Há evidência técnica adicional, mas não há validação anatômica especializada, nem desempenho em GPU/dispositivos físicos. Nenhum commit. Escopo limitado ao piloto; laboratório esquemático e dados educacionais permanecem.

## Câmera

O construtor de OrbitControls salva seu alvo antes da aplicação do prop `target`; além disso `reset()` chama `update()` sem descartar primeiro a inércia de damping. O componente agora salva o estado após aplicar alvo e atualizar a câmera. Ao restaurar, desliga temporariamente damping e executa update para consumir deltas de rotação/pan, chama reset e restaura o damping. Não muda as malhas. Isso corrige causas plausíveis da divergência de pixels anterior; essa comparação, isoladamente, não demonstrava a causa.

Teste `tests/camera-browser.mjs` usa Chromium/WebGL e um harness com o **mesmo componente e configuração** da aplicação: rotação, roda e pan, reset imediatamente após interação; comparação numérica após 100 ms e 1 s, tolerância 1e-6. Estado inicial e final: posição aproximadamente `[0.46, 0.8, 0.9]`, quaternion `[-0.1309707792, 0.2319234568, 0.0315304468, 0.9633607819]`, alvo `[0, 0.52, 0]`, distância `1.0488088482`, zoom `1`, damping ligado. Passou; estado modificado antes do reset foi verificado. Zoom da câmera perspectiva permaneceu 1: roda altera distância, não `camera.zoom`. Não cobre reset durante gesto ativo, eventos touch reais ou condições de perda de contexto. O botão do piloto foi acionado em cinco larguras; o teste numérico observa o componente compartilhado no harness, não instrumenta diretamente o canvas do piloto.

## Anatomia — revisão preliminar, não certificação

Referências de comparação: [OpenStax, Anatomy and Physiology 2e, 22.2](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs) descreve pulmões pareados, três lobos direitos e dois esquerdos; [artigo no PMC sobre anatomia brônquica](https://pmc.ncbi.nlm.nih.gov/articles/PMC5696545/) descreve a bifurcação traqueal, orientação mais vertical do brônquio direito e relação hilar. Não são validações dos arquivos.

- **Pulmões:** captura frontal `auditoria-piloto/piloto-1440.png` mostra duas massas pulmonares, fissuras visíveis e traqueia superior central; a imagem é pequena e a ocultação impede confirmar todos os lobos, lados, hilos ou anatomia interna. Caixa mede aproximadamente 0,259 × 0,229 × 0,190 unidades; unidades físicas não confirmadas.
- **Traqueia:** forma alongada com anéis visíveis na captura e centro superior ao centro pulmonar; caixa mede aproximadamente 0,032 × 0,126 × 0,067. A captura não permite confirmar relação anterior/posterior ou continuidade do lúmen.
- **Brônquios principais:** arquivo separado, nomes das malhas indicam lados; caixa aproximadamente 0,075 × 0,044 × 0,028, próxima à extremidade inferior traqueal. As vias estão em grande parte ocultas na vista composta; direção relativa, conexão com os hilos e diferenças direita/esquerda não estão visualmente verificadas.
- **Escala, orientação e encaixe:** coordenadas no mesmo referencial sem transformações individuais; caixas se sobrepõem na região traqueobrônquica. Caixas não medem contato de superfícies: não provam continuidade, ausência de lacunas, interpenetrações ou escala correta. Não há landmarks, medidas físicas, inspeção multiplanar de junções nem revisão especializada. Os modelos de traqueia/brônquios são descritos como separados de pulmão v1.2 enquanto o pulmão é v1.3; compatibilidade precisa de revisão. Não foram deformados ou reposicionados para esconder incompatibilidade. Capturas e medições das caixas estão no relatório 12.2; a validação detalhada continua pendente.

## Licença e identidade, por objeto

Os três arquivos distribuídos são os HRA obtidos do repositório oficial com [licença CC BY 4.0](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/blob/f1a3a63f110e27ff0736047d52d04dba5d3087f9/LICENSE), que permite redistribuição e adaptação mediante atribuição, link da licença e indicação de mudanças. Crédito no piloto: Kristen Browne e Heidi Schlehlein, HRA/HuBMAP, Visible Human Male/NLM; links dos DOIs, licença e indicação de adaptação de agrupamento/visualização. Não é parecer jurídico. A evidência de identidade é Git blob igual entre os arquivos do pacote HRA e as referências individuais `hra-kg`, não uma comparação binária com NIH.

| Arquivo | Registro oficial individual e versão | Página NIH correspondente | Observação |
|---|---|---|---|
| `lung.glb` | [HRA pulmão v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/), Browne e Schlehlein, CC BY 4.0 | [3DPX-021008](https://3d.nih.gov/entries/3DPX-021008) | [Download NIH](https://3d.nih.gov/entries/download/21008/2) intitulado masculino apresenta `3d-vh-f-lung.glb`. Causa desconhecida; nome não estabelece identidade do espécime. Arquivo NIH não foi baixado e não foi comparado; usa-se cópia HRA masculina, não a NIH. |
| `trachea.glb` | [HRA traqueia v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/), mesmas criadoras, CC BY 4.0 | [3DPX-021021](https://3d.nih.gov/entries/3DPX-021021) | [Download NIH](https://3d.nih.gov/entries/download/21021/2) nomeia `3d-vh-m-trachea.glb`; identidade binária NIH não verificada. |
| `main-bronchus.glb` | [HRA brônquios v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/), mesmas criadoras, CC BY 4.0 | [3DPX-021010](https://3d.nih.gov/entries/3DPX-021010) | [Download NIH](https://3d.nih.gov/entries/download/21010/2) nomeia `3d-vh-m-main-bronchus.glb`; identidade binária NIH não verificada. |

Hashes SHA-256, Git blob IDs, descrição da origem e links das cópias específicas estão no [registro 12.2](fase-12-2-piloto-respiratorio.md). Páginas NIH e HRA identificam CC BY 4.0 individualmente. Não se conclui que nomes de arquivo comprovem equivalência nem se atribui uma explicação à inconsistência; esclarecimento do NIH continua recomendado.

## Navegador e desempenho disponível

`tests/audit-respiratory-browser.mjs`, Vite local e Chromium headless usando SwiftShader: nas cinco larguras a lista selecionou as cinco estruturas, painel e etiqueta DOM apareceram, isolamento/retorno, limpar seleção, rotação, roda, botão reset, retorno ao laboratório e uma resposta ao quiz foram exercitados; não houve overflow horizontal ou `pageerror`. O teste verificou lazy loading dos três GLBs; rotação e roda foram exercitadas, mas a mudança visual por screenshot foi verificada anteriormente apenas em 360 e 1440. Toque físico, oclusão legível das etiquetas e comparação numérica do canvas do piloto em cada largura não foram testados.

| viewport | abertura até status de carga desaparecer (ms) | clique automatizado até painel (ms) | RAF em repouso (FPS) | JS heap reportado (bytes) |
|---|---:|---:|---:|---:|
| 360×800 | 880 | 325 | 3 | 116.000.000 |
| 390×844 | 1373 | 581 | 4 | 131.000.000 |
| 768×1024 | 819 | 580 | 3 | 116.000.000 |
| 1024×768 | 1244 | 479 | 3 | 109.000.000 |
| 1440×900 | 1102 | 553 | 5 | 123.000.000 |

Medições únicas, navegador sob automação e renderização por CPU, sem controle de carga; tempo de clique inclui automação/agendamento e o de abertura inclui rede local, montagem e status, não quadro útil validado. RAF em repouso **não é FPS em rotação**. `performance.memory` é estimativa Chromium do heap JS da página, não memória total nem GPU. Sem rede móvel, CPU limitada simulada formalmente, FPS durante rotação, desktop físico ou celular físico; não extrapolar esses números. Total GLB 12.548.080 bytes, 274.830 triângulos, alerta de chunks >500 kB. Performance em hardware limitado permanece risco aberto.

## Regressões e reprodução

- `npm run build` passou; `npm run lint` passou com um aviso preexistente em `src/store.tsx`.
- `node tests/inspect-respiratory.mjs` passou com hashes, parsing e estatísticas registrados na 12.2.
- SSR 28/28, store/jsdom 25/25, auditoria 90 aulas/597 questões/586 cartões, IDs, SM-2 e domínio 30/50/20, e interações jsdom passaram. `tsx` precisou de configuração temporária `{"compilerOptions":{"jsx":"react-jsx","module":"esnext","moduleResolution":"bundler"}}`; executado com `npx tsx --tsconfig <arquivo> tests/<teste>.tsx`.
- Teste de falha deliberada de GLB, clique direto na malha e comparação de localStorage são evidências da 12.2, não repetidas nesta rodada. O quiz esquemático foi respondido nas cinco larguras nesta rodada. Não houve alteração intencional de dados curriculares ou persistência, mas isso não equivale a teste exaustivo de todas as jornadas.
- Para os testes de browser, iniciar Vite, instalar `playwright-core` e Chromium apropriado, definir `CHROMIUM_PATH` e `TEST_BASE_URL`; ambiente desta execução usou `/tmp/chromium`, `LD_LIBRARY_PATH=/tmp/lib` e porta 5174. Esses binários temporários não integram o projeto.

## Pendências para aprovação

1. Anatomista inspecionar frente, trás, laterais, isolamentos e junções ampliadas; registrar lados, landmarks, escala, separações/interseções e continuidade, inclusive eventual incompatibilidade entre versões, sem deformar anatomia.
2. Testar reset com gestos reais e diretamente no canvas do piloto, incluindo interação ativa e estabilidade ao longo de frames; cobrir resposta visual de rotação/zoom em todas as larguras.
3. Medir tempo até quadro útil, FPS durante rotação, memória disponível, latência e comportamento com recursos limitados em desktop e celular físicos, com hardware, navegador e rede documentados.
4. Manter ressalva sobre a divergência NIH e, se necessário, pedir esclarecimento ao responsável; confirmar atribuição e procedência para a distribuição pretendida. Não ampliar a outros sistemas antes da revisão dos resultados.
