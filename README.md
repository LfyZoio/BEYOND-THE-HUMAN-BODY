# ANATOMIA 3D — Beyond the Human Body

Plataforma web de aprendizagem de anatomia humana (React + Vite + TypeScript + Tailwind CSS + Three.js/React Three Fiber + Lucide).

## Como rodar
```bash
npm install
npm run dev
```

## O que está implementado
- **13 seções funcionais**: Dashboard, Minha Jornada (90 dias), Plano Diário, Biblioteca, Laboratório 3D, Sistemas do Corpo, Banco de Questões, Centro de Memorização, Revisão Inteligente, Avaliações, Meu Desempenho, Perfil e Configurações.
- **15 módulos** cadastrados com objetivos, aulas, dias e níveis (1–3).
- **Dias 1–7 completos**: aulas com seções didáticas, glossário, 90 questões com explicações e motivos das alternativas incorretas, 80 flashcards.
- **Repetição espaçada SM-2** real: intervalos, facilidade, lapsos e reagendamento por cartão.
- **Revisão inteligente** derivada de questões erradas, flashcards esquecidos e domínio por módulo.
- **Domínio por módulo/sistema** calculado por aulas (30%) + questões (50%) + retenção (20%).
- **Laboratório 3D** (Three.js/R3F): 9 sistemas, 35 estruturas selecionáveis com painel completo (origem, inserção, ação, inervação, relações, aula), isolamento, etiquetas e atividade de identificação com registro de acertos/erros. Modelos **esquemáticos procedurais** (geometrias primitivas) — a estrutura técnica para GLB/GLTF licenciados está pronta; nenhum modelo inexistente é apresentado como real.
- **Biblioteca** com 35 artigos anatômicos (busca comum/científica, filtros, favoritos, leitura, impressão/PDF).
- **Persistência local** (localStorage, formato pronto para migração a PostgreSQL) + exportação JSON.
- **Gamificação**: XP, sequência, conquistas, certificado de progresso.

## Limitações honestas
- Backend Java/Spring Boot não implementado neste ambiente: frontend funcional com persistência local e serviços organizados para integração futura com API (sem simular backend inexistente).
- Conteúdo detalhado dos Dias 8–90: currículo estruturado nos 15 módulos; expansão aula a aula segue a mesma estrutura dos Dias 1–7.
- Modelos 3D anatômicos GLB/GLTF licenciados: visualizador pronto para recebê-los (carregamento sob demanda); atualmente esquemáticos procedurais.

## Auditoria (branch arena/3fdd96a7)
- Correções: quiz 3D não exibe mais a resposta no enunciado; camadas pele (epiderme/derme/hipoderme) sem sobreposição de geometria; nome científico da bexiga e dos compartimentos de gordura corrigidos; Dia 6 expandido para 15 questões e 15 flashcards; 3 questões duplicadas do Dia 7 substituídas; filtro do Banco de Questões corrigido; TimerTick com useEffect; tempo de estudo não é mais inflado por questões/flashcards; SM-2 extraído para `src/lib/srs.ts` (função pura testada); importação JSON no store + botão na UI (antes só havia exportação).
- Testes reais: `node --experimental-strip-types /tmp/audit.mjs` (integridade dos dados), `npx vite build --ssr tests/ssr-smoke.tsx --outDir dist-test/ssr && node dist-test/ssr/ssr-smoke.js` (28/28), `npx vite build --ssr tests/store-jsdom.tsx --outDir dist-test/jsdom && node dist-test/jsdom/store-jsdom.js` (19/19), e 17/17 testes unitários do SM-2/domínio.
