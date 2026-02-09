import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PigProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export function Pig({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: PigProps) {
  const tailRef = useRef<THREE.Mesh>(null!)
  const earsRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime + position[0]
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 5) * 0.4
    }
    if (earsRef.current) {
      earsRef.current.rotation.x = Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.7]} />
        <meshStandardMaterial color="#FFAB91" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.4, 0.4]} castShadow>
        <boxGeometry args={[0.4, 0.35, 0.35]} />
        <meshStandardMaterial color="#FFAB91" />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 0.35, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 8]} />
        <meshStandardMaterial color="#FF8A65" />
      </mesh>
      {/* Nostrils */}
      <mesh position={[-0.04, 0.35, 0.66]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0.04, 0.35, 0.66]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.12, 0.45, 0.55]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      <mesh position={[0.12, 0.45, 0.55]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#212121" />
      </mesh>

      {/* Ears */}
      <group ref={earsRef}>
        <mesh position={[-0.15, 0.55, 0.35]} rotation={[-0.5, 0, -0.3]} castShadow>
          <boxGeometry args={[0.15, 0.12, 0.05]} />
          <meshStandardMaterial color="#FF8A65" />
        </mesh>
        <mesh position={[0.15, 0.55, 0.35]} rotation={[-0.5, 0, 0.3]} castShadow>
          <boxGeometry args={[0.15, 0.12, 0.05]} />
          <meshStandardMaterial color="#FF8A65" />
        </mesh>
      </group>

      {/* Legs */}
      {[[-0.15, 0.12, 0.2], [0.15, 0.12, 0.2], [-0.15, 0.12, -0.2], [0.15, 0.12, -0.2]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.1, 0.24, 0.1]} />
          <meshStandardMaterial color="#FFAB91" />
        </mesh>
      ))}

      {/* Hooves */}
      {[[-0.15, 0.02, 0.2], [0.15, 0.02, 0.2], [-0.15, 0.02, -0.2], [0.15, 0.02, -0.2]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.11, 0.04, 0.11]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
      ))}

      {/* Curly tail */}
      <mesh ref={tailRef} position={[0, 0.4, -0.38]} rotation={[0.8, 0, 0]} castShadow>
        <torusGeometry args={[0.06, 0.02, 6, 12, Math.PI * 1.5]} />
        <meshStandardMaterial color="#FF8A65" />
      </mesh>
    </group>
  )
}
