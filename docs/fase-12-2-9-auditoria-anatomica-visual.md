# Fase 12.2.9 — Auditoria anatômica, morfológica e visual

## 1. Resumo executivo e classificação

**APROVADA COM RESSALVAS como auditoria técnica e inventário**, não como validação anatômica profissional nem declaração de adequação irrestrita para ensino. Foram inventariados três GLBs respiratórios e 41 definições procedurais do laboratório esquemático; cinco grupos respiratórios do piloto tiveram identificação e isolamento inspecionados. Existem limitações visuais demonstradas e questões anatômicas relevantes ainda não resolvidas, especialmente lateralidade, correspondência fina e junções. Não foi identificado profissional que tenha examinado ou aprovado este build.

Não houve alterações em aplicação, modelos, conteúdo ou dependências. Esta fase não realiza correções e não inicia a 12.2.10. A matriz abaixo não deve ser interpretada como parecer clínico nem prova de continuidade anatômica.

## 2. Escopo, preparação e metodologia

Branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD `3797202`. No início, `src/App.tsx`, `src/components/Lab3D.tsx`, `src/index.css` estavam modificados e piloto, modelos, evidências, testes e relatórios anteriores não rastreados; trabalho preservado. Foram consultadas as fases 12.2.5–12.2.8 e o dossiê anatômico 12.2.3. A busca por `.glb`, `.gltf`, `.obj`, `.fbx` e `.stl` no projeto, excluindo dependências e Git, encontrou três arquivos-fonte GLB; `dist`/`dist-test` contêm cópias geradas dos mesmos modelos, não modelos adicionais independentes.

Método: inspeção dos GLBs locais com `GLTFLoader`, hierarquia, nomes, materiais, matrizes e caixas; leitura de `RespiratoryPilot.tsx`, `Lab3D.tsx` e `structures.ts`; exame de vistas anteriores e capturas de isolamentos no canvas real em Chromium headless com SwiftShader; comparação limitada com fontes abaixo; e testes automatizados de interação. A identificação em GLB é baseada em nomes de nós e atribuição no código: **não é identificação anatômica independente**. Caixa envolvente não prova contato, distância entre superfícies, continuidade de parede/lúmen nem ausência de intersecção. Não foi realizado corte, comparação morfométrica com atlas 3D ou parecer de anatomista.

## 3. Inventário de modelos e mapeamento

| Arquivo fonte | Sistema / conteúdo segundo origem e nós | Malhas / geometrias únicas | Materiais / texturas | IDs na interface | Origem documentada |
|---|---|---:|---:|---|---|
| `public/models/respiratorio/lung.glb` | Respiratório; pulmões e ramificações intrapulmonares rotulados direito/esquerdo | 58 / 58 | 6 / 0 | `pulmao-d`, `pulmao-e` | HRA Visible Human Male, referência pulmão v1.3 [H1] |
| `public/models/respiratorio/trachea.glb` | Respiratório; traqueia, cartilagem e carina conforme nomes internos | 3 / 3 | 2 / 0 | `traqueia` | HRA traqueia v1.0, derivada do pulmão v1.2 [H2] |
| `public/models/respiratorio/main-bronchus.glb` | Respiratório; brônquios principais e cartilagens rotulados direito/esquerdo | 4 / 4 | 3 / 0 | `bronquio-d`, `bronquio-e` | HRA brônquios principais v1.0, derivados do pulmão v1.2 [H3] |

Autores da documentação HRA: Kristen Browne e Heidi Schlehlein, revisão interna Gloria Pryhuber, dados Visible Human Male/NLM, CC BY 4.0. Os três arquivos locais foram obtidos na fase 12.2 do repositório oficial HRA; histórico, blobs e licença estão no [relatório 12.2](fase-12-2-piloto-respiratorio.md). A entrada NIH masculina do pulmão apontou arquivo com nome feminino nas opções de download; identidade com o GLB local não está demonstrada. O fato de uma pessoa constar como revisora da fonte **não significa** que revisou esta integração. Não foram baixados arquivos nesta fase.

Inventário exaustivo de **todos os nomes de malha**, pais, nomes de materiais, transformações e caixas: [`inventario-glb.json`](../auditoria-piloto/fase-12-2-9/inventario-glb.json). O arquivo lista 65 instâncias de malha, sem nomes de malha duplicados dentro de cada GLB; nomes de nós não são prova de identificação. Os materiais são `MeshStandardMaterial`, sem texturas/imagens nos GLBs (a textura contada pelo renderer em 12.2.8 não é uma textura declarada no GLB). `asset.generator` identifica exportador Babylon.js/Maya 2023.2.

As cenas e nós de agrupamento usados têm escala `[1,1,1]`, posição `[0,0,0]`, quaternion `[0,0,0,1]`; o piloto não aplica escala/rotação/offset adicional a cada modelo. Coordenadas de limites no JSON são unidades do arquivo após matrizes Three.js; conversão para dimensões físicas e eixos anatômicos **não foram validados**. Centros das caixas dos nós pulmonares: `VH_M_lungs_R` x≈−0,06319, `VH_M_lungs_L` x≈+0,06943; identificação R/L vem dos nomes do fornecedor. A câmera não possui marcadores anatômicos para confirmar orientação.

O laboratório esquemático não usa outros GLBs: `ShapeMesh` gera uma primitiva por item (`sphere`, `box`, `capsule`, `cone`, `cylinder`, `torus`), um material padrão por malha, sem textura fornecida. Os 41 registros em `STRUCTURES` possuem IDs únicos; cada item contém forma, posição, escala e cor em [`inventario-esquematico.json`](../auditoria-piloto/fase-12-2-9/inventario-esquematico.json). Proveniência: dados locais `src/data/structures.ts` e geometria procedural `Lab3D.tsx`, não repositório anatômico externo. O seletor principal lista nove sistemas; cabeçalhos/pescoço e estética também estão definidos e podem ser passados como sistema inicial pela página Sistemas. Representações são esquemáticas, não reconstruções anatômicas detalhadas; escala não indica tamanho físico.

## 4. Nomenclatura e identificação no piloto

Os cinco IDs são únicos **dentro da lista do piloto**; no esquema os IDs também são únicos dentro de `STRUCTURES`. `pulmao-d`, `pulmao-e` e `traqueia` reaparecem nos dois contextos como IDs locais; não foi demonstrada colisão porque os estados são separados. Nenhum ID foi renomeado. Referências de terminologia são para conceitos, não validação dos polígonos.

| ID | Nome atual | Nome recomendado | Evidência | Status |
|---|---|---|---|---|
| `pulmao-d` | Pulmão direito | Manter provisoriamente | `VH_M_lungs_R` + `VH_M_bronchi_R`; TAH *pulmo dexter* [T1] | conceito plausível; lateralidade/morfologia pendentes |
| `pulmao-e` | Pulmão esquerdo | Manter provisoriamente | `VH_M_lungs_L` + `VH_M_bronchi_L`; TAH *pulmo sinister* [T1] | conceito plausível; lateralidade/morfologia pendentes |
| `traqueia` | Traqueia | Manter provisoriamente | `VH_M_trachea_of_respiratory_system`, incluindo `VH_M_carina`; HRA [H2] e Ryan [R1] | conceito plausível; parede, carina e continuidade pendentes |
| `bronquio-d` | Brônquio principal direito | Manter provisoriamente | `VH_M_right_main_bronchus`; TAH *bronchus principalis dexter* [T2] | conceito plausível; posição e junção pendentes |
| `bronquio-e` | Brônquio principal esquerdo | Manter provisoriamente | `VH_M_left_main_bronchus`; TAH *bronchus principalis sinister* [T3] | conceito plausível; posição e junção pendentes |
| `VH_M_left_posetrior_basal_bronchopulmonary_segment` | nome interno com `posetrior` | Não alterar arquivo; registrar possível grafia `posterior` | inventário local, malha do pulmão | grafia aparente; identidade anatômica não confirmada |
| `VH_M_bronchus` | nome interno genérico | Não renomear sem revisão | está sob grupo brônquico direito em `lung.glb` | subestrutura específica incerta |

`VH_M_bronchi_R/L` integram os grupos de pulmão: seleção de uma ramificação intrapulmonar, quando atingida, identifica o **grupo pulmonar inteiro**, não uma ramificação específica. Isto é agrupamento de interface, não prova de que a ramificação seja parênquima. Nomenclatura de todos os 41 itens esquemáticos e formas está no apêndice; fora das ocorrências específicas, os nomes não foram individualmente cotejados com Terminologia Anatômica.

## 5. Morfologia e relações topográficas

| Estruturas | Observação e confronto limitado | Limites / confiança |
|---|---|---|
| Pulmões | Duas massas assimétricas e sulcos visíveis em [vista +Z](../auditoria-piloto/fase-12-2-3/anterior-aproximado.png), [−Z](../auditoria-piloto/fase-12-2-3/posterior-aproximado.png) e [−X](../auditoria-piloto/fase-12-2-3/lateral-direita-hipotese.png). Anatomia geral de três lobos direitos e dois esquerdos é descrita em [R2]. | As vistas não comprovam contagem correta dos lobos, fissuras, superfícies ou lateralidade. Sem referência de escala, não se validam proporções reais. Confiança baixa para correção morfológica completa. |
| Traqueia | Peça central superior com material claro e estruturas anelares; modelo HRA nomeia cartilagem e carina. [R1] descreve anéis, parede posterior e bifurcação. | Sem corte/interior e eixos validados, integridade da parede posterior, carina e luz não foram verificadas; confiança baixa. |
| Brônquios principais | Nós rotulados esquerdo e direito próximos à parte inferior do grupo traqueal; [vista com traqueia destacada](../auditoria-piloto/fase-12-2-3/juncao-traqueia-destacada.png) e [brônquio direito destacado](../auditoria-piloto/fase-12-2-3/juncao-contexto-transparente.png). [R1] descreve organização e ângulos gerais. | Proximidade e transparência não provam continuidade, ângulo correto, contato ou ausência de interpenetração. A diferença de versões de origem pode afetar compatibilidade, sem prova de erro. Confiança baixa para junções. |
| Ramificações intrapulmonares | Nós em ambos os grupos brônquicos presentes no arquivo pulmonar conforme HRA [H1]; aparecem com seleção pulmonar e por transparência. | Ramificação lobar/segmentar individual não foi identificada cientificamente; proximais/distais e hilum não podem ser integralmente validados. |
| Paredes / superfícies | Inspeção de triângulos detectou 31 degenerados no pulmão e 2 em brônquios; traqueia 0. `tests/inspect-respiratory.mjs` também registra faces cuja normal de um vértice se opõe à normal calculada. | Métricas não são ensaio de watertightness, auto-intersecção, defeito clinicamente relevante ou orientação global; sem mapeamento de localização não se afirma lacuna/deformação anatômica. |
| Estruturas relacionadas ausentes | A cena deste piloto inclui apenas pulmões e vias centrais/intrapulmonares identificadas. Coração, pleura, diafragma e esôfago são mencionados em texto relacional, mas não aparecem como grupos próprios do piloto. | Ausência é limitação de escopo, não erro anatômico. Relações com estruturas não mostradas não podem ser verificadas visualmente. |
| Eixos e lados no esquema | Dados esquemáticos usam pulmão direito x=+0,55 e esquerdo x=−0,55; os nomes dos grupos GLB têm centros com sinais opostos. | Como não há correspondência anatômica documentada dos eixos e câmeras, sinal de coordenada por si só não prova inversão visual ou erro de lateralidade. É uma dúvida de orientação intermodelo a revisar. |

Os termos anterior/posterior, superior/inferior e medial/lateral são considerados por comparação com [R1] e [R2], mas as vistas ±Z, ±X e ±Y das capturas são **hipóteses de orientação**, não rótulos anatômicos estabelecidos. A localização relativa geral é visualmente examinável; relações precisas, continuidade proximal/distal e planos anatômicos requerem validação.

## 6. Auditoria visual e interação

Os pulmões têm cor rosada e traqueia/brônquios clara; seleção aplica destaque emissivo e reduz opacidade das demais peças. As cores são uma codificação visual, não mapeamento anatômico de tecidos validado. Etiqueta e painel são HTML fora do canvas; legibilidade e contraste pontuais foram examinados em 12.2.6, não equivalem a teste de todas as pessoas ou telas.

`tests/identificacao-1229.mjs` inspecionou o grupo interativo de cada seleção, comparou as malhas visíveis durante isolamento e verificou que a seleção persistia após giro e reset; 31/27/3/2/2 malhas visíveis respectivamente. Capturas [pulmão direito isolado](../auditoria-piloto/fase-12-2-9/isolada-1.png), [pulmão esquerdo](../auditoria-piloto/fase-12-2-9/isolada-2.png), [traqueia](../auditoria-piloto/fase-12-2-9/isolada-3.png), [brônquio direito](../auditoria-piloto/fase-12-2-9/isolada-4.png) e [esquerdo](../auditoria-piloto/fase-12-2-9/isolada-5.png). No enquadramento padrão os brônquios isolados são muito pequenos; zoom manual existe. Ao restaurar, as outras malhas voltam. Isso demonstra mapeamento técnico e estado, não confirmação biológica.

A grade pontual de raios na câmera inicial encontrou pontos não obstruídos para pulmões e traqueia; clique real no canvas nesses pontos selecionou o grupo correspondente. Não encontrou ponto mais próximo para os brônquios na grade espaçada em 5% do canvas: isso **não prova** que sejam impossíveis de clicar, apenas que clique direto de cada brônquio e de suas sobreposições não foi validado nessa amostra. Lista/isolamento funcionaram para ambos. Contornos e transparência podem se sobrepor visualmente e sugerir continuidade que não foi comprovada.

## 7. Matriz de confiabilidade

Escala solicitada: **A** confirmada por identificação e representação coerentes; **B** provável, com limitação documental; **C** incerta devido a dúvida relevante; **D** inconsistente com erro demonstrado; **E** não avaliável. As classes tratam de **identificação e representação global**, não apenas nomenclatura ou carregamento.

| Estrutura do piloto | Classe | Justificativa |
|---|:---:|---|
| Pulmão direito | C | Nó e forma global sugerem pulmão, mas lateralidade anatômica, lobos e proporções não foram confirmados de forma independente. |
| Pulmão esquerdo | C | Nó e forma global sugerem pulmão; incisura, eixos, lobos e lateralidade seguem pendentes. |
| Traqueia | C | Peça tubular central e anéis são sugestivos; parede posterior, carina e continuidade com peças de outra versão não verificadas. |
| Brônquio principal direito | C | Nó e região geral são sugestivos; pouca visibilidade, lateralidade, limites e junções não comprovados. |
| Brônquio principal esquerdo | C | Nó e região geral são sugestivos; pouca visibilidade, lateralidade, limites e junções não comprovados. |
| Ramificações intrapulmonares incluídas com pulmões | C | Nomes e aparência ramificada são sugestivos; identificação individual e conexões não verificadas. |

Não se atribuiu A por carregamento ou nomenclatura. A representação anatômica fina das **41 definições procedurais** é E nesta auditoria, pois geometrias primitivas são deliberadamente esquemáticas e não se examinou individualmente sua correspondência morfológica/topográfica com atlas. O inventário/matriz individual encontra-se no apêndice abaixo; E não significa que o conceito ou o texto seja falso, nem que seja inadequado para toda utilização esquemática. Uma questão textual específica é registrada em AV-04.

## 8. Inconsistências e riscos priorizados

Nenhuma falha **crítica** de identificação anatômica específica foi demonstrada; não há prova de ausência de erro crítico. Graus de confiança abaixo referem-se à observação, não a um diagnóstico anatômico.

### AV-01 — ALTA — continuidade e orientação respiratória não verificáveis com segurança
- **Estruturas:** traqueia, brônquios, ramificações e pulmões. **Evidência:** vistas e caixas descritas acima; HRA [H1–H3] informa versões de origem diferentes. **Referência:** [R1], [R2]. **Status:** incerteza documentada, não erro anatômico confirmado.
- **Impacto:** exibição pode levar estudante a supor alinhamento e continuidade reais. **Confiança:** alta na limitação das evidências; baixa sobre existência de erro geométrico.
- **Recomendação:** avaliação externa com marcos anatômicos, rotação, corte e análise de superfícies/unidades, documentando lado e tolerâncias; evitar interpretação como modelo validado. **Especialista:** necessário.

### AV-02 — MÉDIA — brônquios pequenos/ocultos na vista padrão
- **Estruturas:** brônquios principais. **Evidência:** captura de [brônquio direito isolado](../auditoria-piloto/fase-12-2-9/isolada-4.png) e ausência de ponto frontal mais próximo na grade em `identificacao.json`. Não demonstra incapacidade de selecionar em outras vistas. **Referência:** [R1] para contexto, não para estabelecer um tamanho de tela.
- **Impacto:** dificuldade para localizar e relacionar as estruturas com a traqueia/hilo; exige zoom/seleção pela lista. **Confiança:** alta no cenário capturado, limitada à amostra.
- **Recomendação:** estudar enquadramento opcional e instruções, sem esconder o contexto; validar em dispositivos e com estudantes. **Especialista:** revisar se o enquadramento sugere relação indevida.

### AV-03 — MÉDIA — rótulo pulmonar agrupa ramificações brônquicas
- **Estruturas:** `VH_M_bronchi_R/L` e pulmões. **Evidência:** mapeamento de código e listas de malhas em `identificacao.json`; HRA [H1] declara brônquios intrapulmonares incluídos.
- **Impacto:** ao explorar ramos, rótulo “Pulmão” pode ser entendido como identificação específica do ramo; não há seleção segmentar. **Confiança:** alta para o agrupamento de código; risco de interpretação requer teste com estudantes.
- **Recomendação:** explicitar escopo do grupo ou avaliar separação futura sem inventar identificações. **Especialista:** necessário para qualquer identificação mais granular.

### AV-04 — MÉDIA — classificação textual da hipoderme ambígua no esquema
- **Estruturas:** `pele`, `hipoderme` em `src/data/structures.ts`. **Evidência:** `pele.classification` descreve pele como “epiderme, derme e hipoderme”; `hipoderme.location` diz “camada profunda da pele”. [R3] distingue hipoderme como tecido subcutâneo intimamente associado, não parte estrita da pele; outra fonte didática de enfermagem [R4] apresenta três camadas sob convenção mais ampla.
- **Impacto:** a convenção não explicitada pode confundir limites histológicos. **Confiança:** alta na divergência entre texto e [R3]; não tratar convenções de ensino diferentes como prova de um único padrão universal.
- **Recomendação:** pedir revisão especializada e explicitar a convenção e relação com tecido subcutâneo, respeitando currículo; sem edição automática. **Especialista:** necessário antes de alterar texto.

### AV-05 — BAIXA — grafia interna e nome genérico
- **Estruturas:** `VH_M_left_posetrior_basal_bronchopulmonary_segment`, `VH_M_bronchus`. **Evidência:** inventário de GLB. **Referência:** TAH [T3] nomeia conceitos segmentares, mas não confirma o mapeamento da malha.
- **Impacto:** dificuldade para auditoria e mapeamento futuro, sem erro demonstrado no rótulo atual. **Confiança:** alta na grafia/nome, baixa na identificação específica. **Recomendação:** manter arquivo e IDs originais; documentar alias externo só depois de revisão de proveniência e semântica. **Especialista:** necessário para identificação.

## 9. Plano futuro — não implementado

| Categoria / prioridade | Ação | Complexidade estimada / arquivos potenciais | Dependências e riscos | Critério de aceitação |
|---|---|---|---|---|
| Nomenclatura / média | Revisar convenção pele/hipoderme e texto de grupo pulmonar | Baixa–média; `structures.ts`, `RespiratoryPilot.tsx` | parecer especializado; não mudar currículo sem autorização | textos revisados, fontes citadas e testes de painel/IDs preservados |
| Identificação / média | Avaliar comunicação dos ramos incluídos nos grupos e nomes internos ambíguos | Média; `RespiratoryPilot.tsx`, documentação | mapeamento individual deve ser demonstrado; não inferir por nome | mapeamento e limites validados por especialista, seleção testada |
| Morfologia / alta | Avaliar fissuras, paredes, carina, superfícies e triângulos suspeitos | Alta; documentação e ferramentas de inspeção externas | comparação com atlas e corte; não deformar para ajustar | parecer rastreável com vistas, marcos, limitações e evidências |
| Topografia / alta | Validar eixos, lateralidade, escala e junções traqueobrônquicas e hilares | Alta; `RespiratoryPilot.tsx`, documentação, eventualmente modelos | especialista e unidades/tolerâncias; caixas não demonstram contato | relatório de especialista com medições e critérios de encaixe |
| Visual / média | Estudar zoom opcional para peças pequenas e contexto | Média; piloto/câmera | cuidado com sobreposição, acessibilidade e regressão mobile | ensaio com estudantes, comparação de vistas, teclado e retorno funcionais |
| Interação / média | Testar cliques em pequenos brônquios de múltiplas vistas e sobreposições | Média; testes e eventualmente piloto | não confundir oclusão com erro de seleção | pontos visíveis testados, mapeamento correto e isolamento preservado |
| Substituição / condicional | Somente considerar se especialista demonstrar incompatibilidade não corrigível | Alta; modelos, licenças e integração | autorização específica e licença verificável por arquivo; risco científico e de atribuição | procedência, licença, compatibilidade, validação externa e regressão documentadas |
| Avaliação especializada / alta | Usar [formulário externo](fase-12-2-4-checklist-especialista.md) e dossiê, preenchidos por profissional real | Variável; documentação | disponibilidade de especialista e ambiente interativo | parecer identificado, datado, com fontes e limitações por estrutura |

## 10. Referências consultadas

- [H1] [HRA Lung Male v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/): origem e inclusão dos brônquios intrapulmonares, remoção das vias centrais. Confiança alta na descrição da fonte, não na identidade perfeita de todos os bytes com outras distribuições.
- [H2] [HRA Trachea Male v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/) e [H3] [HRA Main Bronchus Male v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/): origem Visible Human e separação do pulmão v1.2. Não verificam encaixe com v1.3.
- [T1] [IFAA Terminologia Anatomica Humana, lista pulmão](https://ifaa.unifr.ch/Public/TNAEntryPage/auto/part/LAEN/TAH2963%20P2%20EN.htm), [T2] [brônquio principal direito](https://ifaa.unifr.ch/Public/TNAEntryPage/auto/unit/EN/TAH2931%20Unit%20EN.htm), [T3] [esquerdo](https://ifaa.unifr.ch/Public/TNAEntryPage/auto/unit/EN/TAH2932%20Unit%20EN.htm): termos latinos/ingleses; páginas indicam trabalho em andamento. Confirmam terminologia conceitual, não o objeto.
- [R1] [Ryan et al., *Anatomical considerations in bronchoscopy*, 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5696545/): traqueia, carina e relações respiratórias gerais; não avalia estes arquivos.
- [R2] [OpenStax, Anatomy and Physiology 2e, 22.2](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs): lobos e relações pulmonares gerais; não prova identificação das fissuras do modelo. Não foram reproduzidas imagens ou trechos do livro.
- [R3] [Digital Histology, Skin overview](https://digitalhistology.org/organs-systems/skin/overview/skin-overview-1/): convenção estrita epiderme/derme e hipoderme subjacente; [R4] [OpenStax, Clinical Nursing Skills 21.1](https://openstax.org/books/clinical-nursing-skills/pages/21-1-structure-and-functions-of-the-skin): apresenta a convenção didática de três camadas. Não foram incorporadas imagens das fontes.

## 11. Testes, integridade e limites

- `tests/inventory-1229.mjs` lê arquivos existentes e grava JSON de inventário; `tests/inventory-schematic-1229.ts`, com configuração JSX temporária, confirmou 41 IDs distintos. `tests/identificacao-1229.mjs` testa mapeamento, cinco isolamentos, giro/reset e cliques amostrados no canvas. Sua primeira execução não aguardou registro completo de eventos R3F e falhou; ajustada a espera. Outra tentativa usou indevidamente índice de ordem dos grupos para procurar pontos de clique e falhou; corrigido o mapeamento dos grupos no teste e repetido. Não eram evidências de falha do produto.
- `tests/materials-1223.mjs`, `tests/pilot-reentry-1223.mjs`, `tests/real-controls-1222.mjs`, `tests/fallback-1222.mjs`, `tests/stability-1227.mjs` e `EXPECT_FIXED=1 tests/raycast-isolation-1227.mjs` passaram, incluindo retorno, clique em malha, restauração de câmera e recuperação após falha GLB. Chromium headless/SwiftShader e servidor Vite local 5175; não é teste físico ou inspeção profissional.
- `npm run build` e `npm run lint` passaram, mantendo alerta de chunks grandes e um aviso preexistente no store. `tests/inspect-respiratory.mjs` verificou GLBs; hashes antes/depois iguais: pulmão `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab`; traqueia `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae`; brônquios `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa`.
- Auditoria de conteúdo: 90 dias, 597 questões, 586 flashcards e SM-2/domínio; SSR 28/28, store/jsdom 25/25 (XP, persistência e importação/exportação) e interações de avaliações/flashcards passaram em perfis isolados. Conquistas: presença verificada em SSR, não todos os desbloqueios. Nenhum arquivo de aplicação ou conteúdo foi modificado nesta fase.

Limitações: sem anatomista, ensaio de usuário, leitor de tela, hardware móvel, comparação tridimensional com atlas, teste de malhas watertight, corte de lúmen ou medição física. Validação de textura, orientação real, lateralidade e junções não decorre dos nomes HRA nem da semelhança de imagens. A auditoria não determina adequação para ensino clínico, orientação cirúrgica ou uso médico.

Recomendação para a fase seguinte, se autorizada: primeiro obter avaliação especializada de AV-01 e revisão dos textos AV-04, com evidência e aceite rastreáveis; só então planejar intervenções. Aguardar autorização explícita.

## Apêndice — matriz e nomenclatura das 41 definições esquemáticas

Para cada registro abaixo, **E** significa representação anatômica fina não avaliável nesta fase: a forma é primitiva didática e não foi validada individualmente em atlas. O nome atual é o da aplicação; recomendação padrão é **não alterar até revisão contextual**, não aprovação terminológica integral. Forma, posição, escala, cor e nome científico estão no inventário JSON. Entradas `pele`/`hipoderme` também possuem a ressalva textual AV-04. Os IDs são de `STRUCTURES`, não identificadores anatômicos internacionais.

| Sistema | ID | Nome atual | Nome recomendado / evidência | Classe |
|---|---|---|---|:---:|
| esqueletico | `cranio` | Crânio | Sem recomendação até revisão; inventário local | E |
| esqueletico | `mandibula` | Mandíbula | Sem recomendação até revisão; inventário local | E |
| esqueletico | `coluna` | Coluna Vertebral | Sem recomendação até revisão; inventário local | E |
| esqueletico | `costelas` | Costelas | Sem recomendação até revisão; inventário local | E |
| esqueletico | `umeros` | Úmero | Sem recomendação até revisão; inventário local | E |
| esqueletico | `femur` | Fêmur | Sem recomendação até revisão; inventário local | E |
| muscular | `deltoide` | Deltoide | Sem recomendação até revisão; inventário local | E |
| muscular | `peitoral` | Peitoral Maior | Sem recomendação até revisão; inventário local | E |
| muscular | `biceps` | Bíceps Braquial | Sem recomendação até revisão; inventário local | E |
| muscular | `triceps` | Tríceps Braquial | Sem recomendação até revisão; inventário local | E |
| muscular | `gluteo` | Glúteo Máximo | Sem recomendação até revisão; inventário local | E |
| muscular | `quadriceps` | Quadríceps Femoral | Sem recomendação até revisão; inventário local | E |
| muscular | `diafragma-m` | Diafragma | Sem recomendação até revisão; inventário local | E |
| nervoso | `encefalo` | Encéfalo | Sem recomendação até revisão; inventário local | E |
| nervoso | `medula` | Medula Espinhal | Sem recomendação até revisão; inventário local | E |
| nervoso | `neuronio` | Neurônio | Sem recomendação até revisão; inventário local | E |
| cardiovascular | `coracao` | Coração | Sem recomendação até revisão; inventário local | E |
| cardiovascular | `aorta` | Aorta | Sem recomendação até revisão; inventário local | E |
| cardiovascular | `veia-cava` | Veia Cava Superior | Sem recomendação até revisão; inventário local | E |
| respiratorio | `pulmao-d` | Pulmão Direito | Sem recomendação até revisão; inventário local | E |
| respiratorio | `pulmao-e` | Pulmão Esquerdo | Sem recomendação até revisão; inventário local | E |
| respiratorio | `traqueia` | Traqueia | Sem recomendação até revisão; inventário local | E |
| respiratorio | `laringe` | Laringe | Sem recomendação até revisão; inventário local | E |
| digestorio | `figado` | Fígado | Sem recomendação até revisão; inventário local | E |
| digestorio | `estomago` | Estômago | Sem recomendação até revisão; inventário local | E |
| digestorio | `intestino` | Intestino Delgado | Sem recomendação até revisão; inventário local | E |
| digestorio | `pancreas` | Pâncreas | Sem recomendação até revisão; inventário local | E |
| urinario | `rim-d` | Rim Direito | Sem recomendação até revisão; inventário local | E |
| urinario | `rim-e` | Rim Esquerdo | Sem recomendação até revisão; inventário local | E |
| urinario | `bexiga` | Bexiga Urinária | Sem recomendação até revisão; inventário local | E |
| reprodutor | `testiculo` | Testículo | Sem recomendação até revisão; inventário local | E |
| reprodutor | `ovario` | Ovário | Sem recomendação até revisão; inventário local | E |
| reprodutor | `utero` | Útero | Sem recomendação até revisão; inventário local | E |
| tegumentar | `pele` | Pele (Tegumento) | Revisar convenção, AV-04 | E |
| tegumentar | `epiderme` | Epiderme | Sem recomendação até revisão; inventário local | E |
| tegumentar | `derme` | Derme | Sem recomendação até revisão; inventário local | E |
| tegumentar | `hipoderme` | Hipoderme | Revisar convenção, AV-04 | E |
| cabeca-pescoco | `orbicular` | Orbicular do Olho | Sem recomendação até revisão; inventário local | E |
| cabeca-pescoco | `masseter` | Masseter | Sem recomendação até revisão; inventário local | E |
| estetica | `colageno` | Colágeno | Sem recomendação até revisão; inventário local | E |
| estetica | `gordura-facial` | Compartimentos de Gordura Facial | Sem recomendação até revisão; inventário local | E |

**Entregáveis criados:** `docs/fase-12-2-9-auditoria-anatomica-visual.md`, `tests/inventory-1229.mjs`, `tests/inventory-schematic-1229.ts`, `tests/identificacao-1229.mjs`, `auditoria-piloto/fase-12-2-9/` (inventários, mapeamento e cinco capturas). Nenhum commit.
