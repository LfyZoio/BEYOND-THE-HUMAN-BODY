import { useMemo, useState } from 'react';
import { useStore, ALL_QUESTIONS, ALL_FLASHCARDS } from '../store';
import { MODULES } from '../data/curriculum';
import { Card, Empty, PageTitle, Stat } from '../components/ui';
import { QuizRunner, FlashcardRunner } from '../components/runners';
import type { FlashcardDef } from '../types';

export function Questions() {
  const { state } = useStore();
  const [module, setModule] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [topic, setTopic] = useState('all');
  const [started, setStarted] = useState(false);
  const topics = useMemo(() => [...new Set(ALL_QUESTIONS.map(q => q.topic))], []);
  const byModule = useMemo(() => ALL_QUESTIONS.filter(q =>
    (module === 'all' || q.moduleId === Number(module)) &&
    (difficulty === 'all' || q.difficulty === difficulty) &&
    (topic === 'all' || q.topic === topic)
  ), [module, difficulty, topic]);
  const modId = module === 'all' ? 1 : Number(module);
  return (
    <div>
      <PageTitle title="Banco de Questões" sub={`${ALL_QUESTIONS.length} questões com explicações detalhadas e motivos das alternativas incorretas.`} />
      <Card className="mb-4">
        <div className="grid md:grid-cols-3 gap-3">
          <select className="input" value={module} onChange={e => setModule(e.target.value)}>
            <option value="all">Todos os módulos</option>
            {MODULES.map(m => <option key={m.id} value={m.id}>Módulo {m.id} — {m.title}</option>)}
          </select>
          <select className="input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="all">Todas as dificuldades</option>
            <option value="iniciante">Iniciante</option><option value="intermediario">Intermediário</option><option value="avancado">Avançado</option>
          </select>
          <select className="input" value={topic} onChange={e => setTopic(e.target.value)}>
            <option value="all">Todos os tópicos</option>
            {topics.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <button className="btn-primary" onClick={() => setStarted(true)} disabled={!byModule.length}>Iniciar sessão ({byModule.length} questões)</button>
          <span className="text-sm text-[#9BAFC4]">Respondidas: {state.answers.length} · Taxa de acerto: {state.answers.length ? Math.round((state.answers.filter(a => a.correct).length / state.answers.length) * 100) : 0}%</span>
        </div>
      </Card>
      {started ? <QuizRunner key={`${module}-${difficulty}-${topic}`} questions={byModule.slice(0, 20)} moduleId={modId} source="Banco de questões" /> : <Empty msg="Configure os filtros e inicie uma sessão de questões." />}
    </div>
  );
}

export function Flashcards() {
  const { state, dueCards, addCustomCard, deleteCustomCard, stats } = useStore();
  const [filter, setFilter] = useState<'due' | 'all' | 'custom'>('due');
  const [module, setModule] = useState('all');
  const [form, setForm] = useState({ front: '', back: '', category: 'Pessoal' });
  const all = [...ALL_FLASHCARDS, ...state.customCards];
  const cards = useMemo(() => {
    let list = filter === 'due' ? dueCards : filter === 'custom' ? state.customCards : all;
    if (module !== 'all') list = list.filter(c => c.moduleId === Number(module));
    return list;
  }, [filter, module, dueCards, state.customCards, all]);
  const create = () => {
    if (!form.front.trim() || !form.back.trim()) { alert('Preencha frente e verso.'); return; }
    const card: FlashcardDef = { id: `custom-${Date.now()}`, front: form.front, back: form.back, category: form.category, moduleId: module === 'all' ? 1 : Number(module) };
    addCustomCard(card); setForm({ front: '', back: '', category: 'Pessoal' });
  };
  return (
    <div>
      <PageTitle title="CENTRO DE MEMORIZAÇÃO" sub="Memorização ativa com repetição espaçada SM-2: Não lembrei · Difícil · Médio · Fácil." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Stat label="Para revisar hoje" value={String(dueCards.length)} sub="Cartões vencidos ou novos" />
        <Stat label="Total de cartões" value={String(all.length)} sub={`${state.customCards.length} criados por você`} />
        <Stat label="Retenção" value={`${stats.retention}%`} sub="Cartões com revisões registradas" />
        <Stat label="Esquecimentos" value={String(Object.values(state.cards).reduce((s, c) => s + c.lapses, 0))} sub="Reprogramados automaticamente" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4 no-print">
        {(['due', 'all', 'custom'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${filter === f ? 'bg-[#00C8FF] text-[#04121F]' : 'border-[#26364A] text-[#9BAFC4]'}`}>
            {f === 'due' ? `Revisar agora (${dueCards.length})` : f === 'all' ? 'Todos' : 'Meus cartões'}</button>
        ))}
        <select className="input !w-auto" value={module} onChange={e => setModule(e.target.value)}>
          <option value="all">Todos os módulos</option>
          {MODULES.map(m => <option key={m.id} value={m.id}>Módulo {m.id}</option>)}
        </select>
      </div>
      <FlashcardRunner key={`${filter}-${module}-${state.customCards.length}`} cards={cards} title="Memorização" />
      <Card className="mt-4 no-print">
        <h3 className="font-bold mb-3">Criar flashcard</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="input" placeholder="Frente (pergunta)" value={form.front} onChange={e => setForm({ ...form, front: e.target.value })} />
          <input className="input" placeholder="Verso (resposta)" value={form.back} onChange={e => setForm({ ...form, back: e.target.value })} />
          <input className="input" placeholder="Categoria" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        </div>
        <button className="btn-primary mt-3" onClick={create}>Criar cartão</button>
        {state.customCards.length > 0 && (
          <div className="mt-4 space-y-2">{state.customCards.map(c => (
            <div key={c.id} className="flex items-center justify-between border border-[#26364A] rounded-xl px-3 py-2 text-sm">
              <span>{c.front} → {c.back}</span>
              <button className="text-red-400 text-sm font-bold" onClick={() => deleteCustomCard(c.id)}>Excluir</button>
            </div>))}</div>
        )}
      </Card>
    </div>
  );
}

export function SmartReview() {
  const { smartReview, dueCards, stats } = useStore();
  return (
    <div>
      <PageTitle title="Revisão Inteligente" sub="Recomendações personalizadas geradas a partir das suas questões erradas, flashcards esquecidos e domínio por módulo." />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <Stat label="Recomendações" value={String(smartReview.length)} sub="Priorizadas pelo sistema" />
        <Stat label="Flashcards pendentes" value={String(dueCards.length)} sub="Para revisar hoje" />
        <Stat label="Taxa de acerto" value={`${stats.accuracy}%`} sub={`${stats.answered} questões`} />
      </div>
      {smartReview.length ? (
        <div className="space-y-3">
          {smartReview.map((r, i) => (
            <Card key={i} className="!border-l-4 !border-l-[#00C8FF]">
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <div>
                  <h3 className="font-bold">{i + 1}. {r.title}</h3>
                  <p className="text-sm text-[#9BAFC4]"><b>Por que:</b> {r.reason}</p>
                  <p className="text-sm text-[#9BAFC4]"><b>Objetivo:</b> {r.goal}</p>
                  <p className="text-sm"><b>Ação:</b> {r.action}</p>
                </div>
                <span className="badge bg-[#00C8FF]/15 text-[#00C8FF] whitespace-nowrap">Prioridade {r.priority}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : <Empty msg="Nenhuma recomendação no momento. Responda questões e revise flashcards para o sistema gerar recomendações personalizadas." />}
      <Card className="mt-4">
        <h3 className="font-bold mb-2">Como funciona</h3>
        <p className="text-sm text-[#9BAFC4] leading-relaxed">O sistema cruza três sinais: (1) questões erradas por tópico, (2) flashcards com esquecimentos repetidos (SM-2) e (3) domínio por módulo abaixo de 50%. Cada recomendação traz justificativa e objetivo, e as sessões são personalizadas — por exemplo, dificuldades com músculos do ombro geram revisão de deltoide, supraespinal e infraespinal com exploração 3D, flashcards e questões de identificação.</p>
      </Card>
    </div>
  );
}

export function Assessments() {
  const { state, addAssessment } = useStore();
  const [active, setActive] = useState<{ title: string; moduleId: number; questions: typeof ALL_QUESTIONS } | null>(null);
  const [last, setLast] = useState<{ score: number; total: number } | null>(null);
  const weekly = ALL_QUESTIONS.filter(q => /^d[1-6]q/.test(q.id));
  const start = (title: string, moduleId: number, count: number, pool = ALL_QUESTIONS) => setActive({ title, moduleId, questions: [...pool].sort(() => Math.random() - 0.5).slice(0, count) });
  return (
    <div>
      <PageTitle title="Avaliações" sub="Avaliações diárias, semanais, por módulo e final — com correção automática e registro de resultados." />
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card className="card-hover">
          <h3 className="font-bold">Avaliação semanal — Semana 1</h3>
          <p className="text-sm text-[#9BAFC4] mt-1">25 questões misturadas dos Dias 1–6. Relatório de desempenho ao final.</p>
          <button className="btn-primary mt-3" onClick={() => start('Avaliação semanal — Semana 1', 1, 25, weekly)}>Iniciar avaliação</button>
        </Card>
        <Card className="card-hover">
          <h3 className="font-bold">Avaliação do Módulo 1 — Fundamentos</h3>
          <p className="text-sm text-[#9BAFC4] mt-1">Questões do Módulo 1 sobre conceitos, posição, direção, planos, eixos e cavidades.</p>
          <button className="btn-primary mt-3" onClick={() => start('Avaliação do Módulo 1', 1, 20, ALL_QUESTIONS.filter(q => q.moduleId === 1))}>Iniciar avaliação</button>
        </Card>
        <Card className="card-hover">
          <h3 className="font-bold">Simulado geral</h3>
          <p className="text-sm text-[#9BAFC4] mt-1">20 questões aleatórias de todo o banco disponível.</p>
          <button className="btn-primary mt-3" onClick={() => start('Simulado geral', 1, 20)}>Iniciar simulado</button>
        </Card>
        <Card className="card-hover">
          <h3 className="font-bold">Avaliação final (Dia 90)</h3>
          <p className="text-sm text-[#9BAFC4] mt-1">30 questões de todo o banco, com registro do resultado.</p>
          <button className="btn-primary mt-3" onClick={() => start('Avaliação final — Dia 90', 15, 30)}>Iniciar avaliação</button>
        </Card>
      </div>
      {active && (
        <QuizRunner key={active.title} questions={active.questions}
          moduleId={active.moduleId} source={active.title}
          onDone={(score, total) => { addAssessment({ id: `a-${Date.now()}`, title: active.title, score, total, date: new Date().toISOString().slice(0, 10), moduleId: active.moduleId }); setLast({ score, total }); setActive(null); }} />
      )}
      {last && <Card className="mt-4 !border-green-500/50"><b>Resultado registrado:</b> {last.score}/{last.total} ({Math.round((last.score / last.total) * 100)}%) — salvo no seu histórico.</Card>}
      <Card className="mt-4">
        <h3 className="font-bold mb-3">Histórico de avaliações</h3>
        {state.assessments.length ? [...state.assessments].reverse().map(a => (
          <div key={a.id} className="flex justify-between text-sm border-b border-[#26364A] py-2"><span>{a.title}</span><span className="text-[#9BAFC4]">{a.date} · {a.score}/{a.total} ({Math.round((a.score / a.total) * 100)}%)</span></div>
        )) : <Empty msg="Nenhuma avaliação realizada ainda." />}
      </Card>
    </div>
  );
}
