import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CowProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export function Cow({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: CowProps) {
  const headRef = useRef<THREE.Group>(null!)
  const tailRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime + position[0]
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.1
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.05
    }
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 2) * 0.3
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.8, 0.7, 1.2]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>

      {/* Spots */}
      <mesh position={[0.35, 0.65, 0.2]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[-0.3, 0.7, -0.1]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[0.1, 0.5, 0.4]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.8, 0.7]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.45, 0.5]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        {/* Snout */}
        <mesh position={[0, -0.1, 0.25]} castShadow>
          <boxGeometry args={[0.35, 0.25, 0.15]} />
          <meshStandardMaterial color="#FFCCBC" />
        </mesh>
        {/* Nostrils */}
        <mesh position={[-0.08, -0.1, 0.33]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        <mesh position={[0.08, -0.1, 0.33]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.15, 0.05, 0.2]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.2]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, -0.5]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.08]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        <mesh position={[0.3, 0.1, 0]} rotation={[0, 0, 0.5]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.08]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        {/* Horns */}
        <mesh position={[-0.2, 0.25, -0.05]} rotation={[0.3, 0, -0.3]} castShadow>
          <coneGeometry args={[0.04, 0.2, 6]} />
          <meshStandardMaterial color="#FFECB3" />
        </mesh>
        <mesh position={[0.2, 0.25, -0.05]} rotation={[0.3, 0, 0.3]} castShadow>
          <coneGeometry args={[0.04, 0.2, 6]} />
          <meshStandardMaterial color="#FFECB3" />
        </mesh>
      </group>

      {/* Legs */}
      {[[-0.25, 0.2, 0.35], [0.25, 0.2, 0.35], [-0.25, 0.2, -0.35], [0.25, 0.2, -0.35]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.15]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
      ))}

      {/* Hooves */}
      {[[-0.25, 0.03, 0.35], [0.25, 0.03, 0.35], [-0.25, 0.03, -0.35], [0.25, 0.03, -0.35]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.16, 0.06, 0.16]} />
          <meshStandardMaterial color="#3E2723" />
        </mesh>
      ))}

      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0.7, -0.65]} rotation={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      {/* Tail tuft */}
      <mesh position={[0, 0.45, -0.8]} castShadow>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Udder */}
      <mesh position={[0, 0.25, -0.2]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#FFCCBC" />
      </mesh>
    </group>
  )
}
