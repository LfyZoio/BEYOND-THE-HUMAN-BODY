# Fase 12.2.10.2 — Verificação do artefato de produção

## 1. Resumo executivo

**APROVADA COM RESSALVAS quanto à auditoria técnica e documental. Nenhum canal do produto completo está documentalmente apto à distribuição.** O `dist/` local foi inventariado e correlacionado a módulos observados em uma compilação instrumentada byte a byte idêntica. Há código de **14 dos 219 registros do lock** nos chunks JS; nos outros 205 não foi observado módulo no mapa JS, o que não prova ausência em outros formatos. Créditos HRA aparecem na interface de produção testada localmente, porém o `dist` não contém arquivo separado de avisos e direitos próprios permanecem não comprovados. As 56 capturas não estão no `dist`, mas permanecem bloqueadas preventivamente para publicação enquanto seus direitos não forem verificados.

Contagem do plano: das 15 pendências herdadas, **5 continuam resolvidas no escopo documental delimitado e 10 continuam abertas**; nenhuma pendência herdada adicional foi encerrada. Uma nova pendência condicional sobre decoder externo (P16) foi identificada: **11 abertas de 16 no total**. Este resultado não é parecer jurídico, autorização de terceiros ou liberação de publicação.

## 2. Contexto e estado inicial

Consultados integralmente os dois relatórios e seus inventários de recursos, dependências e capturas, notices e checklist. Branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD `37972028884c12cc83e96f9619146d9af9568557`; alterações e arquivos não rastreados preexistentes foram preservados. Registrado manifesto SHA-256 inicial de 178 arquivos existentes em `src`, `public`, `docs`, `auditoria-piloto`, `auditoria-visual`, `tests` e manifests/configs presentes. Não se modificou código, recursos, lock ou documentos anteriores.

## 3. Metodologia

`npm run build` executa `tsc -b && vite build` com Vite 8.3.8, configuração `vite.config.ts` e entrada `index.html` → `src/main.tsx`; saída padrão `dist`. Foram lidos todos os arquivos emitidos e calculados tamanho e SHA-256. Uma segunda compilação com a mesma configuração, em diretório temporário local, usou plugin Vite `generateBundle` somente para coletar `modules`, `renderedLength`, imports e imports dinâmicos de cada chunk; **os nove arquivos de saída dessa compilação têm hashes idênticos ao build normal**. Mapeamos módulos ao caminho `node_modules` mais específico no lock. O mapa prova atribuição de módulos transformados a chunks, não que o pacote inteiro foi incluído nem que todos os avisos de código interno foram encontrados. CSS processado, código inline/vendorizado, importações dinâmicas externas e efeitos em runtime exigem análise adicional.

Teste de navegador no próprio `dist`: servidor efêmero restrito a `127.0.0.1`, Chromium 153 com WebGL por software, navegador com requisições externas bloqueadas, sem upload e sem publicar projeto. Navegação até piloto, leitura de créditos, links e requisições GLB realizadas localmente. Não é validação em hospedagem real, GPU física ou parecer legal.

## 4. Artefato de produção efetivamente observado

[Inventário JSON completo](inventario-artefato-producao-12-2-10-2.json) registra arquivos, tamanhos, hashes, módulos, 219 dependências, 56 capturas, 33 arquivos de código e recursos externos. Os nove arquivos abaixo são o estado produzido neste build, não um release aprovado.

| Caminho em `dist/` | Bytes | SHA-256 | Origem / disponibilidade |
|---|---:|---|---|
| `index.html` | 490 | `c0009ba2c6b0465736a38fd5daf2d17a2b1b5d8eb2bd08f7cda381269d285466` | HTML de entrada Vite |
| `favicon.svg` | 9522 | `61bc9a161de58248288e6905425d7180f0624c2865007b97d763fdac12043a66` | cópia de `public/`, referenciada no HTML |
| `assets/index-C3F1dTRK.js` | 940072 | `9684baa5832fcc6f12b52a015045ae432dcd1907dc11f9b746dff0352c55cbc4` | chunk inicial de app, React e ícones |
| `assets/index-v5NOzq15.css` | 24951 | `a329bc2fb607b945659567d30f8223d293481d002002e351fb348826fa357056` | CSS inicial, Tailwind e import remoto de fontes |
| `assets/Lab3D-BNrQ8oUh.js` | 1023189 | `522d1cc0ec70ed3edf227e1e2f1acf3c25e220f7ec8b02643b33cdf7ad599e96` | chunk do laboratório carregado dinamicamente |
| `assets/RespiratoryPilot-CoEheweV.js` | 9252 | `d89a6283271e4b6b01955315056f36c86207e06af924ff5dd43c2d49e5c155e5` | chunk do piloto carregado dinamicamente |
| `models/respiratorio/lung.glb` | 10941068 | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` | cópia HRA; solicitada sob demanda pelo piloto |
| `models/respiratorio/trachea.glb` | 1184804 | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` | cópia HRA; solicitada sob demanda pelo piloto |
| `models/respiratorio/main-bronchus.glb` | 422208 | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` | cópia HRA; solicitada sob demanda pelo piloto |

A. Incluídos: nove arquivos acima; GLBs e favicon são cópias públicas, não embeds em JS. B. `Lab3D`, piloto e GLBs são carregados sob demanda, embora fisicamente presentes no diretório. C. Documentação, capturas, testes, outros arquivos do repositório e a maioria das dependências não são automaticamente produto distribuído; presença em `dist` verificada separadamente. D. CSS contém `@import` para Google Fonts Inter/Manrope; as respostas são externas e variáveis. E. `docs/THIRD-PARTY-NOTICES.md` e demais documentos **não estão no `dist`**.

Em código da dependência `@react-three/drei/core/Gltf.js`, `useGLTF` configura por padrão `https://www.gstatic.com/draco/versioned/decoders/1.5.5/`; o módulo correspondente foi incorporado. Isso é capacidade condicional, **não** prova de requisição ou uso do decoder. Nenhuma requisição Draco foi observada no teste, e os GLBs atuais não declaram a extensão Draco na inspeção anterior. Licença do binário remoto dessa URL não foi examinada; P16. Outras URLs em JS incluem referências documentais e identificadores de namespaces, não foram presumidas como requisições.

## 5. Correlação das 219 dependências

O [JSON](inventario-artefato-producao-12-2-10-2.json) registra para cada caminho do lock nome, versões instalada e lock, faixas declaradas por pais resolvidos estaticamente, origem, licença, evidências de LICENSE/NOTICE local, módulos/chunks identificados, forma de incorporação e ressalvas. Relações de dependência no lock não provam execução. Categorias herdadas: 6 diretas de produção, 11 diretas dev, 59 transitivas não-dev e 143 transitivas dev; 75 não instaladas no ambiente. Declaração `license` não é prova de conformidade nem de inclusão no bundle.

**14 registros com módulos renderizados no JS:** `@babel/runtime` 7.29.15, `@react-three/drei` 10.7.9, `@react-three/fiber` 9.8.2, `its-fine` 2.1.1, `lucide-react` 1.77.0, `react` 19.3.1, `react-dom` 19.3.1, `react-use-measure` 2.1.7, `scheduler` 0.28.0, `suspend-react` 0.1.3, `three` 0.187.0, `three-stdlib` 2.36.1, `use-sync-external-store` 1.7.0 e `zustand` 5.1.0. Seus manifests no lock declaram MIT, exceto Lucide ISC; Lucide também contém avisos MIT Feather. Em 13/14 foi encontrado LICENSE local pela busca anterior; em Fiber não, embora seu manifesto e licença upstream indiquem MIT. O arquivo exato de licença empacotado da versão Fiber ainda não foi comprovado. `three-stdlib` inclui módulos `GLTFLoader`, `DRACOLoader` e `MeshoptDecoder`; código/avisos internos exigem revisão específica, sem presumir que licença de topo esgota direitos de todos os componentes.

Os outros 205 não aparecem como módulos no mapa JS, inclusive variantes opcionais: **não classificar como ausentes do produto inteiro ou exclusivamente build-time**. TypeScript, Vite, Tailwind e plugin React participam do processo de build por scripts/configuração; Oxlint é executado pelo lint, não demonstrado no `dist`; outros dev/transitivos não foram individualmente comprovados como usados. Para código-fonte, verificar os arquivos realmente incluídos, suas licenças e eventuais dependências vendorizadas; para ferramenta dev, seguir avisos nas cópias distribuídas e condições da ferramenta, sem inferir obrigações idênticas para JS final; para o artefato, priorizar os 14 pacotes observados e os possíveis conteúdos embutidos, inclusive licenças/avisos internos. Um SBOM abrangente de todos os formatos e correspondência de avisos com o release não foram concluídos.

## 6. Capturas

Todos os **56 PNGs** foram comparados com hashes do inventário anterior, e suas dimensões foram lidas do cabeçalho. Cada entrada do JSON registra caminho, SHA-256, formato, dimensões, origem e conteúdo da triagem anterior, terceiros possíveis, marca/interface externa não comprovada, uso documental e estado no `dist`. A triagem anterior examinou miniaturas: elementos pequenos, ícones específicos, marcas e textos não podem ser certificados exaustivamente a partir delas. Quando identificáveis, as entradas discriminam pulmão, traqueia ou brônquios HRA, em vez de atribuir genericamente todos os modelos a cada imagem; screenshots de interface podem conter ícones Lucide/Feather, textos educacionais e fontes, a verificar em resolução integral antes da publicação.

Resultado: **0/56 no `dist` observado**, **56/56 bloqueadas preventivamente para publicação como capturas/documentação até revisão de direitos**. A existência de capturas originadas localmente não transfere direitos dos elementos retratados. Nenhuma captura de interface externa ou imagem externa foi confirmada na triagem, mas não é prova de inexistência de conteúdo pequeno. Nenhuma captura foi modificada, apagada, recortada ou enviada externamente.

## 7. Código, template e conteúdo educacional

O JSON contém inventário por arquivo dos **33 arquivos examinados** em `src/`, `index.html` e configuração, incluindo hashes, última evidência Git disponível e nível de confiança. `src/data/contentA.ts` a `contentK.ts` e currículo são dados locais, mas a autoria original, fontes por trecho e autorização são **DESCONHECIDAS**; `structures.ts` cita Tortora/Derrickson, Sobotta e Moore/Dalley/Agur como referências gerais, sem demonstrar origem de cada trecho nem permissão para reprodução. Não foi demonstrado que qualquer passagem seja cópia literal nem que seja original: ambos permanecem não verificados. Código de app, componentes e trechos de exemplos não foram atribuídos a terceiros ou ao projeto sem prova. `index.html`, CSS, `vite.config.ts` e entrada têm semelhança possível com convenções de template, confiança BAIXA: não se conclui cópia integral. Favicon tem correspondência direta ao template; é caso separado de confiança ALTA para correspondência, não para histórico de aquisição. Bibliotecas incorporadas são identificadas pelo mapa de módulos, não autoria do projeto. Git mostra incorporação, não titularidade.

Não há LICENSE de projeto identificável na raiz nem autorização fornecida para a totalidade do código e conteúdo. A liberação de fonte, web, pacotes ou monetização fica **bloqueada preventivamente** até P09/P14; uso local é pendente. Geometria esquemática, SVGs inline, questões, flashcards e documentação também não recebem licença automática por estarem no repositório.

## 8. Favicon e identidade visual

`dist/favicon.svg` é cópia idêntica de `public/favicon.svg` e seu blob Git coincide com o [template React oficial Vite fixado](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/template-react/public/favicon.svg), coberto pela declaração específica de [CC0 1.0 de arquivos template](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/LICENSE). O favicon é referenciado pelo `dist/index.html` e pode aparecer na aba do navegador como sinal visual Vite; as capturas de página não comprovam presença de chrome/aba. Direitos de marca não são concedidos pelo CC0, não há confirmação do histórico de incorporação ou autor individual. Possível associação indevida deve ser avaliada pelo titular e jurídico; eventual favicon original é proposta futura, não autorização para substituir nesta fase. Nenhuma determinação de infração foi feita.

## 9. Os três GLBs e acesso a créditos

Os SHA-256 no início, `public`, `dist` e final são idênticos aos da tabela da seção 4. Os registros individuais HRA e autores, versões, DOIs, blobs e licença CC BY 4.0 estão em [notices](THIRD-PARTY-NOTICES.md) e [12.2.10 §5](fase-12-2-10-auditoria-licencas-proveniencia.md). O agrupamento, materiais de exibição e câmera são adaptados na UI; bytes de geometria e materiais incorporados dos GLBs não mudaram.

No teste do build, após abrir Laboratório → Respiratório → piloto, os três arquivos responderam 200 e o cartão **Créditos e licença** ficou visível no DOM: nomes Browne/Schlehlein, HRA/HuBMAP, NLM, modificações de apresentação, CC BY 4.0 e três links DOI estavam presentes. Links externos não foram abertos, e Google Fonts foi bloqueado no teste. Isso é evidência de disponibilidade do cartão no cenário testado, não comprovação de sua suficiência jurídica ou de acessibilidade em todas as modalidades.

- **A. Web:** manter acesso efetivo a créditos, DOIs, licença e alterações; testar no deploy, inclusive formas de obter o GLB.
- **B. Código-fonte:** acompanhar cada modelo incluído com os créditos individuais, licença e alterações; verificar que o documento acompanha os arquivos distribuídos.
- **C. GLB isolado:** fornecer atribuição individual acessível junto de cada arquivo e preservar avisos; um cartão em aplicação que não acompanha o GLB não basta como evidência de disponibilidade.
- **D. Pacote completo:** incluir e testar avisos adequados para GLBs e todas as dependências aplicáveis; manter o vínculo ao arquivo e avaliar direitos subjacentes.

Nenhum dos cenários foi liberado nesta fase; P06/P07 permanecem abertas.

## 10. Avisos de terceiros e proposta antes de alterar documentos existentes

`docs/THIRD-PARTY-NOTICES.md` contém identificação individual dos modelos, créditos, fonte e CC BY, alterações de apresentação, favicon, Lucide/Feather, fontes e resumo de dependências; esclarece ser rascunho, não conjunto integral de licenças. O build não copia o documento para `dist`; os nove arquivos não incluem nenhum LICENSE/NOTICE separado. Uma busca textual simples nos três JS por `MIT License`, `ISC License`, `Cole Bemis`, `Copyright` e `copyright` não encontrou essas cadeias; não garante ausência de avisos em outras codificações ou canais. Os nomes de Browne/Schlehlein e `CC BY 4.0` foram encontrados no chunk do piloto e verificados na UI local.

**Alterações necessárias propostas, não executadas:** atualizar o documento central com os 14 pacotes/chunks identificados, titulares/textos de licença exatos e código interno identificado, condições aplicáveis e decoder opcional; obter texto exato da versão de Fiber; distinguir avisos de ferramenta dev e os do produto final. Em uma futura fase autorizada, projetar inclusão dos textos integrais aplicáveis e acesso nos canais de web, código, GLB isolado, pacote e documentação. Impacto: editar documentação existente e possivelmente configurar cópia/rota de notices, o que alteraria o artefato e requer autorização explícita; nenhuma mudança foi feita agora. URLs de licença e créditos HRA foram verificadas documentalmente nas fases anteriores, não recarregadas em navegação de teste.

## 11. Matriz por canal

[Matriz completa com justificativa por recurso e canal](matriz-distribuicao-12-2-10-2.md). A licença HRA e as licenças das famílias/ícones podem permitir usos **com condições**, mas isso não libera o produto como um todo. Código e conteúdo estão bloqueados preventivamente para hospedagem, fonte, pacote e comercial; capturas estão bloqueadas se incluídas. Fontes, dependências, atribuições de GLBs e marca precisam de verificação; uso local completo também está pendente. **Nenhum canal de distribuição do produto completo pode ser considerado documentalmente apto.**

## 12. Riscos e pendências

[Matriz de riscos](matriz-riscos-conformidade-12-2-10-2.md) e [plano único de P01–P16](plano-fechamento-pendencias-12-2-10-2.md) trazem evidência, situação herdada/atual, prioridade, ação, responsáveis sugeridos e critério de encerramento. Prioridade alta: autoria/licença de código e conteúdo, ausência de prova de notices no produto, créditos GLB por canal, direitos subjacentes, marca, capturas e revisão jurídica. Nenhuma incompatibilidade crítica comprovada; isso não é liberação. P16 cobre o decoder remoto condicional, sem pressupor uso efetivo.

## 13. Testes e integridade

- `npm run build`: passou, aviso de chunks >500 kB; `npm run lint`: passou com um aviso preexistente de spread em `src/store.tsx:18`.
- Compilação instrumentada local: nove arquivos/9 hashes iguais ao build normal; mapa de módulos coletado sem alterar o código ou publicar.
- Chromium local com SwiftShader e externos bloqueados: navegação até piloto, 3 GLBs 200 e cartão de créditos com 4 links. Não foi uma auditoria visual/anatômica nem teste em hardware físico; nenhuma captura foi gerada.
- 56 hashes PNG conferidos contra inventário anterior; dimensões/formatos lidos. 219 registros reconciliados, sem alegar verificação exaustiva de todas licenças internas.
- GLBs, favicon e manifests mantêm SHA-256 inicial; dos 178 arquivos preexistentes do manifesto inicial, 0 mudaram e 0 estavam ausentes na comparação final. Materiais internos são preservados pelos bytes GLB; não há texturas separadas em `src/public` identificadas. Integridade de arquivos evidencia que lógica 3D, currículo, SM-2, XP, localStorage e importação/exportação não foram alterados nesta fase; não é teste funcional completo.

## 14. Limitações

O `dist` não é um artefato de release publicado nem prova do que um futuro pacote incluirá; nenhuma hospedagem foi consultada. O mapa de chunks é de JS, não rastreia com exatidão todos os ativos/bytes, código gerado, conteúdos vendorizados ou CSS. Busca de notices textual e arquivos LICENSE não equivale a auditoria exaustiva de 219 pacotes; 75 não instalados. Requisições externas não foram feitas pelo navegador de teste, logo respostas de fontes/decoder e seus direitos específicos não foram verificadas. As capturas foram triadas por miniatura, não perícia individual exaustiva em resolução integral; se forem selecionadas para publicação, identificar elementos visíveis e direitos de cada uma. Autoria Git não prova titularidade; não houve contato com HRA/NLM, autores ou advogado. A decisão final sobre direitos e condições depende dos titulares e profissional qualificado.

## 15. Conclusão e entregáveis

A fase inventariou e correlacionou o build inspecionado, identificando limites e riscos sem alterar o produto; **APROVADA COM RESSALVAS para a auditoria**, sem aprovação para distribuição. Resolvidas: 5 tarefas documentais herdadas; abertas: 10 herdadas mais 1 nova. Bloqueio preventivo quantificado: **58 unidades de revisão** — 56 capturas individuais mais dois grupos essenciais (código e conteúdo educacional); não são 58 violações nem contagem de cada arquivo de código. GLBs têm licença e créditos documentados, mas distribuição depende de cumprimento por canal. Favicon tem evidência de CC0 do template, sem solução de marca. Os 219 registros estão correlacionados ao mapa JS com limites acima. Notices atuais estão no repositório de trabalho, não no `dist`.

Arquivos criados: este relatório, [inventário do artefato](inventario-artefato-producao-12-2-10-2.json), [matriz de riscos](matriz-riscos-conformidade-12-2-10-2.md), [matriz de distribuição](matriz-distribuicao-12-2-10-2.md) e [plano de fechamento](plano-fechamento-pendencias-12-2-10-2.md). Nenhum arquivo preexistente foi modificado intencionalmente; build escreveu apenas saída gerada ignorada. Não criar commit, publicar, distribuir recursos ou iniciar Fase 12.2.11; aguardar autorização expressa.
