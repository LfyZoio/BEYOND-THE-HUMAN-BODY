export type SystemId = 'fundamentos'|'esqueletico'|'articular'|'muscular'|'nervoso'|'cardiovascular'|'respiratorio'|'digestorio'|'urinario'|'reprodutor'|'tegumentar'|'cabeca-pescoco'|'estetica'|'integrada'|'revisao';

export interface LessonSection { heading: string; body: string; points?: string[] }
export interface Question { id: string; q: string; options: string[]; answer: number; explanation: string; whyWrong?: string; difficulty: 'iniciante'|'intermediario'|'avancado'; topic: string; type?: string }
export interface FlashcardDef { id: string; front: string; back: string; category: string; moduleId: number }
export interface DayContent { day: number; title: string; subtitle: string; moduleId: number; objectives: string[]; sections: LessonSection[]; summary: string; glossary: { term: string; def: string }[]; questions: Question[]; flashcards: FlashcardDef[]; estimatedMinutes: number; activity?: string; review?: string }

export interface ModuleDef { id: number; title: string; system: SystemId; systemName: string; description: string; objectives: string[]; lessons: string[]; startDay: number; endDay: number; level: 1|2|3; color: string }

export interface StructureDef {
  id: string; name: string; scientific: string; system: SystemId; systemName: string;
  location: string; classification: string; origin?: string; insertion?: string; action?: string;
  innervation?: string; vascularization?: string; function: string; relations: string;
  lesson: string; moduleId: number; level: 1|2|3;
  pos: [number, number, number]; scale: [number, number, number]; color: string; shape: 'sphere'|'box'|'capsule'|'cone'|'cylinder'|'torus';
}

export interface CardState { id: string; ease: number; interval: number; reps: number; lapses: number; due: string; history: { date: string; grade: number }[] }
export interface AnswerRecord { questionId: string; correct: boolean; date: string; moduleId: number; topic: string; source: string }
export interface SessionRecord { date: string; minutes: number; activity: string }
export interface Settings { dailyMinutes: number; studyDays: number[]; studyTime: string; pace: string; goal: string; theme: string; notifications: boolean; reviewPref: string; name: string; photo: string }
export interface ProgressState {
  completedLessons: string[]; // day keys e.g. "day-1"
  completedModules: number[];
  answers: AnswerRecord[];
  cards: Record<string, CardState>;
  customCards: FlashcardDef[];
  favorites: string[]; // library ids
  readArticles: string[];
  sessions: SessionRecord[];
  xp: number; streak: number; lastStudyDate: string;
  id3d: { structureId: string; correct: boolean; date: string }[];
  assessments: { id: string; title: string; score: number; total: number; date: string; moduleId: number }[];
  settings: Settings;
  startedAt: string;
}
