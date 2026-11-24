# Inventário de proveniência — Fase 12.2.10

Contagem de unidades audiovisuais/de uso: 3 GLBs, 1 favicon, 2 famílias remotas, 1 conjunto Lucide, 56 PNGs de evidência. Cada arquivo tem linha própria; os 219 registros do lock são inventário separado, sem somá-los novamente aos ícones. B = documentação relevante mas condições/cadeia a verificar; C = pendente; E = nenhuma autorização identificada. Licença conhecida não equivale a conformidade comprovada. Evidências são capturas anteriores, não ativos da aplicação; direitos de conteúdo renderizado não são automaticamente do capturador.

## Recursos usados

| ID | Caminho / recurso | Bytes | SHA-256 | Origem / autoria / licença | Evidência | Status |
|---|---|---:|---|---|---|---|
| R001 | `public/models/respiratorio/lung.glb` | 10941068 | `97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab` | Pulmão HRA v1.3; Browne e Schlehlein / CC BY 4.0 | [Pulmão HRA v1.3](https://lod.humanatlas.io/ref-organ/lung-male/v1.3/) | B |
| R002 | `public/models/respiratorio/trachea.glb` | 1184804 | `0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae` | Traqueia HRA v1.0; Browne e Schlehlein / CC BY 4.0 | [Traqueia HRA v1.0](https://lod.humanatlas.io/ref-organ/trachea-male/v1.0/) | B |
| R003 | `public/models/respiratorio/main-bronchus.glb` | 422208 | `6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa` | Brônquios HRA v1.0; Browne e Schlehlein / CC BY 4.0 | [Brônquios HRA v1.0](https://lod.humanatlas.io/ref-organ/main-bronchus-male/v1.0/) | B |
| R004 | `public/favicon.svg` | 9522 | `61bc9a161de58248288e6905425d7180f0624c2865007b97d763fdac12043a66` | autoria/origem/licença não identificadas | `index.html`, histórico Git | E |
| R005 | Google Fonts Inter remoto | não fixo | não disponível | Inter Project Authors; SIL OFL 1.1 para família no Google Fonts | [OFL](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt); `src/index.css` | B |
| R006 | Google Fonts Manrope remoto | não fixo | não disponível | Manrope Project Authors; SIL OFL 1.1 para família no Google Fonts | [OFL](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt); `src/index.css` | B |
| R007 | Ícones `lucide-react` (conjunto usado) | veja pacote | veja DEP no JSON | Lucide/colaboradores ISC; ícones Feather listados MIT Cole Bemis | `src/App.tsx`, `node_modules/lucide-react/LICENSE` e [licença](https://lucide.dev/license) | B |

Fontes remotas têm respostas variáveis; tamanho/hash e versão de cada binário entregue não foram obtidos. Nenhum áudio/vídeo, fonte ou textura de arquivo separado foi encontrado em `src` e `public`; materiais PBR estão dentro dos GLBs, sem hash individual e sua origem é herdada dos objetos conforme metadados, sem comprovação independente de cada componente. SVGs inline/procedurais e textos do projeto requerem confirmação de autoria e direitos; não são automaticamente licenciados.

## Evidências locais PNG

Origem: capturas de auditorias locais documentadas em `docs/fase-12-2-*` e `auditoria-visual/README.md`; autor individual, data de criação e licença própria não identificados. Status C: conteúdo parcialmente derivado de GLBs/ícones/fontes e necessita análise dos direitos e atribuição; não presumir que a captura autoriza redistribuição.

| ID | Arquivo | Bytes | SHA-256 | Status |
|---|---|---:|---|---|
| E001 | `auditoria-piloto/fase-12-2-2/bronquio-direito-isolado.png` | 8882 | `103887b0a107d1cc7da435856ba500044ba6f939697086b9575f0b969fbf52f8` | C |
| E002 | `auditoria-piloto/fase-12-2-2/bronquio-em-contexto.png` | 152918 | `c4808cea5e1fa803acfe4f4b71f9043f003eaa029c715652a66dab2ab0757332` | C |
| E003 | `auditoria-piloto/fase-12-2-2/frente-aproximada.png` | 66669 | `e5056016f4bd950678fd70f02ab31e79dfdb3e17cdb666bb6d0ee62ac51cb6da` | C |
| E004 | `auditoria-piloto/fase-12-2-2/lateral-aproximada.png` | 50119 | `30e0683014615a47e111d66c510066cfa6e0ac64563d53af9bf22fe9598dc59d` | C |
| E005 | `auditoria-piloto/fase-12-2-2/posterior-aproximada.png` | 34536 | `752b53b4e5905263d2db32f3ef6f3374276b375547bc81fe81cf2b7fd443c71e` | C |
| E006 | `auditoria-piloto/fase-12-2-2/traqueia-isolada.png` | 17629 | `af5c529f44559abebc389513d3359771915e0a985aa64c53100eb1cf6fca81a3` | C |
| E007 | `auditoria-piloto/fase-12-2-3/anterior-aproximado.png` | 66669 | `e5056016f4bd950678fd70f02ab31e79dfdb3e17cdb666bb6d0ee62ac51cb6da` | C |
| E008 | `auditoria-piloto/fase-12-2-3/antes-selecionado.png` | 150416 | `cf139ecf2b294b89dd86052d4bc5ef27adb403b966b83c5c5e218a72dcd0dd1a` | C |
| E009 | `auditoria-piloto/fase-12-2-3/depois-selecionado.png` | 158889 | `3dc98bcd90606ca091727760aecee6305573f74151c81a87c18ad2382f796edd` | C |
| E010 | `auditoria-piloto/fase-12-2-3/juncao-contexto-transparente.png` | 198763 | `659357be1457333b3a176913367d9318e91cd3667147cbd8a99e9ddd0e2b354b` | C |
| E011 | `auditoria-piloto/fase-12-2-3/juncao-traqueia-destacada.png` | 202832 | `d8b675665328bb056d61a7abf2bee29238de614a8e65e11ebb8fc1c61959e908` | C |
| E012 | `auditoria-piloto/fase-12-2-3/lateral-direita-hipotese.png` | 37053 | `4cb92fc2f928ba26aeb73ffcf0e1be344f92c09a57ebfd2548866ab0e7c1a038` | C |
| E013 | `auditoria-piloto/fase-12-2-3/lateral-esquerda-hipotese.png` | 50119 | `30e0683014615a47e111d66c510066cfa6e0ac64563d53af9bf22fe9598dc59d` | C |
| E014 | `auditoria-piloto/fase-12-2-3/posterior-aproximado.png` | 34536 | `752b53b4e5905263d2db32f3ef6f3374276b375547bc81fe81cf2b7fd443c71e` | C |
| E015 | `auditoria-piloto/fase-12-2-3/superior.png` | 47719 | `eba1b21e36759a10ef80682dced432144b34fe7b9d330bff9c875faefce906bf` | C |
| E016 | `auditoria-piloto/fase-12-2-4/inferior-hipotese.png` | 44626 | `429f48a189a7160aec16529e87ced240904db252b0a55e5abb5cdeecb2cb8ebd` | C |
| E017 | `auditoria-piloto/fase-12-2-4/interface-1440.png` | 183189 | `dcb8ef5cccb73215d23d203255b812ebfe98445d90662a20c5b73273f4926c80` | C |
| E018 | `auditoria-piloto/fase-12-2-4/interface-360.png` | 144778 | `9960702bf12e7a0f83d80a3e9decad974d109eb69b6f3bdba518da59266b2164` | C |
| E019 | `auditoria-piloto/fase-12-2-5/antes-360-viewport.png` | 45061 | `741a8e0f1308d48339b7cd647ed80113248013cc755ba28d5f7971c146f2c9e7` | C |
| E020 | `auditoria-piloto/fase-12-2-5/depois-1024-viewport.png` | 121357 | `04c1188f1211f5781965bcca1603ce89fa73a4a5d1828eb16efbc0381b8ec16e` | C |
| E021 | `auditoria-piloto/fase-12-2-5/depois-1440-viewport.png` | 166207 | `31393e399f8c3c8b1b934fa786b72b874dd3e0779b694368de7d11b76fc4915b` | C |
| E022 | `auditoria-piloto/fase-12-2-5/depois-360-viewport.png` | 41462 | `8d0caf7bbf86d74add4f328554ea5bbb768eb6ebf60756e7b3153e494cf0efed` | C |
| E023 | `auditoria-piloto/fase-12-2-5/depois-375-viewport.png` | 44285 | `90050cbcf69482237dc2457940b5b46a87916457773f416e59c6e9987508b73f` | C |
| E024 | `auditoria-piloto/fase-12-2-5/depois-390-viewport.png` | 44575 | `81a729c97d635671a7a5a29ad026f973f739e47487f105cf94a59cfbcc9963c0` | C |
| E025 | `auditoria-piloto/fase-12-2-5/depois-414-viewport.png` | 45068 | `e69ef42236fc417534309b250969d09cc605d935d9bea91db295e3935ce679f1` | C |
| E026 | `auditoria-piloto/fase-12-2-5/depois-768-viewport.png` | 90820 | `e6fc63a387e6c4c0f3abd85dcf52e65880b636581721b0c268afc5a488d3bdb0` | C |
| E027 | `auditoria-piloto/fase-12-2-6/antes-teclado-1440.png` | 161726 | `e70e844c98e510e3c97e2a8e98593055f70ca8b1e3d3f78db09d603b0ddf1f9a` | C |
| E028 | `auditoria-piloto/fase-12-2-6/antes-teclado-360.png` | 54486 | `b3a3ccf7eb46875160f68c714805ef74e252104ca528c4be10b0e48184805cfa` | C |
| E029 | `auditoria-piloto/fase-12-2-6/antes-teclado-768.png` | 83757 | `504dd0f24967aeb965280770387cbf492f75d7036c1ce42eec26ea397cf9d412` | C |
| E030 | `auditoria-piloto/fase-12-2-6/depois-teclado-1440.png` | 166642 | `c19c04dfa75adf994f4c21788da30c07adaca83867c54c2bc657eda967097bae` | C |
| E031 | `auditoria-piloto/fase-12-2-6/depois-teclado-360.png` | 60024 | `92703b70f73f864d25b473472ef534307b045185850740b73f69b5482a9a7a67` | C |
| E032 | `auditoria-piloto/fase-12-2-6/depois-teclado-768.png` | 95879 | `1f683fe543ded4148697f58b556d4deffd19abb6e71c6181b29fc93d6b133f7a` | C |
| E033 | `auditoria-piloto/fase-12-2-8/depois-teclado-1440.png` | 166642 | `c19c04dfa75adf994f4c21788da30c07adaca83867c54c2bc657eda967097bae` | C |
| E034 | `auditoria-piloto/fase-12-2-8/depois-teclado-360.png` | 60132 | `4eabf36969cb42e39b530c0ef468bd0a401b972e6f62e36488445e369726f308` | C |
| E035 | `auditoria-piloto/fase-12-2-8/depois-teclado-768.png` | 95737 | `26a2031d4747d76fd50de64a83a17b993d161a6a8f9072df3b0c86b0b33106d2` | C |
| E036 | `auditoria-piloto/fase-12-2-9/isolada-1.png` | 14051 | `5d5749b0cbe4535a9be93894069d2c9c62c67e3ab0689bcca85d7c328ed6af2e` | C |
| E037 | `auditoria-piloto/fase-12-2-9/isolada-2.png` | 12763 | `18404b4c92713b09e313c4d289f3650e9f76a6765df85df98a3cc59ba6459f00` | C |
| E038 | `auditoria-piloto/fase-12-2-9/isolada-3.png` | 5924 | `9d3a3b8e6eca57f279af9defec250eba1c69f7ba2e16f590a2563d2927ae109e` | C |
| E039 | `auditoria-piloto/fase-12-2-9/isolada-4.png` | 2988 | `9a54b7d9ac9107271ef69afe0b17eab42c400728c8ef3a3058ec0856fa77e242` | C |
| E040 | `auditoria-piloto/fase-12-2-9/isolada-5.png` | 3816 | `e596df113e08bb2c59ce834379601dedaa38426eda1763cbcf219849d338b63d` | C |
| E041 | `auditoria-piloto/piloto-1440.png` | 149149 | `f5b44e4f4f542444259046b79f99e94a7ba1862a1c72c0476c6f32fecb395e2e` | C |
| E042 | `auditoria-piloto/piloto-360.png` | 109213 | `edffcbe116f334d108580959542310e771f4e12ab40ab1e1e1e50df10ab383af` | C |
| E043 | `auditoria-piloto/selecionada-1024.png` | 178577 | `889f44e4206b04373de24a54960696468daec0562af5f0fb32407657324649e3` | C |
| E044 | `auditoria-piloto/selecionada-1440.png` | 181451 | `a29bf97ae45978f02172fde04dffc90caa5fc63531649887b52d63d177e67f11` | C |
| E045 | `auditoria-piloto/selecionada-390.png` | 137499 | `2d5f81528639a46ca6480f292ec86cd573ed73e321b7a31254b5d4a44daa3228` | C |
| E046 | `auditoria-piloto/selecionada-768.png` | 141246 | `b74689ab35c376a9ba8d31c2d6ec2bfd7108cdf0848f21c169cc104d4b5fb6a9` | C |
| E047 | `auditoria-visual/1024x768-dashboard.png` | 135118 | `af0275e30024dbc6978392b13a566ce76a20769e64316d3f7cb594c2305be6cc` | C |
| E048 | `auditoria-visual/1024x768-lab3d.png` | 117533 | `2f5661e8c82d110d1049c1e07b5a9bc376cfb29c8acdb0ff03fe0a4b54b2b84b` | C |
| E049 | `auditoria-visual/1440x900-dashboard.png` | 169965 | `51ad4f2fb1dfc8389ad88ab1343c9753e3e4256c8348951f0ca4b97ce3b11cd5` | C |
| E050 | `auditoria-visual/1440x900-lab3d.png` | 153227 | `4940a6a87e122ddc3ee0e8b041a5aa392c018e3c5a8660663dc0249b3cd4ac0b` | C |
| E051 | `auditoria-visual/360x800-dashboard.png` | 57962 | `24276e972603dda8069e60af47783df851eea399b6732e6c868be214cfa0cbf4` | C |
| E052 | `auditoria-visual/360x800-lab3d.png` | 45324 | `2355b1db34b7d730a31b977951d89e51d53013edccdb6f743f3ceadd3c4041d0` | C |
| E053 | `auditoria-visual/390x844-dashboard.png` | 63611 | `5853043c108d3d119917b4120c10a1a35d76dd45374fabee621d4a3308e1e8db` | C |
| E054 | `auditoria-visual/390x844-lab3d.png` | 49963 | `090107ab7f4d41201dce8d5db8f147d2b97d5adeb033ccab670fea7849f3f37c` | C |
| E055 | `auditoria-visual/768x1024-dashboard.png` | 127304 | `bf1a4d856105119f4d322c9613b4170b2b1c361f6533d42be82b1491c3179948` | C |
| E056 | `auditoria-visual/768x1024-lab3d.png` | 89950 | `2a759a83d2900abb117fda8baaa0e2ed454ebe4897e92170ca280aa3528d23da` | C |

## Dependências

[Inventário estruturado de todos os registros do lock](inventario-dependencias-12-2-10.json): caminho, versão, origem resolvida, SRI, classificação dev/opcional, licença declarada, autor e repositório quando instalados, hash/tamanho do manifesto e arquivos de licença encontrados. `null` indica dado não disponível, não inexistência. SRI é hash do tarball declarado, não SHA-256 do pacote instalado; pacotes opcionais de outras plataformas podem não estar instalados. Não se verificaram cada arquivo interno nem sua presença no bundle.
