interface FenceProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function Fence({ position = [0, 0, 0], rotation = [0, 0, 0] }: FenceProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Posts */}
      <mesh position={[-0.8, 0.35, 0]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      <mesh position={[0.8, 0.35, 0]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>

      {/* Rails */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.7, 0.08, 0.06]} />
        <meshStandardMaterial color="#A1887F" />
      </mesh>
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.7, 0.08, 0.06]} />
        <meshStandardMaterial color="#A1887F" />
      </mesh>
    </group>
  )
}
