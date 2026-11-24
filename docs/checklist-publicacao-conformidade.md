# Checklist de publicação e conformidade

**Não autoriza publicação.** Estados: CONCLUÍDO = evidência documental existente para a tarefa especificada; PENDENTE = falta execução/verificação; NÃO AVALIADO = depende de artefato/cenário. Obrigatório = condição da licença quando aplicável ou requisito interno de liberação aqui estabelecido; não é afirmação de obrigação legal universal. Responsáveis são sugestões, não atribuições aceitas.

| ID | Tipo | Item | Estado e evidência | Responsável sugerido | Critério de conclusão |
|---|---|---|---|---|---|
| C01 | Obrigatório | Identificar cada modelo e sua licença | CONCLUÍDO para identificação: [notices](THIRD-PARTY-NOTICES.md), registros HRA | mantenedor de ativos | 3 IDs, versões, autores, fonte e licença verificáveis |
| C02 | Obrigatório | Créditos e indicação de mudanças por modelo em cada canal | PENDENTE; notices e cartão UI são rascunho/indício, sem verificação de pacote | mantenedor + jurídico | Examinar site, download de cada GLB e pacote, com atribuição acessível, avisos de origem e alterações efetivas |
| C03 | Obrigatório | Direitos subjacentes HRA/NLM e divergência NIH | PENDENTE; [relatório](fase-12-2-10-1-regularizacao-documental.md) | responsável de direitos | Resposta documentada ou justificativa jurídica para cenário escolhido |
| C04 | Obrigatório | Favicon: identidade e licença específica | CONCLUÍDO para correspondência ao template CC0; [notices](THIRD-PARTY-NOTICES.md) | mantenedor | Blob e licença do template fixados |
| C05 | Obrigatório interno | Marca Vite e uso como identidade do produto | PENDENTE; CC0 não licencia marca | titular do projeto + jurídico | Avaliar marca/confusão e obter eventual autorização ou aprovar solução futura |
| C06 | Obrigatório | Identificar autoria e autorização de código, textos, currículo, SVGs e screenshots | PENDENTE; sem LICENSE de projeto documentado | titular + jurídico | Cadeia de direitos e licença expressa aprovadas e registradas |
| C07 | Obrigatório | Capturas por arquivo | PENDENTE; [56 registros](revisao-capturas-12-2-10-1.md) | editor + jurídico | Direitos, conteúdo, atribuições e canal decididos por imagem selecionada |
| C08 | Obrigatório | Inventário e avisos de dependências distribuídas | PENDENTE; [triagem lock](revisao-dependencias-12-2-10-1.json), sem SBOM do bundle | engenharia de release | SBOM/versionamento do artefato, licenças e avisos internos revisados |
| C09 | Obrigatório | Textos/LICENSE/NOTICE integrais e créditos do pacote | PENDENTE; arquivo central é sumário | engenharia de release | Identificar licenças efetivamente aplicáveis, incluir textos e avisos exigidos e testar acesso em cada canal |
| C10 | Obrigatório quando aplicável | OFL, MIT/ISC/BSD, Apache, MPL e direitos de terceiros | PENDENTE; resumo em notices | engenharia + jurídico | Verificar condições, fontes cobertas e modificações, distribuição de binários e arquivos de licença |
| C11 | Obrigatório | Fontes remotas ou fontes distribuídas | PENDENTE; família OFL identificada, respostas não verificadas | engenharia + privacidade | Verificar fontes realmente usadas e termos; se copiar, incluir licença/copyright e respeitar OFL |
| C12 | Obrigatório interno | Conferência dos arquivos distribuídos | NÃO AVALIADO; nenhum pacote foi liberado | engenharia de release | Comparar manifesto, hashes, licenças e acesso real dos destinatários no artefato final |
| C13 | Obrigatório interno | Revisão jurídica por cenário web, educacional e comercial | PENDENTE | jurídico qualificado | Registrar parecer e aprovação dos titulares responsáveis |
| C14 | Recomendação | Atualizar README desatualizado sobre modelos | PENDENTE; README declara não haver GLBs | mantenedor | Descrever piloto, fonte e limitações com autorização |
| C15 | Recomendação | Arquivar consultas e provas de origem/alterações | PARCIAL; referências e hashes registrados | mantenedor de ativos | Arquivar registros/versionamentos e histórico de aquisição onde possível |
| C16 | Recomendação | Privacidade/disponibilidade de fontes remotas | PENDENTE | responsável por privacidade | Analisar transferências, informar usuários e decidir solução |

Checklist depende da modalidade escolhida: aplicação local, web, código, GLB isolado, pacote completo, instituição ou monetização; uma célula preenchida não supre outra. Não remover recursos ou publicar para executar esta lista.
