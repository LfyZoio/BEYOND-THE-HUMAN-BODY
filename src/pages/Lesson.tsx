import { useCallback, useEffect, useState } from 'react';
import { useStore, ALL_DAYS } from '../store';
import { MODULES } from '../data/curriculum';
import { Card, PageTitle } from '../components/ui';
import { QuizRunner, FlashcardRunner } from '../components/runners';

export function Lesson({ day, back, openLab }: { day: number; back: () => void; openLab?: () => void }) {
  const { state, completeLesson, addSession } = useStore();
  const [tab, setTab] = useState<'aula' | 'questoes' | 'flashcards'>('aula');
  const [timer, setTimer] = useState(0);
  const [timing, setTiming] = useState(false);
  const tick = useCallback(() => setTimer(t => t + 1), []);
  const content = ALL_DAYS.find(d => d.day === day);
  if (!content) return <Card>Aula não encontrada.</Card>;
  const mod = MODULES.find(m => m.id === content.moduleId);
  const done = state.completedLessons.includes(`day-${day}`);
  const toggleTimer = () => {
    if (timing) { addSession(Math.floor(timer / 60), `Estudo — Dia ${day}`); setTiming(false); setTimer(0); }
    else setTiming(true);
  };
  return (
    <div>
      <button className="btn-ghost !py-2 text-sm mb-4 no-print" onClick={back}>← Voltar ao plano</button>
      <PageTitle title={`Dia ${day} — ${content.title}`} sub={`${content.subtitle} · ${mod?.title} · ~${content.estimatedMinutes} min`} />
      <div className="flex flex-wrap gap-2 mb-4 no-print">
        {(['aula', 'questoes', 'flashcards'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${tab === t ? 'bg-[#00C8FF] text-[#04121F]' : 'border-[#26364A] text-[#9BAFC4]'}`}>
            {t === 'aula' ? 'Aula' : t === 'questoes' ? `Questões (${content.questions.length})` : `Flashcards (${content.flashcards.length})`}</button>
        ))}
        <button className="btn-ghost !py-2 text-sm ml-auto" onClick={toggleTimer}>{timing ? `⏸ Parar cronômetro (${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')})` : '▶ Cronometrar estudo'}</button>
        {timing && <TimerTick onTick={tick} />}
      </div>
      {tab === 'aula' && (
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold mb-2">Objetivos de aprendizagem</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">{content.objectives.map(o => <li key={o}>{o}</li>)}</ul>
          </Card>
          {content.sections.map(s => (
            <Card key={s.heading}>
              <h3 className="font-bold text-lg mb-2 text-[#00C8FF]">{s.heading}</h3>
              <p className="text-[#F5F8FC]/90 leading-relaxed">{s.body}</p>
              {s.points && <ul className="list-disc pl-5 mt-3 text-sm text-[#9BAFC4] space-y-1">{s.points.map(p => <li key={p}>{p}</li>)}</ul>}
            </Card>
          ))}
          <Card className="!border-[#00C8FF]/40">
            <h3 className="font-bold mb-2">Resumo da aula</h3>
            <p className="text-sm leading-relaxed">{content.summary}</p>
          </Card>
          {content.activity && <Card><h3 className="font-bold mb-2">Atividade prática / identificação anatômica</h3><p className="text-sm leading-relaxed">{content.activity}</p></Card>}
          {content.review && <Card><h3 className="font-bold mb-2">Revisão do conteúdo anterior</h3><p className="text-sm leading-relaxed">{content.review}</p></Card>}
          <Card>
            <h3 className="font-bold mb-3">Glossário</h3>
            <div className="grid md:grid-cols-2 gap-3">{content.glossary.map(g => <div key={g.term} className="border border-[#26364A] rounded-xl p-3"><b className="text-[#00C8FF]">{g.term}</b><p className="text-sm text-[#9BAFC4]">{g.def}</p></div>)}</div>
          </Card>
          <div className="flex flex-wrap gap-2 no-print">
            <button className="btn-primary" onClick={() => setTab('questoes')}>Responder questões</button>
            <button className="btn-ghost" onClick={() => setTab('flashcards')}>Revisar flashcards</button>
            {openLab && <button className="btn-ghost" onClick={openLab}>Explorar no Laboratório 3D</button>}
            {!done && <button className="btn-ghost !border-green-500/60" onClick={() => { completeLesson(day, 0); alert('Aula concluída! +50 XP'); }}>Marcar aula como concluída</button>}
            {done && <span className="badge bg-green-500/20 text-green-400 self-center">Aula concluída</span>}
          </div>
        </div>
      )}
      {tab === 'questoes' && <QuizRunner questions={content.questions} moduleId={content.moduleId} source={`Dia ${day}`} />}
      {tab === 'flashcards' && <FlashcardRunner cards={content.flashcards} title={`Dia ${day}`} />}
    </div>
  );
}

function TimerTick({ onTick }: { onTick: () => void }) {
  useEffect(() => { const id = setInterval(onTick, 1000); return () => clearInterval(id); }, [onTick]);
  return null;
}
