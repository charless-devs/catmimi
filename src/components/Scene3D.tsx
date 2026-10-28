import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, Sparkles, Float } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import { MathUtils } from 'three';

interface Scene3DProps {
  /** Pause rendering when the hero is off-screen. */
  active: boolean;
  /** Static pose for reduced-motion users. */
  reduced?: boolean;
}

/**
 * Immersive hero scene — an iridescent glass core orbited by metallic
 * geometry, a luminous ring and drifting particles. Lit entirely by
 * procedural lightformers (no network fetches).
 */
export function Scene3D({ active, reduced = false }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <SceneContent reduced={reduced} />
    </Canvas>
  );
}

function SceneContent({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const { size, viewport } = useThree();

  // Weight the cluster to the right on desktop (copy lives on the left),
  // and center it above/behind the copy on small screens.
  const isDesktop = size.width >= 900;
  const clusterPos = useMemo<[number, number, number]>(
    () => (isDesktop ? [Math.min(viewport.width * 0.27, 3.3), -0.15, 0] : [0, 0.55, 0]),
    [isDesktop, viewport.width]
  );
  const clusterScale = isDesktop ? 0.92 : 0.62;

  useFrame(({ pointer, camera, clock }) => {
    if (reduced) return;
    const t = clock.elapsedTime;

    // Smooth mouse parallax on the camera
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 0.7, 0.045);
    camera.position.y = MathUtils.lerp(camera.position.y, pointer.y * 0.45, 0.045);
    camera.lookAt(0, 0, 0);

    // The whole cluster leans gently toward the cursor
    if (groupRef.current) {
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.35 + t * 0.06,
        0.04
      );
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.22, 0.04);
    }

    // Core "breathes"
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.4) * 0.08;
      coreRef.current.scale.setScalar(pulse);
    }

    // Ring counter-rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.22;
      ringRef.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.4) * 0.12;
    }
  });

  return (
    <>
      {/* --- Lighting ------------------------------------------------------ */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#d9c8ff" />
      <pointLight position={[-5, -2, 3]} intensity={12} color="#863bff" distance={14} />
      <pointLight position={[5, 1, -2]} intensity={9} color="#22d3ee" distance={14} />

      {/* Procedural environment for realistic reflections (no HDR download) */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 4, 3]} scale={[8, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3} position={[-5, 0, 2]} scale={[3, 6, 1]} rotation-y={Math.PI / 2} color="#863bff" />
        <Lightformer form="rect" intensity={2.6} position={[5, -1, 2]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} color="#22d3ee" />
        <Lightformer form="circle" intensity={1.4} position={[0, -4, 2]} scale={5} color="#2a1659" />
      </Environment>

      {/* --- Cluster ------------------------------------------------------- */}
      <group ref={groupRef} position={clusterPos} scale={clusterScale}>
        {/* Iridescent glass core */}
        <mesh>
          <icosahedronGeometry args={[0.95, 0]} />
          <meshPhysicalMaterial
            color="#a977ff"
            metalness={0.2}
            roughness={0.08}
            transmission={0.94}
            thickness={1.1}
            ior={1.45}
            iridescence={1}
            iridescenceIOR={1.35}
            iridescenceThicknessRange={[120, 480]}
            clearcoat={1}
            clearcoatRoughness={0.06}
            envMapIntensity={1.6}
            attenuationColor="#6d3aff"
            attenuationDistance={3.5}
          />
        </mesh>

        {/* Luminous inner core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={2}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>

        {/* Orbiting satellites */}
        <Float speed={1.4} rotationIntensity={1.6} floatIntensity={2.2} floatingRange={[-0.35, 0.35]}>
          <mesh position={[1.75, 1.0, 0.6]}>
            <octahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial
              color="#863bff"
              emissive="#3b1678"
              emissiveIntensity={0.6}
              metalness={1}
              roughness={0.14}
              envMapIntensity={2}
            />
          </mesh>
        </Float>

        <Float speed={1.1} rotationIntensity={2} floatIntensity={1.8} floatingRange={[-0.3, 0.3]}>
          <mesh position={[-1.6, -0.95, 0.9]} rotation={[0.6, 0.4, 0]}>
            <torusGeometry args={[0.27, 0.085, 24, 48]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#0e7490"
              emissiveIntensity={1.1}
              metalness={0.9}
              roughness={0.2}
              toneMapped={false}
            />
          </mesh>
        </Float>

        <Float speed={1.7} rotationIntensity={1.2} floatIntensity={2.6} floatingRange={[-0.4, 0.4]}>
          <mesh position={[1.15, -1.3, 1.1]} rotation={[0.3, 0, 0.5]}>
            <tetrahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color="#c9a4ff"
              emissive="#4c1d95"
              emissiveIntensity={0.5}
              metalness={0.85}
              roughness={0.18}
              envMapIntensity={1.8}
            />
          </mesh>
        </Float>

        <Float speed={0.9} rotationIntensity={1} floatIntensity={1.4}>
          <mesh position={[-1.3, 1.25, 0.4]} rotation={[0.2, 0.5, 0]}>
            <boxGeometry args={[0.24, 0.24, 0.24]} />
            <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.1} envMapIntensity={2} />
          </mesh>
        </Float>

        {/* Luminous halo ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.8, 0.014, 12, 160]} />
          <meshStandardMaterial
            color="#b794ff"
            emissive="#863bff"
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Drifting particles */}
      {!reduced && (
        <Sparkles count={90} scale={[9, 6, 5]} size={2.4} speed={0.35} opacity={0.55} color="#b794ff" />
      )}
    </>
  );
}
