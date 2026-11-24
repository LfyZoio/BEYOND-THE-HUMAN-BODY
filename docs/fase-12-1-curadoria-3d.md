# Fase 12.1 — Pesquisa e curadoria de modelos anatômicos 3D

**Data da consulta:** 21 de novembro de 2026  
**Referência de código:** `3797202`, branch `arena/b5a9e8b9-beyond-the-human-body`  
**Estado:** pesquisa e planejamento; aguardando aprovação da Fase 12.2.

## Escopo e nível de evidência

Foram consultadas páginas de metadados e licenças, não arquivos 3D. Não foram baixados, convertidos, executados ou incorporados modelos. A licença citada é a exibida na página consultada, não um parecer jurídico nem garantia sobre conteúdo de terceiros. Nenhuma malha foi validada por anatomista, inspecionada para fidelidade, topologia, UV, nomes de nós, separação, posição ou desempenho. Um arquivo apontado como GLB é apenas **candidato compatível com o formato**, não uma integração testada. Dados e licenças podem mudar: registrar versão e evidência na aquisição futura.

**Recomendação:** piloto **respiratório**, com pulmão, traqueia e brônquios do Human Reference Atlas (HRA), publicados individualmente em GLB e identificados na página como CC BY 4.0. A seleção de subestruturas dentro de cada arquivo, as transformações relativas e sua qualidade não estão verificadas. O esquelético continua prioritário para o lote seguinte; pode ser preferível se o requisito de seleção por múltiplos ossos for inegociável e o respiratório falhar na triagem.

## 1. Fontes pesquisadas

| Fonte e responsável | Cobertura e formatos documentados | Licença, web e acesso | Qualidade / reserva |
|---|---|---|---|
| [NIH 3D](https://3d.nih.gov/collections/40), National Institutes of Health: plataforma de contribuições; autores mudam por item | Anatomia, órgão, casos clínicos e impressão; formatos e versões variam. HRA oferece vários GLB de órgãos. | Cada entrada tem termos próprios; os HRA abaixo indicam CC BY 4.0. Hospedar arquivos CC licenciados é possível conforme condições e atribuição; NIH não concede automaticamente direitos sobre tudo o que hospeda. Páginas públicas consultadas; conta/restrição do download exato não verificada. | Há procedência de imagem e referências em várias entradas; não equivale a revisão de malha ou confirmação de anatomia típica. Muitos casos cardiológicos são patológicos. |
| [Human Reference Atlas — 3D Reference Objects](https://humanatlas.io/3d-reference-library), consórcio HRA/HuBMAP | Órgãos de referência e GLB; [VCCF](https://humanatlas.io/vccf) lista vasculatura masculina/feminina GLB e tabelas. | Página declara CC BY 4.0 e citações por versão; pode ser distribuído/adaptado, inclusive na web, respeitando atribuições e alterações. Visualização pública; cadastro para o arquivo específico não verificado; preço não identificado. | Proveniência Visible Human ou Allen, com modificações documentadas; modelo de referência individual, não retrato de toda variabilidade humana. |
| [BodyParts3D / LSDB Archive](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/desc.html), Database Center for Life Science / ROIS, Kousaku Okubo | Modelo segmentado de corpo masculino adulto, conceitos ligados à FMA; [download oficial](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html) lista OBJ e tabelas. | [Licença atual do arquivo](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html), atualizada em 2025, declara **CC BY 4.0** e atribuição específica. Página informa redistribuição e derivados. Links públicos; cadastro, pagamento e funcionamento do arquivo na aquisição não verificados. Para versões históricas/espelhos e seus derivados, verificar licença do arquivo exato: não presumir retroatividade. | Fundamentação institucional e segmentação documentadas; representação de referência masculina adulta, baixa resolução em conjuntos reduzidos. OBJ requer conversão para GLB e inspeção. |
| [Z-Anatomy — modelos Blender](https://github.com/Z-Anatomy/Models-of-human-anatomy), Gauthier Kervyn e colaboradores | Atlas baseado em BodyParts3D, com ossos, músculos, vasos, nervos e órgãos; distribuição como template Blender/ZIP. Exportação para GLB exigiria processamento. | Repositório declara CC BY-SA 4.0, mas credita BodyParts3D sob CC BY-SA 2.1 Japão e enumera componentes de terceiros **CC BY-NC-SA 4.0** e **CC BY-NC 4.0**. Não assumir licença homogênea; auditar cada estrutura, textura e derivação antes de uso web. ZIP público, necessidade de cadastro ou ferramentas não verificada. | Dados organizados/rotulados para atlas, mas anatomia, transformação e autoria de cada parte não foram verificadas. Projeto geral não autoriza automaticamente todos os componentes. |
| [Open3DModel / AnatomyTOOL](https://anatomytool.org/open3dmodel-create), projeto acadêmico ligado ao LUMC e parceiros | Página indexada lista esqueleto, vértebras, crânio, membro superior/inferior em BLEND, OBJ e GLB, com modelos por seleção. [Exemplo: mão/punho](https://anatomytool.org/content/open3dmodel-hand-and-wrist-bones-and-cartilages-english-labels); [plexo braquial](https://anatomytool.org/content/open3dmodel-brachial-plexus-and-supplied-nerves-english-labels). | Página indexada indica CC BY-SA para modelos e GPL-3 para viewer; são direitos diferentes. A própria lista cita texturas CC BY-NC-SA: verificar versão da licença e quais texturas integram **cada** pacote antes de qualquer uso comercial/redistribuição. O acesso direto à página principal de arquivos retornou HTTP 500 na consulta; disponibilidade, custo e cadastro não verificados. | Projeto relata revisão/remalhagem acadêmica e seleção individual em páginas de visualização; não inspecionamos os arquivos nem a separação do GLB. **Em espera jurídica/técnica**, não aprovado. |
| [Sketchfab](https://sketchfab.com/), plataforma de terceiros, direitos por autor/item | Vários formatos, por exemplo [coração Mesh-Magnet](https://sketchfab.com/3d-models/human-heart-3d-model-anatomy-medical-project-5da08bb137014f0392c69f9997f777cd) informa FBX/STL/GLB/GLTF e 20,4 mil triângulos. | Item informa CC BY 4.0; isso permite adaptação e redistribuição sob os termos da licença, com crédito; confirmar autoria, direitos sobre texturas e condições da plataforma. Gratuito não significa domínio público; acesso/conta para download não foi testado. | Origem científica, seleção e anatomia não documentadas na página; conteúdo promocional indicado. **Referência ilustrativa em espera, não candidata aprovada**. |
| [SIO / VOXEL-MAN](https://www.virtual-body.org/news/3d-anatomy-model-published-under-cc-license/), University Medical Center Hamburg-Eppendorf | Órgãos internos em dados voxel/TIFF, não GLB pronto; potencial para segmentação e reconstrução. | Página declara CC BY; versão exata, metadados, atribuição e acesso ao conjunto devem ser conferidos no repositório de dados. Não converter ou hospedar até esclarecimento. | Procedência acadêmica de dados segmentados; segmentação volumétrica não é automaticamente modelo otimizado para web. |

### Conflito de licença identificado

O [arquivo oficial atual de BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html) declara **CC BY 4.0**, enquanto o [repositório Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy#attributions) descreve a origem BodyParts3D como **CC BY-SA 2.1 Japão**. Isso pode refletir versões e cadeias diferentes; não são licenças intercambiáveis. A licença da página atual não extingue automaticamente condições de um derivado anterior. Antes de incluir qualquer arquivo: fixar versão, origem, autorizações e termos de cada componente, confirmar compatibilidade e procurar esclarecimento do titular quando necessário.

## 2. Tabela comparativa de licenças

| Licença | Educação e web | Modificação e redistribuição | Condições e alertas |
|---|---|---|---|
| [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | Permitidas, inclusive comercial | Permitidas | Crédito adequado, link à licença, indicar alterações; identificar direitos de terceiros e fonte. |
| [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Permitidas, inclusive comercial | Permitidas | Crédito, indicação de alterações e mesma licença/compatível para material adaptado; avaliar juridicamente combinação e fronteira entre asset, código e outras obras. |
| [CC BY-SA 2.1 Japão](https://creativecommons.org/licenses/by-sa/2.1/jp/) | Sujeitas ao texto da licença | Derivados sob condições da versão aplicável | Atribuição e compartilhamento nas condições do instrumento aplicável; analisar compatibilidade de versão em derivados. |
| [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) e [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) | Apenas não comercial conforme a licença; educação não é automaticamente não comercial | BY-NC permite adaptações não comerciais; NC-SA também exige compartilhamento equivalente de adaptações | Excluir do piloto com uso comercial indefinido; buscar autorização separada caso necessário. |
| [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) | Uso não comercial; exame das condições ainda necessário | Distribuição de adaptações vedada | Conversão, simplificação ou integração que resulte em adaptação exige análise/autorização; não usar no pipeline proposto. |
| [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) / declaração de domínio público | Depende do instrumento e jurisdição | Conforme instrumento | Não presumir CC0 a partir do rótulo genérico “Public Domain”; verificar procedência e direitos residuais. |

## 3. Catálogo de candidatos por sistema

Todos os itens são **candidatos para triagem**, não modelos aprovados. As URLs abaixo são páginas originais de cada entrada/coleção; não são links de download dos arquivos. Nos itens NIH, a licença indicada é a da página consultada. Tamanho, polígonos, topologia e nomes internos não publicados na página são **desconhecidos**, salvo quando explicitamente citados. Não combinar modelos de diferentes pessoas/versões como se estivessem espacialmente alinhados.

| Sistema / necessidade | Modelo e licença informada | Formato/proveniência documentada; limites |
|---|---|---|
| Esquelético: crânio | [Skull and Eyes — 3DPX-020591](https://3d.nih.gov/entries/3DPX-020591), CC BY 4.0 | GLB de entrada com UV e normal maps; crânio segmentado de CT, olhos modelados de maneira aproximada. Separação dos ossos não verificada. |
| Esquelético: membro inferior | [Femur Left — 3DPX-016823](https://3d.nih.gov/entries/3DPX-016823), CC BY 4.0 | Malha identificada como fêmur esquerdo; formato específico, resolução e origem primária do material precisam ser conferidos. |
| Esqueleto completo, coluna, caixa torácica, pelve e membros | [Open3DModel — catálogo original](https://anatomytool.org/open3dmodel-create), esqueleto/vértebras/crânio/membros, **CC BY-SA indicado, versão do arquivo e componentes pendentes** | A listagem indexada relata GLB para esqueleto e vértebras e modelos por seleção; arquivo não inspecionado. Pelve e caixa torácica não têm aqui um item individual com licença verificada. |
| Muscular: membro superior | [Visible Human Male Left Arm Muscles — 3DPX-012628](https://3d.nih.gov/entries/3DPX-012628), CC BY 4.0 | Segmentação de imagens cryo/CT e remalhagem. Página relata músculos e ossos; seleção individual, profundidade e formato final dependem de inspeção. |
| Muscular: superficial, profundo, tronco e membros | [Open3DModel — membro superior/inferior](https://anatomytool.org/open3dmodel-create), **CC BY-SA indicado, versão e texturas pendentes** | Catálogo indexado descreve GLB e grupos musculares; tronco e separação por músculo não confirmados. |
| Nervoso: encéfalo | [Brain Male — 3DPX-020960](https://3d.nih.gov/entries/3DPX-020960), CC BY 4.0 para a versão indicada na página | GLB, baseado no Allen Human Reference Atlas; página diz 141 estruturas espelhadas e redimensionadas. Se nós individuais estão preservados é desconhecido. |
| Nervoso: medula | [Spinal Cord Female — 3DPX-020988](https://3d.nih.gov/entries/3DPX-020988), CC BY 4.0 | GLB HRA baseado em Visible Human; página informa variação individual de seis vértebras lombares. Não apresentar como anatomia universal. |
| Nervoso: periféricos | [Open3DModel — plexo braquial](https://anatomytool.org/content/open3dmodel-brachial-plexus-and-supplied-nerves-english-labels), CC BY-SA indicada na página do item; versão/material do arquivo pendente | Página relata interação individual no viewer; não é confirmação da organização do GLB de origem. |
| Cardiovascular: coração | [Heart Male — 3DPX-021000](https://3d.nih.gov/entries/3DPX-021000), CC BY 4.0 | GLB HRA, derivado de Visible Human Male. Partes internas, malha e relações com outros arquivos não verificadas. |
| Cardiovascular: coração, aorta e rins | [Heart, Aorta and Kidney CAD — 3DPX-000906](https://3d.nih.gov/entries/3DPX-000906), CC BY 4.0 | Base em CT conforme página; formato e separação dos componentes não verificados. |
| Cardiovascular: artérias e rede | [HRA VCCF — vasculatura](https://humanatlas.io/vccf), CC BY 4.0 informada na página da coleção | Página lista GLB masculino/feminino; arquitetura de nós, tamanho e licença específica da versão a registrar antes da escolha. Veias cavas separadas não confirmadas. |
| Respiratório: pulmão | [Lung Male — 3DPX-021008](https://3d.nih.gov/entries/3DPX-021008), CC BY 4.0 | GLB HRA; página informa que versão 1.3 retém lobos e brônquios intrapulmonares e remove traqueia/ brônquios principais. Não garante nós selecionáveis. |
| Respiratório: traqueia | [Trachea Male — 3DPX-021021](https://3d.nih.gov/entries/3DPX-021021), CC BY 4.0 | GLB HRA, separado do pulmão segundo descrição; alinhamento com o arquivo do pulmão não verificado. |
| Respiratório: brônquios principais | [Main Bronchus Male — 3DPX-021010](https://3d.nih.gov/entries/3DPX-021010), CC BY 4.0 | GLB HRA; separação do arquivo pulmonar documentada; separação direita/esquerda no GLB não verificada. |
| Digestório: fígado | [Liver Male — 3DPX-021007](https://3d.nih.gov/entries/3DPX-021007), CC BY 4.0 | GLB HRA, Visible Human Male; detalhes internos e geometria não inspecionados. |
| Digestório / endócrino: pâncreas | [Pancreas Male — 3DPX-021013](https://3d.nih.gov/entries/3DPX-021013), CC BY 4.0 | GLB HRA; a página menciona revisões anatômicas por versão. Não demonstra ilhotas ou funções endócrinas. |
| Urinário: rim | [Kidney Male Right — 3DPX-021002](https://3d.nih.gov/entries/3DPX-021002), CC BY 4.0 | GLB HRA; página exibe nome v1.2 e descreve alterações v1.3: fixar e verificar versão concreta antes de usar. |
| Reprodutor: útero | [Uterus Female — 3DPX-020996](https://3d.nih.gov/entries/3DPX-020996), CC BY 4.0 | GLB HRA, Visible Human Female; órgãos internos/seleção não verificados. |
| Linfático: órgão associado | [Spleen Female — 3DPX-020989](https://3d.nih.gov/entries/3DPX-020989), CC BY 4.0 | GLB HRA; baço não equivale à rede linfática completa. |
| Sensorial: olho | [Eye Female Right — 3DPX-020963](https://3d.nih.gov/entries/3DPX-020963), CC BY 4.0 | GLB HRA, página documenta alterações de íris, músculos e nervo entre versões. Seleção de partes não verificada. |

**Lacunas reais:** não há candidato individual suficientemente verificado nesta pesquisa para glândulas endócrinas específicas, rede linfática 3D completa, camadas da pele, nervos periféricos em GLB com cadeia clara, veias cavas individuais, nem modelos confirmados para todas as regiões esqueléticas e musculares solicitadas. Pâncreas e baço cobrem apenas partes desses sistemas. A existência de uma coleção não prova cobertura ou licença de cada malha.

## 4. Critérios de curadoria e avaliação anatômica

| Critério | Evidência nesta fase | Portão para a próxima fase |
|---|---|---|
| Fidelidade / proporção / posição | Procedência e referências declaradas em alguns itens; sem validação anatômica própria | Anatomista revisa marcos, lateralidade, posição, relações, variações e limitações da amostra; rejeitar ou rotular abstrações. |
| Individualização / nomes | Alguns arquivos por órgão; Open3DModel relata seleção em seu viewer | Inspecionar hierarquia, nós e metadados; verificar correspondência inequívoca malha ↔ estrutura; não inventar subdivisões. |
| Topologia / materiais / texturas | Skull and Eyes informa UV e normal maps; Sketchfab informa 20,4 mil triângulos | Medir buracos, normais, artefatos, triângulos, transparência, materiais compartilhados, texturas e direitos associados. |
| Formato e otimização | GLB declarado para itens HRA; OBJ BodyParts3D; BLEND Z-Anatomy | Validar glTF 2.0, nós, materiais, extensões, escalas, câmera, importação R3F e renderização real. |
| Direitos / proveniência | Página e licença consultadas | Preservar autor, versão, arquivo original, instruções de atribuição e evidência de termos; verificar direitos em imagens, texturas e fontes derivadas. |
| Conteúdo didático | Referências institucionais são pista de procedência, não garantia | Revisão clínica/educacional independente; confrontar atlas e aulas, sem alterar o currículo nesta fase. |

## 5. Tamanhos e desempenho

- BodyParts3D anuncia pacotes OBJ reduzidos de **136 MB** (IS-A) e **62 MB** (PART-OF), valores para ZIP do conjunto completo, não para um órgão ou GLB web. Fonte: [download oficial](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html).
- Os tamanhos reais dos GLB candidatos NIH/HRA e dos pacotes Open3D não estavam expostos nas páginas consultadas: **desconhecidos**. Triângulos e bytes em memória também desconhecidos. Não extrapolar o tamanho final dos pacotes OBJ para GLB.
- Para planejamento inicial, propor **metas, não estimativas observadas**: até 5 MB transferidos por cena piloto em conexão fria, até 200 mil triângulos visíveis e nenhuma regressão perceptível no controle; revisar metas após medir baseline e dispositivos reais. Registrar por versão bytes antes/depois, gzip/Brotli de rede, texturas descompactadas, memória GPU/JS, draw calls, tempo de primeiro frame e FPS em mobile/desktop. Nenhuma meta é garantia.
- Fase 11.1: JS inicial de aproximadamente **940 KB / 266 KB gzip**, laboratório lazy de **949 KB / 252 KB gzip**; números do build relatado em `3797202`, não medição nova de assets anatômicos.
- Draco pode reduzir geometria, mas acrescenta decoder, CPU e latência; Meshopt pode ajudar em geometria/streaming, sujeito à extensão presente no GLB e ao suporte de loader/decoder. Texturas podem dominar memória mesmo quando compactadas; KTX2 requer suporte e transcodificador. Comparar **sem compressão vs. Draco vs. Meshopt**, com custo integral de decoders e renderização, antes de adicionar qualquer dependência. Não aplicar ambos por padrão.

## 6. Compatibilidade e arquitetura proposta — não implementada

### Situação atual confirmada no código

- `src/components/LazyLab3D.tsx` faz `React.lazy` do laboratório; `App.tsx` e `pages/Library.tsx` usam esse wrapper. Na página Sistemas o `key={sel}` remonta o laboratório ao trocar sistema.
- `Lab3D.tsx` filtra `STRUCTURES` por sistema; `ShapeMesh` cria primitivas, faz `onClick`, muda emissive, escurece demais objetos e usa `Html` para etiqueta. Isolamento filtra as estruturas visíveis. `OrbitControls` fornece rotação/zoom/pan.
- Quiz escolhe estruturas disponíveis, destaca alvo, esconde nome/painel até resposta e chama `recordId3d` com o `id` existente. Informações vêm do mesmo `StructureDef` da biblioteca. As aulas abrem o laboratório genérico, não selecionam hoje um sistema ou estrutura específico.
- `StructureDef` mistura dados educacionais com posição, escala e tipo de geometria. `SystemId` não inclui endócrino nem linfático. `id3d` em `anatomia3d_v1` guarda identificador, acerto e data: alterar IDs existentes quebraria continuidade sem migração cuidadosa.

### Desenho futuro

1. Manter renderizador esquemático existente como opção explícita e fallback, sem substituição silenciosa. Criar um contrato de cena com estruturas lógicas, IDs estáveis, disponibilidade e correspondência com geometria; separar metadados didáticos da definição gráfica, preservando compatibilidade.
2. Manifesto por sistema/região/versão, em assets estáticos versionados ou armazenamento próprio autorizado; carregar apenas o GLB ativo com `GLTFLoader`/`useGLTF` (já incluídos na stack), sob `Suspense` e boundary de erro. Nenhuma chamada a serviços externos nem backend é necessária para o piloto. Loading, erro e fallback acessível devem ser explícitos.
3. Uma tabela auditada mapeia **ID interno existente** a um ou mais nós nomeados/caminhos estáveis; usar correspondência por versão e validar unicidade. Estruturas não separadas ficam não selecionáveis, sem fingir que o arquivo possui subdivisões. ID novo requer plano de compatibilidade com `id3d`, favoritos e biblioteca; manter registros antigos intactos.
4. Raycasting aponta para ancestral mapeado; clique/lista/teclado atualizam uma única seleção. Múltiplas malhas podem representar uma estrutura; isolamento alterna visibilidade por grupo, com opção de restaurar. Gerenciar cópias de materiais para não destacar objetos indevidos quando compartilham material; preservar materiais originais.
5. A etiqueta é posicionada em âncora explícita ou centro geométrico validado; painel busca metadados e licença; câmera ajusta bounding box para dimensões reais, unidades e eixo. Conservar `OrbitControls` e testar toque, pan e acessibilidade.
6. Quiz recebe somente estruturas carregadas e identificáveis; ocultar nome, lista realçada e painel até a resposta, evitar respostas idênticas, registrar o mesmo `recordId3d` sem reset. Falha de arquivo não deve gravar tentativas falsas.
7. Reaproveitar geometria enquanto necessária; definir cache com limite, descarte de `geometry`, `material`, texturas, ImageBitmap, controle e loaders na troca/desmontagem, sem invalidar ativos compartilhados em cache. Medir context loss, GPU e CPU antes de implementar uma política de descarte.
8. Em Sistemas, usar mesma cena/manifesto; em aulas, planejar vínculo explícito por `day` e módulo. Estender sistemas endócrino/linfático apenas com decisão curricular/produto e compatibilidade, nunca modificar os dados atuais automaticamente.

## 7. Padrão proposto de metadados

Exemplo **esquemático**, com valores ilustrativos e sem afirmar nomes de nós, tamanhos, checksum ou URLs de download. A ligação `pulmao-d` já existe no projeto; a correspondência física com um nó do candidato ainda precisa ser comprovada.

```json
{
  "schemaVersion": 1,
  "assetId": "respiratorio-piloto",
  "assetVersion": "a-fixar-apos-aquisicao",
  "systemId": "respiratorio",
  "format": "glb",
  "source": {
    "title": "Lung, Male",
    "creator": "Human Reference Atlas",
    "pageUrl": "https://3d.nih.gov/entries/3DPX-021008",
    "licenseId": "CC-BY-4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "attribution": "A confirmar conforme instruções da versão",
    "accessedAt": "2026-11-21",
    "modifications": []
  },
  "file": { "path": null, "sha256": null, "bytes": null },
  "structures": [
    { "structureId": "pulmao-d", "nodePaths": [], "mappingStatus": "pendente", "lessonDays": [], "externalOntology": [] }
  ],
  "qualityReview": { "status": "nao-inspecionado", "reviewer": null, "reviewedAt": null, "notes": [] }
}
```

Cada asset e componente deve poder guardar múltiplas fontes/licenças, versão e arquivo original, autores, formato de atribuição, data e evidência, intervenções, transformações/unidades, triângulos, materiais/texturas e hashes medidos. `nodePaths` vazio proíbe seleção até auditoria; `lessonDays` deve ser preenchido com correspondências verificadas em `ALL_DAYS`, sem inventar IDs ou assumir nomenclaturas. URI ontológica deve incluir a fonte e ID realmente verificado. Guardar também posição anatômica, lateralidade, referência humana e aprovação de especialista. Nunca inserir `null` de exemplo como dado validado de produção.

## 8. Piloto e plano detalhado para Fase 12.2 — sujeito a aprovação

**Por que respiratório:** três entradas HRA distintas, com licença CC BY 4.0 nas páginas e GLB declarado; relação espacial pulmão–traqueia–brônquios tem valor didático e é menor em escopo do que um esqueleto completo ou redes vasculares. Arquivos independentes permitem começar com seleção no nível de órgão, mas **não garantem** correspondência espacial ou lobos selecionáveis. Manter o esquema se a triagem falhar. Em alternativa, iniciar com osso único ou catálogo Open3DModel somente após resolução das licenças e validação do arquivo.

1. **Portão de autorização:** obter aprovação do usuário para baixar e avaliar o pequeno conjunto; definir se distribuição comercial é pretendida. Fixar URLs, versões das entradas, termos de acesso, créditos, direitos de textura, e obter avaliação jurídica quando necessário. Rejeitar NC/ND e conflitos não resolvidos para um produto de uso indefinido.
2. **Aquisição controlada:** baixar somente após autorização, em armazenamento temporário/excluído do Git; guardar hash/tamanho original e evidência das licenças. Não versionar arquivos pesados sem decisão de hospedagem e política de artefatos. Segregar variantes masculina/feminina e identificar espécime.
3. **Auditoria técnica e anatômica:** inspecionar nós/triângulos/transformações/texturas/escala e alinhamento; testar GLB e atribuição em navegador; especialista revisa limites, proporções, relações e variações. Definir quais itens realmente podem ser selecionados. Se um dos arquivos não casar espacialmente, não compor uma anatomia incorreta.
4. **Plano de dados:** mapa auditado entre estruturas do piloto e IDs já existentes (`pulmao-d`, `pulmao-e`, `traqueia` somente onde houver evidência), com rastreio de origem/versão e testes de unicidade. Não atribuir identidade pulmonar direita/esquerda sem verificar arquivo.
5. **Protótipo reversível:** implementar separadamente, sem alterar esquema de persistência ou dados do currículo; seleção, isolamento, visibilidade, destaque, etiquetas, informações, quiz, câmera e fallback. Fluxo atual e modo esquemático continuam disponíveis.
6. **Medição e regressão:** testes automatizados do manifesto, mapeamento, export/import e histórico `id3d`; testes do fluxo educacional e build; navegador em 360/390/768/1024/1440, WebGL real e dispositivos físicos quando disponíveis. Medir custo de transferência, primeiro frame, uso de memória, FPS, trocas repetidas e context loss; comparar com baseline. Decidir compressão só com dados.
7. **Aprovação por portões:** aceitar somente com licença/atribuição verificadas, revisão anatômica documentada, seleção correta, teste sem revelação da resposta, restauração segura, ausência de regressão de progresso e desempenho aceitável no hardware-alvo. Caso contrário, corrigir ou manter somente o esquema. Somente após aprovação expandir para esquelético, muscular e demais sistemas.

## 9. Riscos e decisões abertas

- **Jurídico:** licença mudada/versão errada, contribuições NC em conjuntos SA, direitos sobre texturas/nomes, diferença entre hospedagem e uso incorporado. Revisão jurídica antes da publicação; licença de página não comprova cadeia de titularidade.
- **Científico:** malhas de uma única pessoa ou alterações editoriais não cobrem todas as variações; não usar como diagnóstico ou referência clínica. Comparação por anatomista é obrigatória antes de declarar fidelidade.
- **Integração:** agrupamentos ou coordenadas diferentes, estruturas compartilhadas, nós sem nome e materiais compartilhados impedem seleção ou introduzem relações erradas.
- **Desempenho:** downloads grandes, decoding e texturas podem degradar mobile e memória; lazy JS não significa que as malhas sejam leves.
- **Dados:** preservar `anatomia3d_v1`, XP, histórico `id3d`, avaliação, SM-2 e IDs; falhas do viewer não devem escrever registros errôneos.
- **Acesso:** algumas páginas não especificam custo/conta e AnatomyTOOL retornou erro; verificar antes da aquisição. Não foi testado fechar contratos, pagar, cadastrar, baixar ou usar assets.

**Conclusão:** aguardar aprovação expressa antes da Fase 12.2. Não há malhas importadas, recomendações de licença global nem validação anatômica nesta fase.
