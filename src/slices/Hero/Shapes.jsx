"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";

// -------------------------------------------------
// AI CORE DIAMOND (OCTAHEDRON)
// -------------------------------------------------
function AICoreDiamond() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.4;
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#bde6ff"),
    metalness: 0.95,
    roughness: 0.05,
    emissive: new THREE.Color("#83caff"),
    emissiveIntensity: 0.45,
  });

  return (
    <Float speed={1} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <octahedronGeometry args={[3.2, 0]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </Float>
  );
}

// -------------------------------------------------
// NEURAL VEIN GRID (BACKGROUND)
// -------------------------------------------------
function NeuralVeins() {
  const lines = [];

  for (let i = 0; i < 40; i++) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        -5
      ),
      new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        -5
      ),
    ]);

    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#6ecbff"),
      transparent: true,
      opacity: 0.15,
    });

    lines.push(<line key={i} geometry={geo} material={mat} />);
  }

  return <group>{lines}</group>;
}

// -------------------------------------------------
// PARTICLE SURGE FIELD
// -------------------------------------------------
function ParticleSurge() {
  const ref = useRef();
  const count = 800;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 14;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.05} color="#c5ecff" opacity={0.9} />
    </points>
  );
}

// -------------------------------------------------
// MAIN SHAPES COMPONENT
// -------------------------------------------------
export function Shapes() {
  return (
    <div className="aspect-square md:col-span-1 md:col-start-2">
      <Canvas camera={{ position: [0, 0, 18], fov: 30 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 10]} intensity={1.8} />

          {/* Background Layers */}
          <NeuralVeins />
          <ParticleSurge />

          {/* AI Core */}
          <AICoreDiamond />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// "use client";

// import * as THREE from "three";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Float } from "@react-three/drei";
// import { Suspense, useMemo, useRef } from "react";

// /* -----------------------------
//    AI CORE DIAMOND
// -------------------------------- */
// function AICoreDiamond() {
//   const ref = useRef(null);

//   useFrame(({ clock }) => {
//     const t = clock.elapsedTime;
//     ref.current.rotation.y = t * 0.4;
//     ref.current.rotation.x = Math.sin(t * 0.2) * 0.15;
//   });

//   const material = useMemo(
//     () =>
//       new THREE.MeshStandardMaterial({
//         color: "#bde6ff",
//         metalness: 0.9,
//         roughness: 0.1,
//         emissive: "#83caff",
//         emissiveIntensity: 0.35,
//       }),
//     []
//   );

//   return (
//     <Float speed={1} floatIntensity={0.6}>
//       <mesh ref={ref} material={material}>
//         <octahedronGeometry args={[3, 0]} />
//       </mesh>
//     </Float>
//   );
// }

// /* -----------------------------
//    NEURAL VEINS
// -------------------------------- */
// function NeuralVeins() {
//   const geometry = useMemo(() => {
//     const points = [];
//     for (let i = 0; i < 20; i++) {
//       points.push(
//         new THREE.Vector3(
//           (Math.random() - 0.5) * 10,
//           (Math.random() - 0.5) * 10,
//           -5
//         ),
//         new THREE.Vector3(
//           (Math.random() - 0.5) * 10,
//           (Math.random() - 0.5) * 10,
//           -5
//         )
//       );
//     }
//     return new THREE.BufferGeometry().setFromPoints(points);
//   }, []);

//   return (
//     <lineSegments geometry={geometry}>
//       <lineBasicMaterial color="#6ecbff" opacity={0.12} transparent />
//     </lineSegments>
//   );
// }

// /* -----------------------------
//    PARTICLES
// -------------------------------- */
// function ParticleSurge() {
//   const ref = useRef(null);

//   const geometry = useMemo(() => {
//     const count = 400;
//     const positions = new Float32Array(count * 3);
//     for (let i = 0; i < positions.length; i++) {
//       positions[i] = (Math.random() - 0.5) * 12;
//     }
//     const geo = new THREE.BufferGeometry();
//     geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     return geo;
//   }, []);

//   useFrame(({ clock }) => {
//     ref.current.rotation.y = clock.elapsedTime * 0.05;
//   });

//   return (
//     <points ref={ref} geometry={geometry}>
//       <pointsMaterial size={0.045} color="#c5ecff" />
//     </points>
//   );
// }

// /* -----------------------------
//    MAIN
// -------------------------------- */
// export function Shapes() {
//   return (
//     <div className="aspect-square md:col-span-1 md:col-start-2">
//       <Canvas
//         camera={{ position: [0, 0, 16], fov: 32 }}
//         dpr={[1, 1.25]}
//         gl={{ powerPreference: "high-performance", antialias: false }}
//       >
//         <Suspense fallback={null}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[5, 5, 10]} intensity={1.2} />

//           <NeuralVeins />
//           <ParticleSurge />
//           <AICoreDiamond />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }
