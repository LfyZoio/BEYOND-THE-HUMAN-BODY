# Relatório de integridade — 12.2.10.4

Baseline inicial local: **224 arquivos regulares**, com SHA-256 por caminho no [registro auxiliar](integridade-hashes-12-2-10-4.json). Foram excluídos `.git`, `node_modules`, `dist`, `.cache`, `.vite` e `__pycache__`; arquivos excluídos não foram globalmente verificados. O baseline da fase anterior possui **188 arquivos**, todos incluídos no escopo comparado.

| Comparação | Arquivos | Divergentes/ausentes |
|---|---:|---:|
| Baseline desta fase | 224 | 0 |
| Baseline original 12.2.10.3 | 188 | 0 |
| 56 PNG versus inventário 12.2.10.2 | 56 | 0 |
| `dist` versus inventário 12.2.10.2 | 9 | 0 |

O conjunto adicional de documentos desta fase é novo e não integra o baseline original. Compara-se conteúdo de arquivos, não metadados, progresso em navegador, outros caches ou histórico de disco. O hash registra igualdade com o momento inicial/referência, não autoria nem autenticidade original. Nenhum build, teste que gera capturas ou migração foi executado. Contagens de conteúdo recalculadas por importação somente leitura: 90 aulas, 597 questões, 586 flashcards. Sem validação visual em hardware real nem testes funcionais novos. Nenhum commit ou publicação.
