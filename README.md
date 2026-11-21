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
- **Dias 1–7 completos**: aulas com seções didáticas, glossário, 85 questões com explicações e motivos das alternativas incorretas, 85 flashcards.
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
