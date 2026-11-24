# Fase 12.2 — Piloto respiratório: registro inicial de procedência e licenças

**Situação atual:** piloto integrado em caráter experimental; a aprovação anatômica e em hardware físico continua pendente. A seção seguinte registra a avaliação anterior à aquisição. Atualização e testes de câmera: [auditoria 12.2.1](fase-12-2-1-auditoria.md). Data de consulta: 21 de novembro de 2026. A Fase 12.1 foi lida; o laboratório esquemático e o carregamento lazy permanecem preservados.

## Verificação anterior à aquisição

As três entradas NIH abaixo indicam separadamente **Creative Commons Attribution 4.0 International (CC BY 4.0)**, que permite compartilhar e adaptar, inclusive comercialmente, desde que sejam dados crédito adequado, link da licença e indicação de mudanças: https://creativecommons.org/licenses/by/4.0/. O Human Reference Atlas (HRA) também atribui a licença aos objetos digitais específicos listados abaixo. Essas consultas não substituem inspeção dos arquivos recebidos e de quaisquer componentes de terceiros. Não foi feito parecer jurídico.

| Entrada NIH | Objeto HRA e versão descrita | Criadores conforme metadados HRA | Origem / revisão |
|---|---|---|---|
| [3DPX-021008 — Lung, Male](https://3d.nih.gov/entries/3DPX-021008) | [Lung, Male v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/), DOI [10.48539/HBM737.FFBT.876](https://doi.org/10.48539/HBM737.FFBT.876) | Kristen Browne e Heidi Schlehlein | Visible Human Male, NLM; HRA relaciona Gloria Pryhuber como revisora interna. A página diz que traqueia e brônquios principais foram removidos. |
| [3DPX-021021 — Trachea, Male](https://3d.nih.gov/entries/3DPX-021021) | [Trachea, Male v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/), DOI [10.48539/HBM969.WCCJ.636](https://doi.org/10.48539/HBM969.WCCJ.636) | Kristen Browne e Heidi Schlehlein | Visible Human Male, NLM; revisora interna Gloria Pryhuber. Descrição: separado do pulmão v1.2. |
| [3DPX-021010 — Main Bronchus, Male](https://3d.nih.gov/entries/3DPX-021010) | [Main Bronchus, Male v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/), DOI [10.48539/HBM795.LVRX.842](https://doi.org/10.48539/HBM795.LVRX.842) | Kristen Browne e Heidi Schlehlein | Visible Human Male, NLM; revisora interna Gloria Pryhuber. Descrição: separado do pulmão v1.2. |

**Atribuição proposta para cada arquivo, se a procedência e a versão forem confirmadas:** título e versão da tabela; Kristen Browne e Heidi Schlehlein, Human Reference Atlas/HuBMAP, dados Visible Human Male/National Library of Medicine; DOI e página específica; licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); listar modificações efetivamente feitas. Conferir ainda instruções específicas presentes no arquivo e na fonte de aquisição. Os metadados HRA citam Katy Börner como líder de projeto; se instruções específicas exigirem créditos adicionais, incluí-los.

**Inconsistência importante:** a página [de download do pulmão](https://3d.nih.gov/entries/download/21008/2) chama a malha de entrada `3d-vh-f-lung.glb`, apesar do título "Lung, Male" e da descrição que afirma Visible Human Male. A procedência exata desse arquivo e a correspondência com HRA v1.3 devem ser esclarecidas antes de distribuir ou combiná-lo. Não assumir que o prefixo corresponda ao espécime nem que a cena seja consistente.

### Cópias oficiais alternativas para inspeção

A rede do ambiente não alcança diretamente `3d.nih.gov` a partir do workspace. Foi localizado o repositório oficial [Human Reference Atlas 3D Reference Object Library](https://github.com/hubmapconsortium/ccf-3d-reference-object-library), cujo [LICENSE](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/blob/f1a3a63f110e27ff0736047d52d04dba5d3087f9/LICENSE) declara CC BY 4.0. O commit `f1a3a63f110e27ff0736047d52d04dba5d3087f9` lista três arquivos masculinos de um pacote chamado `v1.4`: [pulmão](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/blob/f1a3a63f110e27ff0736047d52d04dba5d3087f9/VH_Male/v1.4/3d-vh-m-lung.glb), [traqueia](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/blob/f1a3a63f110e27ff0736047d52d04dba5d3087f9/VH_Male/v1.4/3d-vh-m-trachea.glb) e [brônquios](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/blob/f1a3a63f110e27ff0736047d52d04dba5d3087f9/VH_Male/v1.4/3d-vh-m-main-bronchus.glb). O número do pacote não é prova automática da versão específica do objeto digital ou identidade binária com as entradas NIH. As cópias alternativas serão apenas inspecionadas inicialmente; confirmar versões, procedência e compatibilidade com as entradas acima antes de empacotar.

Os metadados oficiais HRA em `hra-kg` identificam exatamente os objetos [pulmão v1.3](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/lung-male/v1.3/raw/metadata.yaml), [traqueia v1.0](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/trachea-male/v1.0/raw/metadata.yaml) e [brônquios v1.0](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/main-bronchus-male/v1.0/raw/metadata.yaml). Os Git blob IDs desses três arquivos de origem são, respectivamente, `dbbfdaf4cc51ea7d75cb0887b8fa003b8da9c00a`, `06ebbd9354ff122ad38fffece39b7768e8f8475d` e `7f9e7c6e981ef044f848844afb914f0b206c2a3d`, iguais aos do repositório alternativo oficial. Isso confirma identidade entre as duas cópias HRA. **Não comprova identidade com o arquivo rotulado de modo inconsistente no NIH**, que não foi baixado; o piloto usa as cópias HRA masculinas verificadas.

## 1. Arquivos utilizados

As cópias HRA, armazenadas em `public/models/respiratorio/`, são carregadas apenas quando o usuário abre o piloto. Dados originais sem alteração de geometria:

| Arquivo | Objeto HRA | Bytes | SHA-256 |
|---|---|---:|---|
| `lung.glb` | Pulmão masculino v1.3 | 10.941.068 | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` |
| `trachea.glb` | Traqueia masculina v1.0 | 1.184.804 | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` |
| `main-bronchus.glb` | Brônquios principais masculinos v1.0 | 422.208 | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` |

O total bruto é **12.548.080 bytes**. Os arquivos foram obtidos do repositório oficial identificado acima, após registro das licenças. O GLB de pulmão apontado na página NIH tem nome de entrada inconsistente e não foi baixado; não alegamos equivalência binária com esse arquivo NIH. As cópias HRA conferem com os objetos digitais HRA por Git blob ID. Fontes e licenças estão na seção anterior e também visíveis no piloto.

## 2. Licenças e atribuições

Cada uma das três páginas NIH e os três registros HRA identificados acima informa CC BY 4.0. Os metadados HRA identificam Kristen Browne e Heidi Schlehlein como criadoras. O piloto apresenta créditos, links DOI e licença; a aplicação agrupa e exibe partes, mas não altera os arquivos de geometria. Detalhes e ressalvas sobre eventual conteúdo de terceiros estão no registro anterior.

## 3. Características técnicas e inspeção

Inspeção automatizada com Three.js `GLTFLoader` no Node; verificados cabeçalho GLB, comprimento, SHA-256 e parsing, referências de índices, quantidades e bounding boxes. Arquivos GLB 2.0, sem imagens ou texturas declaradas e sem extensões declaradas. Nós não possuem matrizes, translações, escalas ou rotações explícitas: agrupar os nós utilizados não remove transformações de ancestrais. Materiais são os lidos pelo loader. Dados originais sem modificação:

| Modelo | Malhas | Materiais | Triângulos | Normais presentes | Caixa min → max (unidades do arquivo) |
|---|---:|---:|---:|---|---|
| Pulmão | 58 | 6 | 224.765 | 58/58 | `[-0.12498, 0.38561, -0.09224]` → `[0.13444, 0.61475, 0.09747]` |
| Traqueia | 3 | 2 | 44.042 | 3/3 | `[-0.01931, 0.53415, -0.01301]` → `[0.01245, 0.66014, 0.05422]` |
| Brônquios | 4 | 3 | 6.023 | 4/4 | `[-0.02721, 0.50381, -0.02584]` → `[0.04751, 0.54805, 0.00168]` |

Total: **274.830 triângulos**, acima da meta exploratória de 200 mil da Fase 12.1. Centros das caixas respectivamente `[0.00473, 0.50018, 0.00262]`, `[-0.00343, 0.59714, 0.02061]`, `[0.01015, 0.52593, -0.01208]`. Os três usam origem compartilhada no arquivo; não foram aplicadas transformações individuais aos modelos. A geometria possui normais e faces triangulares. Uma checagem simples de área e sinal com a normal do primeiro vértice identificou, respectivamente, **31/0/2 triângulos degenerados** e **73/4/0 sinais opostos**; isso não prova defeito visual ou orientação incorreta de cada face e requer inspeção especializada. Escala física precisa ser confirmada; não presumir unidades anatômicas ou usar para medições.

Os nós do arquivo foram mapeados para pulmões direito/esquerdo e respectivas árvores intrapulmonares, traqueia e brônquios principais direito/esquerdo. Os nomes e a hierarquia dos arquivos suportam esse agrupamento; não comprovam sozinhos sua correção clínica. Sem otimização geométrica ou compressão aplicada.

## 4. Arquitetura e ajustes realizados

- `RespiratoryPilot.tsx` é importado sob demanda dentro do laboratório já lazy. O modo esquemático continua sendo o padrão e mantém sua seleção e seu quiz; botão no sistema respiratório abre a área experimental.
- O piloto carrega os três GLB locais, permite seleção por clique e lista com `aria-pressed`, destaque, isolamento, etiqueta, painel, rotação/zoom, botão de restauração e retorno ao esquema. As descrições são educacionais e não modificam o currículo.
- O agrupamento cria cópias de materiais para não alterar outros grupos; geometria permanece compartilhada e não é modificada. Erro de carregamento mostra mensagem e caminho de volta ao laboratório esquemático. As informações não registram respostas nem modificam XP/progresso.
- Foi corrigido erro `NotFoundError` observado no primeiro teste quando o indicador de carregamento usava `Html` dentro do `Suspense`: indicador agora é HTML externo ao canvas. Após a correção, os testes reportados abaixo não capturaram erros de página.
- O subtítulo do laboratório distingue a disponibilidade de um piloto experimental. Nada do SM-2, avaliações, questões, flashcards ou armazenamento foi alterado.

## 5. Evidências e limites de alinhamento

As caixas dos três arquivos ocupam coordenadas próximas, com sobreposição dos intervalos da região traqueal/brônquica. A cena composta foi inspecionada visualmente por Chromium headless/WebGL SwiftShader: [1440 × 900](../auditoria-piloto/piloto-1440.png) e [360 × 800](../auditoria-piloto/piloto-360.png). Outras capturas com traqueia selecionada: [390 × 844](../auditoria-piloto/selecionada-390.png), [768 × 1024](../auditoria-piloto/selecionada-768.png), [1024 × 768](../auditoria-piloto/selecionada-1024.png), [1440 × 900](../auditoria-piloto/selecionada-1440.png).

Isso é evidência de que a cena é renderizável e que as geometrias ocupam região compatível na visualização, **não prova de conexões exatas, ausência de sobreposição ou fidelidade anatômica**. Não houve revisão por anatomista nem registro de tolerâncias ou landmarks. Manter o rótulo experimental; não apresentar como validado clinicamente.

## 6. Testes executados

### Automatizados

- `npm run build`: aprovado; o Vite continua alertando sobre chunks maiores que 500 KB.
- `node tests/inspect-respiratory.mjs`: SHA-256, cabeçalho, tamanho, parser Three.js, malhas, índices, normais, contagem de faces e caixas passaram; contagens geométricas acima são observações, não certificação anatômica.
- SSR existente: **28/28**; store/jsdom **25/25**; auditoria automatizada das **90 aulas, 597 questões e 586 cartões** e testes de interação jsdom passaram.

### Navegador

Chromium headless com renderização WebGL por software, perfil isolado e Vite local:

- 360 × 800 e 1440 × 900: confirmação de que não há requisição dos GLB antes de abrir o piloto; três requisições após abertura; seleção das cinco estruturas pela lista, painel, isolamento, rotação e zoom por alterações na imagem, botão de restauração acionado; retorno ao laboratório esquemático e seu botão de quiz; sem overflow do documento nem `pageerror` capturado.
- 390 × 844, 768 × 1024, 1024 × 768 e 1440 × 900: abertura, carga dos três recursos, seleção de traqueia e painel; sem overflow do documento nem `pageerror` após correção. Essas verificações não cobrem todas as interações em todas as larguras.
- 1440 × 900: clique direto em geometria abriu seleção/painel. O `localStorage` foi comparado antes e depois da exploração e permaneceu igual. Isso não substitui testes longos de persistência em aparelhos físicos.
- Bloqueio deliberado de `trachea.glb`: mensagem de erro exibida e retorno ao laboratório esquemático bem-sucedido.
- Botão de reset foi acionado após rotação. **Uma comparação de captura pixel a pixel não retornou igualdade com o quadro inicial**; na 12.2.1 o reset foi corrigido e testado numericamente em um harness com os mesmos controles e configuração. Ver limites e resultados em [12.2.1](fase-12-2-1-auditoria.md).

O script `tests/browser-respiratory.mjs` usa Playwright Core e Chromium disponíveis separadamente; servidor local esperado em `http://127.0.0.1:5173`, executável definido por `CHROMIUM_PATH`. As dependências do navegador não foram adicionadas ao bundle ou ao projeto. `tests/inspect-respiratory.mjs` executa com as dependências existentes do projeto.

## 7. Desempenho observado

Build atual: entrada JS **aprox. 940 KB / 266 KB gzip**; chunk do laboratório **952 KB / 253 KB gzip** e chunk do piloto **79 KB / 24 KB gzip**. Comparação com Fase 11.1: entrada anterior **940 KB / 266 KB gzip**; laboratório anterior **949 KB / 252 KB gzip**. GLBs não estão incluídos no JS inicial.

Em medições locais de navegador, o download individual bruto foi reportado em aproximadamente 80–142 ms para pulmão, 32–67 ms para traqueia e 11–42 ms para brônquios; trata-se de servidor local, não rede móvel ou tempo total de renderização. Nesta medição inicial não foram medidos FPS, tempo até primeiro quadro útil, memória GPU/heap, consumo após trocas ou desempenho em aparelhos reais. A 12.2.1 acrescenta RAF em repouso e estimativa de heap no navegador headless, com limitações detalhadas no relatório de auditoria. Os 12,55 MB e 274.830 triângulos exigem avaliação antes de declarar o piloto adequado para mobile. Não se aplicou Draco/Meshopt sem medir o impacto e sem revisar fidelidade.

## 8. Limitações e próximos passos

1. **A Fase 12.2 não está concluída:** falta revisão anatômica qualificada do alinhamento e confirmação em hardware real. A equivalência com o GLB de entrada da página NIH do pulmão segue não comprovada; o piloto utiliza o arquivo masculino HRA de proveniência documentada.
2. A 12.2.1 corrigiu e testou numericamente a câmera em harness; ainda testar diretamente no piloto, com gesto ativo, toque e acessibilidade em dispositivos reais.
3. Avaliar quantitativamente FPS, memória, uso prolongado e descarte/cache na troca repetida de cena. O cache do `useGLTF` mantém dados carregados; os materiais copiados são descartados na desmontagem. O relatório não afirma ausência de vazamento.
4. Validar seleção/isolamento de cada grupo com marcos e terminologia do HRA; examinar os triângulos degenerados e sinais de normais. Registrar limitações de uma única referência anatômica e não usar para diagnóstico.
5. Após esses portões e aprovação, avaliar otimização sem perda anatômica e eventual distribuição. O piloto não grava identificação em `id3d` e não substitui o quiz existente do laboratório esquemático.

**Nenhum commit foi criado.**
