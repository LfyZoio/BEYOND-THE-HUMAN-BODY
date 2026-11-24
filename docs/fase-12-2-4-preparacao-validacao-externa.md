# Fase 12.2.4 — Preparação para validação externa do piloto respiratório

## 1. Objetivo e situação

Preparar evidências e instrumentos para avaliação anatômica independente e teste em hardware físico, sem expandir sistemas ou modificar as malhas. **Preparação técnica: preparada para validação externa, com limitações abaixo. Validação anatômica: aguardando especialista. Desempenho: aguardando hardware físico** — há somente medições parciais por software das fases anteriores; não há resultado físico ou ganho de FPS comprovado. Esta classificação não aprova o piloto para expansão.

## 2. Estado inicial e preservação

Branch `arena/b5a9e8b9-beyond-the-human-body`, HEAD `3797202`. No início já havia alterações pendentes em `src/App.tsx` e `src/components/Lab3D.tsx` e arquivos não rastreados das fases 12.1–12.2.3, incluindo modelos, piloto, relatórios, capturas e testes. Foram mantidos. Nesta fase não se alterou código de produção, currículo, dados, GLBs ou relatórios históricos; não houve download de novos modelos, commit ou refatoração. O build gera artefatos locais ignorados em `dist`.

## 3. Documentos e evidências consultados

- [Piloto 12.2](fase-12-2-piloto-respiratorio.md), [auditoria 12.2.1](fase-12-2-1-auditoria.md), [validação 12.2.2](fase-12-2-2-validacao-final-respiratorio.md), [diagnóstico 12.2.3](fase-12-2-3-diagnostico-otimizacao.md) e [dossiê 12.2.3](fase-12-2-3-avaliacao-anatomica.md); código `RespiratoryPilot.tsx`, `RespiratoryCamera.tsx`, `Lab3D.tsx` e GLBs locais.
- Resultados já registrados, não novas medições: 65→14 materiais únicos no ambiente testado; 65 draw calls e 274.830 triângulos, 12.548.080 bytes de GLB. Não foi demonstrado ganho de FPS. As medidas de RAF anteriores são SwiftShader/headless e não são testes físicos.
- Referências anatômicas para consulta: [OpenStax Anatomy and Physiology 2e, 22.2](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs) e [Ryan et al., 2017, Anatomical considerations in bronchoscopy](https://pmc.ncbi.nlm.nih.gov/articles/PMC5696545/). Descrevem anatomia de referência, não certificam estas malhas ou sua composição.

## 4. Organização do dossiê anatômico

As imagens são capturas do **canvas real**, geradas por Chromium headless/SwiftShader, usando coordenadas de câmera de teste, sem transformar nem deformar modelos. Direções anatômicas abaixo são **hipóteses a confirmar**: os nós HRA `VH_M_lungs_R` e `VH_M_lungs_L` têm centros em x aproximadamente −0,06319 e +0,06943; nomes são indício, não confirmação independente. A correspondência de +Z/−Z a anterior/posterior e de ±Y a superior/inferior não foi validada por profissional. As imagens não são cortes nem provas de continuidade. Vistas das fases anteriores foram preservadas; apenas a vista −Y é nova, capturada por `tests/vista-inferior-1224.mjs`.

| Perspectiva, imagem e câmera | Estruturas identificadas por nomes do modelo e relações a examinar | Limitação e dúvida ao especialista |
|---|---|---|
| [Anterior, hipótese](../auditoria-piloto/fase-12-2-3/anterior-aproximado.png): +Z | Duas massas pulmonares, traqueia central e região brônquica; avaliar fissuras, posição e lados. | Opacidade oculta hilos e junções; confirmar eixos, lobos e lateralidade. |
| [Posterior, hipótese](../auditoria-piloto/fase-12-2-3/posterior-aproximado.png): −Z | Superfícies pulmonares e via aérea ao centro; avaliar relações posteriores. | Sem esôfago ou referências vertebrais; confirmar se −Z é posterior e se fissuras são adequadas. |
| [Lateral direita, hipótese](../auditoria-piloto/fase-12-2-3/lateral-direita-hipotese.png): −X | Lado próximo do nó HRA rotulado direito, traqueia e superfícies lobares; avaliar relação e fissuras. | O outro pulmão e via aérea estão parcialmente ocultos; confirmar lado e sobreposições. |
| [Lateral esquerda, hipótese](../auditoria-piloto/fase-12-2-3/lateral-esquerda-hipotese.png): +X | Lado próximo do nó rotulado esquerdo e traqueia; avaliar fissura e posicionamento. | Oclusão impede confirmar conexões e incisura; confirmar orientação. |
| [Superior, hipótese](../auditoria-piloto/fase-12-2-3/superior.png): aproximadamente +Y | Ápices pulmonares e via aérea central; avaliar relações espaciais. | Projeção sobrepõe estruturas; não prova escala ou contato. |
| [Inferior, hipótese](../auditoria-piloto/fase-12-2-4/inferior-hipotese.png): aproximadamente −Y | Faces inferiores aparentes das massas pulmonares e porção de via aérea no centro; avaliar assimetria/posição. | Oclusão e perspectiva; sem diafragma ou marcos externos, confirmar eixo e superfícies, não inferir continuidade. |
| [Junção com brônquio direito destacado](../auditoria-piloto/fase-12-2-3/juncao-contexto-transparente.png) e [traqueia destacada](../auditoria-piloto/fase-12-2-3/juncao-traqueia-destacada.png): +Z, aproximado | Grupos selecionados claros e outros transparentes; avaliar carina, entrada dos brônquios e relação hilar. | Peças cortadas pelo enquadramento; blending e superfícies podem parecer conectadas ou sobrepostas. Não mostram interior/lúmen ou tolerância entre superfícies. |

Brônquios intrapulmonares fazem parte dos grupos do GLB pulmonar; traqueia e brônquios principais são arquivos separados de pulmão v1.2, enquanto o pulmão usado é v1.3. A composição não prova compatibilidade entre versões. A escala física/unidades não foram confirmadas. Coração, esôfago, diafragma e pleuras não estão representados nesta cena; não inferir suas relações por imagens. Para revisão aprofundada usar também a aplicação interativa, isolamento e ferramenta externa apropriada para cortes/inspeção geométrica, preservando os originais.

## 5. Checklist para avaliação especializada

[Formulário em branco para o especialista](fase-12-2-4-checklist-especialista.md): dez critérios solicitados, cada qual com **Aprovado / Aprovado com ressalvas / Reprovado / Não foi possível avaliar**, justificativa, observações e correções. Data, identificação, formação e eventual registro profissional são preenchidos exclusivamente pelo avaliador; não há profissional, assinatura ou parecer atribuído nesta fase.

## 6. Protocolo de desempenho em hardware real

[Protocolo e ficha em branco](fase-12-2-4-protocolo-hardware.md) especificam desktop com GPU dedicada, GPU integrada e Android, identificação de CPU/GPU/driver/RAM/SO/navegador/tela, cache frio/quente, versão/build e rede, três repetições por cenário, carregamento/quadros/rotação/zoom, memória por tipo, latência de seleção, isolamento, falhas e qualidade visual. Prevê perfil temporário para preservar progresso e diferencia FPS apresentado, callbacks RAF, estimativas e N/D. Laboratório e piloto devem ser comparados sob condições equivalentes; GPU física efetivamente usada deve ser verificada.

**Execução física:** nenhum computador com GPU física nem smartphone esteve acessível nesta sessão. Não há medidas de hardware físico, GPU/VRAM ou gestos reais. Os números anteriores de SwiftShader não substituem essas medições. Não alegar benefício de desempenho.

## 7. Investigação de proveniência e licenças

Consultas repetidas às fontes oficiais nesta fase, sem baixar modelos. [NIH 3DPX-021008](https://3d.nih.gov/entries/3DPX-021008) descreve Lung, Male e HRA v1.3; [download da versão 1](https://3d.nih.gov/entries/download/21008/1) e [versão 2](https://3d.nih.gov/entries/download/21008/2) identificam o arquivo de entrada como `3d-vh-f-lung.glb`; as páginas apontam processamentos/submissões distintos 26484 e 43519. O [registro HRA v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/) descreve Visible Human Male e [metadados HRA](https://github.com/hubmapconsortium/hra-kg/blob/main/digital-objects/ref-organ/lung-male/v1.3/raw/metadata.yaml) nomeiam `3d-vh-m-lung.glb`. A cópia local `lung.glb` veio do repositório oficial HRA fixado no relatório 12.2. O histórico do arquivo HRA registra adição em 2023-06-08 (`216dc8e6837012966bba13997e16cdbfe31cb65e`) e atualizações em 11 e 12 de junho (`69349645f228d1f8cc4b31ce4bbecc40cb2fced1` e `f7f852635701dbe7bab837c6fee391d75800d58f`). Isso não prova o conteúdo NIH.

| Objeto local e fonte individual | Blob Git local = blob do `hra-kg` consultado | SHA-256 local |
|---|---|---|
| `lung.glb` — [HRA pulmão v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/) | `dbbfdaf4cc51ea7d75cb0887b8fa003b8da9c00a` | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` |
| `trachea.glb` — [HRA traqueia v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/) | `06ebbd9354ff122ad38fffece39b7768e8f8475d` | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` |
| `main-bronchus.glb` — [HRA brônquios v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/) | `7f9e7c6e981ef044f848844afb914f0b206c2a3d` | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` |

Os três registros HRA apontam individualmente **CC BY 4.0**, com criadoras Kristen Browne e Heidi Schlehlein; a licença permite redistribuição e modificação com atribuição adequada, link da licença e indicação de mudanças. O piloto credita as criadoras, HRA/HuBMAP, Visible Human Male/NLM, DOIs e adaptação de visualização. Conferir eventuais requisitos adicionais e cadeia de direitos antes da publicação; não é parecer jurídico. Os arquivos locais coincidem por blob com os arquivos de referência HRA consultados; **não foi comparado nenhum binário NIH** e não se conhece o hash ou a identidade do conteúdo NIH das versões 1/2. O nome não permite concluir se é erro ou qual espécime foi usado. Solicitar ao responsável NIH/HRA identificação dos arquivos e hashes oficiais/versionados; não houve contato nem resposta nesta fase.

## 8. Auditoria de interface e acessibilidade

`tests/audit-respiratory-browser.mjs`: 360×800, 390×844, 768×1024, 1024×768 e 1440×900 em Chromium headless/SwiftShader. Para cada largura: cinco estruturas por lista com `aria-pressed`, painel, etiqueta fora do canvas e ocultar/mostrar, isolar/mostrar todas, limpar, ações de rotação/roda/reset, retorno ao esquema, quiz, lazy load e ausência de overflow horizontal/pageerror. `tests/materials-1223.mjs` verificou destaque/opacidade independentes nas cinco estruturas; `tests/pilot-reentry-1223.mjs` clicou na malha e retornou três vezes. O clique direto não valida seleção de cada estrutura pequena ou toque.

`tests/interface-1224.mjs`: foco programático e tecla Espaço para selecionar brônquio direito e ocultar/mostrar etiqueta em 360 e 1440; etiqueta posicionada abaixo do canvas. [Captura 360](../auditoria-piloto/fase-12-2-4/interface-360.png) e [1440](../auditoria-piloto/fase-12-2-4/interface-1440.png). O botão e o painel exibem nomes por texto, e o destaque está disponível; tamanho inicial do brônquio é pequeno, e a captura de página inteira em 360 mostra barra fixa atravessando a posição da etiqueta no estado capturado. Verificar se a rolagem, foco e barra obstruem conteúdo em aparelhos reais; a imagem composta não prova que o conteúdo fique inacessível em toda rolagem. Não foram testados navegação completa por Tab, leitor de tela, contraste quantitativo, gestos ou legibilidade física. Não declarar conformidade WCAG.

Câmera numérica e fallback foram retestados conforme seção 9. Nenhuma mudança visual foi aplicada nesta fase.

## 9. Regressão

- `npm run build` passou; aviso de chunks maiores que 500 kB. `npm run lint` passou com um aviso preexistente em `src/store.tsx`.
- `tests/inspect-respiratory.mjs`: hashes, parsing e contagens de malhas/triângulos passaram; dados originais não foram modificados.
- `tests/ssr-smoke.tsx`: 28/28; `tests/store-jsdom.tsx`: 25/25, incluindo SM-2, XP, persistência em perfil jsdom e exportação/importação; `tests/audit-phase11.tsx` e `tests/ui-phase11.tsx` passaram. Para JSX, um arquivo temporário de configuração na raiz foi criado e removido apenas pelo processo de teste; testes usam `tsx` externo.
- `tests/real-controls-1222.mjs`: no canvas real, arrastos horizontal/vertical, roda e pan alteraram a câmera; reset retornou posição/quaternion/alvo/distância/zoom com tolerância 1e-6 em cinco amostras. Não cobre gesto ativo nem toque físico.
- `tests/fallback-1222.mjs`: bloqueio deliberado de traqueia mostrou erro e permitiu voltar ao esquema; quiz respondido nas cinco larguras. Os testes de navegador usaram porta local 5175, Chromium e Playwright Core externos, com WebGL por software; não há teste físico nem medição de fluidez de hardware nesta fase. Scripts executados em paralelo com outros testes não são benchmark.

## 10. Integridade dos dados

A auditoria automatizada confirmou **90 dias, 597 questões, 586 flashcards**, IDs únicos e domínio 30/50/20. Nenhuma alteração intencional nos dados, progresso, conquistas, avaliações, armazenamento ou exportação/importação; os testes usam perfis isolados. Esses testes cobrem caminhos específicos e não demonstram exaustivamente todas as combinações possíveis.

## 11. Limitações

Sem profissional qualificado, sem parecer, sem escala ou orientação anatômica confirmada; imagens 2D e transparências não demonstram continuidade de lúmen. Sem hardware físico, navegador com GPU real, toque, teste completo de acessibilidade ou medições de GPU/VRAM. NIH não disponibilizou hash nas páginas consultadas e nenhum GLB NIH foi obtido. Avaliação de cor, legibilidade e escolha didática exige teste humano. Preparar evidências não é aprovação científica, clínica, jurídica ou de desempenho.

## 12. Pendências para próxima decisão

1. Enviar dossiê e [checklist em branco](fase-12-2-4-checklist-especialista.md) a profissional qualificado; registrar método, evidências, limitações e parecer autêntico.
2. Executar [protocolo físico](fase-12-2-4-protocolo-hardware.md) em GPU dedicada/integrada e Android disponível; guardar traces e condições e comparar com o esquema sem tratar RAF como FPS apresentado.
3. Confirmar orientação/escala e continuidade, inclusive compatibilidade dos arquivos v1.2/v1.3; esclarecer divergência NIH com as instituições responsáveis.
4. Revisar barra fixa, tamanhos de alvo, teclado, leitor de tela e gestos em dispositivos reais; corrigir somente após evidência e decisão de escopo.

## 13. Conclusão técnica

O pacote e protocolo estão **preparados para avaliação externa**, com ressalvas explicitadas; **anatomia aguarda especialista** e **desempenho aguarda hardware físico**. Nenhum novo sistema foi iniciado e nenhum commit foi criado. Aguardar revisão do usuário antes de avançar.
