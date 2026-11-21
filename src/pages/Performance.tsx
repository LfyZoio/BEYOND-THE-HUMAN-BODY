import { useMemo, useRef } from 'react';
import { useStore } from '../store';
import { MODULES, SYSTEMS } from '../data/curriculum';
import { Bar, Card, Donut, Empty, LineChart, PageTitle, Stat, fmtMinutes } from '../components/ui';

export function Performance() {
  const { state, stats, mastery, systemMastery } = useStore();
  const daily = useMemo(() => {
    const arr: number[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      arr.push(state.sessions.filter(s => s.date === d).reduce((s, x) => s + x.minutes, 0));
    }
    return arr;
  }, [state.sessions]);
  const labels = daily.map((_, i) => `-${13 - i}`);
  const byModule = MODULES.map(m => ({ m, p: mastery(m.id) }));
  const id3dTotal = state.id3d.length;
  const id3dRight = state.id3d.filter(x => x.correct).length;
  return (
    <div>
      <PageTitle title="Meu Desempenho" sub="Analytics reais do seu aprendizado — sem dados inventados. O domínio combina aulas, questões, retenção e identificação 3D." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Stat label="Tempo total" value={fmtMinutes(stats.totalMinutes)} sub={`${fmtMinutes(stats.weekMinutes)} esta semana`} />
        <Stat label="Questões" value={String(stats.answered)} sub={`Taxa de acerto: ${stats.accuracy}%`} />
        <Stat label="Retenção (flashcards)" value={`${stats.retention}%`} sub={`${Object.keys(state.cards).length} cartões revisados`} />
        <Stat label="Identificação 3D" value={id3dTotal ? `${Math.round((id3dRight / id3dTotal) * 100)}%` : '—'} sub={`${id3dRight}/${id3dTotal} estruturas identificadas`} />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card><h3 className="font-bold mb-2">Evolução — tempo de estudo (14 dias)</h3><LineChart data={daily} labels={labels} /><p className="text-xs text-[#9BAFC4]">Minutos por dia, a partir das suas sessões registradas.</p></Card>
        <Card><h3 className="font-bold mb-2">Distribuição de tempo</h3>
          {state.sessions.length ? (
            <div className="space-y-2">{['Aula', 'Questão', 'Flashcards', 'Estudo'].map(k => {
              const mins = state.sessions.filter(s => s.activity.includes(k)).reduce((s, x) => s + x.minutes, 0);
              const pct = stats.totalMinutes ? Math.round((mins / stats.totalMinutes) * 100) : 0;
              return <div key={k}><div className="flex justify-between text-xs mb-1"><span>{k}</span><span>{pct}%</span></div><Bar pct={pct} /></div>;
            })}</div>
          ) : <Empty msg="Sem sessões registradas ainda." />}
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold mb-3">Domínio por módulo</h3>
          <div className="space-y-2">{byModule.map(({ m, p }) => (
            <div key={m.id}><div className="flex justify-between text-xs mb-1"><span>M{m.id} — {m.title}</span><span className="text-[#9BAFC4]">{p.label} · {p.pct}%</span></div><Bar pct={p.pct} color={m.color} /></div>
          ))}</div>
          <p className="text-xs text-[#9BAFC4] mt-3">Classificação: Não iniciado · Em aprendizado · Em desenvolvimento · Bem consolidado · Domínio demonstrado. Calculada por aulas (30%) + questões (50%) + retenção (20%) — nunca só por conclusão de aula.</p>
        </Card>
        <Card>
          <h3 className="font-bold mb-3">Progresso dos sistemas anatômicos</h3>
          <div className="space-y-2">{SYSTEMS.map(s => { const sm = systemMastery(s.id); return (
            <div key={s.id}><div className="flex justify-between text-xs mb-1"><span>{s.name}</span><span className="text-[#9BAFC4]">{sm.pct}%</span></div><Bar pct={sm.pct} color={s.color} /></div>
          ); })}</div>
          <div className="flex items-center gap-4 mt-4"><Donut pct={stats.accuracy} color="#00C8FF" size={90} /><p className="text-sm">Taxa de acerto geral<br /><span className="text-[#9BAFC4] text-xs">Consistência: sequência de {state.streak} dia(s)</span></p></div>
        </Card>
      </div>
    </div>
  );
}

export function Profile() {
  const { state, stats, achievements, updateSettings } = useStore();
  const unlocked = achievements.filter(a => a.unlocked);
  return (
    <div>
      <PageTitle title="Perfil" sub="Seu progresso, conquistas e histórico." />
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <Card className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#00C8FF]/20 border-2 border-[#00C8FF] mx-auto flex items-center justify-center text-3xl font-extrabold text-[#00C8FF]">{(state.settings.name || 'E').slice(0, 1).toUpperCase()}</div>
          <h3 className="font-bold mt-3">{state.settings.name}</h3>
          <p className="text-sm text-[#9BAFC4]">{state.settings.goal}</p>
          <p className="text-xs text-[#9BAFC4] mt-1">Início: {state.startedAt} · {fmtMinutes(stats.totalMinutes)} de estudo · {state.xp} XP</p>
        </Card>
        <Card>
          <h3 className="font-bold mb-3">Conquistas ({unlocked.length}/{achievements.length})</h3>
          <div className="space-y-2">{achievements.map(a => (
            <div key={a.id} className={`flex items-center gap-3 text-sm ${a.unlocked ? '' : 'opacity-40'}`}>
              <span className="text-lg">{a.unlocked ? '🏅' : '🔒'}</span><div><b>{a.name}</b><p className="text-xs text-[#9BAFC4]">{a.desc}</p></div>
            </div>))}</div>
        </Card>
        <Card>
          <h3 className="font-bold mb-3">Certificado de progresso</h3>
          <p className="text-sm text-[#9BAFC4] mb-3">Certificado gerado a partir do seu progresso real (aulas, questões e avaliações).</p>
          <button className="btn-primary w-full" onClick={() => window.print()}>Gerar / imprimir certificado</button>
          <div className="mt-4 border border-[#26364A] rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-widest text-[#9BAFC4]">ANATOMIA 3D — Beyond the Human Body</p>
            <p className="font-bold mt-2">{state.settings.name}</p>
            <p className="text-sm text-[#9BAFC4]">{stats.lessonsDone} aulas · {stats.answered} questões · {stats.accuracy}% de acerto · {state.xp} XP</p>
          </div>
        </Card>
      </div>
      <Card>
        <h3 className="font-bold mb-3">Editar perfil</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="text-sm">Nome<input className="input mt-1" value={state.settings.name} onChange={e => updateSettings({ name: e.target.value })} /></label>
          <label className="text-sm">Objetivo de aprendizagem<input className="input mt-1" value={state.settings.goal} onChange={e => updateSettings({ goal: e.target.value })} /></label>
        </div>
        <p className="text-xs text-[#9BAFC4] mt-3">As alterações são salvas automaticamente.</p>
      </Card>
    </div>
  );
}

export function Settings() {
  const { state, updateSettings, resetAll, importJSON } = useStore();
  const importRef = useRef<HTMLInputElement>(null);
  const s = state.settings;
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'anatomia3d-dados.json'; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <PageTitle title="Configurações" sub="Preferências de estudo, revisão, notificações e dados." />
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold mb-3">Preferências de estudo</h3>
          <div className="space-y-3">
            <label className="text-sm block">Tempo diário
              <select className="input mt-1" value={s.dailyMinutes} onChange={e => updateSettings({ dailyMinutes: Number(e.target.value) })}>{[20, 30, 45, 60, 90].map(m => <option key={m} value={m}>{m} minutos</option>)}</select></label>
            <label className="text-sm block">Horário de estudo<input type="time" className="input mt-1" value={s.studyTime} onChange={e => updateSettings({ studyTime: e.target.value })} /></label>
            <label className="text-sm block">Ritmo
              <select className="input mt-1" value={s.pace} onChange={e => updateSettings({ pace: e.target.value })}>{['Leve', 'Moderado', 'Intenso'].map(r => <option key={r}>{r}</option>)}</select></label>
            <label className="text-sm block">Preferência de revisão
              <select className="input mt-1" value={s.reviewPref} onChange={e => updateSettings({ reviewPref: e.target.value })}>{['SM-2 (repetição espaçada)', 'FSRS (preparado)', 'Revisão manual'].map(r => <option key={r}>{r}</option>)}</select></label>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold mb-3">Aparência e notificações</h3>
          <div className="space-y-3">
            <label className="text-sm block">Tema
              <select className="input mt-1" value={s.theme} onChange={e => updateSettings({ theme: e.target.value })}>{['Escuro', 'Escuro (alto contraste)'].map(t => <option key={t}>{t}</option>)}</select></label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.notifications} onChange={e => updateSettings({ notifications: e.target.checked })} /> Notificações de revisão (lembretes no dashboard)</label>
            <p className="text-xs text-[#9BAFC4]">Tema escuro é o padrão da plataforma. Notificações são exibidas no dashboard como revisões pendentes.</p>
          </div>
          <h3 className="font-bold mt-6 mb-3">Privacidade e dados</h3>
          <p className="text-sm text-[#9BAFC4] mb-3">Seus dados ficam salvos localmente no navegador (localStorage), em formato pronto para migração futura para PostgreSQL via API.</p>
          <div className="flex flex-wrap gap-2">
            <button className="btn-ghost" onClick={exportData}>Exportar dados (JSON)</button>
            <button className="btn-ghost" onClick={() => importRef.current?.click()}>Importar dados (JSON)</button>
            <input ref={importRef} type="file" accept="application/json,.json" className="hidden" onChange={e => {
              const f = e.target.files?.[0];
              if (!f) return;
              f.text().then(t => { const ok = importJSON(t); alert(ok ? 'Dados importados com sucesso.' : 'Arquivo inválido: não é um backup do ANATOMIA 3D.'); e.target.value = ''; });
            }} />
            <button className="btn-ghost !border-red-500/60 !text-red-400" onClick={() => { if (confirm('Apagar todo o progresso? Esta ação não pode ser desfeita.')) resetAll(); }}>Apagar todo o progresso</button>
          </div>
        </Card>
      </div>
    </div>
  );
}
