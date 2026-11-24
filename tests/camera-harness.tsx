import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { INITIAL_CAMERA_POSITION, RespiratoryCamera, resetRespiratoryCamera, type RespiratoryControls } from '../src/components/RespiratoryCamera';

function Harness() {
 const controls = useRef<RespiratoryControls>(null);
 useEffect(() => {
   (window as unknown as { cameraTest: unknown }).cameraTest = {
     state: () => { const c=controls.current!; return {position:c.object.position.toArray(), quaternion:c.object.quaternion.toArray(), zoom:c.object.zoom, target:c.target.toArray(), distance:c.getDistance(), damping:c.enableDamping}; },
     reset: () => resetRespiratoryCamera(controls.current!),
   };
 }, []);
 return <div style={{width:600,height:480}}><Canvas camera={{position:INITIAL_CAMERA_POSITION,fov:38,near:.001,far:100}}><ambientLight /><mesh position={[0,.52,0]}><boxGeometry args={[.1,.1,.1]} /><meshStandardMaterial /></mesh><RespiratoryCamera controlsRef={controls}/></Canvas></div>;
}
createRoot(document.getElementById('root')!).render(<Harness/>);
