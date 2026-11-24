# Auditoria do decoder condicional — 12.2.10.3

## Identificação e cadeia

O recurso condicional é o **Google Draco**, decoder de geometria comprimida. `@react-three/drei@10.7.9` configura em `core/Gltf.js` o caminho `https://www.gstatic.com/draco/versioned/decoders/1.5.5/` e injeta `DRACOLoader` de `three-stdlib@2.36.1` no `useGLTF`. O [README oficial Draco na tag 1.5.5](https://github.com/google/draco/blob/1.5.5/README.md) identifica expressamente esse caminho como decoders versionados 1.5.5. O projeto é mantido pelo Google Draco Team; cabeçalho do [código de decoder dessa tag](https://github.com/google/draco/blob/1.5.5/src/draco/javascript/emscripten/decoder_webidl_wrapper.cc) informa Copyright 2016 The Draco Authors e Apache 2.0. A [LICENSE oficial 1.5.5](https://github.com/google/draco/blob/1.5.5/LICENSE) é Apache-2.0.

O `DRACOLoader` incluído em `node_modules/three-stdlib/loaders/DRACOLoader.js` solicita condicionalmente `draco_decoder.js` ou `draco_wasm_wrapper.js` mais `draco_decoder.wasm`. A listagem da árvore GitHub de 1.5.5 consultada não mostrou arquivo de nome `NOTICE` e mostrou `LICENSE` na raiz; isso não exclui avisos incorporados nos binários ou outros nomes e caminhos não detectados. **Os bytes servidos pelo gstatic não foram baixados, hashados ou inspecionados**, devido às restrições de rede; a identificação de versão/origem pelo README não demonstra byte-equivalência ou licenças de todos os componentes gerados.

Outro recurso distinto é **`draco3d@1.5.9` instalado em `node_modules`** como transitiva `@react-three/drei → three-stdlib → draco3d`; o lock e `package.json` declaram Apache-2.0 e Google Draco Team. A [LICENSE oficial da tag 1.5.9](https://github.com/google/draco/blob/1.5.9/LICENSE) é Apache-2.0. A busca local no diretório instalado não encontrou arquivo LICENSE/NOTICE separado. A árvore de dependências não prova inclusão de seus arquivos JS/WASM no bundle, e o mapa da Fase 12.2.10.2 não identificou módulos do pacote `draco3d` nos chunks. Não confundir o pacote 1.5.9 com o binário remoto configurado como 1.5.5.

## Presença, uso e condições

| Critério | Resultado / evidência |
|---|---|
| Dependência direta | Não declarada no `package.json` raiz. |
| Transitiva | `draco3d@1.5.9` consta em lock e `npm ls`; tipagens `@types/draco3d` também aparecem no lock. |
| Código no artefato | Módulos `three-stdlib` `DRACOLoader.js`/`GLTFLoader.js` aparecem no chunk `Lab3D`; isso não prova que o decoder binário 1.5.5 ou o pacote 1.5.9 inteiro esteja no `dist`. |
| Carregamento dinâmico externo | Configurado condicionalmente em `useGLTF`; sem requisição Draco no teste local de 12.2.10.2, com rede externa bloqueada. Isso não prova ausência em todos os cenários ou históricos. |
| Ativos atuais | Reinspecionados os JSONs dos três GLBs: `extensionsUsed` e `extensionsRequired` vazios, sem imagens/texturas declaradas; nenhum declara `KHR_draco_mesh_compression`. Não foram alterados. |
| Uso efetivo | Nenhum decoder Draco observado no caminho testado dos GLBs atuais; potencialmente necessário para outros ativos Draco. `MeshoptDecoder` é outro componente incluído no chunk e não deve ser confundido com Draco. |
| Atribuição/redistribuição | Apache 2.0 do código oficial permite redistribuição e modificação sob condições, incluindo cópia da licença, avisos/copyright aplicáveis, alterações e NOTICE quando houver, conforme seções 4 e 6; sem concessão de marca. Obrigações do binário remoto específico e componentes adicionais ainda exigem confirmação. |

## Conclusão

A identidade do projeto, URL e licença da **fonte oficial** 1.5.5 foram esclarecidas, não a identidade/licença integral dos arquivos remotos específicos. P16 continua aberta para qualquer cenário que os utilize; investigar os binários, avisos e condições de entrega antes de incorporá-los ou distribuí-los. O cenário de GLBs atuais não demonstra uso no teste feito. Não instalar, remover, alterar compressão ou substituir recursos nesta fase; nenhuma requisição externa para obter os binários foi feita.
