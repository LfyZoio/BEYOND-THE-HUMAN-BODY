# Fase 12.2.10.3 — titularidade e direitos

**Classificação: AUDITORIA PARCIAL, COM RESSALVAS; REGULARIZAÇÃO NÃO CONCLUÍDA.** Esta fase produz evidências e um plano, não um parecer jurídico nem autorização de publicação. Embora as 56 imagens tenham sido abertas, a identificação imagem-caminho nos resultados dos lotes precisa de reconferência; as descrições individuais são provisórias. Também não se demonstra nesta entrega a leitura integral de todos os 13 documentos solicitados. Antes de considerar a auditoria completa, terminar ambas as verificações. O caminho solicitado `docs/inventario-dependencias-12-2-10-12.json` não foi encontrado; existem `docs/inventario-dependencias-12-2-10.json`, `docs/revisao-dependencias-12-2-10-1.json` e `docs/inventario-artefato-producao-12-2-10-2.json`, que não são automaticamente equivalentes integrais.

## Resultados

| Aspecto | Evidência e situação |
|---|---|
| 58 unidades | 56 capturas e grupos COD/EDU inventariados e triados; **0 regularizadas, 58 pendentes e bloqueadas preventivamente** para distribuição/divulgação. Pendente e bloqueado se sobrepõem; não há 58 violações identificadas. Descrições de imagem são provisórias. [Matriz](auditoria-individual-capturas-12-2-10-3.md). |
| Código | 38 arquivos identificados e histórico/hash, duas correspondências exatas com template; titularidade geral e direitos de trechos não comprovados. [Auditoria](auditoria-titularidade-codigo-12-2-10-3.md). |
| Educacional | 90 aulas, 597 questões, 586 flashcards, 348 seções, 361 glossários, 41 estruturas. Origem e titularidade por obra não comprovadas; referências não concedem licença. [Auditoria](auditoria-direitos-conteudo-educacional-12-2-10-3.md) e [inventário](inventario-direitos-conteudo-12-2-10-3.json). Não há validação anatômica/científica nesta fase. |
| Capturas | 56 PNGs, dimensões e hashes preservados; não constavam do `dist` anterior, mas podem integrar documentos/repositório. Composição e atribuições por canal pendentes e associação visual a confirmar. |
| Draco | Licença Apache-2.0 identificada para fonte oficial 1.5.5 e pacote transitivo 1.5.9 distinto; carregamento remoto condicional, não observado no teste anterior; os três GLBs não declaram Draco. Bytes remotos e avisos específicos não confirmados; P16 aberta. [Auditoria](auditoria-decoder-externo-12-2-10-3.md). |
| Favicon | Igual ao template oficial CC0, sem prova da cadeia de aquisição; direitos de marca são separados. P08 aberta. [Auditoria](auditoria-favicon-identidade-visual-12-2-10-3.md). |
| GLBs | Três blobs iguais ao upstream HRA, autoras e CC BY 4.0 identificados; entrega de atribuição individual por canal e direitos anteriores ainda requerem análise. Não há aprovação anatômica. |
| Terceiros | 14 pacotes com módulos identificados nos chunks; 219 registros no lock, que não são todos necessariamente incorporados. Avisos de versões, módulos internos, ícones/fontes e canal não concluídos. [Autorizações](matriz-autorizacoes-terceiros-12-2-10-3.md). |
| Canais | Nenhum canal do produto completo classificado documentalmente apto. Privado local e GLBs isolados estão pendentes, outros canais bloqueados preventivamente. [Matriz](matriz-direitos-distribuicao-12-2-10-3.md). |
| Plano | P01–P05 concluídas apenas em seus escopos documentais; P06–P16 continuam abertas, 11 pendências. [Plano](plano-regularizacao-direitos-12-2-10-3.md). |

## Verificações e limites

Os 188 arquivos preexistentes registrados antes da fase foram comparados por SHA-256: **0 alterados, 0 ausentes**. Os 56 hashes de PNG conferem com o inventário 12.2.10.2. O JSON auxiliar foi analisado e suas contagens conferidas mecanicamente. `npm run lint` passou com zero erros e um aviso preexistente `src/store.tsx:18`. Não se repetiu build nesta fase para evitar sobrescrever artefatos existentes; o build e o teste de navegador com SwiftShader relatados na fase 12.2.10.2 não são aprovação visual/anatômica em hardware real e não foram repetidos aqui. Esta auditoria não examinou todas as distribuições externas existentes e não demonstra ausência de exposição anterior.

Os nove documentos solicitados foram criados nesta fase, mais o inventário JSON auxiliar. Nenhum arquivo preexistente foi intencionalmente modificado; não houve publicação, envio de arquivos privados, contato com titulares, commit ou início de fase posterior. Recomendações de alteração de avisos, créditos, favicon e outros arquivos dependem de autorização expressa. A conclusão desta fase parcial ou futura conclusão documental não autoriza distribuir o produto.
