import { lazy, Suspense } from 'react';
import type { SystemId } from '../types';

const Lab3D = lazy(() => import('./Lab3D'));

export default function LazyLab3D(props: { initialSystem?: SystemId }) {
  return <Suspense fallback={<div role="status" className="card p-6 text-[#9BAFC4]">Carregando laboratório 3D…</div>}><Lab3D {...props} /></Suspense>;
}
