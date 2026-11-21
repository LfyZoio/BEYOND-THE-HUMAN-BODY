// Smoke test: renderiza cada página no servidor (renderToString) e valida conteúdo esperado.
import { renderToString } from 'react-dom/server';
import { StoreProvider } from '../src/store';
import App from '../src/App';
import { Dashboard, Journey, DailyPlan } from '../src/pages/Dashboard';
import { Lesson } from '../src/pages/Lesson';
import { Library } from '../src/pages/Library';
import { Questions, Flashcards, SmartReview, Assessments } from '../src/pages/Practice';
import { Performance, Profile, Settings } from '../src/pages/Performance';

let pass = 0, fail = 0;
const ok = (cond: boolean, msg: string) => {
  if (cond) { pass++; console.log('  ✓', msg); }
  else { fail++; console.log('  ✗ FALHOU:', msg); }
};

const wrap = (el: React.ReactElement) => renderToString(<StoreProvider>{el}</StoreProvider>);
const noop = () => {};

console.log('— App (view padrão = Dashboard) —');
const appHtml = renderToString(<App />);
for (const label of ['Dashboard','Minha Jornada','Plano Diário','Biblioteca de Estudos','Laboratório 3D','Sistemas do Corpo','Banco de Questões','Centro de Memorização','Revisão Inteligente','Avaliações','Meu Desempenho','Perfil','Configurações']) {
  ok(appHtml.includes(label), `sidebar contém "${label}"`);
}

console.log('— Dashboard —');
const dash = wrap(<Dashboard go={noop as never} />);
ok(/Bom dia|Boa tarde|Boa noite/i.test(dash), 'saudação exibida');
ok(dash.includes('Continuar') || dash.includes('jornada'), 'card de continuar jornada presente');

console.log('— Minha Jornada —');
const journey = wrap(<Journey go={noop as never} />);
ok(journey.includes('90') || journey.includes('Módulo'), 'jornada de 90 dias exibida');

console.log('— Plano Diário —');
const plan = wrap(<DailyPlan openLesson={noop as never} />);
ok(plan.includes('Dia 1') && plan.includes('Dia 7'), 'dias 1–7 listados');

console.log('— Lição (Dia 1) —');
const lesson = wrap(<Lesson day={1} back={noop} />);
ok(lesson.includes('Introdução à Anatomia'), 'título da aula do Dia 1');
ok(lesson.includes('Objetivos de aprendizagem'), 'objetivos listados');
const lessonHtml7 = wrap(<Lesson day={7} back={noop} />);
ok(lessonHtml7.includes('Revisão Geral'), 'Dia 7 renderiza');

console.log('— Biblioteca —');
const lib = wrap(<Library />);
ok(lib.includes('biblioteca') || lib.includes('Pesquisar'), 'biblioteca renderiza com busca');

console.log('— Banco de Questões —');
const q = wrap(<Questions />);
ok(q.includes('90') || q.includes('questão'), 'banco de questões exibe contagem');

console.log('— Centro de Memorização —');
const fc = wrap(<Flashcards />);
ok(fc.includes('Memorização') && fc.includes('Criar flashcard'), 'SRS + criação de cartão renderizam');

console.log('— Revisão Inteligente —');
const sr = wrap(<SmartReview />);
ok(sr.includes('Revisão Inteligente') && sr.includes('Como funciona'), 'página renderiza com explicativo');

console.log('— Avaliações —');
const av = wrap(<Assessments />);
ok(av.includes('Avaliação semanal'), 'avaliação semanal disponível');

console.log('— Meu Desempenho —');
const perf = wrap(<Performance />);
ok(perf.includes('Meu Desempenho') && perf.includes('Domínio por módulo'), 'analytics renderiza');

console.log('— Perfil —');
const prof = wrap(<Profile />);
ok(prof.includes('Conquistas') && prof.includes('Certificado'), 'perfil renderiza com conquistas e certificado');

console.log('— Configurações —');
const cfg = wrap(<Settings />);
ok(cfg.includes('Exportar dados') && cfg.includes('Importar dados'), 'exportar/importar JSON presentes');

console.log(`\nSSR SMOKE: ${pass} passaram, ${fail} falharam`);
process.exit(fail ? 1 : 0);
