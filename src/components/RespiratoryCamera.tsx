import { useLayoutEffect, type ComponentRef, type RefObject } from 'react';
import { OrbitControls } from '@react-three/drei';
import { MathUtils, Spherical, Vector3 } from 'three';

export type RespiratoryControls = ComponentRef<typeof OrbitControls>;
export const INITIAL_CAMERA_POSITION: [number, number, number] = [.46, .8, .9];
export const INITIAL_CAMERA_TARGET: [number, number, number] = [0, .52, 0];

/** Flush inertia before restoring the explicit state saved after the target is applied. */
export function resetRespiratoryCamera(controls: RespiratoryControls) {
  const damping = controls.enableDamping;
  controls.enableDamping = false;
  controls.update(); // consumes pending rotation/pan deltas before reset
  controls.reset();
  controls.enableDamping = damping;
}

export type CameraAction = 'left' | 'right' | 'up' | 'down' | 'in' | 'out';

/** Discrete controls for pointer-free camera access, using the same orbit target and limits. */
export function adjustRespiratoryCamera(controls: RespiratoryControls, action: CameraAction) {
  const damping = controls.enableDamping;
  controls.enableDamping = false;
  controls.update(); // consume residual input before applying a discrete action
  const offset = new Vector3().subVectors(controls.object.position, controls.target);
  const orbit = new Spherical().setFromVector3(offset);
  const step = Math.PI / 12;
  if (action === 'left') orbit.theta -= step;
  if (action === 'right') orbit.theta += step;
  if (action === 'up') orbit.phi -= step;
  if (action === 'down') orbit.phi += step;
  orbit.theta = MathUtils.clamp(orbit.theta, controls.minAzimuthAngle, controls.maxAzimuthAngle);
  orbit.phi = MathUtils.clamp(orbit.phi, controls.minPolarAngle, controls.maxPolarAngle);
  orbit.makeSafe();
  if (action === 'in') orbit.radius *= .85;
  if (action === 'out') orbit.radius /= .85;
  orbit.radius = MathUtils.clamp(orbit.radius, controls.minDistance, controls.maxDistance);
  controls.object.position.copy(controls.target).add(offset.setFromSpherical(orbit));
  controls.update();
  controls.enableDamping = damping;
}

export function RespiratoryCamera({ controlsRef }: { controlsRef: RefObject<RespiratoryControls | null> }) {
  useLayoutEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.update();
    controls.saveState();
  }, [controlsRef]);
  return <OrbitControls ref={controlsRef} target={INITIAL_CAMERA_TARGET} makeDefault enableDamping />;
}
