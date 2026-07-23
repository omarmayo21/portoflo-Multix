import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

const SmallSubtleChromeBadge: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.1;

    // Smooth camera subtle motion
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, normalizedX * 0.6, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, normalizedY * 0.6, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={[3.2, 2.2, -1.5]}>
        <Icosahedron ref={meshRef} args={[0.55, 1]}>
          <meshPhysicalMaterial
            color="#2A4073"
            emissive="#122040"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.95}
            clearcoat={1}
            reflectivity={1}
          />
        </Icosahedron>

        <Sphere args={[0.12, 16, 16]} position={[0.7, 0.5, 0.2]}>
          <meshStandardMaterial color="#FF5E3A" emissive="#FF5E3A" emissiveIntensity={2.5} />
        </Sphere>
      </group>
    </Float>
  );
};

const SubtleParticleDust: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#FF5E3A" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

export const HeroCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[8, 8, 8]} color="#FF5E3A" intensity={2.5} />
        <pointLight position={[-8, -8, -8]} color="#2A4073" intensity={3.5} />

        <fog attach="fog" args={['#0F1D38', 5, 14]} />

        <SmallSubtleChromeBadge />
        <SubtleParticleDust />
      </Canvas>
    </div>
  );
};
