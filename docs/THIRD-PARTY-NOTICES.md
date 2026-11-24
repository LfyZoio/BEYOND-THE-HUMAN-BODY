# Avisos de terceiros — preparação para distribuição

**Rascunho de conformidade, não certificado completo de licenças.** Este documento centraliza evidências e créditos; sua existência em `docs/` não garante que apareça no site, acompanhe downloads de GLB, código ou pacotes, nem que todos os textos obrigatórios estejam incluídos no artefato distribuído. Antes de qualquer distribuição, revisar o conteúdo efetivo do pacote, preservar avisos e textos integrais aplicáveis e disponibilizá-los por canal adequado. Não foi realizada publicação nesta fase.

## Modelos anatômicos HRA

Os registros individuais identificam Kristen Browne e Heidi Schlehlein como criadoras, HuBMAP como editor e dados Visible Human Male da National Library of Medicine. Cada arquivo abaixo corresponde ao blob oficial indicado em [auditoria 12.2.10](fase-12-2-10-auditoria-licencas-proveniencia.md). O projeto não alterou os bytes dos GLBs; a aplicação adapta agrupamento, materiais de apresentação, câmera, seleção e visualização. Para qualquer derivação posterior, registrar suas mudanças reais; não presumir que este aviso cubra modificações futuras. Licença de cada modelo: [Creative Commons Attribution 4.0 International (CC BY 4.0), texto legal](https://creativecommons.org/licenses/by/4.0/legalcode.en). Compartilhamento e adaptação, inclusive comercial, são permitidos sob condições: atribuição razoável, link da licença, indicação de alterações, preservação de avisos fornecidos e ausência de restrições adicionais; outros direitos podem existir. Condições detalhadas: seções 2 e 3 da licença.

### Pulmão masculino v1.3 — `public/models/respiratorio/lung.glb`

> Kristen Browne e Heidi Schlehlein, *3D Reference Organ for Lung, Male v1.3* (2023), Human Reference Atlas / HuBMAP, baseado em dados Visible Human Male, National Library of Medicine. [Registro HRA](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/) · [DOI 10.48539/HBM737.FFBT.876](https://doi.org/10.48539/HBM737.FFBT.876) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Arquivo GLB sem alteração de bytes; agrupamento e visualização adaptados na aplicação.

### Traqueia masculina v1.0 — `public/models/respiratorio/trachea.glb`

> Kristen Browne e Heidi Schlehlein, *3D Reference Organ for Trachea, Male v1.0* (2023), Human Reference Atlas / HuBMAP, baseado em dados Visible Human Male, National Library of Medicine. [Registro HRA](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/) · [DOI 10.48539/HBM969.WCCJ.636](https://doi.org/10.48539/HBM969.WCCJ.636) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Arquivo GLB sem alteração de bytes; agrupamento e visualização adaptados na aplicação. O registro HRA relata separação da traqueia do pulmão v1.2.

### Brônquios principais masculinos v1.0 — `public/models/respiratorio/main-bronchus.glb`

> Kristen Browne e Heidi Schlehlein, *3D Reference Organ for Main Bronchus, Male v1.0* (2023), Human Reference Atlas / HuBMAP, baseado em dados Visible Human Male, National Library of Medicine. [Registro HRA](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/) · [DOI 10.48539/HBM795.LVRX.842](https://doi.org/10.48539/HBM795.LVRX.842) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Arquivo GLB sem alteração de bytes; agrupamento e visualização adaptados na aplicação. O registro HRA relata separação dos brônquios do pulmão v1.2.

**Pendente:** verificar avisos eventualmente fornecidos em cada fonte e direitos anteriores, a suficiência da atribuição para cada modalidade de compartilhamento e a divergência do nome de arquivo da entrada NIH. Os textos acima não substituem o acompanhamento efetivo dos créditos no artefato ou a revisão jurídica.

## Texturas e materiais

Os três GLBs não declaravam imagens ou texturas na inspeção anterior; seus materiais PBR são incorporados. A licença individual é documentada para o objeto como um todo, não houve comprovação independente da origem ou direitos de cada componente. Nenhuma modificação de materiais ou texturas foi feita nesta fase.

## Imagens e favicon

`public/favicon.svg`, 48 × 46, corresponde por blob Git `6893eb13237060adc0c968a690149a49faa2d7d3` ao [favicon do template React oficial create-vite no commit 520d13b](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/template-react/public/favicon.svg). A [licença específica do create-vite naquele commit](https://github.com/vitejs/vite/blob/520d13bfb14c4cf4fd8d3620e1fc5e6e815c9606/packages/create-vite/LICENSE) declara CC0 1.0 Universal para arquivos em diretórios `template-*`; [texto CC0](https://creativecommons.org/publicdomain/zero/1.0/legalcode). Responsável da origem: projeto Vite/create-vite; autor individual do desenho não identificado. O arquivo local é idêntico, sem mudanças identificadas; a cadeia exata de aquisição é desconhecida. CC0 não concede direitos de marca: revisão do uso do logotipo como identidade do projeto continua pendente; não se presume endosso da Vite.

Capturas de tela são evidências locais, algumas retratam modelos HRA, ícones e fontes: [revisão por arquivo](revisao-capturas-12-2-10-1.md). Direitos e distribuição de cada composição permanecem pendentes.

## Ícones

`lucide-react` 1.77.0: Lucide Icons e colaboradores, [ISC e lista Feather/MIT](https://github.com/lucide-icons/lucide/blob/main/LICENSE); [licença do projeto](https://lucide.dev/license). O LICENSE local traz Copyright (c) 2026 Lucide Icons and Contributors e MIT para ícones derivados do Feather, Copyright (c) 2013-present Cole Bemis. `src/App.tsx` importa entre outros `HelpCircle` e `X`, integrantes da lista Feather. Cópias/porções abrangidas requerem preservação dos avisos e textos aplicáveis; identificar os ícones efetivamente incluídos e fornecer os textos completos em cada distribuição. Ícones são renderizados com propriedades visuais pela aplicação; não há alteração de arquivo de biblioteca registrada nesta fase.

## Fontes

- **Inter:** Inter Project Authors, [fonte oficial e SIL OFL 1.1](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt), Copyright 2020 The Inter Project Authors; usada remotamente via Google Fonts. Nenhuma modificação local comprovada.
- **Manrope:** Manrope Project Authors, [fonte oficial e SIL OFL 1.1](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt), Copyright 2018 The Manrope Project Authors; usada remotamente via Google Fonts. Nenhuma modificação local comprovada.

OFL permite usar, modificar e redistribuir sob suas condições, inclusive comercialmente; fontes não podem ser vendidas isoladamente, cópias devem acompanhar licença e copyright e fontes modificadas obedecem às condições de nomes reservados e licença. As respostas remotas não foram fixadas nem inspecionadas; não alegar distribuição local de fontes ou conformidade de versões não obtidas.

## Bibliotecas e dependências

Ver [revisão por 219 registros](revisao-dependencias-12-2-10-1.json) e [inventário anterior](inventario-dependencias-12-2-10.json). Diretamente usadas no código: React e React DOM (MIT, Meta Platforms e afiliadas); Three.js (MIT, three.js authors); React Three Fiber (MIT declarado, upstream Poimandres; arquivo LICENSE local não encontrado); React Three Drei (MIT, react-spring); Lucide (acima). Os textos exatos das versões e avisos internos devem acompanhar cópias/porções aplicáveis. `vite` inclui no seu `LICENSE.md` licenças de dependências empacotadas; `webgl-constants` possui LICENSE MIT local apesar de campo ausente; 12 entradas de `lightningcss` são declaradas MPL-2.0 e marcadas dev. A presença de transitivas no lock não prova presença nos bundles de produção. Os avisos de cada pacote, código empacotado internamente e LICENSE/NOTICE de Apache/MPL ainda devem ser conferidos contra o artefato. Este sumário não substitui os textos completos.

## Direitos do projeto

Licença e titularidade do código e conteúdo educacional do próprio projeto permanecem sem declaração verificável. Atribuições de terceiros não licenciam automaticamente essas partes. Revisar também SVGs inline e capturas; não inserir autorizações fictícias.
