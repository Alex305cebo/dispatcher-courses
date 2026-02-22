"use client"

import { Canvas } from "@react-three/fiber"
import { ShaderPlane, EnergyRing } from "./background-paper-shaders"

interface ShaderBackgroundProps {
  color1?: string
  color2?: string
  className?: string
}

export function ShaderBackground({
  color1 = "#6366f1",
  color2 = "#8b5cf6",
  className = "",
}: ShaderBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ShaderPlane position={[0, 0, 0]} color1={color1} color2={color2} />
        <EnergyRing radius={2} position={[0, 0, -1]} />
      </Canvas>
    </div>
  )
}
