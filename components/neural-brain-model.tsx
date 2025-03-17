"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface NeuralBrainModelProps {
  position?: [number, number, number]
  scale?: number
}

export default function NeuralBrainModel({ position = [0, 0, 0], scale = 1 }: NeuralBrainModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Generate nodes and connections for the brain
  const { nodes, connections } = useMemo(() => {
    const nodeCount = 200
    const nodesData = []
    const connectionsData = []

    // Create brain shape using parametric equations
    for (let i = 0; i < nodeCount; i++) {
      // Parametric equations for a brain-like shape
      const t = Math.random() * Math.PI * 2
      const s = Math.random() * Math.PI

      // Base sphere
      let x = 1.5 * Math.sin(s) * Math.cos(t)
      const y = 1.5 * Math.sin(s) * Math.sin(t)
      let z = 1.5 * Math.cos(s)

      // Add some asymmetry and brain-like features
      x += Math.sin(y * 3) * 0.2
      z += Math.cos(x * 2) * 0.2

      // Split into two hemispheres
      if (x > 0) x += 0.2
      if (x < 0) x -= 0.2

      // Assign each node to a cluster for sequential glowing
      const cluster = Math.floor(Math.random() * 5)

      nodesData.push({
        position: [x, y, z],
        cluster,
        pulseSpeed: Math.random() * 0.5 + 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const p1 = new THREE.Vector3(...nodesData[i].position)
        const p2 = new THREE.Vector3(...nodesData[j].position)

        const distance = p1.distanceTo(p2)

        if (distance < 0.8) {
          connectionsData.push({
            from: i,
            to: j,
            distance,
            speed: Math.random() * 0.5 + 0.5,
            offset: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    return { nodes: nodesData, connections: connectionsData }
  }, [])

  // Animate the brain
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <GlowingNode
          key={`node-${index}`}
          position={node.position}
          cluster={node.cluster}
          pulseSpeed={node.pulseSpeed}
          pulsePhase={node.pulsePhase}
          hovered={hovered}
        />
      ))}

      {/* Render connections */}
      {connections.map((connection, index) => (
        <SignalConnection
          key={`connection-${index}`}
          fromNode={nodes[connection.from]}
          toNode={nodes[connection.to]}
          speed={connection.speed}
          offset={connection.offset}
          opacity={1 - connection.distance}
          hovered={hovered}
        />
      ))}

      {/* Brain core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#000814" roughness={0.2} metalness={0.8} transparent opacity={0.1} />
      </mesh>

      {/* Pulsing light in the center */}
      <PointLight position={[0, 0, 0]} color="#1e40af" intensity={hovered ? 2 : 1} />
    </group>
  )
}

interface GlowingNodeProps {
  position: [number, number, number]
  cluster: number
  pulseSpeed: number
  pulsePhase: number
  hovered: boolean
}

function GlowingNode({ position, cluster, pulseSpeed, pulsePhase, hovered }: GlowingNodeProps) {
  const ref = useRef<THREE.Mesh>(null)

  // Colors in blue range
  const colors = [
    "#60a5fa", // Light blue
    "#3b82f6", // Medium blue
    "#2563eb", // Blue
    "#1d4ed8", // Medium dark blue
    "#1e40af", // Dark blue
  ]

  const color = colors[cluster]

  useFrame((state) => {
    if (ref.current) {
      // Calculate time-based glow for this specific cluster
      const clusterTime = state.clock.elapsedTime * 0.5 + cluster * 1.5
      const clusterPulse = (Math.sin(clusterTime) * 0.5 + 0.5) * 2

      // Individual node variation
      const individualPulse = Math.sin(state.clock.elapsedTime * pulseSpeed + pulsePhase) * 0.3 + 0.7

      // Combine for final effect
      const finalIntensity = clusterPulse * individualPulse * (hovered ? 1.5 : 1)

      const material = ref.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = finalIntensity

      // Subtle size pulsing
      const scale = 1 + individualPulse * 0.3
      ref.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  )
}

interface SignalConnectionProps {
  fromNode: { position: [number, number, number] }
  toNode: { position: [number, number, number] }
  speed: number
  offset: number
  opacity: number
  hovered: boolean
}

function SignalConnection({ fromNode, toNode, speed, offset, opacity, hovered }: SignalConnectionProps) {
  const ref = useRef<THREE.Mesh>(null)

  const curve = useMemo(() => {
    return new THREE.LineCurve3(new THREE.Vector3(...fromNode.position), new THREE.Vector3(...toNode.position))
  }, [fromNode.position, toNode.position])

  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.ShaderMaterial
      material.uniforms.dashOffset.value = -state.clock.elapsedTime * speed - offset

      // Adjust intensity based on the connected nodes' clusters
      const fromPulse = Math.sin(state.clock.elapsedTime * 0.5 + fromNode.cluster * 1.5) * 0.5 + 0.5
      const toPulse = Math.sin(state.clock.elapsedTime * 0.5 + toNode.cluster * 1.5) * 0.5 + 0.5

      // Average the pulse values
      const avgPulse = (fromPulse + toPulse) / 2

      material.uniforms.signalIntensity.value = avgPulse * (hovered ? 1.5 : 1)
    }
  })

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 64, 0.01, 8, false]} />
      <shaderMaterial
        transparent
        uniforms={{
          color: { value: new THREE.Color("#3b82f6") },
          signalColor: { value: new THREE.Color("#60a5fa") },
          dashSize: { value: 0.1 },
          gapSize: { value: 0.1 },
          dashOffset: { value: 0 },
          signalIntensity: { value: 1.0 },
          opacity: { value: opacity * 0.5 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform vec3 signalColor;
          uniform float dashSize;
          uniform float gapSize;
          uniform float dashOffset;
          uniform float signalIntensity;
          uniform float opacity;
          varying vec2 vUv;
          void main() {
            float totalSize = dashSize + gapSize;
            float modulo = mod(vUv.x + dashOffset, totalSize);
            if (modulo > dashSize) {
              gl_FragColor = vec4(color, opacity * 0.3);
            } else {
              // Signal pulse effect
              float signalPulse = smoothstep(0.0, dashSize * 0.5, modulo) * 
                                 (1.0 - smoothstep(dashSize * 0.5, dashSize, modulo));
              vec3 finalColor = mix(color, signalColor, signalPulse * signalIntensity);
              gl_FragColor = vec4(finalColor, opacity * (0.3 + signalPulse * 0.7));
            }
          }
        `}
      />
    </mesh>
  )
}

interface PointLightProps {
  position: [number, number, number]
  color: string
  intensity: number
}

function PointLight({ position, color, intensity }: PointLightProps) {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = (Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5) * intensity + 0.5
    }
  })

  return <pointLight ref={lightRef} position={position} color={color} intensity={intensity} distance={6} />
}

