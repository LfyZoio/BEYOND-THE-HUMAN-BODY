// Entrada jsdom: testa o StoreProvider de verdade (contexto + persistência).
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
const g = globalThis as Record<string, unknown>;
for (const k of ['window', 'document', 'localStorage', 'sessionStorage', 'HTMLElement', 'Node', 'MutationObserver', 'getComputedStyle', 'Event', 'CustomEvent', 'KeyboardEvent', 'MouseEvent']) {
  Object.defineProperty(g, k, { value: (dom.window as never)[k], configurable: true, writable: true });
}
Object.defineProperty(g, 'navigator', { value: dom.window.navigator, configurable: true });
g.IS_REACT_ACT_ENVIRONMENT = true;

const { act } = await import('react');
const { createRoot } = await import('react-dom/client');
const React = await import('react');
const { StoreProvider, useStore } = await import('../src/store');

let pass = 0, fail = 0;
const ok = (cond: boolean, msg: string) => { if (cond) { pass++; console.log('  ✓', msg); } else { fail++; console.log('  ✗ FALHOU:', msg); } };

type StoreType = ReturnType<typeof useStore>;
let store: StoreType | null = null;
function Probe() {
  store = useStore();
  return null;
}
const cur = () => store as StoreType;

const container = dom.window.document.getElementById('root')!;
const root = createRoot(container);
await act(async () => { root.render(React.createElement(StoreProvider, null, React.createElement(Probe))); });
if (!cur()) { console.log('Store não montou'); process.exit(1); }

console.log('— Persistência inicial —');
ok(dom.window.localStorage.getItem('anatomia3d_v1') !== null, 'localStorage recebe estado inicial');

console.log('— Concluir aula (Dia 1) —');
await act(async () => { cur().completeLesson(1, 30); });
const afterLesson = JSON.parse(dom.window.localStorage.getItem('anatomia3d_v1')!);
ok(afterLesson.completedLessons.includes('day-1'), 'aula marcada como concluída e persistida');
ok(afterLesson.sessions.some((x: { minutes: number }) => x.minutes === 30), 'sessão de 30 min registrada');
ok(cur().mastery(1).pct > 0, `domínio do Módulo 1 subiu após aula (${cur().mastery(1).pct}%)`);

console.log('— Questões erradas geram Revisão Inteligente —');
await act(async () => { for (let i = 0; i < 3; i++) cur().recordAnswer({ id: `test-${i}`, answer: 0, correct: false, moduleId: 1, topic: 'Planos Anatômicos', source: 'Teste' }); });
ok(cur().smartReview.some(r => r.title.includes('Planos Anatômicos')), 'recomendação gerada para o tópico com erros');
ok(cur().smartReview.every(r => r.reason && r.goal && r.action), 'todas as recomendações têm justificativa e objetivo');
ok(cur().stats.accuracy === 0, `taxa de acerto reflete erros reais (${cur().stats.accuracy}%)`);

console.log('— SM-2 através do store —');
const today = new Date().toISOString().slice(0, 10);
const d3 = new Date(new Date(today).getTime() + 3 * 86400000).toISOString().slice(0, 10);
await act(async () => { cur().gradeCard('d1f1', 3); });
let card = cur().state.cards['d1f1'];
ok(card?.interval === 3 && card?.due === d3, `cartão d1f1 "Fácil": intervalo=3d, vence em ${d3}`);
await act(async () => { cur().gradeCard('d1f2', 0); });
card = cur().state.cards['d1f2'];
ok(card?.lapses === 1 && card?.interval === 0 && card?.due === today, 'cartão d1f2 esquecido: lapsos=1, reagendado para hoje');
await act(async () => { cur().gradeCard('d1f2', 3); });
card = cur().state.cards['d1f2'];
ok(card?.reps === 1 && card?.interval === 3, 'cartão reaprendido: intervalo reinicia em 3d');
const persisted = JSON.parse(dom.window.localStorage.getItem('anatomia3d_v1')!);
ok(persisted.cards['d1f1']?.interval === 3 && persisted.cards['d1f2']?.lapses === 1, 'estado dos cartões persistido no localStorage');
ok(Object.values(cur().state.cards).every(c => typeof c.ease === 'number' && c.ease >= 1.3), 'facilidade >= 1.3 em todos os cartões');

console.log('— Tempo e domínio —');
ok(cur().stats.totalMinutes === 30, 'questões e flashcards não acrescentam minutos');
await act(async () => { cur().completeLesson(7, 0); });
ok(cur().mastery(1).pct === 9, `domínio usa os 7 dias reais do módulo 1 (${cur().mastery(1).pct}%)`);

console.log('— Sequência e XP —');
ok(cur().state.streak >= 1, `sequência registrada (${cur().state.streak})`);
ok(cur().state.xp >= 50, `XP acumulado (${cur().state.xp})`);

console.log('— Exportação / importação —');
const snapshot = dom.window.localStorage.getItem('anatomia3d_v1')!;
let r1: boolean | undefined;
await act(async () => { r1 = cur().importJSON('isso não é json'); });
ok(r1 === false, 'importação de JSON inválido é rejeitada');
let malformed: boolean | undefined;
await act(async () => { malformed = cur().importJSON(JSON.stringify({settings: {}, answers: null})); });
ok(malformed === false && cur().state.answers.length === 3, 'backup malformado rejeitado sem alterar histórico');
const before = cur().state.completedLessons.length;
let r2: boolean | undefined;
await act(async () => { r2 = cur().importJSON(snapshot); });
ok(r2 === true, 'importação do snapshot válido é aceita');
ok(cur().state.completedLessons.includes('day-1'), 'aula concluída restaurada após importação');
ok(cur().state.completedLessons.length >= before, 'progresso mantido após round-trip de exportação/importação');

console.log('— Esquecimentos repetidos aparecem na Revisão Inteligente —');
await act(async () => { cur().gradeCard('d3f1', 0); });
await act(async () => { cur().gradeCard('d3f1', 0); });
await act(async () => { cur().gradeCard('d3f1', 0); });
ok(cur().smartReview.some(r => /esquec/i.test(r.title) || /esquec/i.test(r.reason)), 'cartão com 3 esquecimentos gera recomendação de revisão');

await act(async () => { root.unmount(); });
const root2 = createRoot(container);
await act(async () => { root2.render(React.createElement(StoreProvider, null, React.createElement(Probe))); });
ok(cur().state.completedLessons.includes('day-1') && cur().state.answers.length === 3, 'remontagem restaura aulas e histórico do localStorage');

await act(async () => { root2.unmount(); });
const broken = '{dados quebrados';
dom.window.localStorage.setItem('anatomia3d_v1', broken);
const root3 = createRoot(container);
await act(async () => { root3.render(React.createElement(StoreProvider, null, React.createElement(Probe))); });
await act(async () => { cur().completeLesson(2, 0); });
ok(dom.window.localStorage.getItem('anatomia3d_v1') === broken, 'registro local corrompido não é sobrescrito automaticamente');
await act(async () => { root3.unmount(); });
dom.window.localStorage.setItem('anatomia3d_v1', JSON.stringify({settings: {name: 'Legado'}, completedLessons: ['day-1']}));
const root4 = createRoot(container);
await act(async () => { root4.render(React.createElement(StoreProvider, null, React.createElement(Probe))); });
ok(cur().state.settings.name === 'Legado' && cur().state.completedLessons.includes('day-1') && cur().state.answers.length === 0, 'dados antigos parciais recebem padrões sem perder progresso');
await act(async () => { root4.unmount(); });

console.log(`\nSTORE/JSDOM: ${pass} passaram, ${fail} falharam`);
process.exit(fail ? 1 : 0);
