import {chromium as pw} from 'playwright-core';
const browser=await pw.launch({executablePath:process.env.CHROMIUM_PATH || '/tmp/chromium',args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const labels=['Dashboard','Minha Jornada','Plano Diário','Biblioteca de Estudos','Laboratório 3D','Sistemas do Corpo','Banco de Questões','Centro de Memorização','Revisão Inteligente','Avaliações','Meu Desempenho','Perfil','Configurações'];
for (const [w,h] of [[360,800],[390,844],[768,1024],[1024,768],[1440,900]]) {
 const ctx=await browser.newContext({viewport:{width:w,height:h}}); const page=await ctx.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(e.message)); await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 for(const label of labels) {
  try {
   if(w<1024) await page.getByRole('button',{name:'Abrir menu'}).click();
   await page.locator('nav').getByRole('button',{name:label,exact: false}).click();
   await page.waitForTimeout(label==='Laboratório 3D'||label==='Sistemas do Corpo'?1500:100);
   const overflow=await page.evaluate(()=>({doc:document.documentElement.scrollWidth, view:innerWidth, offenders:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+1}).slice(0,4).map(e=>`${e.tagName}.${e.className}`)}));
   console.log(`${w}x${h} | ${label} | ${overflow.doc>overflow.view ? 'OVERFLOW '+JSON.stringify(overflow):'ok'} | canvas ${await page.locator('canvas').count()}`);
   if(label==='Dashboard' || label==='Laboratório 3D') await page.screenshot({path:`auditoria-visual/${w}x${h}-${label==='Dashboard'?'dashboard':'lab3d'}.png`});
  } catch(e){console.log(`${w}x${h} | ${label} | ERRO ${e.message.slice(0,250)}`);break;}
 }
 console.log(`${w}x${h} PAGEERROR ${JSON.stringify(errors)}`); await ctx.close();
}
await browser.close();
