import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[];
for(const [width,height] of [[360,800],[390,844],[768,1024],[1024,768],[1440,900]]){
 const p=await b.newPage({viewport:{width,height}});const errors=[];p.on('pageerror',e=>errors.push(e.message));const requests=[];p.on('request',r=>{if(r.url().includes('/models/respiratorio/'))requests.push(r.url())});
 await p.goto(base,{waitUntil:'networkidle'});assert.equal(requests.length,0);if(width<1024)await p.getByRole('button',{name:'Abrir menu'}).click();await p.locator('nav').getByRole('button',{name:'Laboratório 3D'}).click();await p.getByRole('button',{name:'Respiratório',exact:true}).click();assert.equal(requests.length,0);
 const start=Date.now();await p.getByRole('button',{name:'Abrir piloto anatômico experimental'}).click();await p.locator('canvas').waitFor({timeout:90000});await p.getByText('Carregando modelos 3D…').waitFor({state:'hidden',timeout:90000});const load=Date.now()-start;assert.equal(requests.length,3);
 for(const name of ['Pulmão direito','Pulmão esquerdo','Traqueia','Brônquio principal direito','Brônquio principal esquerdo']){
  await p.getByRole('button',{name,exact:true}).click();assert.equal(await p.getByRole('button',{name,exact:true}).getAttribute('aria-pressed'),'true');assert(await p.getByRole('heading',{name,exact:true}).isVisible());assert(await p.locator('p').filter({hasText:'Estrutura destacada:'}).getByText(name,{exact:true}).count()>0);
 }
 await p.getByRole('button',{name:'Ocultar etiqueta'}).click();assert.equal(await p.getByText('Estrutura destacada:').count(),0);await p.getByRole('button',{name:'Mostrar etiqueta'}).click();assert(await p.getByText('Estrutura destacada:').isVisible());await p.getByRole('button',{name:'Isolar selecionada'}).click();assert(await p.getByRole('button',{name:'Mostrar todas'}).isVisible());await p.getByRole('button',{name:'Mostrar todas'}).click();await p.getByRole('button',{name:'Limpar seleção'}).click();
 const c=p.locator('canvas');await c.scrollIntoViewIfNeeded();const box=await c.boundingBox();await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();await p.mouse.move(box.x+box.width/2+80,box.y+box.height/2+40,{steps:8});await p.mouse.up();await p.mouse.wheel(0,-300);await p.getByRole('button',{name:'Restaurar câmera'}).click();
 const perf=await p.evaluate(async()=>{const frames=[];let t=performance.now(); await new Promise(resolve=>{function frame(now){frames.push(now);if(now-t<1500)requestAnimationFrame(frame);else resolve();}requestAnimationFrame(frame);});return {rafFps:Math.round((frames.length-1)*1000/(frames.at(-1)-frames[0])),jsHeap:performance.memory?.usedJSHeapSize??null};});
 const selectStart=Date.now();await p.getByRole('button',{name:'Traqueia',exact:true}).click();await p.getByRole('heading',{name:'Traqueia',exact:true}).waitFor();const selection=Date.now()-selectStart;
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);assert.deepEqual(errors,[]);results.push({width,height,loadMs:load,selectionAutomationMs:selection,...perf});
 await p.getByRole('button',{name:'Voltar ao modelo esquemático'}).click();await p.getByRole('button',{name:'Atividade de identificação'}).click();const quiz=p.locator('.card').filter({hasText:'Identificação 3D'}).first();assert(await quiz.isVisible());await quiz.locator('button').first().click();assert(await quiz.getByText(/Acertos:.*\/1/).isVisible());await p.close();
}
console.log(JSON.stringify(results,null,2));await b.close();
