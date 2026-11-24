# Matriz de autorizações de terceiros — 12.2.10.3

Licença identificada é concessão sob condições, não aprovação do artefato final. Não há autorização individual obtida nesta fase. Evidências e textos/versões devem ser conservados conforme canal e análise profissional. Estados abaixo correspondem à evidência para o recurso isolado, não liberação do produto.

| Recurso | Titular / origem e prova | Permissão / obrigações | Estado e canal |
|---|---|---|---|
| `lung.glb` | Kristen Browne, Heidi Schlehlein, [HRA v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/), DOI 10.48539/HBM737.FFBT.876; blob local `dbbfdaf4cc51ea7d75cb0887b8fa003b8da9c00a` igual ao upstream | CC BY 4.0: compartilhar/adaptar inclusive comercial, créditos, licença, modificações e avisos aplicáveis; direitos de terceiros não abrangidos | DOCUMENTAÇÃO INSUFICIENTE para distribuição por canal; P06/P07 |
| `trachea.glb` | mesmas autoras, [HRA v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/), DOI 10.48539/HBM969.WCCJ.636; blob `06ebbd9354ff122ad38fffece39b7768e8f8475d` | CC BY 4.0, mesmas condições | DOCUMENTAÇÃO INSUFICIENTE por canal; P06/P07 |
| `main-bronchus.glb` | mesmas autoras, [HRA v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/), DOI 10.48539/HBM795.LVRX.842; blob `7f9e7c6e981ef044f848844afb914f0b206c2a3d` | CC BY 4.0, mesmas condições | DOCUMENTAÇÃO INSUFICIENTE por canal; P06/P07 |
| Favicon | [Vite template](auditoria-favicon-identidade-visual-12-2-10-3.md), blob igual | CC0 do template; marca separada | REVISÃO ESPECIALIZADA NECESSÁRIA, P08 |
| Inter | Inter Project Authors, [OFL](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt) | OFL 1.1 da família; verificar cópia efetiva, licença, copyright e condições incluindo nomes reservados se pertinentes | DOCUMENTAÇÃO INSUFICIENTE; P12 |
| Manrope | Manrope Project Authors, [OFL](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt) | OFL 1.1; mesmas ressalvas | DOCUMENTAÇÃO INSUFICIENTE; P12 |
| Lucide / Feather | [licença upstream](https://lucide.dev/license), LICENSE local | ISC; subset Feather MIT Cole Bemis, verificar subset exato, preservar avisos pertinentes | DOCUMENTAÇÃO INSUFICIENTE para entrega; P11/P13 |
| Template `src/main.tsx`, `tsconfig.json` | blobs idênticos ao template oficial fixado; [auditoria de código](auditoria-titularidade-codigo-12-2-10-3.md) | CC0 declarado para arquivos template; trajetória de aquisição não demonstrada | DOCUMENTAÇÃO INSUFICIENTE para conjunto; P09 |
| Decoder remoto Draco / `draco3d` | [auditoria dedicada](auditoria-decoder-externo-12-2-10-3.md) | Apache-2.0 declarada upstream; texto/NOTICE e binários específicos por cenário não verificados | DOCUMENTAÇÃO INSUFICIENTE, P16 |
| Capturas E001–E056 | [56 registros individuais](auditoria-individual-capturas-12-2-10-3.md) | GLB, ícones, textos e composição possuem direitos distintos | BLOQUEADO PREVENTIVAMENTE para divulgação, P10 |
| Código e conteúdo projeto | [código](auditoria-titularidade-codigo-12-2-10-3.md), [conteúdo](auditoria-direitos-conteudo-educacional-12-2-10-3.md) | origem e cessão não documentadas; ausência de licença não concede direitos | BLOQUEADO PREVENTIVAMENTE; autorizações podem ser necessárias, P09 |

## 14 dependências com módulos incorporados ao JS

Mapeamento reproduzível de 12.2.10.2; origem, autor, hashes de arquivos LICENSE e módulos por chunk nos IDs da [evidência JSON](inventario-artefato-producao-12-2-10-2.json). MIT/ISC permitem uso e distribuição sob preservação dos avisos e textos de licença aplicáveis. Confirmação do texto exato, conteúdo interno e entrega por canal permanece necessária. Licença do pacote não prova individualmente cada trecho interno. Nenhum LICENSE/NOTICE separado foi encontrado no `dist`; `docs/THIRD-PARTY-NOTICES.md` não está no `dist`. Estado de todas: DOCUMENTAÇÃO INSUFICIENTE para o produto; P11/P13.

| ID | Pacote / versão | Licença declarada | Autor no metadado | Evidência | Ressalva |
|---|---|---|---|---|---|
| DEP-001 | `@babel/runtime@7.29.15` | MIT | The Babel Team (https://babel.dev/team) | `node_modules/@babel/runtime/LICENSE` | confirmar avisos internos e por canal |
| DEP-035 | `@react-three/drei@10.7.9` | MIT | não indicado | `node_modules/@react-three/drei/LICENSE` | confirmar avisos internos e por canal |
| DEP-036 | `@react-three/fiber@9.8.2` | MIT | Paul Henschel (https://github.com/drcmda) | `LICENSE local não encontrado` | verificar texto exato da versão upstream |
| DEP-140 | `its-fine@2.1.1` | MIT | Cody Bennett (https://github.com/codyjasonbennett) | `node_modules/its-fine/LICENSE` | confirmar avisos internos e por canal |
| DEP-157 | `lucide-react@1.77.0` | ISC | Eric Fennis | `node_modules/lucide-react/LICENSE` | avisos Feather MIT também |
| DEP-173 | `react@19.3.1` | MIT | não indicado | `node_modules/react/LICENSE` | confirmar avisos internos e por canal |
| DEP-174 | `react-dom@19.3.1` | MIT | não indicado | `node_modules/react-dom/LICENSE` | confirmar avisos internos e por canal |
| DEP-175 | `react-use-measure@2.1.7` | MIT | Paul Henschel | `node_modules/react-use-measure/LICENSE` | confirmar avisos internos e por canal |
| DEP-179 | `scheduler@0.28.0` | MIT | não indicado | `node_modules/scheduler/LICENSE` | confirmar avisos internos e por canal |
| DEP-186 | `suspend-react@0.1.3` | MIT | Paul Henschel | `node_modules/suspend-react/LICENSE` | confirmar avisos internos e por canal |
| DEP-189 | `three@0.187.0` | MIT | mrdoob | `node_modules/three/LICENSE` | confirmar avisos internos e por canal |
| DEP-191 | `three-stdlib@2.36.1` | MIT | Paul Henschel (https://github.com/drcmda) | `node_modules/three-stdlib/LICENSE` | analisar módulos internos Draco/Meshopt |
| DEP-207 | `use-sync-external-store@1.7.0` | MIT | não indicado | `node_modules/use-sync-external-store/LICENSE` | confirmar avisos internos e por canal |
| DEP-219 | `zustand@5.1.0` | MIT | Paul Henschel | `node_modules/zustand/LICENSE` | confirmar avisos internos e por canal |

As seis unidades prévias não-GLB são favicon, duas fontes, ícones, grupo de capturas e código/conteúdo; desdobramentos acima evitam contagem duplicada. Modelos podem incorporar materiais PBR; os três GLBs não declaram imagens ou texturas separadas, mas direitos de todo componente não foram independentemente certificados. Não se contatou titular, e nenhum template de pedido constitui autorização.
