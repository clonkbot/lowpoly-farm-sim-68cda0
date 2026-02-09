import * as THREE from 'three'

interface BarnProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function Barn({ position = [0, 0, 0], rotation = [0, 0, 0] }: BarnProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main structure */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 5]} />
        <meshStandardMaterial color="#8B2323" />
      </mesh>

      {/* White trim on sides */}
      <mesh position={[0, 1.5, 2.51]} castShadow>
        <boxGeometry args={[3.5, 2.5, 0.05]} />
        <meshStandardMaterial color="#FFF8DC" />
      </mesh>
      <mesh position={[0, 1.5, -2.51]} castShadow>
        <boxGeometry args={[3.5, 2.5, 0.05]} />
        <meshStandardMaterial color="#FFF8DC" />
      </mesh>

      {/* Roof - two sided */}
      <mesh position={[0, 3.4, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[3, 0.2, 5.4]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0, 3.4, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[3, 0.2, 5.4]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Roof front triangle */}
      <mesh position={[0, 3.4, 2.7]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[2.1, 0.1, 4]} />
        <meshStandardMaterial color="#8B2323" />
      </mesh>
      <mesh position={[0, 3.4, -2.7]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[2.1, 0.1, 4]} />
        <meshStandardMaterial color="#8B2323" />
      </mesh>

      {/* Door */}
      <mesh position={[0, 1, 2.52]} castShadow>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>

      {/* Door cross beams */}
      <mesh position={[0, 1, 2.58]}>
        <boxGeometry args={[1.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0, 1.5, 2.58]}>
        <boxGeometry args={[1.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0, 1, 2.58]}>
        <boxGeometry args={[0.1, 2, 0.05]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Windows */}
      <mesh position={[2.01, 2, 1]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[2.01, 2, -1]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-2.01, 2, 1]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-2.01, 2, -1]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>

      {/* Window frames */}
      {[[2.02, 2, 1], [2.02, 2, -1], [-2.02, 2, 1], [-2.02, 2, -1]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.9, 0.08, 0.05]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.08, 0.9, 0.05]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
        </group>
      ))}

      {/* Silo */}
      <mesh position={[3.5, 2, -1]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 4, 12]} />
        <meshStandardMaterial color="#9E9E9E" />
      </mesh>
      <mesh position={[3.5, 4.3, -1]} castShadow>
        <coneGeometry args={[1.1, 1, 12]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  )
}
