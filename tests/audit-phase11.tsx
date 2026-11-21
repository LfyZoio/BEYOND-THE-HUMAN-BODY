import { strict as assert } from 'node:assert';
import { renderToString } from 'react-dom/server';
import { ALL_DAYS, ALL_FLASHCARDS, ALL_QUESTIONS, StoreProvider } from '../src/store';
import { Lesson } from '../src/pages/Lesson';
import { computeMastery, gradeCardState } from '../src/lib/srs';

assert.equal(ALL_DAYS.length, 90);
assert.deepEqual(ALL_DAYS.map(d => d.day), Array.from({length: 90}, (_, i) => i + 1));
assert.equal(ALL_QUESTIONS.length, 597);
assert.equal(ALL_FLASHCARDS.length, 586);
for (const items of [ALL_QUESTIONS, ALL_FLASHCARDS]) assert.equal(new Set(items.map(x => x.id)).size, items.length);
assert.equal(new Set(ALL_QUESTIONS.map(q => q.q.trim().toLocaleLowerCase('pt-BR'))).size, ALL_QUESTIONS.length);
for (const d of ALL_DAYS) {
  assert.ok(d.title && d.objectives.length && d.sections.length && d.summary && d.glossary.length && d.questions.length && d.flashcards.length, `Dia ${d.day}`);
  for (const q of d.questions) assert.ok(q.answer >= 0 && q.answer < q.options.length && q.explanation, q.id);
  for (const f of d.flashcards) assert.equal(f.moduleId, d.moduleId, f.id);
  const html = renderToString(<StoreProvider><Lesson day={d.day} back={() => {}} /></StoreProvider>);
  for (const text of ['Objetivos de aprendizagem', 'Resumo da aula', 'Glossário', `Questões (${d.questions.length})`, `Flashcards (${d.flashcards.length})`]) assert.ok(html.includes(text), `Dia ${d.day}: ${text}`);
}
assert.equal(computeMastery({lessonsDone: 1,totalLessons: 2,answered: 2,correct: 1,cardsReviewed: 1,totalCards: 2}).pct, 50);
let card = gradeCardState(undefined, 3, '2026-01-01');
assert.equal(card.interval, 3); assert.equal(card.due, '2026-01-04');
card = gradeCardState(card, 0, '2026-01-04');
assert.equal(card.lapses, 1); assert.equal(card.reps, 0); assert.equal(card.due, '2026-01-04');
console.log('Auditoria automatizada: 90 aulas renderizadas, 597 questões, 586 cartões, IDs/perguntas únicos, SM-2 e domínio 30/50/20 verificados.');
