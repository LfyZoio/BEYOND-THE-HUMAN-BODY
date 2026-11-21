import { useState } from 'react';
import { LayoutDashboard, Route, CalendarDays, Library, Box, Layers, HelpCircle, Brain, RefreshCcw, ClipboardCheck, BarChart3, User, Settings as SettingsIcon, Menu, X, Flame, Star } from 'lucide-react';
import { StoreProvider, useStore } from './store';
import { Dashboard, Journey, DailyPlan } from './pages/Dashboard';
import { Lesson } from './pages/Lesson';
import { Library as LibraryPage, Systems } from './pages/Library';
import Lab3D from './components/LazyLab3D';
import { Questions, Flashcards, SmartReview, Assessments } from './pages/Practice';
import { Performance, Profile, Settings } from './pages/Performance';
import { PageTitle } from './components/ui';

export type Page = 'dashboard' | 'jornada' | 'plano' | 'biblioteca' | 'lab' | 'sistemas' | 'questoes' | 'memorizacao' | 'revisao' | 'avaliacoes' | 'desempenho' | 'perfil' | 'config';

const NAV: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'jornada', label: 'Minha Jornada', icon: Route },
  { id: 'plano', label: 'Plano Diário', icon: CalendarDays },
  { id: 'biblioteca', label: 'Biblioteca de Estudos', icon: Library },
  { id: 'lab', label: 'Laboratório 3D', icon: Box },
  { id: 'sistemas', label: 'Sistemas do Corpo', icon: Layers },
  { id: 'questoes', label: 'Banco de Questões', icon: HelpCircle },
  { id: 'memorizacao', label: 'Centro de Memorização', icon: Brain },
  { id: 'revisao', label: 'Revisão Inteligente', icon: RefreshCcw },
  { id: 'avaliacoes', label: 'Avaliações', icon: ClipboardCheck },
  { id: 'desempenho', label: 'Meu Desempenho', icon: BarChart3 },
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'config', label: 'Configurações', icon: SettingsIcon },
];

function Shell() {
  const [page, setPage] = useState<Page>('dashboard');
  const [lessonDay, setLessonDay] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const { state, dueCards } = useStore();
  const go = (p: Page) => { setPage(p); setLessonDay(null); setMobile(false); };
  const openLesson = (day: number) => { setLessonDay(day); setMobile(false); };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-[#26364A]">
        <h1 className="text-lg font-extrabold leading-tight">ANATOMIA 3D</h1>
        <p className="text-xs text-[#00C8FF] font-bold tracking-widest">BEYOND THE HUMAN BODY</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV.map(n => (
          <button key={n.id} onClick={() => go(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${page === n.id && lessonDay === null ? 'bg-[#00C8FF]/15 text-[#00C8FF] border border-[#00C8FF]/40' : 'text-[#9BAFC4] hover:text-white hover:bg-[#101827] border border-transparent'}`}>
            <n.icon size={18} /> {n.label}
            {n.id === 'memorizacao' && dueCards.length > 0 && <span className="ml-auto badge bg-[#00C8FF] text-[#04121F]">{dueCards.length}</span>}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-[#26364A] text-xs text-[#9BAFC4] space-y-1">
        <p className="flex items-center gap-2"><Flame size={14} className="text-orange-400" /> Sequência: {state.streak} dia(s)</p>
        <p className="flex items-center gap-2"><Star size={14} className="text-[#00C8FF]" /> {state.xp} XP</p>
        <p>{state.settings.name}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#080E18]">
      <aside className="hidden lg:block w-64 shrink-0 border-r border-[#26364A] bg-[#101827] sticky top-0 h-screen">{sidebar}</aside>
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobile(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#101827] border-r border-[#26364A]">{sidebar}</aside>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-[#080E18]/95 backdrop-blur border-b border-[#26364A] px-4 py-3 flex items-center justify-between">
          <button onClick={() => setMobile(true)} aria-label="Abrir menu">{mobile ? <X size={24} /> : <Menu size={24} />}</button>
          <span className="font-extrabold">ANATOMIA 3D</span>
          <span className="text-xs text-[#00C8FF] font-bold">{state.xp} XP</span>
        </header>
        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          {lessonDay !== null ? <Lesson day={lessonDay} back={() => setLessonDay(null)} openLab={() => { setLessonDay(null); setPage('lab'); }} />
            : page === 'dashboard' ? <Dashboard go={go} />
            : page === 'jornada' ? <Journey go={go} />
            : page === 'plano' ? <DailyPlan openLesson={openLesson} />
            : page === 'biblioteca' ? <LibraryPage />
            : page === 'lab' ? (<div><PageTitle title="Laboratório Anatômico 3D" sub="Explore estruturas em 3D, selecione, isole e identifique. Modelos esquemáticos procedurais (Three.js)." /><Lab3D /></div>)
            : page === 'sistemas' ? <Systems />
            : page === 'questoes' ? <Questions />
            : page === 'memorizacao' ? <Flashcards />
            : page === 'revisao' ? <SmartReview />
            : page === 'avaliacoes' ? <Assessments />
            : page === 'desempenho' ? <Performance />
            : page === 'perfil' ? <Profile />
            : <Settings />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <StoreProvider><Shell /></StoreProvider>;
}
