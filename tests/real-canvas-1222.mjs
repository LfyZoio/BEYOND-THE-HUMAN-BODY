// Instruments only the Vite response in this test session; production files remain unchanged.
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5175';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/src/components/RespiratoryCamera.tsx*',async route=>{const res=await route.fetch(),body=await res.text();const key='const controls = controlsRef.current;';assert(body.includes(key));await route.fulfill({response:res,body:body.replace(key,key+' window.__pilotControls = controls;')});});
const t=Date.now();await p.goto(base,{waitUntil:'networkidle'});const initialMs=Date.now()-t;
await p.locator('nav').getByRole('button',{name:'Laboratório 3D'}).click();await p.getByRole('button',{name:'Respiratório',exact:true}).click();
const pre=await p.evaluate(()=>localStorage.getItem('anatomia3d_v1'));
let c=p.locator('canvas');await c.waitFor();await c.scrollIntoViewIfNeeded();
async function fps(mode){await p.evaluate(()=>{window.__fps=[];window.__fpsStart=performance.now();window.__measure=true;function frame(t){if(!window.__measure)return;window.__fps.push(t);requestAnimationFrame(frame)}requestAnimationFrame(frame)});const box=await c.boundingBox();await p.mouse.move(box.x+box.width*.5,box.y+box.height*.5);if(mode==='rotate'){await p.mouse.down();for(let i=0;i<14;i++){await p.mouse.move(box.x+box.width*.5+Math.sin(i*.5)*90,box.y+box.height*.5+Math.cos(i*.5)*35);await p.waitForTimeout(100);}await p.mouse.up();}else {for(let i=0;i<12;i++){await p.mouse.wheel(0,i%2?50:-50);await p.waitForTimeout(100);}}return p.evaluate(()=>{window.__measure=false;const a=window.__fps;return {frames:a.length,spanMs:a.at(-1)-a[0],fps:(a.length-1)*1000/(a.at(-1)-a[0])}})}
const schemeRotation=await fps('rotate'),schemeZoom=await fps('zoom');
const started=Date.now();await p.getByRole('button',{name:'Abrir piloto anatômico experimental'}).click();await p.locator('canvas').waitFor();await p.waitForFunction(()=>window.__pilotControls);await p.getByText('Carregando modelos 3D…').waitFor({state:'hidden',timeout:90000});const loadMs=Date.now()-started;
c=p.locator('canvas');await c.scrollIntoViewIfNeeded();const state=()=>p.evaluate(()=>{const c=window.__pilotControls;return {position:c.object.position.toArray(),quaternion:c.object.quaternion.toArray(),target:c.target.toArray(),distance:c.getDistance(),zoom:c.object.zoom,damping:c.enableDamping}});const initial=await state();
const resources=await p.evaluate(()=>performance.getEntriesByType('resource').filter(x=>x.name.includes('/models/respiratorio/')).map(x=>({name:x.name.split('/').at(-1),duration:x.duration,encoded:x.encodedBodySize,transfer:x.transferSize})));
const rotation=await fps('rotate'), zoom=await fps('zoom');
function compare(a,b){for(const k of ['position','quaternion','target']) for(let i=0;i<a[k].length;i++)assert.ok(Math.abs(a[k][i]-b[k][i])<1e-6,`${k}[${i}] ${a[k][i]} ${b[k][i]}`);for(const k of ['distance','zoom'])assert.ok(Math.abs(a[k]-b[k])<1e-6,k);assert.equal(a.damping,b.damping)}
const sample=[];
for(let i=0;i<3;i++){
 const box=await c.boundingBox();await p.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await p.mouse.down();await p.mouse.move(box.x+box.width*.5+75+i*10,box.y+box.height*.5+50,{steps:5});await p.mouse.up();await p.mouse.wheel(0,-150);await p.mouse.down({button:'right'});await p.mouse.move(box.x+box.width*.5+100,box.y+box.height*.5+25,{steps:4});await p.mouse.up({button:'right'});const changed=await state();assert.notDeepEqual(changed.position,initial.position);assert.notDeepEqual(changed.target,initial.target);
 await p.getByRole('button',{name:'Traqueia',exact:true}).click();await p.getByRole('button',{name:'Isolar selecionada'}).click();await p.getByRole('button',{name:'Mostrar todas'}).click();await p.getByRole('button',{name:'Restaurar câmera'}).click();await p.waitForTimeout(120);let early=await state();compare(initial,early);await p.waitForTimeout(800);let late=await state();compare(initial,late);sample.push({changed,early,late});
}
await p.getByRole('button',{name:'Limpar seleção'}).click();
// Defined camera positions are test-only visual viewpoints, with no model transform.
async function view(name,pos){await p.evaluate((pos)=>{let c=window.__pilotControls;c.object.position.set(...pos);c.target.set(0,.52,0);c.update()},pos);await p.waitForTimeout(500);await c.screenshot({path:`auditoria-piloto/fase-12-2-2/${name}.png`});}
await view('frente-aproximada',[0,.52,.55]);await view('posterior-aproximada',[0,.52,-.55]);await view('lateral-aproximada',[.55,.52,0]);
await p.getByRole('button',{name:'Brônquio principal direito',exact:true}).click();await view('bronquio-em-contexto',[0,.52,.35]);await p.getByRole('button',{name:'Isolar selecionada'}).click();await p.addStyleTag({content:'.pointer-events-none.whitespace-nowrap { visibility:hidden !important }'});await view('bronquio-direito-isolado',[0,.52,.18]);await p.getByRole('button',{name:'Mostrar todas'}).click();await p.getByRole('button',{name:'Traqueia',exact:true}).click();await p.getByRole('button',{name:'Isolar selecionada'}).click();await view('traqueia-isolada',[0,.52,.38]);
const post=await p.evaluate(()=>localStorage.getItem('anatomia3d_v1'));assert.equal(post,pre);assert.deepEqual(errs,[]);const heap=await p.evaluate(()=>performance.memory?.usedJSHeapSize??null);
const output={browser:await b.version(),initialMs,loadMs,resources,schemeRotation,schemeZoom,rotation,zoom,heap,initial,sample,errors:errs};writeFileSync('auditoria-piloto/fase-12-2-2/metricas.json',JSON.stringify(output,null,2));console.log(JSON.stringify(output,null,2));await b.close();
