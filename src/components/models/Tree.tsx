import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TreeProps {
  position?: [number, number, number]
  scale?: number
}

export function Tree({ position = [0, 0, 0], scale = 1 }: TreeProps) {
  const leavesRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.02
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.35, 2, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Leaves layers */}
      <group ref={leavesRef}>
        <mesh position={[0, 2.5, 0]} castShadow>
          <coneGeometry args={[1.5, 2, 6]} />
          <meshStandardMaterial color="#2E7D32" flatShading />
        </mesh>
        <mesh position={[0, 3.5, 0]} castShadow>
          <coneGeometry args={[1.2, 1.8, 6]} />
          <meshStandardMaterial color="#388E3C" flatShading />
        </mesh>
        <mesh position={[0, 4.3, 0]} castShadow>
          <coneGeometry args={[0.8, 1.4, 6]} />
          <meshStandardMaterial color="#43A047" flatShading />
        </mesh>
      </group>
    </group>
  )
}
