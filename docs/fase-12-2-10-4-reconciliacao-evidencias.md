# Fase 12.2.10.4 — reconciliação visual e consolidação documental

**Resultado: PARCIAL COM RESSALVAS.** As 56 capturas foram abertas individualmente e vinculadas aos seus caminhos nesta fase. A lista original dos 13 documentos não consta da mensagem atual; foi reconstruída como conjunto candidato, não confirmada. Não há comprovação de leitura interpretativa integral dos 13 documentos nem de todos os anexos e páginas pertinentes. Duas imagens contêm estruturas demasiado pequenas para identificação anatômica visual independente. A conclusão da fase não constitui autorização de distribuição; distribuição e divulgação permanecem bloqueadas preventivamente.

## 1. Escopo e metodologia

Auditoria documental dirigida às lacunas de 12.2.10.3, sem alteração dos recursos. Registrou-se baseline de 224 arquivos antes de criar entregáveis, comparando também o baseline anterior de 188 e os hashes das 56 imagens e do `dist`. Para cada PNG, houve uma única abertura individual em chamada específica de leitura, associada ao nome do arquivo, não a posição de resultado em lote; hash e dimensões foram calculados dos bytes. Comparamos com a linha correspondente da auditoria 12.2.10.3. Comparação de identidade da estrutura não equivale a validação anatômica, e imagem não comprova direitos.

## 2. Documentos

[Matriz documental](matriz-documentos-12-2-10-4.md) registra **13 candidatos**, dos quais 12 existem e 1 está ausente, com formato, tamanho, seções ou estrutura, SHA-256, referência por unidades e limitações. Os bytes existentes foram integralmente lidos e os JSONs decodificados e analisados por máquina, mas isso **não comprova leitura integral interpretativa**; tampouco foram integralmente reconsultados anexos e links. O ausente é `docs/inventario-dependencias-12-2-10-12.json`; alternativas localizadas não foram demonstradas equivalentes. A lista candidata precisa ser confirmada. Zero leituras integrais são afirmadas como comprovadas. Hash de início de fase não prova autenticidade histórica.

## 3. Capturas e 58 unidades

[Catálogo das 56](catalogo-capturas-12-2-10-4.md) lista ID estável, caminho, formato, dimensão, hash, descrição e comparação anterior. A descrição anterior de **E029** menciona painel descritivo que não aparece no recorte: divergência documentada. Em **E039 e E040**, apenas fragmentos muito pequenos são visualmente identificáveis; relatório técnico anterior os associa aos brônquios, mas a identidade anatômica por imagem é **NÃO CONFIRMADA**. Nas outras 53 imagens, a descrição anterior corresponde no essencial ao conteúdo observado, com esclarecimentos quando necessários. As descrições não certificam todos os pixels ou direitos das imagens.

[Matriz das 58](matriz-unidades-12-2-10-4.md) e [inventário JSON](inventario-reconciliacao-12-2-10-4.json): E001–E056 mais COD e EDU, com provas, ausências, titularidade, licença, permissões e ação. **0 REGULARIZADAS; 58 BLOQUEADAS preventivamente para divulgação/distribuição e com lacunas pendentes.** As 2 identificações visuais não confirmadas são dimensões distintas do bloqueio. Os estados não são acusações ou contagem de infrações.

## 4. Código e conteúdo

[Auditoria de código](auditoria-titularidade-codigo-12-2-10-3.md) registra histórico e hashes de 38 arquivos; `src/main.tsx` e `tsconfig.json` coincidem com o template oficial Vite sob declaração específica CC0, mas isso não prova a origem do restante nem a trajetória de aquisição. Código não transfere direitos do conteúdo. Importação local somente leitura reconfirmou **90 aulas, 597 questões e 586 flashcards**; [inventário educacional](inventario-direitos-conteudo-12-2-10-3.json) detalha IDs e localização. Origem/autoria de aulas, questões, flashcards e textos explicativos ainda não é comprovada, e referência bibliográfica não é licença. Ilustrações procedurais, capturas, ícones e modelos exigem análise separada. Nenhuma conclusão científica é feita.

## 5. Três modelos GLB

Os três metadados oficiais HRA identificam Kristen Browne e Heidi Schlehlein e CC BY 4.0. Comparação de blobs upstream foi registrada nas fases anteriores; SHA-256 e JSON internos foram novamente lidos nesta fase.

| Arquivo | Origem e versão | SHA-256 | Direitos e situação |
|---|---|---|---|
| `public/models/respiratorio/lung.glb` | [HRA pulmão v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/), DOI 10.48539/HBM737.FFBT.876 | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` | CC BY 4.0 permite compartilhar/adaptar inclusive comercialmente sob condições; P06/P07 pendentes |
| `public/models/respiratorio/trachea.glb` | [HRA traqueia v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/), DOI 10.48539/HBM969.WCCJ.636 | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` | Mesma licença e ressalvas |
| `public/models/respiratorio/main-bronchus.glb` | [HRA brônquios v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/), DOI 10.48539/HBM795.LVRX.842 | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` | Mesma licença e ressalvas |

A atribuição exige indicação das autoras, fonte, licença e alterações, bem como preservação de avisos pertinentes, conforme a licença e os registros; suficiência do meio de apresentação precisa de análise por canal. Em princípio a licença contempla cópia/compartilhamento, web, pacotes e comercial sob condições, mas **nenhum canal do produto está liberado**. Os GLBs não declaram imagens, texturas ou extensões utilizadas/exigidas; contêm geometria e materiais, que não foram periciados individualmente quanto a direitos. A origem Visible Human Male/NLM e possíveis direitos subjacentes seguem pendentes. O cartão de créditos existente não prova atendimento para um GLB isolado.

## 6. Decoder e favicon

`@react-three/drei` aponta para decoders Draco remotos gstatic **1.5.5**; `three-stdlib` solicita condicionalmente `draco_decoder.js` ou `draco_wasm_wrapper.js` e `draco_decoder.wasm`. A licença do [código oficial 1.5.5](https://github.com/google/draco/blob/1.5.5/LICENSE) é Apache 2.0; os bytes remotos não foram obtidos ou hashados e a identidade/licença integral desses binários não está verificada. `draco3d@1.5.9` é transitivo distinto. Nenhum dos três GLBs declara extensão Draco; na 12.2.10.2 não se observou requisição no teste local. Isso não prova que nunca haverá uso. [Evidências anteriores](auditoria-decoder-externo-12-2-10-3.md); P16 segue aberta.

`public/favicon.svg` possui blob `6893eb13237060adc0c968a690149a49faa2d7d3`, igual ao arquivo do [template Vite fixado](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/template-react/public/favicon.svg), com [declaração CC0 para templates](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/LICENSE). Aquisição real não está comprovada; marca e eventual associação com Vite são separadas de direitos autorais do arquivo. Não se afirma infração nem autorização de marca. [Auditoria](auditoria-favicon-identidade-visual-12-2-10-3.md); P08 segue aberta.

## 7. Integridade e limitações

[Relatório de integridade](relatorio-integridade-12-2-10-4.md) e [hashes](integridade-hashes-12-2-10-4.json): 224/224 arquivos do baseline desta fase e 188/188 do anterior sem diferença; 56/56 capturas e 9/9 arquivos `dist` coincidem com inventários anteriores. Foram excluídos `node_modules`, `.git` e caches; não se prova integridade desses diretórios, metadados ou armazenamento do navegador. Não se rodou build, migração, captura automática, teste funcional ou validação visual em hardware real. Não houve alteração de recursos originais, atualização de dependências, envio a terceiros, contato, publicação ou commit.

## 8. Pendências e decisão

[Lista de pendências](pendencias-remanescentes-12-2-10-4.md): confirmar a lista dos 13 documentos e completar leitura e anexos; esclarecer E039/E040; comprovar titularidade, cadeia e condições por canal; resolver atribuições HRA, binários Draco, marca, licenças e avisos de dependências. Não iniciar 12.2.11: a decisão é tecnicamente justificada pela documentação incompleta e ausência de aprovações. Qualquer continuação ou alteração requer autorização expressa. A eventual conclusão documental não substitui revisão especializada ou aprovação formal.
