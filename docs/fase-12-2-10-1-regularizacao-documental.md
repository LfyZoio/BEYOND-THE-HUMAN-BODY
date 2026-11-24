# Fase 12.2.10.1 — Regularização documental e preparação para distribuição

## 1. Resumo executivo

**APROVADA COM RESSALVAS para a execução documental; publicação e distribuição NÃO APROVADAS.** A fase identificou individualmente os três GLBs e preparou seus créditos, identificou o favicon como idêntico ao template oficial React do Vite com licença específica CC0, organizou as 56 capturas, triou 219 registros de dependências e preparou checklist. Permanecem necessidade de verificação por artefato, direitos de conteúdo próprio, marca, direitos subjacentes e revisão jurídica. A existência de documentação não demonstra cumprimento em uma distribuição real. Não foi solicitada nem obtida autorização de terceiros, e não houve publicação. Análise preliminar, não parecer jurídico.

Contagem operacional desta fase: **5 pendências documentais resolvidas e 10 abertas**, conforme os 15 itens P01–P15 abaixo; não é número de recursos livres de risco. Uma tarefa pode ser resolvida enquanto outra relacionada ao mesmo recurso continua aberta. Nenhuma incompatibilidade crítica foi documentada; riscos não investigados não foram eliminados.

## 2. Estado inicial

Branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD `37972028884c12cc83e96f9619146d9af9568557`; alterações anteriores em `src/App.tsx`, `src/components/Lab3D.tsx`, `src/index.css` e arquivos não rastreados de fases anteriores foram preservados. Documentos de 12.2.10 e inventários consultados antes de alterações. Favicon e três GLBs já existentes; `package.json`/lock preservados. Manifesto inicial de 38 arquivos (`src/`, `public/`, `package.json`, `package-lock.json`, `index.html`) = `062e52de315877e584f59c06bd6b013df3d140876a4f1fdbc01993545e21e211`. Método: ordenar caminhos lexicograficamente, concatenar UTF-8 `caminho`, NUL, SHA-256 hexadecimal do conteúdo e LF, depois aplicar SHA-256 ao concatenado. Isso verifica conteúdo, não comportamento nem cada arquivo fora desses diretórios.

## 3. Pendências herdadas e consolidação

A classificação abaixo distingue tarefas efetivamente concluídas das que foram apenas encaminhadas. Prioridade crítica somente se houver incompatibilidade relevante documentada; alta para recurso essencial sem autorização verificável; média para documentação incompleta/atribuição; baixa para melhoria sem impacto imediato demonstrado. Responsáveis sugeridos, não contatados.

| ID | Recurso | Pendência / evidência atual | Ação e responsável sugerido | Categoria | Prioridade | Estado |
|---|---|---|---|---|---|---|
| P01 | GLBs | Atribuições separadas, dados HRA individuais | Registrar três textos no notices; mantenedor | documental | média | RESOLVIDA documentalmente |
| P02 | Favicon | Identidade e licença específica não identificadas em 12.2.10 | Comparar blob e licença do template oficial; mantenedor | documental | média | RESOLVIDA quanto à correspondência e licença declarada |
| P03 | Capturas | Inventário anterior sem análise de composição por arquivo | Revisar 56 miniaturas, caminhos e direitos potenciais; editor | documental | média | RESOLVIDA a triagem, não direitos de publicação |
| P04 | Dependências | Lock sem agrupamento por tipo ou indicadores de documentação | Acrescentar classificação e evidências a 219 registros; engenharia | documental | média | RESOLVIDA a triagem, não conformidade individual |
| P05 | Publicação | Faltava checklist com critérios e responsáveis | Elaborar checklist; mantenedor | documental | baixa | RESOLVIDA elaboração |
| P06 | GLBs/canais | Créditos no documento e UI, mas não comprovados em GLBs isolados/site/pacote | Testar créditos e avisos nos canais; release + jurídico; depende de P01 e definição do artefato | documental/jurídica | média | ABERTA |
| P07 | HRA/NLM | Dados Visible Human e divergência NIH não esclarecidos; sem resposta externa | Consultar HRA/NLM ou obter análise jurídica; responsável de direitos; depende dos registros HRA | contato/jurídica | média | ABERTA |
| P08 | Favicon/marca | CC0 do template não resolve marca nem identidade visual | Analisar uso como identidade; se preciso obter permissão; jurídico + titular | jurídica/possível autorização expressa | média | ABERTA |
| P09 | Código e conteúdo | Ausência de licença e cadeia de titularidade verificáveis | Identificar autores e obter licença/autorização do titular; titular + jurídico | autorização expressa | alta | ABERTA |
| P10 | Capturas | 56 imagens compostas; titularidade e canal não decididos | Verificar por imagem, atribuir/obter permissão quando aplicável; editor + jurídico; depende P03/P09 | documental/autorização/jurídica | média | ABERTA |
| P11 | Dependências | Lock não demonstra o que vai ao bundle nem avisos internos completos | SBOM do artefato, conferir textos por versão e notices; engenharia de release; depende do pacote final | documental | média | ABERTA |
| P12 | Fontes | Famílias OFL identificadas; respostas remotas não inspecionadas, privacidade não avaliada | Verificar versão servida e obrigações se copiar; responsável por privacidade e release | documental/jurídica | média | ABERTA |
| P13 | Release | `docs/` e sumário não provam inclusão de LICENSE/NOTICE nos artefatos | Preparar e testar arquivos exigidos em cada distribuição; release; depende P06/P11/P12 | documental | média | ABERTA |
| P14 | Projeto | Nenhuma revisão jurídica formal por cenário | Consultar profissional qualificado; titular; depende de seleção de artefato e evidências | jurídica; não resolvível sem terceiro | média | ABERTA |
| P15 | README / aquisição | README afirma inexistência de GLBs; responsável/data de aquisição não comprovados | Corrigir README em alteração autorizada e tentar recuperar histórico; mantenedor | documental | baixa | ABERTA |

As ações podem ser documentais (P06, P11–P13, P15), depender de contato (P07), eventual autorização expressa (P08–P10) ou avaliação jurídica (P06–P10, P12, P14). P07 e P14 não podem ser concluídas aqui sem agentes externos; também não foi criada autorização para P09. Não há pendência crítica comprovada nesta triagem.

## 4. Regularização dos GLBs

Cada registro oficial identifica criadoras Kristen Browne e Heidi Schlehlein, editor HuBMAP e dados Visible Human Male/NLM, data 15/06/2023. [Créditos individuais](THIRD-PARTY-NOTICES.md#modelos-anatômicos-hra) contêm título, versão, fonte, DOI, licença e mudanças de apresentação. O histórico do projeto não identifica autor/data do download; correspondência com blob não demonstra o percurso de aquisição.

| Modelo | Fonte e licença | Hash SHA-256 antes = depois | Estado |
|---|---|---|---|
| Pulmão v1.3 | [HRA](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode.en) | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` | Atribuição preparada; P06/P07 abertas |
| Traqueia v1.0 | [HRA](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/), CC BY 4.0 | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` | Atribuição preparada; P06/P07 abertas |
| Brônquios principais v1.0 | [HRA](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/), CC BY 4.0 | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` | Atribuição preparada; P06/P07 abertas |

A CC BY 4.0 concede compartilhamento e adaptação, inclusive para fins comerciais, dos direitos que o licenciante pode conceder. Ao compartilhar, preservar informações solicitadas pela seção 3(a), link da licença, indicar alterações e não impor restrições adicionais; versões adaptadas podem ser distribuídas sob licença da adaptação compatível com esses direitos, sem retirar direitos sobre o material CC BY. Não se declara que copyright, marca, privacidade ou outros direitos de terceiros estão resolvidos. Os GLBs não foram modificados; a aplicação adapta exibição e materiais. Materiais internos permanecem byte a byte nos GLBs, sem imagens/texturas declaradas no inventário anterior.

## 5. Favicon: descoberta e limite

`public/favicon.svg`, SVG 48 × 46, `viewBox="0 0 48 46"`, 9.522 bytes, referenciado por `index.html`; sem elementos de metadados, título ou descrição de autor no XML. SHA-256 `61bc9a161de58248288e6905425d7180f0624c2865007b97d763fdac12043a66`. Git local documenta presença em `709ed00`, não a autoria. `git hash-object` produz `6893eb13237060adc0c968a690149a49faa2d7d3`, igual ao da [API do arquivo oficial fixado em 520d13b](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/template-react/public/favicon.svg); tamanho igual. A [licença específica create-vite no mesmo commit](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/LICENSE) dedica os arquivos de diretórios `template-*` a CC0 1.0 Universal. Isto corrige a ausência de fonte/licença da 12.2.10: há correspondência oficial específica, mas não prova de quem adquiriu o arquivo ou autorização de marca. Autor individual não identificado. CC0 não é licença de marca; P08 permanece. Não houve substituição; eventual opção por favicon próprio exige autorização e registro de autoria/licença antes de qualquer mudança.

## 6. Revisão das seis unidades com licença documentada

| ID | Unidade, autor, versão, origem | Licença e usos | Obrigações, modificações e pendências |
|---|---|---|---|
| R001 | Pulmão HRA v1.3, Browne/Schlehlein, [registro](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/) | CC BY 4.0; compartilhar/adaptar, comercial inclusive, com condições | [atribuição individual](THIRD-PARTY-NOTICES.md); GLB inalterado; P06/P07 |
| R002 | Traqueia HRA v1.0, mesmas criadoras, [registro](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/) | CC BY 4.0; mesma permissão condicionada | crédito individual em notices; GLB inalterado; P06/P07 |
| R003 | Brônquios HRA v1.0, mesmas criadoras, [registro](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/) | CC BY 4.0; mesma permissão condicionada | crédito individual em notices; GLB inalterado; P06/P07 |
| R005 | Inter Project Authors, família Inter, versão da fonte remota não fixada, [OFL](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt) | SIL OFL 1.1; usar/modificar/redistribuir com condições, inclusive comercial | licença/copyright com cópias; restrições sobre venda isolada e nomes reservados; bytes servidos desconhecidos, P12 |
| R006 | Manrope Project Authors, família Manrope, versão remota não fixada, [OFL](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt) | SIL OFL 1.1; usar/modificar/redistribuir com condições, inclusive comercial | mesmas obrigações OFL; bytes servidos desconhecidos, P12 |
| R007 | Lucide e colaboradores, `lucide-react` 1.77.0, [licença](https://lucide.dev/license) | ISC; ícones Feather listados também MIT/Cole Bemis; modificação e redistribuição com condições | preservar copyright e textos de licença aplicáveis; identificar ícones incluídos e avisos finais, P11/P13 |

A situação R004/favicon é analisada separadamente na seção 5. O link para CC BY, os links oficiais e informações de uso/modificações aparecem individualmente no documento de avisos. Essas permissões são condições de licenças identificadas, não aprovação do projeto completo.

## 7. Auditoria das 56 capturas

[Revisão das capturas por caminho e SHA-256](revisao-capturas-12-2-10-1.md): todas as 56 miniaturas foram examinadas e seus nomes, scripts e referências existentes correlacionados; os hashes coincidem com o inventário anterior. A leitura dos chunks PNG não encontrou `tIME`, `tEXt`, `iTXt` ou `zTXt`; data de criação e autor individual não foram demonstrados, e o mtime não foi tratado como prova. Há capturas de canvas HRA, interface do piloto, dashboard e laboratório esquemático. Recursos de terceiros potencialmente visíveis incluem GLBs, ícones e fontes; alguns recortes móveis mostram apenas interface. Não se identificou imagem externa incorporada nem captura de site/ferramenta externa, mas a revisão em miniaturas não demonstra ausência de elementos ocultos ou pequenos. Todas são evidências locais, nenhuma automaticamente liberada para publicação: conferir por imagem e por canal, direitos de textos e eventuais créditos/autorização. Nenhuma substituição ou remoção foi feita ou considerada obrigatória sem análise adicional.

## 8. Auditoria das dependências

[Revisão estruturada por registro](revisao-dependencias-12-2-10-1.json), vinculada ao [inventário 12.2.10](inventario-dependencias-12-2-10.json). Das 219 entradas do lock: 6 diretas de produção, 11 diretas dev, 59 transitivas marcadas não-dev e 143 transitivas dev. São caminhos de lock, não pacotes únicos nem prova de inclusão no artefato; 91 são variantes opcionais dev. 218 têm campo de licença no lock; `webgl-constants` não tem, mas seu LICENSE instalado informa MIT. Há 144 manifestos instalados e 119 entradas com arquivos de licença/notice encontrados na busca por padrões, 25 instaladas sem arquivo encontrado por esses padrões. A busca não prova inexistência de notices em outros caminhos.

As seis diretas de produção são importadas em `src`; sua inclusão exata ou extensão no bundle não foi mapeada. `@react-three/fiber` declara MIT, mas não possui LICENSE local identificado; o [upstream](https://github.com/pmndrs/react-three-fiber/blob/master/LICENSE) declara MIT, não se verificou a correspondência exata do texto com o artefato da versão empacotada. `lucide-react` inclui aviso Feather MIT; Vite inclui avisos de dependências empacotadas; 12 entradas `lightningcss`/variantes são MPL-2.0 e dev; Apache e MPL requerem revisão específica se distribuídos. Cada registro apresenta fonte, licença, existência de arquivo detectado, restrições genéricas e uso efetivo conhecido ou desconhecido. Não foi inspecionado o conteúdo interno de todas as 219 dependências nem produzido SBOM de bundle, portanto nenhuma conformidade individual foi atestada. Nenhuma dependência foi atualizada ou removida.

## 9. Sistema de atribuições

[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) organiza modelos, materiais, imagens, ícones, fontes e dependências, com links de fonte/licença e três textos distintos de atribuição. O arquivo é um **sumário de preparação**; não contém todos os textos de licença/NOTICE integrais exigíveis e não foi colocado no build ou nos GLBs. P06/P11/P13 permanecem abertas até análise e inclusão efetiva por canal.

## 10. Matriz preliminar de distribuição

Estados: **PERMITIDO COM CONDIÇÕES** refere-se apenas aos termos publicados da fonte identificada, não à conformidade de uma distribuição; **PENDENTE** significa direitos, notices ou cenário ainda não resolvidos; **NÃO AVALIADO** indica cenário sem material correspondente ou sem análise. **NÃO AUTORIZADO** seria usado somente com proibição comprovada; não se identificou nenhuma. Nenhum cenário foi marcado PERMITIDO DOCUMENTADO para o produto completo.

| Recurso | Uso local | Publicação web | Código-fonte | Redistribuição | Comercial |
|---|---|---|---|---|---|
| Cada GLB HRA CC BY | PERMITIDO COM CONDIÇÕES | PERMITIDO COM CONDIÇÕES | PERMITIDO COM CONDIÇÕES se incluído | PERMITIDO COM CONDIÇÕES, inclusive GLB modificado | PERMITIDO COM CONDIÇÕES |
| Favicon CC0 específico | PERMITIDO COM CONDIÇÕES* | PENDENTE* | PENDENTE* | PENDENTE* | PENDENTE* |
| Fontes remotas Inter/Manrope | PERMITIDO COM CONDIÇÕES | PENDENTE | NÃO AVALIADO para binários não incluídos | PENDENTE se cópias | PENDENTE |
| Lucide/Feather | PERMITIDO COM CONDIÇÕES | PERMITIDO COM CONDIÇÕES | PERMITIDO COM CONDIÇÕES | PERMITIDO COM CONDIÇÕES | PERMITIDO COM CONDIÇÕES |
| Dependências como conjunto | PENDENTE | PENDENTE | PENDENTE | PENDENTE | PENDENTE |
| Código, conteúdo próprio e capturas | PENDENTE | PENDENTE | PENDENTE | PENDENTE | PENDENTE |
| Pacote completo / instituição | PENDENTE | PENDENTE | PENDENTE | PENDENTE | PENDENTE |

*CC0 trata direitos que o dedicante pode renunciar/licenciar; direitos de marca e cadeia do arquivo local ainda precisam de avaliação. Instituições estão incluídas na última linha; monetização é o cenário comercial. Distribuir modelos isolados exige P06 e observar a licença de cada um. Nenhum pacote foi avaliado ou preparado para efetiva distribuição.

## 11. Checklist de publicação

[Checklist de publicação e conformidade](checklist-publicacao-conformidade.md) distingue exigências aplicáveis de recomendações, com estado, evidência, responsável sugerido e conclusão. Identificação de modelos e correspondência específica do favicon estão concluídas; atribuições por canal, licenças completas, direitos próprios, capturas, marca e validação jurídica permanecem pendentes. Conclusão do checklist deve ser feita contra o artefato real.

## 12. Plano das pendências remanescentes

P06–P15 estão abertas na seção 3. Detalhamento operacional (complexidade estimada, dependências e conclusão):

| ID | Complexidade | Dependências | Critério de conclusão |
|---|---|---|---|
| P06 | média | P01, canais/artefatos | Créditos e avisos verificados em UI, código, cada GLB e pacote conforme a distribuição escolhida |
| P07 | alta | registros HRA, resposta externa | Registrar resposta de titulares ou avaliação jurídica da cadeia e divergência NIH |
| P08 | média | identificação P02 | Decisão de marca documentada e eventual autorização obtida |
| P09 | alta | identificação dos autores/titulares | Cadeia de direitos e licença/autorização expressa documentadas |
| P10 | alta | P03/P09 e cenário de publicação | Decisão por captura selecionada, créditos e eventual permissão |
| P11 | alta | artefato de release | SBOM real e revisão de avisos internos e textos por versão |
| P12 | média | versão e modo de entrega | Respostas/licenças identificadas, condições OFL e privacidade revisadas |
| P13 | média | P06/P11/P12 | Textos e avisos necessários incluídos e acessíveis nos artefatos escolhidos |
| P14 | alta | cenário definido e evidências disponíveis | Parecer de profissional qualificado e decisão dos responsáveis |
| P15 | baixa | autorização e evidência de aquisição | README corrigido e histórico recuperado ou lacuna explicitamente aceita |

Não existe substituição automática planejada; quaisquer mudanças de ativo requerem autorização explícita. Contato ou recomendação não são autorização nem resolução.

## 13. Evidências

Fontes e hashes individualizados na [auditoria 12.2.10](fase-12-2-10-auditoria-licencas-proveniencia.md), [inventário de recursos](inventario-proveniencia-recursos.md), [inventário anterior de dependências](inventario-dependencias-12-2-10.json), notices, revisão de capturas e revisão de dependências desta fase. [Texto CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode.en), metadados e registros HRA individuais citados no notices; licença do template Vite fixada na seção 5; LICENSE local Lucide; [OFL Inter](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt) e [Manrope](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt). A diferença NIH entre identificação masculina e nome com `f` continua não resolvida; nenhum arquivo NIH foi baixado para comparação.

## 14. Testes e integridade

`npm run build`: sucesso, aviso preexistente de chunks >500 kB; `npm run lint`: sucesso, 0 erros, 1 aviso preexistente `src/store.tsx:18`. Hashes dos três GLBs, favicon, package.json e package-lock são idênticos no início e fim; `package.json` `5011b2c8e3262366466c12d5deb474b5e08b05b76ae925d6c70a1203f748d721`, `package-lock.json` `c30c0384b4e28093a8fd44c204003333862efca6f5aa023fa7dec2fae44a222a`. O manifesto dos 38 arquivos repetiu o mesmo hash inicial. Texturas/materiais incorporados foram preservados pelos hashes GLB; nenhuma textura separada foi identificada no escopo `src/public`. Código e dados da aplicação não mudaram, inclusive currículo, questões, flashcards, SM-2, XP, localStorage e importação/exportação. Isso é verificação de integridade de arquivos, não teste funcional exaustivo. Os novos arquivos estão em `docs/`, não importados pela aplicação; build/lint passaram após sua criação. Não foram executados testes de navegador, direitos jurídicos ou contagem funcional de conteúdo nesta fase; resultados anteriores não são reexecução atual.

## 15. Limitações

Classificação individual de capturas foi feita em miniaturas; elementos pequenos podem escapar. Datas e autoria de capturas e aquisição de GLBs não foram comprovadas. Lock, manifestos e alguns arquivos LICENSE foram triados, mas 75 registros não estavam instalados, arquivos internos e avisos de todos os pacotes não foram examinados individualmente, e não foi produzido mapa de bundle/SBOM. Fontes remotas não foram baixadas; não foi provada conformidade de cada distribuição. A correspondência de blob e licença do favicon não resolve marca. Nenhum titular ou advogado foi consultado. O README permanece desatualizado. Avaliação científica e anatômica não é objetivo desta fase.

## 16. Riscos

Prioridade alta: autorização e licença do código/conteúdo do projeto ausentes (P09). Prioridade média: atribuição e notices por canal, direitos HRA/NLM e imagem NIH, marca do favicon, 56 capturas, obrigações das dependências e fontes, jurídico (P06–P08, P10–P14). Prioridade baixa: README e data de aquisição (P15). Nenhuma incompatibilidade crítica comprovada; persistem riscos desconhecidos e falta de aprovação de distribuição.

## 17. Conclusão e arquivos

**APROVADA COM RESSALVAS** quanto à organização documental, sem afirmar conformidade jurídica definitiva. Criados nesta fase: este relatório, `docs/THIRD-PARTY-NOTICES.md`, `docs/checklist-publicacao-conformidade.md`, `docs/revisao-capturas-12-2-10-1.md` e `docs/revisao-dependencias-12-2-10-1.json`. Nenhum arquivo existente da aplicação ou documentação anterior foi modificado; build escreveu saídas geradas ignoradas. Não houve commit, publicação ou substituição de recursos. Aguardar autorização explícita; não iniciar a Fase 12.2.11.
