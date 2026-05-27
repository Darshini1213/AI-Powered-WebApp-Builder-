import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Stars } from '@react-three/drei';

function AnimatedBlob() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#CB7D3E" /* Terracotta */
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[-3, -1, -2]} scale={0.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#DBB169" /* Ochre */
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron() {
    const meshRef = useRef();
  
    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.4;
    });
  
    return (
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef} position={[0, 2, -4]} scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9B593C" /* Rust Brown */
            wireframe={true}
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>
      </Float>
    );
  }

export default function Scene3D() {
  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#EAD7A6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#CB7D3E" />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} color="#DBB169" />
        
        <AnimatedBlob />
        <FloatingTorus />
        <FloatingIcosahedron />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
