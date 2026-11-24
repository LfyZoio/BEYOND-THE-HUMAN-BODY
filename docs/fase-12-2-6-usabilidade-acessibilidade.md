# Fase 12.2.6 — Auditoria de usabilidade e acessibilidade

**Classificação: APROVADA COM RESSALVAS para o escopo técnico testado**, não para conformidade WCAG integral nem validação anatômica. Há pendências importantes de tecnologia assistiva, acesso à informação espacial, dispositivos físicos e uso prolongado. A fase 12.2.7 não foi iniciada.

## Método e abrangência

Revisão do código e dos relatórios 12.2.4/12.2.5; testes no aplicativo Vite com Chromium headless e WebGL SwiftShader, perfis isolados, automação Playwright e capturas de viewport. Foram avaliados os nomes e descrições disponíveis das cinco estruturas, navegação, painel, seleção, isolamento, retorno, câmera, foco, estados, carregamento e fallback. A exatidão anatômica dos modelos não pode ser atestada por esta auditoria de interface.

Como referência aplicável foram considerados WCAG 2.2: teclado (2.1.1), ordem e visibilidade do foco (2.4.3/2.4.7), nomes e estados (4.1.2), mensagens de estado (4.1.3), contraste de texto (1.4.3), redimensionamento/reflow (1.4.4/1.4.10) e tamanho de alvo (2.5.8). Trata-se de verificações parciais, não de auditoria completa de sucesso ou de conformidade. Não foram realizados testes com leitores de tela, usuários com deficiência, zoom de texto/navegador, alto contraste ou tecnologias assistivas reais.

## Ocorrências

### U-01 — ALTA — câmera sem alternativa de rotação/zoom por teclado — corrigida no cenário testado
- **Evidência/reprodução:** no baseline em 360, 768 e 1440 px, navegar exclusivamente por Tab/Enter/Espaço até o piloto; selecionar e isolar uma estrutura; no botão Restaurar câmera, pressionar setas. Não existiam botões para girar ou ampliar e a posição da câmera permaneceu inalterada. Capturas `auditoria-piloto/fase-12-2-6/antes-teclado-{360,768,1440}.png`; dados dos botões `antes-botoes-*.json`.
- **Impacto:** usuário sem mouse/toque não conseguia mudar o ângulo ou distância; seleção pela lista continuava disponível. Referência 2.1.1.
- **Correção:** seis botões nativos nomeados giram em passos discretos e aproximam/afastam, mantendo alvo e limites OrbitControls; instrução no grupo de câmera. Reset existente permanece. Não se adicionou pan por teclado; a alternativa implementada não torna acessível toda a informação espacial.
- **Risco de regressão:** interação com inércia, limites, reset e tamanho do painel. Testados os quatro movimentos, ambos os zooms, repetição e reset numérico em três tamanhos, mais gestos de mouse e reset por teste existente. Gestos físicos não testados.

### U-02 — MÉDIA — anúncio de seleção condicionado à etiqueta visual — mitigada, dependente de leitor de tela
- **Evidência/reprodução:** a região `aria-live` anterior era criada somente após selecionar estrutura e deixava de existir ao ocultar a etiqueta. Assim não havia região de status persistente quando o usuário escolhia ocultar a etiqueta; a simples inserção de região já preenchida também não garante anúncio em todas as combinações leitor/navegador. Isso é risco demonstrado pelo DOM, não uma falha de anúncio verificada em leitor real.
- **Impacto:** a mudança de seleção/isolamento podia não ser anunciada, dificultando compreender o estado (4.1.3).
- **Correção:** região `role=status` persistente e atômica, com seleção e isolamento, independente da etiqueta visual; botões de estrutura mantêm `aria-pressed`. Automação verificou o texto de status, não sua fala.
- **Risco:** anúncios redundantes ou atrasados; validar com NVDA/Firefox e VoiceOver/Safari, inclusive seleção, isolamento, limpeza e etiqueta oculta.

### U-03 — MÉDIA — informação espacial inacessível sem visão — pendente
- **Evidência/reprodução:** as estruturas são renderizadas no canvas WebGL; a alternativa textual informa localização, função e relações gerais, mas não descreve o ângulo atual, aparência espacial, sobreposição ou posição relativa na vista. A lista selecionável não fornece equivalente completo da imagem.
- **Impacto:** pessoas cegas não podem explorar independentemente as mesmas informações espaciais. A validação com usuários é necessária para definir um equivalente útil; não se deve inventar posicionamento anatômico ainda não validado.
- **Recomendação:** definir alternativa textual espacial com especialista e usuários de tecnologia assistiva; testar anúncios e semântica. **Risco:** descrição incorreta pode induzir erro anatômico; não modificar geometria ou conteúdo científico sem revisão.

### U-04 — BAIXA — navegação longa no mobile — pendente
- **Evidência/reprodução:** em 360 px os novos controles ocupam várias linhas abaixo do canvas de 480 px; captura `depois-teclado-360.png`. Cabeçalho mobile permanece no topo do documento durante o piloto (decisão 12.2.5), exigindo retorno ao topo para o menu.
- **Impacto:** mais rolagem e mais paradas Tab, especialmente em uso repetido. **Recomendação:** avaliar com usuários uma organização compacta sem ocultar nomes, foco ou alvos; evitar repetir a sobreposição corrigida na 12.2.5. **Risco:** agrupamento/colapso inadequado pode prejudicar descoberta e teclado.

Nenhuma ocorrência crítica foi demonstrada nos cenários executados. Isto não implica inexistência de outras falhas.

## Resultados e evidências

- `tests/keyboard-access-1226.mjs`: 360×800, 768×1024 e 1440×900; Tab/Enter/Espaço até o piloto, seleção de brônquio direito, `aria-pressed`, isolar/mostrar todas, quatro direções, aproximar/afastar e restaurar posição em tolerância 1e-6. Vinte ativações adicionais de afastar verificaram distância finita: é teste de repetição curto, **não** estudo de uso prolongado. Capturas `depois-teclado-*.png`. Instrumentação do módulo Vite expõe os controles para leitura numérica; as interações são no canvas real do piloto, não um harness de câmera isolado.
- `tests/mobile-1225.mjs`: 360, 375, 390, 414, 768, 1024 e 1440 px; seleção das cinco estruturas, etiqueta, painel, isolamento, retorno e hit-tests pontuais, sem overflow horizontal nos cenários. `tests/mobile-lifecycle-1225.mjs`: entrada por Sistemas, navegação, limpeza e fallback mobile. Emulação de viewport não equivale a aparelho físico.
- `tests/real-controls-1222.mjs`: mouse no canvas para órbitas, zoom, pan e reset numérico; `tests/fallback-1222.mjs`: falha de GLB e retorno ao esquemático. `tests/audit-respiratory-browser.mjs`: cinco larguras e fluxo incluindo quiz esquemático. Estes testes foram executados após adicionar controles, antes da alteração exclusivamente textual da região de status.
- Nomes e descrições (localização, função, relações e descrição didática) estão disponíveis como texto no painel para as cinco estruturas. A lista possui botões nomeados com estado pressionado; isolamento muda o nome do botão para Mostrar todas; carregamento usa `role=status` e fallback oferece retorno. A descrição espacial/anatômica e os anúncios efetivos não foram validados externamente.
- Foco visível no botão Restaurar câmera na captura 360; navegação por Tab atingiu os controles testados. Não se mediu área/contraste do indicador em todos os estados e componentes. Os seis novos botões mediram 46 px de altura no cenário 360; isso não comprova 2.5.8 para todos os alvos.
- Contraste pontual calculado a partir de cores CSS sRGB: texto normal `#F5F8FC` sobre botão `#101827` ≈ 16,68:1; seleção `#04121F` sobre `#00C8FF` ≈ 9,63:1. Não é uma varredura de todas as cores, estados, sobreposições ou conteúdo 3D.
- Build e lint passaram após a alteração final; aviso existente de chunks >500 kB e um aviso de spread no store. Inspeção dos GLBs passou; SHA-256 conferidos com 12.2.5: pulmão `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab`, traqueia `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae`, brônquios `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa`.

## Preservação e limitações

Nesta fase não foram alterados GLBs, geometria, dados curriculares, store, SM-2, XP, conquistas, avaliações, persistência ou importação/exportação. As contagens 90 dias/597 questões/586 flashcards e os testes completos de store/SSR foram verificados na 12.2.5, não reexecutados nesta fase; a preservação aqui decorre do escopo das alterações, não de uma nova execução integral. Estado prévio não commitado preservado; nenhum commit criado.

Não houve ensaio prolongado com pessoas ou duração suficiente para avaliar fadiga, nem validação de desempenho e toque em hardware físico. Não se comprovou zoom de 200%/400%, navegação por voz, leitor de tela ou acessibilidade total. A continuidade e orientação dos modelos ainda aguardam profissional; a divergência NIH/HRA de nome de arquivo pulmonar permanece documentada nas fases anteriores. Recomendam-se testes reais de acessibilidade e hardware antes de qualquer afirmação mais forte.

## Critérios desta classificação

A falha comprovada de câmera por teclado foi mitigada e as regressões pontuais de navegação, seleção, isolamento, retorno, mouse e fallback passaram. Permanecem U-03, U-04 e validação humana da U-02, além das limitações acima; por isso a aprovação é condicionada e não substitui certificação WCAG ou parecer anatômico. Aguardar autorização explícita antes da próxima fase.
