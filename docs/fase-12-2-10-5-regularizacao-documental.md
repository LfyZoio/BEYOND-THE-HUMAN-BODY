# Fase 12.2.10.5 — regularização documental e direitos

**Resultado: PARCIAL COM RESSALVAS.** A investigação produziu evidências adicionais e matrizes por recurso, mas não recuperou a lista original dos 13 documentos nem comprovou integralmente seus anexos; não identificou todos os titulares ou autorizações. Não houve regularização global de unidade, parecer jurídico ou aprovação de distribuição. A decisão preventiva do usuário de não publicar foi mantida. Não avançar para a Fase 12.2.11 sem avaliação e autorização.

## Resultado das 58 unidades

Estados exclusivos: **0 REGULARIZADO; 2 PENDENTE DE DOCUMENTAÇÃO (COD e EDU); 0 PENDENTE DE AUTORIZAÇÃO; 2 NÃO CONFIRMADO (E039/E040); 54 RESTRITO; 0 NÃO APLICÁVEL**. As 58 possuem alguma lacuna e permanecem com divulgação/distribuição bloqueada preventivamente; 2 não confirmadas e 54 restritas são também pendências no sentido amplo, não categorias adicionais a somar. Autorização de terceiros pode ser necessária, mas sua necessidade específica não foi presumida. Não são 58 violações. [Matriz individual](matriz-unidades-12-2-10-5.md) e [inventário](inventario-12-2-10-5.json).

## Documentos

[Matriz de 13 candidatos](matriz-documentos-12-2-10-5.md): 12 arquivos existentes e um caminho ausente (`docs/inventario-dependencias-12-2-10-12.json`). O histórico disponível não reproduz a lista inicial exata; confirmação com usuário/histórico é necessária. Não foram encontrados duplicados byte a byte entre os arquivos de `docs`, o que não exclui versões derivadas.

Nesta fase foram apresentados e interpretados integralmente **10 arquivos principais Markdown candidatos**; os dois JSONs restantes foram analisados mecanicamente e por amostragem, não cada registro interpretado. **0 conjuntos de documento mais anexos/páginas possuem leitura integral comprovada**: links e materiais complementares não foram todos examinados. O arquivo ausente não pode ser lido. Exemplos: D01 demonstra 14 pacotes no JS e ausência de notice separado no `dist`; D07 liga cada GLB a metadados e descreve a divergência NIH; D10 contém créditos preparados, não comprovação de entrega. Outras interpretações e referências específicas constam na matriz. URLs HRA e licença Vite foram reconsultadas, mas não todos os links.

## Capturas e conteúdo

As 56 capturas foram abertas individualmente em 12.2.10.4; nesta fase E029/E039/E040 foram reabertas individualmente e os 56 hashes conferidos. E029: o registro 12.2.10.3 mencionava painel de descrição, mas este não está visível no recorte; descrição corrigida e histórico em [catálogo](catalogo-capturas-12-2-10-5.md). E039/E040: fragmentos pequenos, não se confirma identidade anatômica pela imagem; teste e relatório 12.2.9 fornecem mapeamento técnico e capturas de contexto, não confirmação biológica.

As matrizes [90 aulas](matriz-proveniencia-aulas-12-2-10-5.md), [597 questões](matriz-proveniencia-questoes-12-2-10-5.md) e [586 flashcards](matriz-proveniencia-flashcards-12-2-10-5.md) registram IDs e localização única no arquivo, sem alegar autoria, fonte ou direitos comprovados. Contagens foram recalculadas a partir dos arquivos locais. Aulas incluem textos e atividades; questões incluem alternativas, respostas e explicações; flashcards incluem frente e verso. Referências gerais em `src/data/structures.ts` não provam origem por texto nem autorizam reprodução; imagens e diagramas são tratados separadamente. Não houve validação científica ou alteração de material.

## Código e dependências

[Matriz de código](matriz-autoria-licenciamento-codigo-12-2-10-5.md) detalha 38 arquivos e 14 pacotes com módulos no JS, com origem, metadados e limites. Dois arquivos de código/configuração e favicon correspondem por blob ao template oficial cuja declaração específica é CC0; não é prova de cadeia local ou de autoria do restante. O repositório é **shallow** e Git não prova cessão nem identifica toda autoria. MIT/ISC dos pacotes identificados permitem usos sob condições, mas avisos de versões e conteúdo interno precisam ser verificados por artefato; o Fiber não teve LICENSE local identificado na busca e Lucide tem subset Feather MIT. Não se confunde pacote no lock com código incorporado.

## GLBs, Draco e favicon

- [GLBs](relatorio-glbs-12-2-10-5.md): metadados oficiais individuais foram reconsultados, identificando criadoras e CC BY 4.0, com fontes e DOIs. A atribuição por canal, direitos subjacentes NLM e componentes continuam pendentes. Licença permite compartilhamento e adaptação sob condições para os direitos abrangidos, não libera automaticamente produto ou terceiros.
- [Draco](relatorio-draco-12-2-10-5.md): licença Apache 2.0 identificada para fonte 1.5.5; URL aponta três possíveis arquivos, mas os bytes gstatic e respectiva integridade/avisos são não confirmados. `draco3d@1.5.9` é outra versão. Não houve uso observado no cenário anterior, não prova ausência universal. P16 aberta.
- [Favicon](relatorio-favicon-identidade-12-2-10-5.md): correspondência com template Vite e declaração CC0 para arquivos template; marca é questão independente, P08 aberta. Não se afirma infração nem autorização de marca.

## Integridade, pendências e continuidade

[Integridade final](relatorio-integridade-12-2-10-5.md): **232 arquivos iniciais e 224 do baseline anterior preservados**, 56 hashes PNG e nove arquivos `dist` conferidos; exclusões e limites no relatório. Não houve build, testes funcionais novos, publicação, PR, envio de arquivos privados, contato, migração, commit ou edição de recursos originais. Documentos novos não modificam os antigos.

[Plano de regularização](plano-regularizacao-12-2-10-5.md) especifica evidências, origem, dependência externa, alternativas condicionadas e bloqueios. P06–P16 seguem abertas. Principais riscos são titularidade de código e conteúdo, licenças de terceiros e entrega de avisos, direitos subjacentes HRA, marca e binários Draco. Próximo passo: recuperar a lista original e completar leitura documental, depois obter provas e revisão especializada com aprovação do responsável. Nenhuma publicação é autorizada por esta auditoria.

## Entregáveis desta fase

1. Este relatório principal.
2. `docs/matriz-documentos-12-2-10-5.md` — documentos e anexos.
3. `docs/matriz-autoria-licenciamento-codigo-12-2-10-5.md` — código e dependências.
4. `docs/matriz-proveniencia-aulas-12-2-10-5.md` — 90 aulas.
5. `docs/matriz-proveniencia-questoes-12-2-10-5.md` — 597 questões.
6. `docs/matriz-proveniencia-flashcards-12-2-10-5.md` — 586 flashcards.
7. `docs/relatorio-glbs-12-2-10-5.md` — modelos e licenças.
8. `docs/relatorio-draco-12-2-10-5.md` — decoder, fonte e binários.
9. `docs/relatorio-favicon-identidade-12-2-10-5.md` — arquivo e marca.
10. `docs/catalogo-capturas-12-2-10-5.md` — 56 capturas e histórico visual.
11. `docs/matriz-unidades-12-2-10-5.md` — 58 unidades.
12. `docs/plano-regularizacao-12-2-10-5.md` — plano e alternativas condicionais.
13. `docs/inventario-12-2-10-5.json` — registros estruturados reconciliados.
14. `docs/relatorio-integridade-12-2-10-5.md` — verificação final.
15. `docs/integridade-hashes-12-2-10-5.json` — auxiliar com hashes de baseline.
