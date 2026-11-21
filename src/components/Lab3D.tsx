import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { STRUCTURES } from '../data/structures';
import { useStore } from '../store';
import type { StructureDef, SystemId } from '../types';
import { Card, Empty } from './ui';

const SYSTEM_LABELS: Record<string, string> = {
  esqueletico: 'Esquelético', muscular: 'Muscular', nervoso: 'Nervoso', cardiovascular: 'Cardiovascular',
  respiratorio: 'Respiratório', digestorio: 'Digestório', urinario: 'Urinário', reprodutor: 'Reprodutor', tegumentar: 'Tegumentar',
};

function ShapeMesh({ s, selected, dimmed, showLabel, onSelect }: { s: StructureDef; selected: boolean; dimmed: boolean; showLabel: boolean; onSelect: (s: StructureDef) => void }) {
  const common = {
    position: s.pos as unknown as [number, number, number],
    scale: s.scale as unknown as [number, number, number],
    onClick: (e: { stopPropagation: () => void }) => { e.stopPropagation(); onSelect(s); },
  };
  const mat = (
    <meshStandardMaterial color={s.color} emissive={selected ? '#00C8FF' : '#000000'} emissiveIntensity={selected ? 0.55 : 0} transparent opacity={dimmed ? 0.25 : 1} roughness={0.6} metalness={0.1} />
  );
  let geo: React.ReactNode = null;
  if (s.shape === 'sphere') geo = <sphereGeometry args={[0.5, 32, 32]} />;
  else if (s.shape === 'box') geo = <boxGeometry args={[1, 1, 1]} />;
  else if (s.shape === 'capsule') geo = <capsuleGeometry args={[0.5, 1, 8, 16]} />;
  else if (s.shape === 'cone') geo = <coneGeometry args={[0.5, 1, 24]} />;
  else if (s.shape === 'torus') geo = <torusGeometry args={[0.5, 0.22, 16, 32]} />;
  else geo = <cylinderGeometry args={[0.5, 0.5, 1, 24]} />;
  return (
    <mesh {...common}>
      {geo}{mat}
      {selected && showLabel && (
        <Html position={[0, 0.9, 0]} center>
          <div style={{ background: '#00C8FF', color: '#04121F', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{s.name}</div>
        </Html>
      )}
    </mesh>
  );
}

export default function Lab3D({ initialSystem }: { initialSystem?: SystemId }) {
  const { recordId3d, state } = useStore();
  const [system, setSystem] = useState<SystemId>(initialSystem ?? 'muscular');
  const [selected, setSelected] = useState<StructureDef | null>(null);
  const [isolate, setIsolate] = useState(false);
  const [quiz, setQuiz] = useState<{ target: StructureDef; options: StructureDef[]; picked: string | null } | null>(null);
  const [quizScore, setQuizScore] = useState({ right: 0, total: 0 });

  const items = useMemo(() => STRUCTURES.filter(s => s.system === system), [system]);
  const visible = isolate && selected ? items.filter(s => s.id === selected.id) : items;

  const startQuiz = () => {
    if (!items.length) return;
    const target = items[Math.floor(Math.random() * items.length)];
    const others = items.filter(s => s.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...others, target].sort(() => Math.random() - 0.5);
    setIsolate(false);
    setQuiz({ target, options, picked: null });
    setSelected(target);
  };
  const answerQuiz = (id: string) => {
    if (!quiz || quiz.picked) return;
    const correct = id === quiz.target.id;
    recordId3d(quiz.target.id, correct);
    setQuizScore(q => ({ right: q.right + (correct ? 1 : 0), total: q.total + 1 }));
    setQuiz({ ...quiz, picked: id });
  };

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-4">
      <Card className="!p-0 overflow-hidden">
        <div className="flex flex-wrap gap-2 p-4 border-b border-[#26364A] no-print">
          {Object.entries(SYSTEM_LABELS).map(([id, label]) => (
            <button key={id} onClick={() => { setSystem(id as SystemId); setSelected(null); setQuiz(null); }}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${system === id ? 'bg-[#00C8FF] text-[#04121F] border-[#00C8FF]' : 'border-[#26364A] text-[#9BAFC4] hover:text-white'}`}>{label}</button>
          ))}
        </div>
        <div className="h-[480px] bg-[#080E18]">
          <Canvas camera={{ position: [3.2, 2.2, 4.2], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} />
            <directionalLight position={[-5, 3, -5]} intensity={0.4} />
            <Suspense fallback={null}>
              {visible.map(s => (
                <ShapeMesh key={s.id} s={s} selected={selected?.id === s.id} dimmed={!!selected && selected.id !== s.id && !isolate} showLabel={!quiz || !!quiz.picked} onSelect={quiz && !quiz.picked ? () => {} : setSelected} />
              ))}
            </Suspense>
            <OrbitControls target={[0, 1.3, 0]} enableDamping makeDefault />
            <gridHelper args={[10, 10, '#26364A', '#142033']} position={[0, -0.4, 0]} />
          </Canvas>
        </div>
        <div className="flex flex-wrap gap-2 p-4 border-t border-[#26364A] no-print">
          <button className="btn-ghost !py-2 !px-3 text-sm" onClick={() => setIsolate(v => !v)}>{isolate ? 'Mostrar todas' : 'Isolar selecionada'}</button>
          <button className="btn-primary !py-2 !px-3 text-sm" onClick={startQuiz}>Atividade de identificação</button>
          <span className="text-sm text-[#9BAFC4] self-center">Arraste para girar · scroll para zoom · clique numa estrutura para selecionar</span>
        </div>
        <p className="px-4 pb-4 text-xs text-[#9BAFC4]">Modelos esquemáticos procedurais gerados com Three.js (geometrias primitivas) para estudo das relações espaciais. Nenhum modelo anatômico licenciado está incluído.</p>
      </Card>

      <div className="space-y-4">
        {quiz && (
          <Card>
            <h3 className="font-bold mb-1">Identificação 3D</h3>
            <p className="text-sm text-[#9BAFC4] mb-3">A estrutura destacada em azul é qual? Escolha o nome correto abaixo.</p>
            <div className="space-y-2">
              {quiz.options.map(o => {
                const picked = quiz.picked === o.id;
                const isTarget = o.id === quiz.target.id;
                return <button key={o.id} disabled={!!quiz.picked} onClick={() => answerQuiz(o.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl border text-sm ${picked && isTarget ? 'border-green-500 bg-green-500/10' : picked ? 'border-red-500 bg-red-500/10' : 'border-[#26364A] hover:border-[#00C8FF]'}`}>{o.name}</button>;
              })}
            </div>
            {quiz.picked && <button className="btn-primary w-full mt-3" onClick={startQuiz}>Próxima estrutura</button>}
            <p className="text-xs text-[#9BAFC4] mt-2">Acertos: {quizScore.right}/{quizScore.total} · Registrados no seu desempenho.</p>
          </Card>
        )}
        {selected && (!quiz || quiz.picked) ? (
          <Card>
            <div className="flex items-start justify-between gap-2">
              <div><h3 className="text-lg font-extrabold">{selected.name}</h3><p className="text-sm text-[#00C8FF] italic">{selected.scientific}</p></div>
              <span className="badge bg-[#00C8FF]/15 text-[#00C8FF]">{selected.systemName}</span>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Localização</dt><dd>{selected.location}</dd></div>
              <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Classificação</dt><dd>{selected.classification}</dd></div>
              <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Função</dt><dd>{selected.function}</dd></div>
              {selected.origin && <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Origem</dt><dd>{selected.origin}</dd></div>}
              {selected.insertion && <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Inserção</dt><dd>{selected.insertion}</dd></div>}
              {selected.action && <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Ação</dt><dd>{selected.action}</dd></div>}
              {selected.innervation && <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Inervação</dt><dd>{selected.innervation}</dd></div>}
              <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Relações anatômicas</dt><dd>{selected.relations}</dd></div>
              <div><dt className="text-[#9BAFC4] text-xs uppercase font-bold">Aula correspondente</dt><dd>{selected.lesson}</dd></div>
            </dl>
            <button className="btn-ghost w-full mt-4" onClick={() => setSelected(null)}>Limpar seleção</button>
          </Card>
        ) : <Empty msg="Selecione uma estrutura no modelo 3D para ver nome, função, relações e aula correspondente." />}
        <Card>
          <h4 className="font-bold mb-2">Estruturas deste sistema ({items.length})</h4>
          <div className="flex flex-wrap gap-2">
            {items.map(s => <button key={s.id} disabled={!!quiz && !quiz.picked} onClick={() => setSelected(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${selected?.id === s.id && (!quiz || quiz.picked) ? 'bg-[#00C8FF] text-[#04121F]' : 'border-[#26364A] text-[#9BAFC4]'}`}>{s.name}</button>)}
          </div>
          <p className="text-xs text-[#9BAFC4] mt-3">Identificações registradas: {state.id3d.length} · acertos: {state.id3d.filter(x => x.correct).length}</p>
        </Card>
      </div>
    </div>
  );
}
