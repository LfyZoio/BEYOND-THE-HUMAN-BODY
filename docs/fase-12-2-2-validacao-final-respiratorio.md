# Fase 12.2.2 — Validação do piloto respiratório

Data: 21 de novembro de 2026. Branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD local `3797202`. As alterações anteriores das Fases 12.2/12.2.1 estavam sem commit; foram preservadas. Relatórios históricos: [12.1](fase-12-1-curadoria-3d.md), [12.2](fase-12-2-piloto-respiratorio.md), [12.2.1](fase-12-2-1-auditoria.md).

## 1. Resumo e recomendação

**Não aprovar ainda como referência validada nem autorizar expansão.** O piloto é utilizável experimentalmente e os controles passaram nos cenários automatizados do canvas real. Há evidências visuais de organização geral, mas encaixe de vias aéreas, lateralidade, escala física e fidelidade científica continuam inconclusivos sem revisão especializada. O custo no ambiente de software foi alto; não há dados de dispositivos físicos. O laboratório esquemático continua sendo padrão e fallback. Nenhuma geometria, conteúdo curricular ou funcionalidade de produção foi modificada nesta fase; nenhum commit.

## 2. Referências anatômicas

- [OpenStax, Anatomy and Physiology 2e, 22.2](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs): pulmões pareados, três lobos à direita e dois à esquerda, fissuras e incisura cardíaca.
- [Ryan et al., Anatomical considerations in bronchoscopy, 2017, Journal of Thoracic Disease, doi:10.21037/jtd.2017.08.116](https://pmc.ncbi.nlm.nih.gov/articles/PMC5696545/): anéis traqueais, carina, brônquio principal direito tipicamente mais vertical e relações hilares. Inclusão no PMC não implica endosso NIH.
- Metadados dos objetos HRA e NIH indicados na seção 8 descrevem origem e componentes; aprovação de um objeto de referência não é aprovação desta composição ou da representação da variabilidade humana.

## 3. Análise visual e 4. Coerência anatômica

Foram observadas capturas do **canvas do piloto real**, com Chromium headless e WebGL SwiftShader, usando posições de câmera de teste; as malhas não foram transformadas. Eixos anterior/posterior são interpretações aproximadas das vistas +Z/−Z, não orientação certificada. Evidências: [vista +Z](../auditoria-piloto/fase-12-2-2/frente-aproximada.png), [vista −Z](../auditoria-piloto/fase-12-2-2/posterior-aproximada.png), [vista lateral +X](../auditoria-piloto/fase-12-2-2/lateral-aproximada.png), [brônquio destacado em contexto](../auditoria-piloto/fase-12-2-2/bronquio-em-contexto.png), [brônquio direito isolado](../auditoria-piloto/fase-12-2-2/bronquio-direito-isolado.png), [traqueia isolada](../auditoria-piloto/fase-12-2-2/traqueia-isolada.png). Na captura dos isolados somente, a etiqueta foi ocultada por CSS de teste para inspecionar a malha; na traqueia o topo está cortado pelo enquadramento. A vista em contexto usa a transparência normal de seleção e sua etiqueta está visível.

| Critério | Observação | Limite |
|---|---|---|
| Pulmões | Duas massas assimétricas, fissuras e separação central visíveis; vista lateral mostra fissura oblíqua. Superfícies rosadas brilhantes mostram facetas e transições de luminosidade. | Não foi possível verificar independentemente todos os lobos, lateralidade, volume, fissuras completas ou limites no hilo; materiais e iluminação não são tecido real. |
| Traqueia | Estrutura central superior em relação aos pulmões, com relevo de anéis e uma extremidade inferior próxima da divisão. | Sem cortes ou vista da parede posterior, não se verifica o lúmen, continuidade ou os anéis em C; renderização isolada cortou o topo. |
| Brônquios | Em contexto transparente visualizam-se ramificações intrapulmonares e peças centrais; uma peça curta isolada tem terminação abrupta e relevo. | Etiqueta sobrepõe o alvo pequeno; junções, direções e lateralidade não estão verificadas. Ramificações pertencem ao grupo pulmonar, não necessariamente ao arquivo dos brônquios principais. |
| Relações e escala | Mesmas coordenadas, sem transformação individual; os intervalos das caixas se sobrepõem. Dimensões e detalhes de malhas constam na 12.2. | Sobreposição de caixas não demonstra contato nem ausência de interpenetração; não foram medidas distâncias de superfície ou escala física. Compatibilidade entre pulmão v1.3 e componentes separados de pulmão v1.2 não está comprovada. |
| Regiões ausentes | Laringe não é fornecida como estrutura própria; o modelo não inclui esôfago, coração, diafragma ou pleura para verificar relações descritas no painel. O próprio HRA descreve remoção das vias centrais do pulmão v1.3. | Ausência de objetos vizinhos limita a demonstração de relações, não prova erro da malha. Não inferir estruturas microscópicas ou extensão completa das vias pela captura. |

**Fidelidade visual:** forma geral e materiais renderizam, mas há ocultação, objeto pequeno na câmera inicial e sobreposição da etiqueta. **Coerência anatômica:** alguns aspectos são compatíveis com referências, sem prova de correspondência estrutural individual ou encaixe correto. **Precisão científica comprovada:** não demonstrada. Análise não é revisão de especialista nem avaliação clínica; degenerações e sinais de normais na 12.2 ainda precisam de avaliação dirigida. Nenhuma anatomia foi deformada para esconder incompatibilidades.

## 5. Controles no canvas real

`tests/real-controls-1222.mjs` e `tests/real-canvas-1222.mjs` abrem a aplicação e o piloto real. No teste, a resposta Vite do componente de câmera é instrumentada em trânsito para expor a instância real de OrbitControls; nenhuma mudança da lógica de controle ou arquivo de produção. Há uma verificação de que a instrumentação foi aplicada. Usam entrada do mouse e botão real da interface, não o harness da 12.2.1.

- Estado inicial capturado: posição `[0.46,0.8,0.9]`, quaternion aproximadamente `[-0.1309707792,0.2319234568,0.0315304468,0.9633607819]`, alvo `[0,0.52,0]`, distância `1.0488088482`, zoom `1`.
- Arrastos horizontais e verticais separadamente alteraram a posição; roda alterou distância `1.0488088482 → 0.9963684058`; pan alterou alvo. Na perspectiva, roda não altera propriedade `camera.zoom`.
- Reset pelo botão: posição, quaternion, alvo, distância e zoom voltaram ao estado efetivamente observado, tolerância absoluta `1e-6`, com cinco amostras de 250 ms após o reset; não houve deriva significativa observada. Outro teste executou três sequências de rotação, zoom, pan, seleção, isolamento, mostrar todas e reset, comparando após 120 ms e 800 ms; damping permaneceu ligado. Diferenças numéricas de ponto flutuante não são igualdade bit a bit.
- Não se testou reset durante ponteiro ainda pressionado, cancelamento/perda de foco, context loss ou gestos físicos. Testes foram em 1440 px; não se generaliza o resultado numérico a todos os dispositivos. Não é garantia de todos os estados internos privados do controle.

## 6. Dispositivos físicos

Não há desktop/notebook com GPU física nem smartphone Android ou aparelho de tela pequena acessíveis para teste interativo nesta execução. Viewport 360 px e SwiftShader **não são** teste físico. Toque de um dedo, pinça, seleção por toque, rolagem e competição de gestos, legibilidade real e GPU continuam pendentes de validação externa em aparelhos identificados.

## 7. Desempenho

Uma execução, Chromium headless **153.0.8010.0**, SwiftShader/CPU, Vite desenvolvimento e rede local, viewport 1440×900, sandbox com 2 CPUs virtuais Intel Xeon 2.60 GHz. Arquivo [metricas.json](../auditoria-piloto/fase-12-2-2/metricas.json) contém os dados brutos e estados das três sequências. Não é benchmark de produção; variabilidade, automação, concorrência, Vite e software rendering impedem extrapolar para GPU ou celular.

| Medida | Resultado |
|---|---:|
| Navegação inicial até `networkidle` | 1.073 ms |
| Clique de abertura do piloto até indicador de carga oculto | 1.445 ms |
| Recursos GLB individuais: pulmão / traqueia / brônquios | 236,6 / 104,0 / 81,9 ms, requisições potencialmente paralelas |
| Bytes codificados GLBs, sem compressão nessa resposta local | 10.941.068 + 1.184.804 + 422.208 = **12.548.080 bytes** |
| Transferência GLBs reportada, incluindo overhead reportado | 12.548.980 bytes |
| RAF médio durante arrastos / rodas, esquema | 35,9 / 101,1 callbacks por segundo |
| RAF médio durante arrastos / rodas, piloto | 4,5 / 4,7 callbacks por segundo |
| Heap JS reportado após interações | ~103.000.000 bytes, valor aproximado Chromium para página inteira |

FPS foi calculado como `(callbacks RAF − 1) / intervalo entre primeiro e último callback` durante movimentos de mouse intercalados por esperas de 100 ms, e zoom alternado com roda. São callbacks de animação da página, não tempos GPU nem prova de quadros apresentados; número de eventos, duração e sincronização diferiram entre cenas; comparações são indicativas, sem repetição estatística. Zoom do piloto durou ~15 s e rotação ~5,7 s devido ao agendamento, versus ~1,8 e ~2,3 s no esquema. Os tempos de rede local não representam download móvel; o status oculto não garante primeiro quadro útil. O total indicado acima refere-se somente aos GLBs, não todos os JS/CSS da página. Build: entrada 940,05 kB, chunk laboratório 952,42 kB, chunk piloto 79,00 kB antes de gzip; não somar indiscriminadamente como bytes transferidos em todas as rotas.

Os **274.830 triângulos e 12,55 MB** excedem as metas exploratórias da 12.1 (200 mil e 5 MB por cena). Com baixa fluidez no ambiente por software, custo não é comprovadamente aceitável para mobile educacional. Sem medição de memória GPU, consumo GPU, primeira imagem útil, conexão móvel, CPU deliberadamente limitada ou hardware-alvo. Não se aplicou Draco/Meshopt ou redução geométrica; faltam comparação com custos de decoder e inspeção anatômica antes/depois.

## 8. NIH/HRA, identidade e licenças

[NIH 3DPX-021008](https://3d.nih.gov/entries/3DPX-021008) identifica Lung, Male, objeto HRA v1.3 e Visible Human Male; a página exibe **Version 2**. Porém os downloads [versão 1](https://3d.nih.gov/entries/download/21008/1) e [versão 2](https://3d.nih.gov/entries/download/21008/2) ambos nomeiam a entrada `3d-vh-f-lung.glb`; os IDs de submissão/processamento são diferentes. A página principal apresenta também o rótulo `hra-reference-organ-lung-male-v1.3.glb`. Esses nomes não explicam a divergência e não determinam identidade do espécime. Datas exibidas pelo NIH para a página consultada: criado 3/6/24, submetido e publicado 10/8/26; não presumir formato regional da data. O [registro HRA v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/) informa publicação em 2023-06-15. Histórico Git do [arquivo no pacote HRA](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/commits/f1a3a63f110e27ff0736047d52d04dba5d3087f9/VH_Male/v1.4/3d-vh-m-lung.glb) mostra adição em 2023-06-08 e atualizações em 11 e 12 de junho; isso não esclarece o NIH.

O [metadata HRA](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/lung-male/v1.3/raw/metadata.yaml) lista explicitamente `3d-vh-m-lung.glb`; o blob Git do arquivo local `dbbfdaf4cc51ea7d75cb0887b8fa003b8da9c00a` corresponde ao arquivo HRA e seu SHA-256 é `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab`. O download NIH não foi obtido ou hasheado: o acesso direto do sandbox falhou e o conteúdo da página não fornece hash. Portanto **não há equivalência binária NIH/HRA demonstrada**. A rastreabilidade das cópias HRA usadas é independente; referências ao NIH descrevem objeto alegadamente correspondente, não comprovam a identidade de seu arquivo de entrada. Recomenda-se solicitar esclarecimento ao HRA/NIH.

| Arquivo usado | Identidade e fontes | Git blob / SHA-256 |
|---|---|---|
| Pulmão | [HRA v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/), [NIH 3DPX-021008](https://3d.nih.gov/entries/3DPX-021008) | `dbbfdaf4cc51ea7d75cb0887b8fa003b8da9c00a` / `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` |
| Traqueia | [HRA v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/), [NIH 3DPX-021021](https://3d.nih.gov/entries/3DPX-021021) | `06ebbd9354ff122ad38fffece39b7768e8f8475d` / `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` |
| Brônquios | [HRA v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/), [NIH 3DPX-021010](https://3d.nih.gov/entries/3DPX-021010) | `7f9e7c6e981ef044f848844afb914f0b206c2a3d` / `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` |

Todos os três registros HRA e NIH indicam individualmente **CC BY 4.0**, e HRA nomeia Kristen Browne e Heidi Schlehlein como criadoras. Cópias locais conferem com blobs dos respectivos diretórios HRA `hra-kg` e do repositório de origem. CC BY 4.0 permite redistribuir/adaptar com crédito, link para licença e indicação das alterações; [licença do repositório HRA](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/blob/f1a3a63f110e27ff0736047d52d04dba5d3087f9/LICENSE). O piloto apresenta autoras, instituição/origem, links DOI, licença e adaptação de visualização. Os metadados também oferecem citação específica e citação geral da biblioteca; considerar incluí-las integralmente e verificar eventuais exigências adicionais antes de publicação. Atributos NIH não comprovam equivalência binária; não é parecer jurídico.

## 9. Regressões e experiência educacional

**Automatizados:** `npm run build` passou com aviso de chunks >500 kB; `npm run lint` passou com um aviso preexistente em `store.tsx`. `node tests/inspect-respiratory.mjs` confirmou hashes/parsing e contagens. SSR 28/28; store/jsdom 25/25, incluindo SM-2, XP, restauração e exportação/importação, proteção de registro corrompido; auditoria de 90 aulas, 597 questões, 586 cartões, IDs e domínio 30/50/20; interações jsdom de avaliações e cartões passaram. Para JSX automático, usar configuração temporária na raiz com `{"compilerOptions":{"jsx":"react-jsx","module":"esnext","moduleResolution":"bundler"}}` e `npx tsx --tsconfig <arquivo> tests/<teste>.tsx`.

**Navegador:** `tests/audit-respiratory-browser.mjs`, Chromium SwiftShader em 360, 390, 768, 1024 e 1440 px: as cinco opções, `aria-pressed`, painel e etiqueta DOM, isolar/mostrar todas, limpar, arrasto/roda, botão reset, ausência de overflow e pageerror, lazy GLBs, retorno ao esquema e resposta a quiz passaram. A alteração visual de arrasto/zoom em cada tamanho não foi verificada nesse teste. `tests/fallback-1222.mjs` bloqueou traqueia, apresentou aviso e retornou ao esquema. O teste real do canvas comparou `anatomia3d_v1` antes/depois da exploração e não observou mudança; não abrange toda persistência real. A tentativa do script legado `browser-respiratory.mjs` usando a porta 5173 antiga expirou na abertura; não é sucesso e foi substituída pelos testes no servidor 5175, não é prova de falha da aplicação. Clique direto na malha já havia sido exercitado na 12.2; não repetido aqui.

**Experiência educacional:** botões textuais ajudam a selecionar; painel oferece localização, função, relações e descrição simplificadas coerentes com as fontes gerais citadas, mas sem revisão especializada por item. Isolar e mostrar todas funcionaram; há retorno ao esquema e quiz existente. A câmera inicial apresenta objeto relativamente pequeno e a etiqueta pode cobrir estruturas pequenas como o brônquio, dificultando identificação visual; ela não é evidência de lateralidade. O piloto não tem quiz próprio nem vínculo direto com lições; isso é limitação, não substituição do currículo. Não houve estudo com estudantes ou teste de acessibilidade por tecnologia assistiva.

## 10–12. Problemas, correções e limites

- Problemas encontrados: alto custo relativo em SwiftShader; rótulo pode encobrir malha pequena; ausência de comprovação das junções anatômicas; nome NIH divergente; ausência de hardware físico.
- Correções de produção nesta fase: **nenhuma**. A correção de reset é da 12.2.1; nesta fase foi verificada na instância real. Foram adicionados scripts e capturas de teste isolados, sem alterar modelos, progressão ou código de produção. Testes usam `playwright-core` e Chromium externos, não adicionados às dependências; `TEST_BASE_URL`, `CHROMIUM_PATH` e eventualmente `LD_LIBRARY_PATH` configuram o ambiente.
- Necessário: revisão de anatomista com landmarks, lados, medidas e vistas ampliadas das junções; avaliar etiqueta/tamanho com usuários; testar GPU, tela e gestos reais, redes e recursos limitados; medir primeiro quadro útil e uso de memória/GPU; testar reset sob gesto ativo e context loss; investigar divergência NIH e direitos adicionais se existirem. Não concluir conformidade anatômica, desempenho ou acessibilidade por estas amostras.

## 13. Decisão

**Reprovar aprovação final por evidência insuficiente**, mantendo piloto experimental reversível e esquema existente. Controles automatizados e regressões cobertas passaram, e licenças das cópias HRA foram documentadas; isso não resolve validação especializada, rastreabilidade NIH completa ou desempenho em aparelhos físicos. Aguardar revisão do usuário e validações externas antes de nova fase ou expansão.
