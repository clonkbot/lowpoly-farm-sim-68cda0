import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { WheatPlot as WheatPlotType } from '../App'
import { Barn } from './models/Barn'
import { Tree } from './models/Tree'
import { Cow } from './models/Cow'
import { Chicken } from './models/Chicken'
import { Pig } from './models/Pig'
import { WheatPlot } from './models/WheatPlot'
import { Fence } from './models/Fence'

interface FarmProps {
  plots: WheatPlotType[]
  onPlant: (id: number) => void
  onHarvest: (id: number) => void
  onGrow: (id: number) => void
}

export function Farm({ plots, onPlant, onHarvest, onGrow }: FarmProps) {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#7CB342" />
      </mesh>

      {/* Dirt path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.01, 0]} receiveShadow>
        <planeGeometry args={[3, 20]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>

      {/* Field area (darker soil) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4, 0.02, 4]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Barn */}
      <Barn position={[6, 0, -4]} rotation={[0, -Math.PI / 4, 0]} />

      {/* Trees */}
      <Tree position={[-10, 0, -8]} scale={1.2} />
      <Tree position={[-12, 0, -5]} scale={0.9} />
      <Tree position={[-8, 0, -10]} scale={1} />
      <Tree position={[10, 0, -10]} scale={1.1} />
      <Tree position={[12, 0, -7]} scale={0.8} />
      <Tree position={[-10, 0, 10]} scale={1.3} />
      <Tree position={[10, 0, 8]} scale={1} />
      <Tree position={[8, 0, 12]} scale={0.95} />

      {/* Fences around animal area */}
      <Fence position={[4, 0, 4]} rotation={[0, 0, 0]} />
      <Fence position={[6, 0, 4]} rotation={[0, 0, 0]} />
      <Fence position={[8, 0, 4]} rotation={[0, 0, 0]} />
      <Fence position={[10, 0, 4]} rotation={[0, 0, 0]} />
      <Fence position={[11, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
      <Fence position={[11, 0, 7]} rotation={[0, Math.PI / 2, 0]} />
      <Fence position={[4, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
      <Fence position={[4, 0, 7]} rotation={[0, Math.PI / 2, 0]} />
      <Fence position={[4, 0, 8]} rotation={[0, 0, 0]} />
      <Fence position={[6, 0, 8]} rotation={[0, 0, 0]} />
      <Fence position={[8, 0, 8]} rotation={[0, 0, 0]} />
      <Fence position={[10, 0, 8]} rotation={[0, 0, 0]} />

      {/* Animals */}
      <Float speed={0.5} rotationIntensity={0} floatIntensity={0.1}>
        <Cow position={[6, 0, 6]} rotation={[0, Math.PI / 3, 0]} />
      </Float>
      <Float speed={0.7} rotationIntensity={0} floatIntensity={0.1}>
        <Cow position={[9, 0, 5.5]} rotation={[0, -Math.PI / 4, 0]} scale={0.9} />
      </Float>
      <Pig position={[5, 0, 7]} rotation={[0, Math.PI / 6, 0]} />
      <Pig position={[8, 0, 7]} rotation={[0, -Math.PI / 3, 0]} scale={0.85} />
      <Chicken position={[7, 0, 5]} />
      <Chicken position={[5.5, 0, 5.5]} rotation={[0, Math.PI / 2, 0]} />
      <Chicken position={[9.5, 0, 6.5]} rotation={[0, -Math.PI / 4, 0]} />

      {/* Wheat plots */}
      {plots.map(plot => (
        <WheatPlot
          key={plot.id}
          plot={plot}
          onPlant={onPlant}
          onHarvest={onHarvest}
          onGrow={onGrow}
        />
      ))}

      {/* Water trough */}
      <mesh position={[10.5, 0.25, 6]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.5, 1.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[10.5, 0.28, 6]}>
        <boxGeometry args={[0.4, 0.1, 1.4]} />
        <meshStandardMaterial color="#4FC3F7" transparent opacity={0.8} />
      </mesh>

      {/* Hay bales near barn */}
      <mesh position={[8.5, 0.4, -3]} rotation={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.8, 8]} />
        <meshStandardMaterial color="#D4A574" />
      </mesh>
      <mesh position={[9.5, 0.4, -2.5]} rotation={[Math.PI / 2, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.7, 8]} />
        <meshStandardMaterial color="#C4956A" />
      </mesh>
    </group>
  )
}
