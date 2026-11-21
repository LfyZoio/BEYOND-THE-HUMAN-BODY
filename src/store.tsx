import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AnswerRecord, FlashcardDef, ProgressState, SessionRecord } from './types';
import { DAYS_A } from './data/contentA';
import { DAYS_B } from './data/contentB';
import { DAYS_C } from './data/contentC';
import { DAYS_D } from './data/contentD';
import { DAYS_E } from './data/contentE';
import { DAYS_F } from './data/contentF';
import { DAYS_G } from './data/contentG';
import { DAYS_H } from './data/contentH';
import { DAYS_I } from './data/contentI';
import { MODULES } from './data/curriculum';
import { gradeCardState, computeMastery, masteryLabel } from './lib/srs';

export const ALL_DAYS = [...DAYS_A, ...DAYS_B, ...DAYS_C, ...DAYS_D, ...DAYS_E, ...DAYS_F, ...DAYS_G, ...DAYS_H, ...DAYS_I];
export const ALL_FLASHCARDS: FlashcardDef[] = [...ALL_DAYS.flatMap(d => d.flashcards)];
export const ALL_QUESTIONS = ALL_DAYS.flatMap(d => d.questions.map(q => ({ ...q, moduleId: d.moduleId })));

const KEY = 'anatomia3d_v1';
const todayStr = () => new Date().toISOString().slice(0, 10);

export const DEFAULT_SETTINGS = {
  dailyMinutes: 30, studyDays: [1, 2, 3, 4, 5, 6, 0], studyTime: '08:00', pace: 'Moderado',
  goal: 'Dominar anatomia humana em 90 dias', theme: 'Escuro', notifications: true, reviewPref: 'SM-2 (repetição espaçada)',
  name: 'Estudante', photo: '',
};

function defaultState(): ProgressState {
  return {
    completedLessons: [], completedModules: [], answers: [], cards: {}, customCards: [],
    favorites: [], readArticles: [], sessions: [], xp: 0, streak: 0, lastStudyDate: '',
    id3d: [], assessments: [], settings: { ...DEFAULT_SETTINGS }, startedAt: todayStr(),
  };
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as ProgressState;
    return { ...defaultState(), ...parsed, settings: { ...DEFAULT_SETTINGS, ...parsed.settings } };
  } catch { return defaultState(); }
}

interface Store {
  state: ProgressState;
  completeLesson: (day: number, minutes: number) => void;
  recordAnswer: (q: { id: string; answer: number; correct: boolean; moduleId: number; topic: string; source: string }) => void;
  gradeCard: (id: string, grade: number) => void;
  addCustomCard: (c: FlashcardDef) => void;
  deleteCustomCard: (id: string) => void;
  toggleFavorite: (id: string) => void;
  markRead: (id: string) => void;
  addSession: (minutes: number, activity: string) => void;
  recordId3d: (structureId: string, correct: boolean) => void;
  addAssessment: (a: ProgressState['assessments'][number]) => void;
  updateSettings: (s: Partial<ProgressState['settings']>) => void;
  importJSON: (json: string) => boolean;
  resetAll: () => void;
  dueCards: FlashcardDef[];
  mastery: (moduleId: number) => { pct: number; label: string; answered: number; correct: number };
  systemMastery: (system: string) => { pct: number; label: string };
  smartReview: { title: string; reason: string; goal: string; action: string; priority: number }[];
  stats: { totalMinutes: number; weekMinutes: number; accuracy: number; answered: number; lessonsDone: number; retention: number };
  achievements: { id: string; name: string; desc: string; unlocked: boolean }[];
}

const Ctx = createContext<Store | null>(null);
export const useStore = () => { const c = useContext(Ctx); if (!c) throw new Error('store'); return c; };



export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota */ } }, [state]);

  const touch = (s: ProgressState, minutes: number, activity: string): ProgressState => {
    const today = todayStr();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const streak = s.lastStudyDate === today ? s.streak : (s.lastStudyDate === yesterday ? s.streak + 1 : 1);
    // minutes === 0: registra a atividade (sequência/XP) sem inflar o tempo de estudo.
    const sessions: SessionRecord[] = minutes > 0 ? [...s.sessions, { date: today, minutes, activity }] : s.sessions;
    return { ...s, streak, lastStudyDate: today, sessions: sessions.slice(-365) };
  };

  const store: Store = useMemo(() => {
    const allCards = [...ALL_FLASHCARDS, ...state.customCards];
    const dueCards = allCards.filter(c => {
      const cs = state.cards[c.id];
      return !cs || cs.due <= todayStr();
    });
    const mastery = (moduleId: number) => {
      const ans = state.answers.filter(a => a.moduleId === moduleId);
      const correct = ans.filter(a => a.correct).length;
      const lessons = MODULES.find(m => m.id === moduleId);
      const totalLessons = lessons ? lessons.lessons.length : 1;
      const lessonsDone = lessons ? lessons.lessons.filter((_, i) => state.completedLessons.includes(`day-${lessons.startDay + i}`)).length : 0;
      const cardIds = allCards.filter(c => c.moduleId === moduleId).map(c => c.id);
      const reviewed = cardIds.filter(id => state.cards[id] && state.cards[id].reps > 0).length;
      const { pct, label } = computeMastery({ lessonsDone, totalLessons, answered: ans.length, correct, cardsReviewed: reviewed, totalCards: cardIds.length });
      return { pct, label, answered: ans.length, correct };
    };
    const systemMastery = (system: string) => {
      const mods = MODULES.filter(m => m.system === system);
      if (!mods.length) return { pct: 0, label: 'Não iniciado' };
      const avg = Math.round(mods.reduce((s, m) => s + mastery(m.id).pct, 0) / mods.length);
      return { pct: avg, label: masteryLabel(avg) };
    };
    const wrongTopics: Record<string, number> = {};
    state.answers.filter(a => !a.correct).forEach(a => { wrongTopics[a.topic] = (wrongTopics[a.topic] || 0) + 1; });
    const forgotten = allCards.filter(c => state.cards[c.id]?.lapses >= 2);
    const smartReview = [
      ...Object.entries(wrongTopics).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([topic, n]) => ({
        title: `Reforçar: ${topic}`, reason: `${n} questão(ões) errada(s) neste tópico.`, goal: 'Corrigir a lacuna identificada nas questões.', action: 'Revisar a aula e refazer as questões do tópico.', priority: n,
      })),
      ...forgotten.slice(0, 3).map(c => ({
        title: `Flashcards esquecidos: ${c.front.slice(0, 40)}…`, reason: `Cartão com ${state.cards[c.id].lapses} esquecimentos registrados.`, goal: 'Recuperar a retenção deste conteúdo.', action: 'Revisar no Centro de Memorização.', priority: 2,
      })),
      ...MODULES.filter(m => mastery(m.id).pct < 50 && mastery(m.id).answered > 0).slice(0, 2).map(m => ({
        title: `Revisar módulo: ${m.title}`, reason: `Domínio atual de ${mastery(m.id).pct}% (meta: 70%+).`, goal: 'Elevar o domínio do módulo.', action: 'Refazer aulas, questões e flashcards do módulo.', priority: 1,
      })),
    ].sort((a, b) => b.priority - a.priority).slice(0, 6);
    const totalMinutes = state.sessions.reduce((s, x) => s + x.minutes, 0);
    const weekAgo = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10);
    const weekMinutes = state.sessions.filter(s => s.date >= weekAgo).reduce((s, x) => s + x.minutes, 0);
    const answered = state.answers.length;
    const correctAll = state.answers.filter(a => a.correct).length;
    const accuracy = answered ? Math.round((correctAll / answered) * 100) : 0;
    const cardStates = Object.values(state.cards);
    const retention = cardStates.length ? Math.round((cardStates.filter(c => c.reps > 0).length / cardStates.length) * 100) : 0;
    const achievements = [
      { id: 'first', name: 'Primeiros Passos', desc: 'Concluir a primeira aula', unlocked: state.completedLessons.length >= 1 },
      { id: 'week1', name: 'Semana 1 Completa', desc: 'Concluir os 7 primeiros dias', unlocked: state.completedLessons.length >= 7 },
      { id: 'q50', name: '50 Questões', desc: 'Responder 50 questões', unlocked: answered >= 50 },
      { id: 'q200', name: '200 Questões', desc: 'Responder 200 questões', unlocked: answered >= 200 },
      { id: 'cards50', name: 'Memória Ativa', desc: 'Revisar 50 flashcards', unlocked: cardStates.reduce((s, c) => s + c.reps, 0) >= 50 },
      { id: 'streak7', name: 'Sequência de 7 dias', desc: 'Estudar 7 dias seguidos', unlocked: state.streak >= 7 },
      { id: 'xp1000', name: '1000 XP', desc: 'Acumular 1000 pontos de experiência', unlocked: state.xp >= 1000 },
      { id: 'id3d', name: 'Explorador 3D', desc: 'Identificar 10 estruturas no laboratório 3D', unlocked: state.id3d.length >= 10 },
    ];
    return {
      state, dueCards, mastery, systemMastery, smartReview, achievements,
      stats: { totalMinutes, weekMinutes, accuracy, answered, lessonsDone: state.completedLessons.length, retention },
      completeLesson: (day, minutes) => setState(s => {
        const key = `day-${day}`;
        if (s.completedLessons.includes(key)) return s;
        return touch({ ...s, completedLessons: [...s.completedLessons, key], xp: s.xp + 50 }, minutes, `Aula do Dia ${day}`);
      }),
      recordAnswer: (q) => setState(s => {
        const rec: AnswerRecord = { questionId: q.id, correct: q.correct, date: todayStr(), moduleId: q.moduleId, topic: q.topic, source: q.source };
        return touch({ ...s, answers: [...s.answers.slice(-2000), rec], xp: s.xp + (q.correct ? 10 : 2) }, 0, `Questão (${q.source})`);
      }),
      gradeCard: (id, grade) => setState(s => {
        const next = gradeCardState(s.cards[id], grade, todayStr());
        next.id = id;
        return touch({ ...s, cards: { ...s.cards, [id]: next }, xp: s.xp + (grade >= 2 ? 5 : 1) }, 0, 'Flashcards');
      }),
      addCustomCard: (c) => setState(s => ({ ...s, customCards: [...s.customCards, c] })),
      deleteCustomCard: (id) => setState(s => ({ ...s, customCards: s.customCards.filter(c => c.id !== id) })),
      toggleFavorite: (id) => setState(s => ({ ...s, favorites: s.favorites.includes(id) ? s.favorites.filter(f => f !== id) : [...s.favorites, id] })),
      markRead: (id) => setState(s => ({ ...s, readArticles: s.readArticles.includes(id) ? s.readArticles : [...s.readArticles, id] })),
      addSession: (minutes, activity) => setState(s => touch(s, minutes, activity)),
      recordId3d: (structureId, correct) => setState(s => ({ ...s, id3d: [...s.id3d.slice(-500), { structureId, correct, date: todayStr() }], xp: s.xp + (correct ? 15 : 3) })),
      addAssessment: (a) => setState(s => ({ ...s, assessments: [...s.assessments, a], xp: s.xp + a.score * 5 })),
      updateSettings: (patch) => setState(s => ({ ...s, settings: { ...s.settings, ...patch } })),
      importJSON: (json) => {
        try {
          const parsed = JSON.parse(json) as ProgressState;
          if (!parsed || typeof parsed !== 'object' || !('settings' in parsed)) return false;
          setState({ ...defaultState(), ...parsed, settings: { ...DEFAULT_SETTINGS, ...parsed.settings } });
          return true;
        } catch { return false; }
      },
      resetAll: () => setState(defaultState()),
    };
  }, [state]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}
