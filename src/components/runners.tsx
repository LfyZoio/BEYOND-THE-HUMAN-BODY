import { useState } from 'react';
import { useStore } from '../store';
import type { FlashcardDef, Question } from '../types';
import { Card, Empty } from './ui';

export function QuizRunner({ questions, moduleId, source, onDone }: { questions: Question[]; moduleId: number; source: string; onDone?: (score: number, total: number) => void }) {
  const { recordAnswer } = useStore();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  if (!questions.length) return <Empty msg="Nenhuma questão disponível para esta seleção." />;
  if (finished) {
    return (
      <Card className="text-center">
        <div className="text-4xl font-extrabold text-[#00C8FF]">{score}/{questions.length}</div>
        <p className="text-[#9BAFC4] mt-2">{score === questions.length ? 'Perfeito! Domínio demonstrado neste conjunto.' : score >= questions.length * 0.7 ? 'Bom desempenho — revise os erros abaixo.' : 'Revise a aula e tente novamente. Errar faz parte do aprendizado.'}</p>
        <button className="btn-primary mt-4" onClick={() => { setIdx(0); setPicked(null); setScore(0); setFinished(false); }}>Refazer</button>
        {onDone && <button className="btn-ghost mt-4 ml-2" onClick={() => onDone(score, questions.length)}>Concluir e registrar</button>}
      </Card>
    );
  }
  const q = questions[idx];
  const correct = picked === q.answer;
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <span className="badge bg-[#00C8FF]/15 text-[#00C8FF]">Questão {idx + 1} de {questions.length}</span>
        <span className="text-xs text-[#9BAFC4]">{q.difficulty} · {q.topic}</span>
      </div>
      <div className="h-2 rounded-full bg-[#26364A] mb-5"><div className="h-full bg-[#00C8FF] rounded-full" style={{ width: `${((idx) / questions.length) * 100}%` }} /></div>
      <h3 className="text-lg font-bold mb-4">{q.q}</h3>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isAnswer = i === q.answer;
          return (
            <button key={i} disabled={picked !== null} onClick={() => { setPicked(i); if (i === q.answer) setScore(s => s + 1); recordAnswer({ id: q.id, answer: i, correct: i === q.answer, moduleId: ('moduleId' in q && typeof q.moduleId === 'number') ? q.moduleId : moduleId, topic: q.topic, source }); }}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${picked === null ? 'border-[#26364A] hover:border-[#00C8FF]' : isAnswer ? 'border-green-500 bg-green-500/10' : isPicked ? 'border-red-500 bg-red-500/10' : 'border-[#26364A] opacity-60'}`}>
              <span className="font-bold text-[#00C8FF] mr-2">{'ABCD'[i]}.</span>{opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`mt-4 p-4 rounded-xl text-sm ${correct ? 'bg-green-500/10 border border-green-500/40' : 'bg-red-500/10 border border-red-500/40'}`}>
          <p className="font-bold mb-1">{correct ? '✓ Correto!' : `✗ Incorreto — resposta correta: ${'ABCD'[q.answer]}. ${q.options[q.answer]}`}</p>
          <p className="text-[#F5F8FC]/90">{q.explanation}</p>
          {q.whyWrong && !correct && <p className="text-[#9BAFC4] mt-2">Por que as outras estão erradas: {q.whyWrong}</p>}
          <button className="btn-primary mt-3" onClick={() => { if (idx + 1 >= questions.length) setFinished(true); else { setIdx(idx + 1); setPicked(null); } }}>
            {idx + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
          </button>
        </div>
      )}
    </Card>
  );
}

export function FlashcardRunner({ cards, title }: { cards: FlashcardDef[]; title: string }) {
  const { gradeCard, state } = useStore();
  const [sessionCards] = useState(() => cards);
  cards = sessionCards;
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  if (!cards.length) return <Empty msg="Nenhum flashcard nesta seleção. Estude uma aula ou crie seus próprios cartões." />;
  if (idx >= cards.length) {
    return <Card className="text-center"><div className="text-3xl font-extrabold text-[#00C8FF]">Sessão concluída!</div><p className="text-[#9BAFC4] mt-2">{done} cartões revisados. O algoritmo SM-2 reagendou cada cartão conforme seu desempenho.</p><button className="btn-primary mt-4" onClick={() => { setIdx(0); setDone(0); setFlipped(false); }}>Revisar novamente</button></Card>;
  }
  const card = cards[idx];
  const cs = state.cards[card.id];
  const grade = (g: number) => { gradeCard(card.id, g); setDone(d => d + 1); setFlipped(false); setIdx(i => i + 1); };
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="badge bg-[#00C8FF]/15 text-[#00C8FF]">{title} · {idx + 1}/{cards.length}</span>
        <span className="text-xs text-[#9BAFC4]">{card.category}{cs ? ` · intervalo: ${cs.interval}d · reps: ${cs.reps}` : ' · novo'}</span>
      </div>
      <button onClick={() => setFlipped(f => !f)} className="w-full card p-8 min-h-[220px] flex flex-col items-center justify-center text-center flip-in" key={card.id + String(flipped)}>
        <span className="text-xs uppercase tracking-widest text-[#9BAFC4] font-bold mb-3">{flipped ? 'Resposta' : 'Pergunta — clique para virar'}</span>
        <span className="text-xl font-bold">{flipped ? card.back : card.front}</span>
      </button>
      {flipped ? (
        <div className="grid grid-cols-4 gap-2 mt-4">
          <button className="btn-ghost !px-2 text-sm !border-red-500/50" onClick={() => grade(0)}>Não lembrei</button>
          <button className="btn-ghost !px-2 text-sm !border-orange-500/50" onClick={() => grade(1)}>Difícil</button>
          <button className="btn-ghost !px-2 text-sm !border-yellow-500/50" onClick={() => grade(2)}>Médio</button>
          <button className="btn-ghost !px-2 text-sm !border-green-500/50" onClick={() => grade(3)}>Fácil</button>
        </div>
      ) : <p className="text-center text-sm text-[#9BAFC4] mt-4">Avalie honestamente: o algoritmo SM-2 ajusta intervalos e facilidade de cada cartão.</p>}
    </div>
  );
}
