"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import BrainModel from "@/components/brain-model"
import LogoBrainModel from "@/components/logo-brain-model"
import NeuralBrainModel from "@/components/neural-brain-model"
import Navigation from "@/components/navigation"
import Loader from "@/components/loader"
import Sections from "@/components/sections"

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-navy-950 overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={["#0a1622"]} />
          <Suspense fallback={null}>
            {/*<BrainModel position={[-2.5, 0, 0]} scale={0.7} />*/}
            {/*<LogoBrainModel position={[2.5, 0, 0]} scale={1.2} />*/}
            <NeuralBrainModel position={[0, 0, 0]} scale={1} />
            <Environment preset="night" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full">
        <Navigation />
        <Sections />
      </div>

      {/* Loader */}
      <Loader />
    </main>
  )
}

