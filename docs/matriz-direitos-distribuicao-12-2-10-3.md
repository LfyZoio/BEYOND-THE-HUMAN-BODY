# Matriz de direitos e distribuição por canal — 12.2.10.3

Estados: APTO DOCUMENTALMENTE, APTO COM CONDIÇÕES, PENDENTE, BLOQUEADO PREVENTIVAMENTE e NÃO AVALIADO. Referem-se ao **produto completo no escopo descrito**, não a todos os usos juridicamente possíveis. Bloqueio é decisão preventiva de gestão de risco, não juízo de ilegalidade. Nenhuma aprovação desta auditoria autoriza publicar. Titular/jurídico devem decidir o cenário e a jurisdição.

| Canal | Estado | Escopo e evidência | Condições / ação antes de liberar |
|---|---|---|---|
| Uso local privado | PENDENTE | Operação local existente; três GLBs usados e conteúdo próprio sem cadeia de autoria suficiente | Titular e jurídico avaliar direitos para o uso específico; manter créditos, confirmar dependências e condições aplicáveis. Não implica que uso privado seja proibido. |
| Demonstração local | BLOQUEADO PREVENTIVAMENTE | Visualização por terceiros pode envolver conteúdo, modelos e marcas; escopo de audiência não definido | Definir público/contexto e direitos, conferir atribuição acessível e autorização aplicável. |
| Hospedagem web | BLOQUEADO PREVENTIVAMENTE | `dist` contém GLBs/JS/CSS/favicon; sem arquivo de avisos separado; Google Fonts remoto | P06–P09, P11–P14 e P16 se aplicável: direitos, notices por canal, privacidade, marca e eventual decoder. |
| Código-fonte | BLOQUEADO PREVENTIVAMENTE | `src`, configurações, conteúdo e possivelmente documentação/capturas no repositório | Licença/cadeia do projeto, todos os arquivos incluídos, dependências e conteúdo/capturas; conferir notices. |
| Modelos isolados | PENDENTE | Os 3 GLBs HRA têm CC BY 4.0 e blobs identificados, mas não há atribuição independente por arquivo no `dist`; cadeia subjacente não resolvida | Distribuição pode ser permitida pela licença sob suas condições; validar atribuição por arquivo/canal, avisos existentes e avaliar direitos subjacentes. |
| Pacote completo | BLOQUEADO PREVENTIVAMENTE | Inclui código, modelos, fontes se empacotadas, ícones e eventual documentação | Resolver todos os componentes e incluir textos/avisos exigidos e créditos acessíveis no pacote. |
| Uso institucional educacional | BLOQUEADO PREVENTIVAMENTE | Público, modalidades, distribuição e obrigações institucionais indefinidas | Além dos direitos do produto, definir termos da instituição, público, privacidade e aprovação. Educação não elimina obrigação de licença. |
| Uso comercial | BLOQUEADO PREVENTIVAMENTE | CC BY permite comercial em princípio, mas direitos do produto e marcas estão pendentes | Definir exploração e canais, confirmar direitos, condições, marca e aprovações. |

## Revisão de `THIRD-PARTY-NOTICES.md`

O documento em `docs/THIRD-PARTY-NOTICES.md` prepara atribuições HRA e lista licenças, mas a existência no repositório **não prova entrega** ao destinatário. No `dist` auditado não há esse documento nem LICENSE/NOTICE separado; o cartão da UI foi visualizado para os GLBs no teste local, não garante atribuição acessível para download isolado ou todo outro canal, nem cobre todas as licenças de pacotes. Para fonte/pacote, verificar inclusão integral dos avisos e licenças exigidos na distribuição efetiva; para web, estabelecer apresentação/acesso adequado; para GLBs isolados, acompanhar cada modelo com atribuição e condições adequadas. Fontes remotas, decoder sob demanda, favicon/marca, ícones e conteúdos têm tratamento próprio. A decisão sobre o meio suficiente deve ser jurídica e específica do canal; não alterar o sistema de créditos nem este arquivo sem autorização.

Os 205 registros sem módulos identificados no mapa não foram provados ausentes da distribuição nem inúteis. Se o pacote incluir `node_modules`, mapas, documentação ou outros arquivos, repetir o inventário sobre esse pacote. Nenhum canal do produto completo é considerado documentalmente apto neste momento.
