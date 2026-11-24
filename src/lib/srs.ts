import type { CardState } from '../types';

/**
 * Algoritmo de repetição espaçada SM-2 (simplificado).
 * grade: 0 = Não lembrei | 1 = Difícil | 2 = Médio | 3 = Fácil
 * Retorna o novo estado do cartão (função pura, testável).
 */
export function gradeCardState(prev: CardState | undefined, grade: number, today: string): CardState {
  const base: CardState = prev ?? { id: '', ease: 2.5, interval: 0, reps: 0, lapses: 0, due: today, history: [] };
  let { ease, interval, reps, lapses } = base;
  if (grade === 0) {
    lapses += 1; reps = 0; interval = 0; ease = Math.max(1.3, ease - 0.2);
  } else if (grade === 1) {
    reps += 1; interval = Math.max(1, Math.round(interval * 0.8)); ease = Math.max(1.3, ease - 0.15);
  } else if (grade === 2) {
    reps += 1; interval = interval === 0 ? 1 : Math.max(1, Math.round(interval * 1.2));
  } else {
    reps += 1; interval = interval === 0 ? 3 : Math.max(2, Math.round(interval * ease)); ease = Math.min(3, ease + 0.1);
  }
  const due = new Date(new Date(today).getTime() + interval * 86400000).toISOString().slice(0, 10);
  return { id: base.id, ease, interval, reps, lapses, due, history: [...base.history, { date: today, grade }] };
}

export function masteryLabel(pct: number): string {
  if (pct <= 0) return 'Não iniciado';
  if (pct < 40) return 'Em aprendizado';
  if (pct < 70) return 'Em desenvolvimento';
  if (pct < 90) return 'Bem consolidado';
  return 'Domínio demonstrado';
}

/**
 * Domínio por módulo: aulas (30%) + questões (50%) + retenção de flashcards (20%).
 * Nunca calculado apenas pela conclusão de aulas.
 */
export function computeMastery(input: {
  lessonsDone: number; totalLessons: number;
  answered: number; correct: number;
  cardsReviewed: number; totalCards: number;
}): { pct: number; label: string } {
  const lessonPct = input.totalLessons ? (input.lessonsDone / input.totalLessons) * 30 : 0;
  const qPct = input.answered ? (input.correct / input.answered) * 50 : 0;
  const cardPct = input.totalCards ? (input.cardsReviewed / input.totalCards) * 20 : 0;
  const pct = Math.round(lessonPct + qPct + cardPct);
  return { pct, label: masteryLabel(pct) };
}
