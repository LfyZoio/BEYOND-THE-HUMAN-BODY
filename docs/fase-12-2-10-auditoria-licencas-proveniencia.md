# Fase 12.2.10 — Auditoria preliminar de licenças e proveniência

**Resultado: AUDITORIA CONCLUÍDA COM RESSALVAS; conformidade para publicação ou distribuição NÃO APROVADA.** Data da análise: 21/11/2026 (UTC). Isto é investigação técnica/documental preliminar, não parecer jurídico, autorização de titulares ou validação anatômica.

## 1. Objetivo e escopo

Identificar recursos externos incorporados, carregados ou representados em evidências, licenças declaradas, cadeia de proveniência, condições de uso e lacunas para diferentes distribuições. A análise cobre os três GLBs respiratórios, seus componentes declarados, favicon, fontes, ícones, capturas locais e registros diretos/transitivos do lock. Código, conteúdo e imagens de possível autoria própria são discutidos separadamente, sem presumir direitos.

## 2. Método e limites

Inspeção de `public`, `src`, `index.html`, imports, metadados e geometria GLB de auditorias anteriores; `package.json`, `package-lock.json`, manifestos e licenças presentes em `node_modules`; Git; páginas HRA, fontes e licenças oficiais; hashes SHA-256 e Git blob. A varredura excluiu `.git`, `node_modules`, saídas de build e caches para a contagem de ativos; dependências foram analisadas separadamente. Documentos e arquivos JSON de auditoria podem conter referências ou dados derivados e não foram tratados como um inventário exaustivo de direitos de todos os textos. Não houve entrevista com titulares, consulta jurídica nem exame de cada arquivo de cada pacote, asset eventualmente carregado por caminhos dinâmicos ou resposta remota. `dist` é produto gerado, não outra aquisição.

## 3. Inventários e classificações

- [Inventário dos recursos e 56 imagens](inventario-proveniencia-recursos.md), com caminho, tamanho e SHA-256 dos arquivos locais e fontes.
- [Inventário estruturado dos 219 registros do lock](inventario-dependencias-12-2-10.json): versões, licenças declaradas, origem, SRI, autor, hashes de manifestos e licenças locais quando disponíveis. Uma entrada representa um caminho/versão do lock, não necessariamente um pacote único nem componente no bundle. SRI não foi recalculado; ele identifica o tarball, não os arquivos instalados.
- Classes desta fase: **A** conformidade documentada para o uso/distribuição especificado; **B** licença/origem documentada ou provável, com verificações de cumprimento pendentes; **C** origem, cadeia ou condições pendentes; **D** incompatibilidade documentada para cenário específico; **E** licença/autorização identificável ausente. E não significa ilegalidade comprovada. A–E não são as classes anatômicas da fase anterior.

## 4. Resumo quantitativo com denominadores

Entre **7 unidades diretamente usadas** (3 GLBs, favicon, 2 famílias de fontes e conjunto de ícones), 6 têm licença de fonte/documentação identificada mas cumprimento não totalmente comprovado (B); 1 favicon sem autorização identificada (E); 0 A, 0 C e 0 D. As licenças das famílias de fontes não provam a identidade dos bytes remotos variáveis. Os 56 PNGs de evidência são C por direitos do conteúdo retratado e cadeia da captura, embora gerados em auditorias locais; não os somar como recursos de runtime. Nos **219 registros de lock**, 218 têm campo de licença e um não; o pacote instalado `webgl-constants` tem LICENSE MIT, resultando em 219 com alguma evidência de licença declarada/texto local, todos B como triagem, nenhum com conformidade de distribuição individual comprovada. Em 144/219 há manifesto instalado; em 119/219 identificou-se arquivo de licença/notice pelo padrão de nomes buscado. Não são contagens de licenças juridicamente confirmadas para todos os componentes internos.

Distribuição das declarações no lock: MIT 163, Apache-2.0 28, MPL-2.0 12, ISC 6, BSD-3-Clause 3, 0BSD 2, BSD-2-Clause 2, BlueOak-1.0.0 2 e ausente 1. Zero incompatibilidades documentadas **não** significa ausência de incompatibilidades.

## 5. Proveniência e verificação dos GLBs

| Arquivo local | Registro individual | Blob Git local = oficial | SHA-256 | Status |
|---|---|---|---|---|
| `lung.glb` | [pulmão masculino v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/), [metadados](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/lung-male/v1.3/raw/metadata.yaml), DOI 10.48539/HBM737.FFBT.876 | `dbbfdaf4cc51ea7d75cb0887b8fa003b8da9c00a` | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` | B |
| `trachea.glb` | [traqueia masculina v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/), [metadados](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/trachea-male/v1.0/raw/metadata.yaml), DOI 10.48539/HBM969.WCCJ.636 | `06ebbd9354ff122ad38fffece39b7768e8f8475d` | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` | B |
| `main-bronchus.glb` | [brônquios principais masculinos v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/), [metadados](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/main-bronchus-male/v1.0/raw/metadata.yaml), DOI 10.48539/HBM795.LVRX.842 | `7f9e7c6e981ef044f848844afb914f0b206c2a3d` | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` | B |

Todos em `public/models/respiratorio/`. A API GitHub retorna os mesmos blobs tanto nos caminhos HRA específicos dos registros como na [biblioteca fixada](https://github.com/hubmapconsortium/ccf-3d-reference-object-library/tree/f1a3a63f110e27ff0736047d52d04dba5d3087f9/VH_Male/v1.4). Comparação Git blob estabelece correspondência dos conteúdos representados pela API, não identifica responsável, momento ou canal efetivo da aquisição anterior. Os SHA-256 iniciais e finais coincidem exatamente. Arquivos locais não foram transformados nesta fase; agrupamento, câmera, cores e visualização na aplicação são adaptações de apresentação. Os metadados identificam Kristen Browne e Heidi Schlehlein, HuBMAP, dados Visible Human Male/NLM, data de criação 15/06/2023 e CC BY 4.0. Traqueia e brônquios foram separados do pulmão v1.2; o pulmão v1.3 remove essas estruturas maiores, mantendo intrapulmonares. Data e autoria da aquisição e eventuais transformações pré-HRA não foram estabelecidas independentemente.

## 6. Condições CC BY e créditos existentes

A [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode.en) permite compartilhar e adaptar, inclusive comercialmente, sujeita a atribuição adequada, indicação de mudanças, link da licença, manutenção de avisos aplicáveis e ausência de restrições adicionais. A licença não elimina outros direitos eventualmente incidentes. O cartão em `src/components/RespiratoryPilot.tsx` identifica autoras, HRA/HuBMAP, NLM, DOIs, licença e adaptações de apresentação; isso é evidência positiva para o contexto UI, **não** prova cumprimento em download direto de GLB, redistribuição de código, screenshots, produtos derivados ou todas as versões de distribuição. Falta avaliar notices acessíveis e associados em cada canal. A ressalva HRA sobre pesquisa/ausência de aconselhamento médico não foi interpretada como proibição comercial automática; confirmar condições e direitos de terceiros com os titulares.

## 7. Divergência NIH e dados subjacentes

A [entrada NIH 3DPX-021008](https://3d.nih.gov/entries/3DPX-021008) identifica Lung Male/HRA v1.3 e CC BY, mas apresenta nome de arquivo contendo `3d-vh-f-lung`. A cópia NIH não foi obtida nem comparada; não inferir sexo, identidade ou licença da cópia a partir desse nome. O blob local corresponde ao arquivo HRA masculino identificado acima. A referência a dados NLM não demonstra, por si só, condições de todos os direitos subjacentes; obter esclarecimento de HRA/NLM se necessário.

## 8. Texturas e materiais

Inspeção GLB anterior: 58 malhas/6 materiais no pulmão, 3/2 na traqueia, 4/3 nos brônquios; sem imagens, texturas ou extensões declaradas no JSON GLB. Materiais PBR estão incorporados e não são arquivos independentes; o inventário usa hash do GLB, não um suposto hash de cada material. Metadados HRA associam licença ao modelo; a origem individual dos elementos e quaisquer direitos de terceiros não foram comprovados separadamente. A inspeção das declarações GLB não garante ausência de dados externos não declarados em outras etapas ou direitos anteriores.

## 9. Favicon e recursos locais

`public/favicon.svg` é referenciado por `index.html`; 9.522 bytes, SHA-256 `61bc9a161de58248288e6905425d7180f0624c2865007b97d763fdac12043a66`. Mesmo conteúdo existe no commit `709ed00`, mas autoria, origem e licença não foram identificadas. O autor de um commit ou a presença no repositório não provam titularidade nem autorização. Classe E; prioridade alta para rastreio/regularização antes de publicação. SVGs inline e geometria procedurais no código precisam de confirmação de autoria e eventual origem de trechos; não atribuí-los automaticamente ao projeto. Não se encontraram arquivos de áudio/vídeo, fontes locais ou outras imagens em `src`/`public` na varredura; não é prova universal fora desse escopo.

## 10. Fontes remotas

`src/index.css` solicita Inter e Manrope via Google Fonts. As licenças de família publicadas são [Inter OFL 1.1](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt), copyright 2020 Inter Project Authors, e [Manrope OFL 1.1](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt), copyright 2018 Manrope Project Authors. OFL permite uso comercial e redistribuição sob condições, incluindo aviso de licença e copyright junto a cópias, proibição de venda isolada da fonte e condições para nomes reservados e fontes modificadas. Não há arquivos de fonte local identificados, e as respostas reais do serviço variam, não foram obtidas ou hashadas nesta auditoria. Não concluir conformidade de auto-hospedagem; avaliar também privacidade e disponibilidade do serviço para usuários.

## 11. Ícones e outros componentes

`lucide-react` é declarado ISC; sua LICENSE instalada inclui também MIT/Cole Bemis para ícones derivados de Feather. `src/App.tsx` importa, entre outros, HelpCircle e X, cobertos pela lista Feather publicada; verificar nomes efetivos e preservar os avisos aplicáveis. [Licença Lucide](https://lucide.dev/license). Material proveniente de bibliotecas não se torna automaticamente licença própria do projeto.

## 12. Dependências diretas e transitivas

Seis dependências diretas de produção e onze de desenvolvimento estão no `package.json`; versões efetivas constam no inventário. O lock inclui transitivas e variantes opcionais de plataformas diferentes: instalação real, presença no grafo e inclusão no bundle são coisas distintas. `webgl-constants@1.1.1` não possui campo `license` no lock nem no manifesto, mas seu LICENSE local declara MIT, copyright 2019 Tim van Scherpenzeel; cadeia instalada: drei → detect-gpu → webgl-constants. O README aponta constantes portadas da documentação MDN; direitos subjacentes e presença efetiva no bundle não foram avaliados. As 12 entradas MPL-2.0 são `lightningcss` e variantes, marcadas dev no lock; não presumir que código MPL foi incluído no produto. Se distribuídas, avaliar obrigações de código-fonte para arquivos cobertos, modificações e notices segundo cenário real. Vite contém aviso de dependências empacotadas em `node_modules/vite/LICENSE.md`; metadado MIT de topo não esgota licenças de terceiros internos. Apache-2.0 pode exigir LICENSE/NOTICE aplicáveis e tratamento de modificações; MIT/ISC/BSD exigem preservação dos avisos pertinentes. Revisão por pacote e SBOM do artefato ainda são necessárias.

## 13. Projeto, conteúdo e evidências

Não foi encontrado LICENSE de projeto na raiz. Ausência não prova ausência de direitos autorais; sem autorização explícita não assumir licença aberta de código, textos didáticos, 597 questões, 586 flashcards, SVGs ou material visual. Fontes bibliográficas anteriores fundamentam a análise anatômica, não autorizam copiar imagens ou textos. As 56 capturas PNG existentes documentam estados anteriores, algumas exibem GLBs, ícones ou fontes: são possíveis obras derivadas e seu tratamento deve ser revisado por canal. O `README.md` ainda afirma que nenhum modelo licenciado está incluído, o que não corresponde ao estado do piloto; atualizar futuramente com revisão e autorização, sem alterar nesta fase.

## 14. Matriz de uso — permissões não são conformidade

Legenda: **P*** = termos publicados em princípio permitem, sujeitos a obrigações e direitos externos; **?** = não verificado ou não aplicável; coluna D diz respeito a distribuir os modelos, não à classe jurídica D.

| Recurso / cenário | A educação grátis | B web | C código-fonte | D modelos | E instituições | F monetização | G distribuição comercial |
|---|---|---|---|---|---|---|---|
| GLBs HRA CC BY 4.0 | P* | P* | P* | P* | P* | P* | P* |
| Ícones Lucide ISC / Feather MIT | P* | P* | P* | ? | P* | P* | P* |
| Inter/Manrope OFL, famílias documentadas | P* | P* | P* | ? | P* | P* | P* exceto venda isolada de fontes |
| Dependências lock, termos por pacote | P* | P* | P* | ? | P* | P* | P* sujeito a licença e componentes |
| Favicon e código/texto sem licença identificada | ? | ? | ? | ? | ? | ? | ? |
| Capturas com conteúdo composto | ? | ? | ? | ? | ? | ? | ? |

Cada P* é avaliação genérica das licenças identificadas, não liberação de um produto ou pacote: verificar atribuições, avisos, direitos de terceiros e termos da instituição. Para código e capturas, avaliar composição individual. Nada no quadro constitui parecer jurídico.

## 15. Riscos priorizados

- **Crítico:** nenhum conflito crítico documentalmente comprovado; essa ausência não equivale a liberação jurídica.
- **Alto:** favicon sem procedência/autorização identificável; ausência de licença explícita para código/conteúdo próprio; distribuição direta dos GLBs e evidências sem demonstração de atribuição adequada por canal; direitos subjacentes HRA/NLM não completamente demonstrados.
- **Médio:** avisos de terceiros no artefato de produção não comprovados; componentes transitivos e internos Vite; dependências MPL em cenários de redistribuição; capturas compostas; respostas de fontes não fixadas; inconsistência do README e identificação NIH.
- **Baixo:** rastreabilidade incompleta de data/responsável de aquisição, disponibilidade/privacidade Google Fonts. A prioridade depende de volume e cenário de distribuição, não é conclusão de ilegalidade.

## 16. Plano de regularização — não implementado nesta fase

1. Antes de publicar/distribuir: recuperar origem e autorização do favicon e de código, conteúdo e SVGs; contatar titulares se necessário. Caso não se consiga autorização, discutir substituição futura somente com aprovação, sem remover recursos agora.
2. Confirmar com HRA/NLM cadeia de dados e divergência NIH; arquivar metadados, versões, evidências e termos por modelo e eventuais componentes de terceiros.
3. Planejar créditos e notices por canal (interface, download, repositório e pacote), identificando autoria, DOIs, licença, mudanças e avisos; verificar se texto atende ao uso específico.
4. Gerar SBOM real do artefato por versão e separar runtime, build e pacotes opcionais; conferir licenças/avisos internos e obrigações MIT/ISC/BSD/Apache/MPL; revisar fontes caso venham a ser incorporadas localmente.
5. Definir com titulares licença do projeto e do conteúdo e documentar exceções de terceiros; corrigir README em fase autorizada. Estabelecer política de licenças para novas aquisições.
6. Encaminhar o conjunto e cenários de uso a profissional jurídico qualificado, e avaliações anatômicas ao especialista correspondente; obter decisão formal antes de publicação ou distribuição comercial.

## 17. Verificações e preservação

`npm run build`: sucesso, com aviso de chunks superiores a 500 kB. `npm run lint`: sucesso, 1 aviso preexistente em `src/store.tsx:18`, sem erros. Foram comparados hashes iniciais e finais dos três GLBs e favicon; coincidem. Paths locais confirmados e hashes Git dos GLBs comparados com API oficial. Verificação textual dos JS em `dist/assets` não encontrou as cadeias pesquisadas para avisos Lucide, Cole Bemis, MIT, React ou Three; não foi feita prova exaustiva de todos os avisos em todos os formatos, e ausência dessas cadeias não prova infração por si só. Build/lint não validam licenças, interface, anatomia, privacidade ou distribuição. Não foram alterados GLBs, recursos, aplicação, dependências ou conteúdos; build gerou saídas locais ignoradas. Estado Git anterior foi preservado. Testes visuais e regressões da fase anterior não foram repetidos nesta fase documental.

## 18. Conclusão e decisão pendente

Há boa evidência documental de origem e licença CC BY 4.0 para cada GLB e correspondência com blobs oficiais, mas não de conformidade total em todos os canais. O favicon e direitos do projeto são lacunas prioritárias; licenças de dependências estão triadas, não auditadas por completo. Resultado honesto: **concluída com ressalvas, sem aprovação de distribuição ou parecer jurídico**. Aguardar autorização para qualquer regularização e para a Fase 12.2.11. Nenhum commit foi feito.
