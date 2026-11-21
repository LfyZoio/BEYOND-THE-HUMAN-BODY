import { useMemo, useState } from 'react';
import { useStore, ALL_DAYS } from '../store';
import { MODULES, SYSTEMS } from '../data/curriculum';
import { Bar, Card, Donut, Empty, LineChart, PageTitle, Stat, fmtMinutes } from '../components/ui';
import type { Page } from '../App';

export function Dashboard({ go }: { go: (p: Page) => void }) {
  const { state, stats, dueCards, mastery, smartReview } = useStore();
  const name = state.settings.name || 'Estudante';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const dayNumber = Math.min(90, Math.max(1, Math.floor((Date.now() - new Date(state.startedAt).getTime()) / 86400000) + 1));
  const currentDay = ALL_DAYS.find(d => d.day === dayNumber);
  const currentModule = MODULES.find(m => m.id === currentDay?.moduleId);
  const nextDay = ALL_DAYS.find(d => !state.completedLessons.includes(`day-${d.day}`));
  const weekData = useMemo(() => {
    const arr: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      arr.push(state.sessions.filter(s => s.date === d).reduce((s, x) => s + x.minutes, 0));
    }
    return arr;
  }, [state.sessions]);
  const weekLabels = ['-6', '-5', '-4', '-3', '-2', '-1', 'Hoje'];
  const overdue = dueCards.filter(c => state.cards[c.id] && state.cards[c.id].due < new Date().toISOString().slice(0, 10)).length;
  const recent = [...state.sessions].slice(-6).reverse();
  const strengths = MODULES.map(m => ({ m, p: mastery(m.id).pct })).sort((a, b) => b.p - a.p).slice(0, 3);
  const weak = MODULES.map(m => ({ m, p: mastery(m.id).pct })).filter(x => x.p > 0).sort((a, b) => a.p - b.p).slice(0, 3);
  const overall = Math.round(MODULES.reduce((s, m) => s + mastery(m.id).pct, 0) / MODULES.length);

  return (
    <div>
      <PageTitle title={`${greeting}, ${name}!`} sub={`${today} · Dia ${dayNumber} da jornada de 90 dias`} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Stat label="Sequência" value={`${state.streak} dias`} sub={`${state.xp} XP acumulados`} />
        <Stat label="Tempo de estudo" value={fmtMinutes(stats.totalMinutes)} sub={`${fmtMinutes(stats.weekMinutes)} esta semana`} />
        <Stat label="Taxa de acerto" value={`${stats.accuracy}%`} sub={`${stats.answered} questões respondidas`} />
        <Stat label="Aulas concluídas" value={`${stats.lessonsDone}/90`} sub={`${dueCards.length} flashcards para revisar`} />
      </div>

      <Card className="mb-4 !border-[#00C8FF]/50">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <span className="badge bg-[#00C8FF] text-[#04121F]">Continue sua jornada</span>
            <h2 className="text-xl font-extrabold mt-2">{nextDay ? `Dia ${nextDay.day} — ${nextDay.title}` : 'Jornada concluída!'}</h2>
            <p className="text-[#9BAFC4] text-sm mt-1">Módulo em andamento: {currentModule?.title} · {currentDay?.title} · Meta diária: {state.settings.dailyMinutes} min</p>
            <div className="mt-3 max-w-md"><Bar pct={overall} /></div>
            <p className="text-xs text-[#9BAFC4] mt-1">Progresso geral do curso: {overall}% (calculado por aulas + questões + retenção)</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn-primary" onClick={() => go('plano')}>Estudar agora</button>
            <button className="btn-ghost" onClick={() => go('revisao')}>Revisão inteligente ({smartReview.length})</button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <Card>
          <h3 className="font-bold mb-2">Progresso semanal</h3>
          <LineChart data={weekData} labels={weekLabels} />
          <p className="text-xs text-[#9BAFC4]">Minutos de estudo por dia (últimos 7 dias, dados reais).</p>
        </Card>
        <Card>
          <h3 className="font-bold mb-3">Domínio dos sistemas</h3>
          <div className="space-y-2">
            {SYSTEMS.slice(0, 6).map(s => {
              const m = MODULES.find(x => x.system === s.id);
              const p = m ? mastery(m.id).pct : 0;
              return <div key={s.id}><div className="flex justify-between text-xs mb-1"><span>{s.name}</span><span className="text-[#9BAFC4]">{p}%</span></div><Bar pct={p} color={s.color} /></div>;
            })}
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center">
          <Donut pct={overall} />
          <p className="text-sm font-bold mt-2">Domínio geral</p>
          <p className="text-xs text-[#9BAFC4]">Aulas pendentes: {90 - stats.lessonsDone} · Revisões atrasadas: {overdue}</p>
          <button className="btn-ghost mt-3 !py-2 text-sm" onClick={() => go('desempenho')}>Ver meu desempenho</button>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-bold mb-3">Revisão recomendada</h3>
          {smartReview.length ? smartReview.slice(0, 3).map((r, i) => (
            <div key={i} className="border-l-2 border-[#00C8FF] pl-3 mb-3"><p className="text-sm font-semibold">{r.title}</p><p className="text-xs text-[#9BAFC4]">{r.reason}</p></div>
          )) : <p className="text-sm text-[#9BAFC4]">Nenhuma revisão urgente. Continue estudando!</p>}
          <button className="btn-ghost w-full !py-2 text-sm" onClick={() => go('revisao')}>Abrir revisão inteligente</button>
        </Card>
        <Card>
          <h3 className="font-bold mb-3">Pontos fortes</h3>
          {strengths.map(({ m, p }) => <div key={m.id} className="flex justify-between text-sm mb-2"><span>{m.title}</span><b className="text-[#00C8FF]">{p}%</b></div>)}
          <h3 className="font-bold mt-4 mb-3">Precisam de atenção</h3>
          {weak.length ? weak.map(({ m, p }) => <div key={m.id} className="flex justify-between text-sm mb-2"><span>{m.title}</span><b className="text-orange-400">{p}%</b></div>) : <p className="text-sm text-[#9BAFC4]">Responda questões para gerar o diagnóstico.</p>}
        </Card>
        <Card>
          <h3 className="font-bold mb-3">Atividade recente</h3>
          {recent.length ? recent.map((s, i) => <div key={i} className="flex justify-between text-sm mb-2"><span>{s.activity}</span><span className="text-[#9BAFC4]">{s.date.slice(5)} · {s.minutes}min</span></div>) : <Empty msg="Nenhuma atividade ainda. Comece a Aula do Dia 1 no Plano Diário." />}
          <h3 className="font-bold mt-4 mb-2">Próximas avaliações</h3>
          <p className="text-sm text-[#9BAFC4]">Avaliação semanal (Dia 7) · Avaliações por módulo ao concluir cada módulo · Avaliação final (Dia 90).</p>
        </Card>
      </div>
    </div>
  );
}

export function Journey({ go }: { go: (p: Page) => void }) {
  const { state, mastery, updateSettings } = useStore();
  const [form, setForm] = useState({ ...state.settings });
  const save = () => { updateSettings({ dailyMinutes: form.dailyMinutes, studyDays: form.studyDays, studyTime: form.studyTime, pace: form.pace, goal: form.goal }); alert('Preferências salvas!'); };
  const dayNumber = Math.min(90, Math.max(1, Math.floor((Date.now() - new Date(state.startedAt).getTime()) / 86400000) + 1));
  return (
    <div>
      <PageTitle title="Minha Jornada — 90 dias" sub="Plano progressivo dos fundamentos ao domínio. Sem penalidades por dias perdidos: recupere quando quiser." />
      <Card className="mb-4">
        <h3 className="font-bold mb-3">Personalize sua jornada</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <label className="text-sm">Tempo diário (min)
            <select className="input mt-1" value={form.dailyMinutes} onChange={e => setForm({ ...form, dailyMinutes: Number(e.target.value) })}>
              {[20, 30, 45, 60, 90].map(m => <option key={m} value={m}>{m} minutos</option>)}
            </select></label>
          <label className="text-sm">Horário de estudo
            <input type="time" className="input mt-1" value={form.studyTime} onChange={e => setForm({ ...form, studyTime: e.target.value })} /></label>
          <label className="text-sm">Ritmo
            <select className="input mt-1" value={form.pace} onChange={e => setForm({ ...form, pace: e.target.value })}>
              {['Leve', 'Moderado', 'Intenso'].map(r => <option key={r}>{r}</option>)}
            </select></label>
        </div>
        <label className="text-sm block mt-3">Objetivo pessoal
          <input className="input mt-1" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} /></label>
        <div className="mt-3">
          <p className="text-sm mb-2">Dias preferidos para estudar</p>
          <div className="flex gap-2 flex-wrap">{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d, i) => (
            <button key={d} onClick={() => setForm({ ...form, studyDays: form.studyDays.includes(i) ? form.studyDays.filter(x => x !== i) : [...form.studyDays, i] })}
              className={`px-3 py-1.5 rounded-full text-sm border ${form.studyDays.includes(i) ? 'bg-[#00C8FF] text-[#04121F] font-bold' : 'border-[#26364A] text-[#9BAFC4]'}`}>{d}</button>
          ))}</div>
        </div>
        <button className="btn-primary mt-4" onClick={save}>Salvar preferências</button>
      </Card>
      <div className="space-y-3">
        {MODULES.map(m => {
          const p = mastery(m.id).pct;
          const moduleDays = ALL_DAYS.filter(d => d.moduleId === m.id);
          const done = moduleDays.length > 0 && moduleDays.every(d => state.completedLessons.includes(`day-${d.day}`));
          const current = moduleDays.some(d => d.day === dayNumber);
          return (
            <Card key={m.id} className={current ? '!border-[#00C8FF]/60' : ''}>
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge" style={{ background: m.color + '22', color: m.color }}>Módulo {m.id}</span>
                    <span className="badge bg-[#26364A] text-[#9BAFC4]">Dias {moduleDays[0]?.day}–{moduleDays[moduleDays.length - 1]?.day} · Nível {m.level}</span>
                    {done && <span className="badge bg-green-500/20 text-green-400">Concluído</span>}
                    {current && <span className="badge bg-[#00C8FF] text-[#04121F]">Em andamento</span>}
                  </div>
                  <h3 className="font-bold mt-2">{m.title}</h3>
                  <p className="text-sm text-[#9BAFC4]">{m.description}</p>
                  <div className="mt-2 max-w-md"><Bar pct={p} color={m.color} /></div>
                  <p className="text-xs text-[#9BAFC4] mt-1">{mastery(m.id).label} · {p}%</p>
                </div>
                <button className="btn-ghost whitespace-nowrap" onClick={() => go('plano')}>Ver dias do módulo</button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function DailyPlan({ openLesson }: { openLesson: (day: number) => void }) {
  const { state } = useStore();
  const [filter, setFilter] = useState<'all' | 'done' | 'pending'>('all');
  const days = ALL_DAYS.filter(d => filter === 'all' ? true : filter === 'done' ? state.completedLessons.includes(`day-${d.day}`) : !state.completedLessons.includes(`day-${d.day}`));
  return (
    <div>
      <PageTitle title="Plano Diário" sub="90 dias de aulas, questões e flashcards distribuídos em 15 módulos." />
      <div className="flex gap-2 mb-4 no-print">
        {(['all', 'pending', 'done'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${filter === f ? 'bg-[#00C8FF] text-[#04121F]' : 'border-[#26364A] text-[#9BAFC4]'}`}>
            {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendentes' : 'Concluídos'}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {days.map(d => {
          const done = state.completedLessons.includes(`day-${d.day}`);
          const mod = MODULES.find(m => m.id === d.moduleId);
          return (
            <Card key={d.day} className="card-hover">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="badge bg-[#00C8FF]/15 text-[#00C8FF]">Dia {d.day}</span>
                  <h3 className="font-bold mt-2">{d.title}</h3>
                  <p className="text-sm text-[#9BAFC4]">{d.subtitle}</p>
                  <p className="text-xs text-[#9BAFC4] mt-1">{mod?.title} · {d.questions.length} questões · {d.flashcards.length} flashcards · ~{d.estimatedMinutes} min</p>
                </div>
                {done && <span className="badge bg-green-500/20 text-green-400">Concluído</span>}
              </div>
              <button className="btn-primary w-full mt-4" onClick={() => openLesson(d.day)}>{done ? 'Revisar aula' : 'Iniciar aula'}</button>
            </Card>
          );
        })}
      </div>
      <Card className="mt-4">
        <h3 className="font-bold mb-2">Calendário dos 90 dias</h3>
        <div className="grid grid-cols-10 md:grid-cols-15 gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(34px,1fr))' }}>
          {Array.from({ length: 90 }, (_, i) => i + 1).map(day => {
            const done = state.completedLessons.includes(`day-${day}`);
            const hasContent = ALL_DAYS.some(d => d.day === day);
            return <button key={day} disabled={!hasContent} onClick={() => hasContent && openLesson(day)} title={hasContent ? `Dia ${day}` : `Dia ${day} — conteúdo do currículo (em expansão)`}
              className={`aspect-square rounded-lg text-xs font-bold border ${done ? 'bg-green-500/20 border-green-500 text-green-400' : hasContent ? 'border-[#00C8FF]/50 text-[#00C8FF]' : 'border-[#26364A] text-[#9BAFC4]/50'}`}>{day}</button>;
          })}
        </div>
        <p className="text-xs text-[#9BAFC4] mt-2">Todos os 90 dias possuem conteúdo disponível para estudo.</p>
      </Card>
    </div>
  );
}
