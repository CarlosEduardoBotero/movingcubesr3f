import React, { Fragment, useRef, useState, Suspense } from 'react';
import './App.css';
import { useSpring, animated, config } from '@react-spring/three';
import { Canvas, useFrame } from '@react-three/fiber';
import { AmbientLight } from 'three';
import {
  OrbitControls,
  ContactShadows,
  softShadows,
  Html,
  Environment,
  Text,
} from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

softShadows({
  frustum: 3.75, // Frustum width (default: 3.75) must be a float
  size: 0.005, // World size (default: 0.005) must be a float
  near: 9.5, // Near plane (default: 9.5) must be a float
  samples: 17, // Samples (default: 17) must be a int
  rings: 11, // Rings (default: 11) must be a int
});



function Scene() {
  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
      <Text
        children={'we connect dev'}
        color='red'
        position={[0, 0.1, 0]}
        rotation={[Math.PI / 2, 3.15, 3.15]}
      />
    </Suspense>
  );
}

function App() {
  return (
    <Fragment>
      <Canvas camera={{ position: [0, 0, -25], fov: 15 }}>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          // autoRotate
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
        />
        <directionalLight castShadow position={[0, 1, 0]} intensity={1.5} />
        <ambientLight intensity={0.1} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -1.5, 0]}
          opacity={1}
          width={20}
          height={20}
          blur={1.3}
          far={6.5}
        />

        <mesh position={[2, 0, 0]}>
          <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
          <meshBasicMaterial
            transparent
            opacity={0.5}
            color='#60a0ff'
            toneMapped={false}
          />
          <Text
            position={[0.51, 0, 0.02]}
            rotation-y={Math.PI / 2}
            fontSize={0.05}
            lineHeight={1.2}
            font='https://fonts.gstatic.com/s/pressstart2p/v9/e3t4euO8T-267oIAQAu6jDQyK0nR.woff'
            children={`ARC4G\nx PMNDRS\n........`}
            color='#050505'
          />
        </mesh>
        <Suspense fallback={null}>
          <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <Scene />
          </mesh>
        </Suspense>
      </Canvas>
    </Fragment>
  );
}

export default App;
