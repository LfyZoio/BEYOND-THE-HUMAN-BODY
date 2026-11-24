# Dossiê para avaliação anatômica especializada — piloto respiratório

**Aguardando revisão por profissional qualificado.** Não há aprovação anatômica, diagnóstico clínico nem confirmação de dimensões reais. Modelo individual de referência Visible Human; não representa toda a variabilidade. Este documento prepara a revisão e não substitui um atlas ou acesso interativo às malhas.

## Como foram obtidas as vistas

Capturas do canvas real do piloto em Chromium headless/SwiftShader; posições de câmera alteradas apenas no teste, sem deformar ou reposicionar estruturas. São vistas externas, não cortes. Nos nomes abaixo, direções anatômicas são hipóteses: `VH_M_lungs_R` tem centro x ≈ −0,06319 e `VH_M_lungs_L` x ≈ +0,06943 unidades do arquivo; isso sustenta a interpretação direita/esquerda a partir dos nomes HRA, sem validação independente. A associação de +Z a anterior e −Z a posterior é visual e precisa ser confirmada por especialista. +Y é superior assumido, também a confirmar. O enquadramento das junções corta as extremidades pulmonares e a traqueia superior.

| Vista solicitada | Evidência | Ângulo e observação |
|---|---|---|
| Anterior, hipótese | [anterior](../auditoria-piloto/fase-12-2-3/anterior-aproximado.png) | Câmera +Z; pulmões e via aérea central. |
| Posterior, hipótese | [posterior](../auditoria-piloto/fase-12-2-3/posterior-aproximado.png) | Câmera −Z; sem prova do eixo anatômico. |
| Lateral direita, hipótese | [lateral direita](../auditoria-piloto/fase-12-2-3/lateral-direita-hipotese.png) | Câmera −X, próximo ao grupo rotulado direito. |
| Lateral esquerda, hipótese | [lateral esquerda](../auditoria-piloto/fase-12-2-3/lateral-esquerda-hipotese.png) | Câmera +X, próximo ao grupo rotulado esquerdo. |
| Superior | [superior](../auditoria-piloto/fase-12-2-3/superior.png) | Câmera aproximadamente +Y, orientação da imagem dependente de câmera. |
| Junções traqueobrônquicas | [brônquio direito destacado](../auditoria-piloto/fase-12-2-3/juncao-contexto-transparente.png); [traqueia destacada](../auditoria-piloto/fase-12-2-3/juncao-traqueia-destacada.png) | Grupo selecionado claro e demais transparentes. Sobreposição de superfícies e ordem de transparência podem produzir aparência enganosa: não demonstram continuidade do lúmen nem ausência de interpenetração. |

## Estruturas e evidência disponível

- Pulmões direito/esquerdo: arquivo HRA v1.3, nós `VH_M_lungs_R/L` e árvores intrapulmonares correspondentes; fissuras e massas assimétricas visíveis. [OpenStax](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs) descreve três lobos direitos e dois esquerdos; **contagem, integridade e correspondência não foram validadas** nas malhas.
- Traqueia: arquivo HRA v1.0; anéis e posição central superior visíveis. [Ryan et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC5696545/) descrevem traqueia, carina e orientação das vias. Formato dos anéis, lúmen e parede posterior não foram avaliados por corte.
- Brônquios principais: HRA v1.0, nós direito/esquerdo; a peça direita destacada aparece próxima à região inferior da traqueia e ao hilo. A imagem é consistente com uma aproximação espacial, mas não comprova encaixe, ausência de sobreposição ou ângulo real; árvores mais distais exibidas pertencem ao arquivo do pulmão.
- Ambos arquivos de vias centrais são descritos como derivados de pulmão v1.2, enquanto o pulmão usado é v1.3. Nenhuma confirmação de tolerância entre superfícies ou de escala/unidade física foi obtida.

## Checklist solicitado ao especialista

1. Confirmar eixos, lateralidade, posicionamento e proporções; identificar marcos e unidade/escala possível, se verificável.
2. Revisar lobos/fissuras e eventuais omissões ou variações; avaliar facetas, terminais, normal e qualquer artefato visual.
3. Inspecionar a bifurcação com rotação, isolamento, corte ou ferramenta geométrica apropriada; avaliar carina, continuidade das paredes e dos lúmens, folgas/interseções e relação hilar. Registrar pontos, tolerância e método; caixas sobrepostas não provam contato.
4. Conferir os textos de localização, função, relação e descrição do painel, explicitando que esôfago, diafragma, coração e pleuras não são mostrados nesta cena.
5. Emitir parecer por item: aprovado, aprovado com ressalvas ou reprovado; registrar nome/qualificação, data, referências, imagens, limitações e correções sugeridas. Não modificar anatomia para esconder incompatibilidades.

Arquivos originais, hashes, licença e proveniência: [relatório 12.2.3](fase-12-2-3-diagnostico-otimizacao.md) e [12.2](fase-12-2-piloto-respiratorio.md).
