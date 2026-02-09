import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { WheatPlot as WheatPlotType } from '../../App'

interface WheatPlotProps {
  plot: WheatPlotType
  onPlant: (id: number) => void
  onHarvest: (id: number) => void
  onGrow: (id: number) => void
}

export function WheatPlot({ plot, onPlant, onHarvest, onGrow }: WheatPlotProps) {
  const [hovered, setHovered] = useState(false)
  const wheatRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (wheatRef.current && plot.stage > 0) {
      const t = state.clock.elapsedTime + plot.position[0]
      wheatRef.current.rotation.z = Math.sin(t * 2) * 0.05
    }
  })

  const handleClick = () => {
    if (plot.stage === 0) {
      onPlant(plot.id)
    } else if (plot.stage === 3) {
      onHarvest(plot.id)
    } else {
      onGrow(plot.id)
    }
  }

  const getPlotColor = () => {
    if (hovered) {
      if (plot.stage === 0) return '#6D4C41'
      if (plot.stage === 3) return '#FFD54F'
      return '#8BC34A'
    }
    return '#5D4037'
  }

  const getCursorStyle = () => {
    if (plot.stage === 0) return 'pointer'
    if (plot.stage === 3) return 'pointer'
    return 'pointer'
  }

  return (
    <group position={plot.position}>
      {/* Plot base */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.03, 0]}
        onClick={handleClick}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = getCursorStyle() }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
        receiveShadow
      >
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial color={getPlotColor()} />
      </mesh>

      {/* Soil rows */}
      {[-0.6, -0.2, 0.2, 0.6].map((z, i) => (
        <mesh key={i} position={[0, 0.04, z]} receiveShadow>
          <boxGeometry args={[1.6, 0.08, 0.25]} />
          <meshStandardMaterial color="#4E342E" />
        </mesh>
      ))}

      {/* Wheat growth stages */}
      {plot.stage > 0 && (
        <group ref={wheatRef}>
          {/* Stage 1: Seedlings */}
          {plot.stage >= 1 && (
            <>
              {[...Array(16)].map((_, i) => {
                const row = Math.floor(i / 4)
                const col = i % 4
                const x = -0.5 + col * 0.35
                const z = -0.6 + row * 0.4
                const height = plot.stage === 1 ? 0.15 : plot.stage === 2 ? 0.4 : 0.6
                const color = plot.stage === 3 ? '#FFD54F' : plot.stage === 2 ? '#8BC34A' : '#7CB342'

                return (
                  <group key={i} position={[x, 0.1, z]}>
                    {/* Stalk */}
                    <mesh castShadow>
                      <boxGeometry args={[0.03, height, 0.03]} />
                      <meshStandardMaterial color={color} />
                    </mesh>

                    {/* Wheat head (only at stage 2-3) */}
                    {plot.stage >= 2 && (
                      <mesh position={[0, height / 2 + 0.08, 0]} castShadow>
                        <boxGeometry args={[0.05, 0.15, 0.05]} />
                        <meshStandardMaterial color={plot.stage === 3 ? '#FFC107' : '#9CCC65'} />
                      </mesh>
                    )}

                    {/* Wheat bristles (only at stage 3) */}
                    {plot.stage === 3 && (
                      <>
                        <mesh position={[-0.03, height / 2 + 0.12, 0]} rotation={[0, 0, -0.3]} castShadow>
                          <boxGeometry args={[0.01, 0.08, 0.01]} />
                          <meshStandardMaterial color="#FFB300" />
                        </mesh>
                        <mesh position={[0.03, height / 2 + 0.12, 0]} rotation={[0, 0, 0.3]} castShadow>
                          <boxGeometry args={[0.01, 0.08, 0.01]} />
                          <meshStandardMaterial color="#FFB300" />
                        </mesh>
                      </>
                    )}
                  </group>
                )
              })}
            </>
          )}
        </group>
      )}

      {/* Hover indicator */}
      {hovered && (
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial
            color={plot.stage === 0 ? '#4CAF50' : plot.stage === 3 ? '#FFC107' : '#2196F3'}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Hover text indicator */}
      {hovered && (
        <sprite position={[0, 1.2, 0]} scale={[1.5, 0.4, 1]}>
          <spriteMaterial
            color={plot.stage === 0 ? '#4CAF50' : plot.stage === 3 ? '#FFC107' : '#2196F3'}
            transparent
            opacity={0.9}
          />
        </sprite>
      )}
    </group>
  )
}
