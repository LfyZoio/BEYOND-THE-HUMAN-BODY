import { useMemo, useState } from 'react';
import { useStore } from '../store';
import { LIBRARY_ARTICLES } from '../data/structures';
import { MODULES, SYSTEMS } from '../data/curriculum';
import { Bar, Card, Empty, PageTitle } from '../components/ui';
import Lab3D from '../components/LazyLab3D';
import type { SystemId } from '../types';

export function Library() {
  const { state, toggleFavorite, markRead } = useStore();
  const [q, setQ] = useState('');
  const [system, setSystem] = useState<string>('all');
  const [module, setModule] = useState<string>('all');
  const [favOnly, setFavOnly] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const filtered = useMemo(() => LIBRARY_ARTICLES.filter(a => {
    if (favOnly && !state.favorites.includes(a.id)) return false;
    if (system !== 'all' && a.system !== system) return false;
    if (module !== 'all' && a.moduleId !== Number(module)) return false;
    if (q && !(`${a.title} ${a.scientific}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  }), [q, system, module, favOnly, state.favorites]);
  const article = LIBRARY_ARTICLES.find(a => a.id === open);
  if (article) {
    return (
      <div>
        <button className="btn-ghost !py-2 text-sm mb-4 no-print" onClick={() => setOpen(null)}>← Voltar à biblioteca</button>
        <PageTitle title={article.title} sub={`${article.scientific} · ${article.systemName} · ${article.lesson}`} />
        <div className="space-y-4">
          <Card><h3 className="font-bold mb-2">Introdução</h3><p className="text-sm leading-relaxed">{article.intro}</p></Card>
          <Card><h3 className="font-bold mb-2">Objetivos</h3><ul className="list-disc pl-5 text-sm">{article.objectives.map(o => <li key={o}>{o}</li>)}</ul></Card>
          <Card><h3 className="font-bold mb-2">Explicação teórica</h3><p className="text-sm leading-relaxed">{article.theory}</p></Card>
          <Card><h3 className="font-bold mb-2">Terminologia</h3><p className="text-sm">{article.terminology}</p></Card>
          <Card><h3 className="font-bold mb-2">Estruturas e relações anatômicas</h3><p className="text-sm">{article.relations}</p></Card>
          <Card><h3 className="font-bold mb-2">Funções</h3><p className="text-sm">{article.functions}</p></Card>
          <Card><h3 className="font-bold mb-2">Exemplos e detalhes</h3><p className="text-sm">{article.examples}</p></Card>
          <Card><h3 className="font-bold mb-2">Resumo</h3><p className="text-sm">{article.summary}</p></Card>
          <Card><h3 className="font-bold mb-2">Glossário</h3>{article.glossary.map(g => <p key={g.term} className="text-sm"><b className="text-[#00C8FF]">{g.term}:</b> {g.def}</p>)}</Card>
          <Card><h3 className="font-bold mb-2">Referências bibliográficas</h3><ul className="list-disc pl-5 text-sm text-[#9BAFC4]">{article.references.map(r => <li key={r}>{r}</li>)}</ul></Card>
          <div className="flex flex-wrap gap-2 no-print">
            <button className="btn-ghost" onClick={() => toggleFavorite(article.id)}>{state.favorites.includes(article.id) ? '★ Remover dos favoritos' : '☆ Favoritar'}</button>
            <button className="btn-ghost" onClick={() => { markRead(article.id); alert('Marcado como concluído.'); }}>{state.readArticles.includes(article.id) ? '✓ Concluído' : 'Marcar como concluído'}</button>
            <button className="btn-primary" onClick={() => window.print()}>Exportar / imprimir (PDF)</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <PageTitle title="Biblioteca de Estudos" sub="Artigos anatômicos pesquisáveis por nome comum ou científico, com filtros por sistema e módulo." />
      <Card className="mb-4">
        <div className="grid md:grid-cols-4 gap-3">
          <input className="input" placeholder="Pesquisar (nome comum ou científico)…" value={q} onChange={e => setQ(e.target.value)} />
          <select className="input" value={system} onChange={e => setSystem(e.target.value)}>
            <option value="all">Todos os sistemas</option>
            {SYSTEMS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select className="input" value={module} onChange={e => setModule(e.target.value)}>
            <option value="all">Todos os módulos</option>
            {MODULES.map(m => <option key={m.id} value={m.id}>Módulo {m.id} — {m.title}</option>)}
          </select>
          <button className={`btn-ghost ${favOnly ? '!border-[#00C8FF] !text-[#00C8FF]' : ''}`} onClick={() => setFavOnly(f => !f)}>★ Favoritos ({state.favorites.length})</button>
        </div>
        <p className="text-xs text-[#9BAFC4] mt-2">{filtered.length} artigo(s) · Lidos: {state.readArticles.length} · Favoritos: {state.favorites.length}</p>
      </Card>
      {filtered.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(a => (
            <Card key={a.id} className="card-hover cursor-pointer" >
              <div onClick={() => setOpen(a.id)}>
                <div className="flex items-start justify-between gap-2">
                  <div><h3 className="font-bold">{a.title}</h3><p className="text-sm text-[#00C8FF] italic">{a.scientific}</p></div>
                  {state.readArticles.includes(a.id) && <span className="badge bg-green-500/20 text-green-400">Lido</span>}
                </div>
                <p className="text-sm text-[#9BAFC4] mt-2 line-clamp-3">{a.intro}</p>
                <p className="text-xs text-[#9BAFC4] mt-2">{a.systemName} · Nível {a.level} · {a.lesson}</p>
              </div>
              <button className="btn-ghost w-full mt-3 !py-2 text-sm" onClick={() => toggleFavorite(a.id)}>{state.favorites.includes(a.id) ? '★ Favorito' : '☆ Favoritar'}</button>
            </Card>
          ))}
        </div>
      ) : <Empty msg="Nenhum artigo encontrado com estes filtros." />}
    </div>
  );
}

export function Systems() {
  const { systemMastery } = useStore();
  const [sel, setSel] = useState<SystemId>('tegumentar');
  const sys = SYSTEMS.find(s => s.id === sel)!;
  const mod = MODULES.find(m => m.system === sel);
  return (
    <div>
      <PageTitle title="Sistemas do Corpo" sub="Explore cada sistema: introdução, estruturas, modelo 3D, aulas e domínio." />
      <div className="flex flex-wrap gap-2 mb-4 no-print">
        {SYSTEMS.map(s => <button key={s.id} onClick={() => setSel(s.id)} className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${sel === s.id ? 'bg-[#00C8FF] text-[#04121F]' : 'border-[#26364A] text-[#9BAFC4]'}`}>{s.name}</button>)}
      </div>
      <Card className="mb-4">
        <h2 className="text-xl font-extrabold" style={{ color: sys.color }}>{sys.name}</h2>
        <p className="text-[#9BAFC4] mt-1">{sys.desc}</p>
        {mod && <div className="mt-3 max-w-md"><div className="flex justify-between text-xs mb-1"><span>Domínio: {systemMastery(sel).label}</span><span>{systemMastery(sel).pct}%</span></div><Bar pct={systemMastery(sel).pct} color={sys.color} /></div>}
        {mod && <div className="mt-4"><h4 className="font-bold text-sm mb-2">Aulas do módulo</h4><div className="flex flex-wrap gap-2">{mod.lessons.map(l => <span key={l} className="badge bg-[#26364A] text-[#9BAFC4] !normal-case !text-xs">{l}</span>)}</div></div>}
        {sel === 'estetica' && <p className="text-xs text-[#9BAFC4] mt-3">Conteúdo exclusivamente educacional: anatomia da pele, gordura facial e músculos da expressão. Sem instruções de procedimentos invasivos ou intervenções clínicas.</p>}
      </Card>
      <Lab3D key={sel} initialSystem={sel} />
    </div>
  );
}
