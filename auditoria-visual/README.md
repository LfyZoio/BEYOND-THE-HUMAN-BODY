# Fase 11.1 — evidências visuais

Capturas de viewport do Dashboard e do Laboratório 3D, feitas em Chromium headless com WebGL por software (SwiftShader). São capturas da área visível inicial, não de todas as seções ou estados interativos. O Laboratório em telas pequenas exige rolagem vertical para alcançar o restante do canvas e os controles.

| Resolução | Dashboard | Laboratório 3D |
|---|---|---|
| 360 × 800 | [captura](360x800-dashboard.png) | [captura](360x800-lab3d.png) |
| 390 × 844 | [captura](390x844-dashboard.png) | [captura](390x844-lab3d.png) |
| 768 × 1024 | [captura](768x1024-dashboard.png) | [captura](768x1024-lab3d.png) |
| 1024 × 768 | [captura](1024x768-dashboard.png) | [captura](1024x768-lab3d.png) |
| 1440 × 900 | [captura](1440x900-dashboard.png) | [captura](1440x900-lab3d.png) |

## Execução

Os scripts `tests/browser-visual11.mjs`, `tests/browser-flow11.mjs` e `tests/browser-persist11.mjs` foram executados em um servidor Vite local e usam perfis de teste isolados. Dependem de `playwright-core` e de um executável Chromium com bibliotecas de sistema instaladas; não são dependências de produção. Defina `CHROMIUM_PATH` e inicie `npm run dev` antes de executá-los. O teste de persistência cria e remove o perfil temporário `/tmp/anatomia-profile-11`; não aponte esse caminho para dados reais.

Nas 65 visitas (13 seções × 5 resoluções), o teste verificou navegação e largura de documento, não todas as interações ou cortes internos. Não houve `pageerror` capturado. O fluxo de estudo e o teste 3D foram executados em 1440 × 900; não substituem verificação em aparelhos físicos ou GPUs reais.
