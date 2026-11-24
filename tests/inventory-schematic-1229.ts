import { writeFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { STRUCTURES } from '../src/data/structures';
const items=STRUCTURES.map(({id,name,scientific,system,shape,pos,scale,color})=>({id,name,scientific,system,shape,pos,scale,color}));
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'duplicate ids');
writeFileSync('auditoria-piloto/fase-12-2-9/inventario-esquematico.json',JSON.stringify(items,null,2));
console.log(JSON.stringify({count:items.length,uniqueIds:new Set(items.map(x=>x.id)).size,systems:Object.fromEntries([...new Set(items.map(x=>x.system))].map(s=>[s,items.filter(x=>x.system===s).length]))},null,2));
