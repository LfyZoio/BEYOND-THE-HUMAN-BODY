import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Material, Mesh, MeshStandardMaterial } from 'three';
import { Card } from './ui';
import { INITIAL_CAMERA_POSITION, RespiratoryCamera, adjustRespiratoryCamera, resetRespiratoryCamera, type CameraAction, type RespiratoryControls } from './RespiratoryCamera';
import { RESPIRATORY_URLS } from './respiratoryAssets';

type PartId = 'pulmao-d' | 'pulmao-e' | 'traqueia' | 'bronquio-d' | 'bronquio-e';
type Part = { id: PartId; name: string; location: string; fn: string; relations: string; detail: string };
const PARTS: Part[] = [
  {id:'pulmao-d',name:'Pulmão direito',location:'Cavidade torácica direita.',fn:'Participa das trocas gasosas entre o ar alveolar e o sangue.',relations:'Relaciona-se com a pleura, o diafragma e o mediastino.',detail:'Em geral apresenta três lobos: superior, médio e inferior.'},
  {id:'pulmao-e',name:'Pulmão esquerdo',location:'Cavidade torácica esquerda.',fn:'Participa das trocas gasosas entre o ar alveolar e o sangue.',relations:'Relaciona-se com a pleura, o diafragma e o coração.',detail:'Em geral apresenta dois lobos e uma incisura cardíaca.'},
  {id:'traqueia',name:'Traqueia',location:'Pescoço e tórax, entre a laringe e os brônquios principais.',fn:'Conduz o ar até os brônquios e ajuda a manter a via aérea aberta.',relations:'Situa-se anteriormente ao esôfago e termina na bifurcação traqueal.',detail:'Anéis de cartilagem contribuem para a sustentação da parede traqueal.'},
  {id:'bronquio-d',name:'Brônquio principal direito',location:'Entre a bifurcação da traqueia e o pulmão direito.',fn:'Conduz o ar ao pulmão direito.',relations:'Divide-se em brônquios lobares no pulmão.',detail:'Em geral é mais curto, largo e vertical que o esquerdo.'},
  {id:'bronquio-e',name:'Brônquio principal esquerdo',location:'Entre a bifurcação da traqueia e o pulmão esquerdo.',fn:'Conduz o ar ao pulmão esquerdo.',relations:'Divide-se em brônquios lobares no pulmão.',detail:'Em geral é mais longo e oblíquo que o direito.'},
];

function Models({selected,isolate,onSelect,onReady}:{selected:PartId|null;isolate:boolean;onSelect:(id:PartId)=>void;onReady:()=>void}) {
  const [lung,trachea,bronchi] = useGLTF(RESPIRATORY_URLS);
  const groups = useMemo(() => {
    const specs: [PartId, typeof lung.scene, string[]][] = [
      ['pulmao-d',lung.scene,['VH_M_lungs_R','VH_M_bronchi_R']], ['pulmao-e',lung.scene,['VH_M_lungs_L','VH_M_bronchi_L']],
      ['traqueia',trachea.scene,['VH_M_trachea_of_respiratory_system']],
      ['bronquio-d',bronchi.scene,['VH_M_right_main_bronchus']], ['bronquio-e',bronchi.scene,['VH_M_left_main_bronchus']],
    ];
    return specs.map(([id,scene,names]) => {
      const group = new Group();
      // Share clones only within a selectable group, never across highlights.
      const materials = new Map<Material, Material>();
      const cloneMaterial = (material: Material) => {
        let copy = materials.get(material);
        if (!copy) { copy = material.clone(); materials.set(material, copy); }
        return copy;
      };
      for(const name of names) {
        const node = scene.getObjectByName(name);
        if(!node) throw new Error(`Estrutura ausente no modelo: ${name}`);
        const clone = node.clone(true);
        clone.traverse(o => { if(o instanceof Mesh) o.material = Array.isArray(o.material) ? o.material.map(cloneMaterial) : cloneMaterial(o.material); });
        group.add(clone);
      }
      return {id,group,materials: [...materials.values()]};
    });
  },[lung, trachea, bronchi]);
  useEffect(() => { onReady(); }, [onReady]);
  useEffect(() => () => { groups.forEach(({materials}) => materials.forEach(m => m.dispose())); },[groups]);
  useEffect(() => {
    for(const {id,materials} of groups) for(const m of materials) {
      if(m instanceof MeshStandardMaterial) {m.emissive.set(selected === id ? '#00aacc' : '#000000');m.emissiveIntensity=selected === id ? .6 : 0;}
      const transparent = !!selected && selected !== id;
      if(m.transparent !== transparent) {m.transparent = transparent; m.needsUpdate = true;}
      m.opacity = transparent ? .25 : 1;
    }
  },[groups,selected]);
  return <>{groups.map(({id,group}) => {
    const visible = !isolate || !selected || id === selected;
    // Three's raycaster can intersect invisible descendants, so remove their event handler too.
    return <group key={id} visible={visible} dispose={null} onClick={visible ? e=>{e.stopPropagation();onSelect(id);} : undefined}><primitive object={group}/></group>;
  })}</>;
}

export default function RespiratoryPilot({onExit}:{onExit:()=>void}) {
  useLayoutEffect(() => {
    // Keep the mobile header in document flow only while this pilot is mounted.
    document.documentElement.classList.add('respiratory-pilot-active');
    return () => document.documentElement.classList.remove('respiratory-pilot-active');
  }, []);
  const [selected,setSelected]=useState<PartId|null>(null);
  const [ready,setReady]=useState(false);
  const onReady=useCallback(() => setReady(true), []);
  const [isolated,setIsolated]=useState(false);
  const [showLabel,setShowLabel]=useState(true);
  const controls=useRef<RespiratoryControls>(null);
  const part=PARTS.find(p=>p.id===selected);
  return <div className="space-y-4">
    <Card><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Piloto respiratório experimental</h2><p className="text-sm text-[#9BAFC4]">Modelos HRA de referência; alinhamento clínico e desempenho em dispositivos físicos ainda não validados.</p></div><button className="btn-ghost" onClick={onExit}>Voltar ao modelo esquemático</button></div></Card>
    <div className="grid lg:grid-cols-[1fr_360px] gap-4">
      <Card className="!p-0 overflow-hidden"><div className="relative h-[480px] bg-[#080E18]">
        {!ready && <div role="status" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-sm">Carregando modelos 3D…</div>}
        <Canvas camera={{position:INITIAL_CAMERA_POSITION,fov:38,near:.001,far:100}}>
          <ambientLight intensity={1.2}/><directionalLight position={[2,3,4]} intensity={2}/>
          <Suspense fallback={null}><Models selected={selected} isolate={isolated} onSelect={setSelected} onReady={onReady}/></Suspense>
          <RespiratoryCamera controlsRef={controls}/>
        </Canvas></div>
        <div className="px-4 pt-4" role="group" aria-label="Controles da câmera">
          <p className="text-sm text-[#9BAFC4] mb-2">Câmera: gire ou aproxime usando os botões, mouse ou toque.</p>
          <div className="flex flex-wrap gap-2">{([
            ['left','Girar para a esquerda'], ['right','Girar para a direita'],
            ['up','Girar para cima'], ['down','Girar para baixo'],
            ['in','Aproximar'], ['out','Afastar'],
          ] as [CameraAction, string][]).map(([action,label]) => <button key={action} className="btn-ghost" onClick={()=>{if(controls.current) adjustRespiratoryCamera(controls.current, action);}}>{label}</button>)}</div>
        </div>
        <p className="sr-only" role="status" aria-atomic="true">{part ? `${part.name} selecionado. ${isolated ? 'Estrutura isolada.' : 'Todas as estruturas visíveis.'}` : 'Nenhuma estrutura selecionada.'}</p>
        {part && showLabel && <p className="px-4 pt-3 text-sm text-[#9BAFC4]">Estrutura destacada: <span className="text-[#00C8FF] font-bold">{part.name}</span></p>}
        <div className="flex flex-wrap gap-2 p-4"><button className="btn-ghost" disabled={!selected} onClick={()=>setIsolated(v=>!v)}>{isolated?'Mostrar todas':'Isolar selecionada'}</button><button className="btn-ghost" onClick={()=>{if(controls.current) resetRespiratoryCamera(controls.current);}}>Restaurar câmera</button><button className="btn-ghost" aria-pressed={showLabel} onClick={()=>setShowLabel(v=>!v)}>{showLabel ? 'Ocultar etiqueta' : 'Mostrar etiqueta'}</button></div>
      </Card>
      <div className="space-y-4"><Card><h3 className="font-bold mb-3">Estruturas</h3><div className="flex flex-wrap gap-2">{PARTS.map(p=><button key={p.id} onClick={()=>setSelected(p.id)} aria-pressed={selected===p.id} className={`px-3 py-2 rounded-xl text-sm border ${selected===p.id?'bg-[#00C8FF] text-[#04121F]':'border-[#26364A]'}`}>{p.name}</button>)}</div></Card>
        <Card>{part?<><h3 className="font-bold text-lg">{part.name}</h3><dl className="space-y-3 text-sm mt-3"><div><dt className="text-[#9BAFC4]">Localização</dt><dd>{part.location}</dd></div><div><dt className="text-[#9BAFC4]">Função</dt><dd>{part.fn}</dd></div><div><dt className="text-[#9BAFC4]">Relações</dt><dd>{part.relations}</dd></div><div><dt className="text-[#9BAFC4]">Descrição didática</dt><dd>{part.detail}</dd></div></dl><button className="btn-ghost mt-4" onClick={()=>{setSelected(null);setIsolated(false);}}>Limpar seleção</button></>:<p className="text-sm text-[#9BAFC4]">Selecione uma estrutura no modelo ou na lista para explorar suas informações.</p>}</Card>
      </div>
    </div>
    <Card><h3 className="font-bold">Créditos e licença</h3><p className="text-sm text-[#9BAFC4] mt-2">Kristen Browne e Heidi Schlehlein, Human Reference Atlas / HuBMAP; dados Visible Human Male, National Library of Medicine. Modelos sem alterações de geometria; agrupamento e visualização adaptados. <a className="text-[#00C8FF] underline" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p><p className="text-sm mt-2"><a className="text-[#00C8FF] underline" href="https://doi.org/10.48539/HBM737.FFBT.876">Pulmão v1.3</a> · <a className="text-[#00C8FF] underline" href="https://doi.org/10.48539/HBM969.WCCJ.636">Traqueia v1.0</a> · <a className="text-[#00C8FF] underline" href="https://doi.org/10.48539/HBM795.LVRX.842">Brônquios v1.0</a></p></Card>
  </div>;
}
