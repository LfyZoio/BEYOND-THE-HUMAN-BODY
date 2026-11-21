import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card p-5 ${className}`}>{children}</div>;
}
export function Bar({ pct, color = '#00C8FF' }: { pct: number; color?: string }) {
  return <div className="h-2 rounded-full bg-[#26364A] overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, pct))}%`, background: color }} /></div>;
}
export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return <Card><div className="text-xs uppercase tracking-wide text-[#9BAFC4] font-semibold">{label}</div><div className="text-2xl font-extrabold mt-1">{value}</div>{sub && <div className="text-xs text-[#9BAFC4] mt-1">{sub}</div>}</Card>;
}
export function Empty({ msg }: { msg: string }) {
  return <div className="card p-8 text-center text-[#9BAFC4]">{msg}</div>;
}
export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return <div className="mb-6 fade-up"><h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>{sub && <p className="text-[#9BAFC4] mt-1">{sub}</p>}</div>;
}
export function LineChart({ data, color = '#00C8FF', labels }: { data: number[]; color?: string; labels?: string[] }) {
  const max = Math.max(...data, 1);
  const w = 600, h = 160, pad = 8;
  const pts = data.map((v, i) => `${pad + (i * (w - pad * 2)) / Math.max(1, data.length - 1)},${h - pad - (v / max) * (h - pad * 2)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => <circle key={i} cx={pad + (i * (w - pad * 2)) / Math.max(1, data.length - 1)} cy={h - pad - (v / max) * (h - pad * 2)} r="4" fill={color} />)}
      {labels && labels.map((l, i) => <text key={i} x={pad + (i * (w - pad * 2)) / Math.max(1, data.length - 1)} y={h - 1} fill="#9BAFC4" fontSize="10" textAnchor="middle">{l}</text>)}
    </svg>
  );
}
export function Donut({ pct, color = '#00C8FF', size = 110 }: { pct: number; color?: string; size?: number }) {
  const r = 42, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#26364A" strokeWidth="10" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} transform="rotate(-90 50 50)" strokeLinecap="round" />
      <text x="50" y="55" textAnchor="middle" fill="#F5F8FC" fontSize="18" fontWeight="800">{pct}%</text>
    </svg>
  );
}
export function fmtMinutes(m: number) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h}h ${r}min` : `${h}h`;
}
