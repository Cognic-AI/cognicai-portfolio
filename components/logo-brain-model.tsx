"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Group } from "three"

interface LogoBrainModelProps {
  position?: [number, number, number]
  scale?: number
}

export default function LogoBrainModel({ position = [0, 0, 0], scale = 1 }: LogoBrainModelProps) {
  const group = useRef<Group>(null)
  const linesRef = useRef<THREE.Line[]>([])

  // Create brain mesh based on the logo design
  useEffect(() => {
    if (!group.current) return

    // Clear any existing children
    while (group.current.children.length) {
      group.current.remove(group.current.children[0])
    }

    // Create the concentric curved lines that form the brain in the logo
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#0088ff", // Bright blue from the logo
      transparent: true,
      opacity: 0.8,
      linewidth: 2,
    })

    const lines: THREE.Line[] = []
    const totalLines = 10

    // Create concentric curved lines
    for (let i = 0; i < totalLines; i++) {
      const curve = new THREE.EllipseCurve(
        0,
        0, // Center x, y
        1.2 - i * 0.08, // xRadius
        1.2 - i * 0.08, // yRadius
        Math.PI * 0.1, // startAngle
        Math.PI * 0.9, // endAngle
        false, // clockwise
        0, // rotation
      )

      // Adjust the curve to match the logo's brain shape
      const points = curve.getPoints(50)

      // Modify points to create the brain shape
      for (let j = 0; j < points.length; j++) {
        // Adjust y position to create the curved brain shape
        const progress = j / points.length
        const yOffset = Math.sin(progress * Math.PI) * 0.2
        points[j].y -= yOffset

        // Add some variation to x based on the line index
        if (i > 3) {
          const xShrink = (i - 3) * 0.05
          points[j].x *= 1 - xShrink * progress
        }
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial.clone())

      // Rotate and position to match the logo orientation
      line.rotation.z = Math.PI * 0.2
      line.position.y = -0.2

      lines.push(line)
      group.current.add(line)
    }

    linesRef.current = lines

    return () => {
      if (group.current) {
        while (group.current.children.length) {
          const object = group.current.children[0]
          group.current.remove(object)
        }
      }
    }
  }, [])

  // Animate the brain lines
  useFrame((state) => {
    if (!group.current) return

    // Subtle pulsing animation
    linesRef.current.forEach((line, i) => {
      const material = line.material as THREE.LineBasicMaterial
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.4
    })

    // Subtle rotation
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  return <group ref={group} position={[position[0], position[1], position[2]]} scale={scale} rotation={[0, 0, 0]} />
}

