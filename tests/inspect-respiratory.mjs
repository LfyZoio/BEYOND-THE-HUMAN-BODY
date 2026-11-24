import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { strict as assert } from 'node:assert';
import { Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const paths = [
 ['lung','97fcec4753c60d5a968b9d92cdc68fe66a44ab19d85dec843cda3a66d3ab43ab',58,224765],
 ['trachea','0ba59ac521b0265dd70868e1b722f986a04fe3b4fcc1db950260219dcf978aae',3,44042],
 ['main-bronchus','6db5b11213570514f9c2f637423cd1b369ed6a796fb2f661193b708aba1733fa',4,6023],
];
for (const [name,sha,expectedMeshes,expectedTriangles] of paths) {
 const b=await readFile(`public/models/respiratorio/${name}.glb`);assert.equal(b.toString('ascii',0,4),'glTF');assert.equal(b.readUInt32LE(4),2);assert.equal(b.readUInt32LE(8),b.length);assert.equal(createHash('sha256').update(b).digest('hex'),sha);
 const gltf=await new Promise((resolve,reject)=>new GLTFLoader().parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'',resolve,reject));
 let meshes=0,triangles=0,normals=0,degenerate=0,opposed=0; const materials = new Set(); const a=new Vector3(),c=new Vector3(),d=new Vector3(),n=new Vector3(),edge=new Vector3();
 gltf.scene.traverse(o=>{if(!o.isMesh)return;meshes++; (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => materials.add(m));const g=o.geometry,p=g.attributes.position,normal=g.attributes.normal,ix=g.index;assert(normal);normals++;const count=ix?.count??p.count;assert.equal(count%3,0);triangles+=count/3;
 for(let i=0;i<count;i+=3){let j=ix?ix.getX(i):i,k=ix?ix.getX(i+1):i+1,l=ix?ix.getX(i+2):i+2;assert(j<p.count&&k<p.count&&l<p.count);a.fromBufferAttribute(p,j);c.fromBufferAttribute(p,k);d.fromBufferAttribute(p,l);edge.subVectors(c,a);n.subVectors(d,a).cross(edge).negate();if(n.lengthSq()<1e-20){degenerate++;continue;}d.fromBufferAttribute(normal,j);if(n.dot(d)<0)opposed++;}
 });
 assert.equal(meshes,expectedMeshes);assert.equal(triangles,expectedTriangles);const box=new Box3().setFromObject(gltf.scene);console.log(JSON.stringify({name,bytes:b.length,meshes,triangles,normals,degenerate,opposed,box:{min:box.min.toArray(),max:box.max.toArray()},materials:materials.size}));
}
