# Protocolo reproduzível — desempenho em hardware físico

**Status: protocolo preparado; nenhum resultado físico coletado nesta fase.** Não preencher com números do SwiftShader. Usar uma ficha por dispositivo: (A) desktop/notebook com GPU dedicada, (B) desktop/notebook com GPU integrada, (C) Android físico, quando disponível. Registrar falha, indisponibilidade ou N/D, não substituir por estimativa.

## Preparação e controle

1. Identificar a revisão/patch exato testado: branch, commit, mudanças não commitadas e SHA-256 dos GLBs, versão do build, URL, protocolo HTTPS/HTTP e data/hora. Preparar build de produção de uma cópia aprovada (`npm ci` e `npm run build`; servir `dist` num servidor acessível ao dispositivo). Registrar versão Node e servidor. `npm ci` altera dependências locais: executá-lo na cópia de teste, não no perfil de trabalho. Não expor dados pessoais ou serviço sem autorização.
2. Usar perfil de navegador **temporário dedicado**, sem dados reais. Não limpar `localStorage`, cache ou histórico do usuário existente. Manter resolução/zoom do navegador (100% inicial), DPR, escala do SO e orientação documentados. Registrar rede, latência/velocidade se medida, fonte de energia, modo de economia, temperatura e outros processos. Não mudar condições entre laboratório e piloto; anotar quaisquer mudanças. Conferir em `chrome://gpu` ou equivalente que a GPU/driver efetivamente usados correspondem à categoria; se não for verificável, marcar desconhecido. No Android usar depuração remota apenas com autorização.
3. Registrar ferramenta e versão de medição (ex.: Chrome DevTools Performance e Network; no Android Chrome remoto); coletar traces/perfis sem informações pessoais. Excluir a sessão inicial de aquecimento apenas nos testes quentes; para frio reiniciar perfil/contexto, habilitar “Disable cache” no Network e recarregar. Não usar “clear site data” no perfil de produção. Mesma versão de navegador e servidor sempre que possível.

## Execução por dispositivo e por cena

1. Abrir laboratório esquemático respiratório. Com cache desabilitado, cronometrar do clique de navegação ao estado utilizável do esquema. Registrar hora, ação, condição de cache e ferramenta. Fazer três execuções frias e três quentes, alternando esquema/piloto quando possível; reabrir contexto para cada execução fria. Se cache de `useGLTF` persistir na mesma aba, documentar e recarregar para frio.
2. Para piloto: iniciar gravação Network/Performance **antes** do clique “Abrir piloto anatômico experimental”; registrar (a) duração de cada GLB via Network (pedidos paralelos, não somar tempos), bytes e cache; (b) tempo do clique até o indicador de carga desaparecer; (c) tempo até primeiro quadro útil visualmente confirmado, medido no trace/filmstrip em relação ao evento do clique, se disponível. O desaparecimento do indicador não garante quadro útil. Registrar método/resolução temporal e três valores frios/quentes; se não houver filmstrip, marcar (c) N/D.
3. Com o modelo completo, sem seleção e câmera restaurada, gravar 10 segundos de rotação contínua e separadamente 10 segundos de zoom alternado; usar sequência semelhante no esquema, com mesma viewport e ferramentas. Desktop: arrastar em órbita repetida e alternar roda de forma regular. Android: girar com um dedo e pinçar com dois; anotar intensidade e conflitos de rolagem. Repetir cada operação três vezes após aquecimento.
4. No trace Performance, usar contagem de quadros apresentados e intervalos na faixa de interação quando a ferramenta disponibilizar: registrar frames, duração, FPS médio `frames / segundos`, p50/p95 de duração dos frames se a ferramenta os fornecer, e ferramenta. Um contador `requestAnimationFrame` mede callbacks, não necessariamente quadros apresentados: relatar como **RAF/s** separadamente, nunca renomear como FPS de GPU. Se não for possível medir FPS real de forma verificável, informar N/D. Exportar trace e descrição da seleção do intervalo.
5. Registrar memória JS no painel disponível (antes/depois da carga e após 5 reentradas); heap não é memória total/GPU. GPU/VRAM e memória do processo apenas se a ferramenta informar diretamente, com unidade e método; caso contrário N/D. Não comparar números de métricas diferentes. Registrar eventuais erros, context loss, aquecimento e encerramentos.
6. Selecionar cada uma das cinco estruturas por lista e, quando possível, por malha/toque; registrar se identificação, destaque, etiqueta e painel surgem corretamente, alternar isolamento e voltar a mostrar todas. Para latência, registrar separadamente o método: trace com timestamp do evento de entrada até alteração visível no filmstrip, ou medição aproximada por gravação externa com taxa de quadros informada. Repetir 5 vezes para cada método, apresentar valores individuais e mediana. Se não houver instrumento adequado, marcar N/D; não usar tempo de automação como latência humana/GPU.
7. Exercitar retorno da câmera após rotação, zoom e pan; verificar teclado/gestos, rolagem, layout, legibilidade e fallback (bloqueio de um GLB apenas em perfil de teste). Registrar sucesso/falha e observações. Voltar ao esquema e responder quiz em perfil temporário. Anotar qualidade visual, flicker, artefatos, sobreposição e taxa de travamentos; não confundir com correção anatômica.

## Ficha por dispositivo — preencher apenas após teste

- Data/hora, avaliador e local: __________________________
- Tipo: ☐ GPU dedicada ☐ GPU integrada ☐ Android físico; fabricante/modelo: __________
- CPU: __________ GPU/driver efetivo: __________ RAM: __________ SO/versão: __________
- Navegador/versão: __________ tela física: __________ viewport CSS/DPR/orientação: __________
- Energia/modo térmico: __________ rede/servidor/latência medida: __________
- Revisão/build/hashes: __________ ferramentas/versões: __________ cache: __________
- Carregamento (3 frios, 3 quentes), tempo de indicador e primeiro quadro útil: __________
- Tempo e bytes por GLB: __________
- Esquema: 3 valores de FPS durante rotação e zoom, amostras e trace: __________
- Piloto: 3 valores de FPS durante rotação e zoom, amostras e trace: __________
- RAF/s, se usado, com método separado: __________
- Memória JS/processo/GPU, fonte e unidade para cada métrica: __________
- Seleção: 5 latências/método/mediana ou N/D: __________
- Isolamento/retorno: __________ câmera/zoom/pan: __________
- Toque, rolagem, teclado, etiquetas, qualidade visual: __________
- Travamentos, erros, context loss, limitações e arquivo de evidência: __________
- Resultado: ☐ medido em hardware físico ☐ incompleto/N/D; explicação: __________

Critérios de aceitação quantitativos devem ser acordados previamente; os limites exploratórios de 5 MB/200 mil triângulos da 12.1 não são limiares clínicos nem garantia de boa experiência. Evidências SwiftShader das fases anteriores devem ser mantidas separadas. Não tirar conclusões de ganho sem comparar versões, condições e medições equivalentes.
