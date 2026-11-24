# Auditoria de direitos do conteúdo educacional — 12.2.10.3

## Escopo e critério

[Inventário estruturado por identificador](inventario-direitos-conteudo-12-2-10-3.json) identifica **90 aulas**, **597 questões** (com alternativas, respostas e explicações), **586 flashcards**, **348 seções**, **361 entradas de glossário** e **41 estruturas/artigos**: 2.023 registros de componentes, não 2.023 obras independentes. Identificadores `DIA-xx-SEC/GLO-n` foram criados somente para o inventário e não alteram IDs do aplicativo. Os campos de autoria, fonte, licença, modificação e situação explicitam dados desconhecidos, não inventam originalidade. Atividades, objetivos, resumos e demais textos do dia ficam agrupados na entrada da aula; questões incluem explicações. O inventário não transcreve conteúdo para serviço externo.

| Grupo | Local / tipo de uso | Fonte e autor identificados | Classificação e distribuição |
|---|---|---|---|
| Aulas, objetivos, seções, atividades e resumos | `src/data/contentA.ts` a `contentK.ts`, agrupados por dia/identificador | Fonte exata e autores não identificados; histórico do merge registra inclusão, não prova autoria | **origem não identificada**; BLOQUEADO preventivamente para distribuição |
| Questões, alternativas, gabaritos e explicações | mesmos arquivos; 597 IDs individuais no JSON | Idem; não se verificou confronto de cada item com fontes | **origem não identificada**; BLOQUEADO preventivamente |
| Flashcards e glossário | mesmos arquivos; 586 IDs de cartão e 361 de glossário | Idem | **origem não identificada**; BLOQUEADO preventivamente |
| Descrições de estruturas e artigos | `src/data/structures.ts`, 41 IDs; `LIBRARY_ARTICLES` deriva dos dados locais | O arquivo lista Tortora & Derrickson, Sobotta, Moore/Dalley/Agur como referências gerais; não prova fonte específica, texto copiado ou permissão | **referências científicas listadas; derivação por trecho não demonstrada**; BLOQUEADO preventivamente |
| Currículo e plano | `src/data/curriculum.ts` e `src/data/content*.ts` | Autor/fonte por elemento desconhecidos | origem não identificada; BLOQUEADO preventivamente |
| Ilustrações | GLBs HRA e representação procedural no laboratório; [matriz de terceiros](matriz-autorizacoes-terceiros-12-2-10-3.md) | Cada GLB tem criadoras/licença HRA; titularidade dos dados/procedimentos do projeto não comprovada | licença dos GLBs condicionada; geometria procedural e textos do projeto pendentes |
| Material complementar / referências | `src/data/structures.ts`, `src/pages/Library.tsx`, documentação e capturas | Autores dos livros indicados são citados como referência; não foi identificado trecho literal ou licença de reprodução | revisão por obra e canal PENDENTE; capturas ver [auditoria individual](auditoria-individual-capturas-12-2-10-3.md) |

**Categorias:** nada foi identificado como reprodução literal de terceiros, adaptação específica ou conteúdo inequivocamente original: isso significa **não verificado**, não que tais categorias estejam vazias na realidade. A referência bibliográfica não concede licença de texto, tabela ou figura, e não basta para alegar que um item deriva dela. Fatos científicos e terminologia anatômica devem ser distinguidos das formas de expressão e ilustrações protegidas, com análise jurídica conforme jurisdição. Não foi feito exame de similaridade externo nem certificação científica ou anatômica; a correção do material não prova autorização de reprodução.

## Evidências e próximos passos

O Git local mostra incorporação em `709ed00` e alterações posteriores em componentes; não demonstra titularidade nem origem anterior de cada item. O responsável deve recuperar histórico e evidências por autor, fonte e obra; identificar expressões copiadas ou adaptadas se existirem; avaliar direitos e obter licenças ou autorizações escritas necessárias; registrar o canal, data, escopo e condições. A lista de referências deve ser corrigida ou enriquecida apenas após revisão e autorização, sem alterar os 90 dias agora. Não houve contato nem alteração de conteúdo.
