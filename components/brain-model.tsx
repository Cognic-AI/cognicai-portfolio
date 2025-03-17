"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Group, Mesh } from "three"

interface BrainModelProps {
  position?: [number, number, number]
  scale?: number
}

// Create a custom brain model with neural networks
export default function BrainModel({ position = [0, 0, 0], scale = 1 }: BrainModelProps) {
  const group = useRef<Group>(null)
  const brainRef = useRef<Mesh>(null)
  const neuralLines = useRef<THREE.Line[]>([])

  // Create brain mesh
  useEffect(() => {
    if (!group.current) return

    // Create brain shape
    const brainGeometry = new THREE.SphereGeometry(1.2, 32, 32)
    const brainMaterial = new THREE.MeshStandardMaterial({
      color: "#0a1622", // Dark navy from logo
      roughness: 0.2,
      metalness: 0.8,
    })

    const brain = new THREE.Mesh(brainGeometry, brainMaterial)
    brainRef.current = brain
    group.current.add(brain)

    // Create neural network lines
    const lineCount = 50
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#0088ff", // Bright blue from logo
      transparent: true,
      opacity: 0.6,
    })

    for (let i = 0; i < lineCount; i++) {
      const points = []
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      )
        .normalize()
        .multiplyScalar(1.2)

      points.push(startPoint)

      // Create 2-3 segments for each neural line
      const segments = Math.floor(Math.random() * 2) + 2
      for (let j = 0; j < segments; j++) {
        const nextPoint = new THREE.Vector3(
          startPoint.x + (Math.random() - 0.5) * 1.5,
          startPoint.y + (Math.random() - 0.5) * 1.5,
          startPoint.z + (Math.random() - 0.5) * 1.5,
        )
        points.push(nextPoint)
      }

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(lineGeometry, lineMaterial)
      neuralLines.current.push(line)
      group.current.add(line)
    }

    // Create neural nodes (small spheres at intersections)
    const nodeCount = 30
    const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16)
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: "#0088ff" }) // Bright blue from logo

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
      )
      node.position.copy(pos)
      group.current.add(node)
    }

    return () => {
      if (group.current) {
        while (group.current.children.length) {
          const object = group.current.children[0]
          group.current.remove(object)
        }
      }
    }
  }, [])

  // Animate neural network
  useFrame((state, delta) => {
    if (!group.current) return

    // Pulse effect for the brain
    if (brainRef.current) {
      brainRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      brainRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      brainRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }

    // Animate neural lines
    neuralLines.current.forEach((line, i) => {
      const material = line.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.3
    })

    // Subtle rotation
    group.current.rotation.y += delta * 0.05
  })

  return <group ref={group} position={[position[0], position[1], position[2]]} scale={scale} />
}

