import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ChickenProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function Chicken({ position = [0, 0, 0], rotation = [0, 0, 0] }: ChickenProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime + position[0] * 2
    if (groupRef.current) {
      // Pecking motion
      groupRef.current.position.y = Math.abs(Math.sin(t * 3)) * 0.02
    }
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 4) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.4, 0.15]}>
        <mesh castShadow>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        {/* Comb */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.03, 0.1, 0.12]} />
          <meshStandardMaterial color="#D32F2F" />
        </mesh>
        {/* Beak */}
        <mesh position={[0, -0.02, 0.12]} rotation={[-0.3, 0, 0]} castShadow>
          <coneGeometry args={[0.04, 0.1, 4]} />
          <meshStandardMaterial color="#FF8F00" />
        </mesh>
        {/* Wattle */}
        <mesh position={[0, -0.08, 0.08]} castShadow>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial color="#D32F2F" />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.08, 0.02, 0.08]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
        <mesh position={[0.08, 0.02, 0.08]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
      </group>

      {/* Wings */}
      <mesh position={[-0.18, 0.25, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.05, 0.15, 0.2]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>
      <mesh position={[0.18, 0.25, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.05, 0.15, 0.2]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0.3, -0.2]} rotation={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.05]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, 0.08, 0]} castShadow>
        <boxGeometry args={[0.03, 0.16, 0.03]} />
        <meshStandardMaterial color="#FF8F00" />
      </mesh>
      <mesh position={[0.08, 0.08, 0]} castShadow>
        <boxGeometry args={[0.03, 0.16, 0.03]} />
        <meshStandardMaterial color="#FF8F00" />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.08, 0.01, 0.02]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.08]} />
        <meshStandardMaterial color="#FF8F00" />
      </mesh>
      <mesh position={[0.08, 0.01, 0.02]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.08]} />
        <meshStandardMaterial color="#FF8F00" />
      </mesh>
    </group>
  )
}
