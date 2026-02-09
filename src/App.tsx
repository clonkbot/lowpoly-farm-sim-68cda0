import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Cloud, Float } from '@react-three/drei'
import { Suspense, useState, useCallback } from 'react'
import { Farm } from './components/Farm'
import { GameUI } from './components/GameUI'

export interface WheatPlot {
  id: number
  position: [number, number, number]
  stage: 0 | 1 | 2 | 3 // 0=empty, 1=seedling, 2=growing, 3=ready
  plantedAt: number | null
}

function App() {
  const [wheat, setWheat] = useState(10)
  const [harvested, setHarvested] = useState(0)
  const [plots, setPlots] = useState<WheatPlot[]>([
    { id: 1, position: [-6, 0, 2], stage: 0, plantedAt: null },
    { id: 2, position: [-4, 0, 2], stage: 0, plantedAt: null },
    { id: 3, position: [-2, 0, 2], stage: 0, plantedAt: null },
    { id: 4, position: [-6, 0, 4], stage: 0, plantedAt: null },
    { id: 5, position: [-4, 0, 4], stage: 0, plantedAt: null },
    { id: 6, position: [-2, 0, 4], stage: 0, plantedAt: null },
    { id: 7, position: [-6, 0, 6], stage: 0, plantedAt: null },
    { id: 8, position: [-4, 0, 6], stage: 0, plantedAt: null },
    { id: 9, position: [-2, 0, 6], stage: 0, plantedAt: null },
  ])

  const plantWheat = useCallback((plotId: number) => {
    if (wheat <= 0) return
    setPlots(prev => prev.map(plot => {
      if (plot.id === plotId && plot.stage === 0) {
        setWheat(w => w - 1)
        return { ...plot, stage: 1 as const, plantedAt: Date.now() }
      }
      return plot
    }))
  }, [wheat])

  const harvestWheat = useCallback((plotId: number) => {
    setPlots(prev => prev.map(plot => {
      if (plot.id === plotId && plot.stage === 3) {
        setWheat(w => w + 3)
        setHarvested(h => h + 1)
        return { ...plot, stage: 0 as const, plantedAt: null }
      }
      return plot
    }))
  }, [])

  const growWheat = useCallback((plotId: number) => {
    setPlots(prev => prev.map(plot => {
      if (plot.id === plotId && plot.stage > 0 && plot.stage < 3) {
        return { ...plot, stage: (plot.stage + 1) as 1 | 2 | 3 }
      }
      return plot
    }))
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B4D7E8 100%)' }}>
      <Canvas
        shadows
        camera={{ position: [15, 12, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Sky
            distance={450000}
            sunPosition={[100, 50, 100]}
            inclination={0.6}
            azimuth={0.25}
            rayleigh={0.5}
          />
          <Cloud position={[-20, 15, -10]} speed={0.2} opacity={0.6} />
          <Cloud position={[20, 18, 5]} speed={0.3} opacity={0.5} />
          <Cloud position={[0, 16, -20]} speed={0.25} opacity={0.4} />

          <ambientLight intensity={0.6} color="#FFF5E6" />
          <directionalLight
            position={[10, 15, 5]}
            intensity={1.2}
            color="#FFE4B5"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <hemisphereLight args={['#87CEEB', '#8B7355', 0.3]} />

          <Farm
            plots={plots}
            onPlant={plantWheat}
            onHarvest={harvestWheat}
            onGrow={growWheat}
          />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={8}
            maxDistance={35}
            target={[0, 0, 2]}
          />
        </Suspense>
      </Canvas>

      <GameUI wheat={wheat} harvested={harvested} />

      {/* Footer */}
      <footer className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] md:text-xs text-amber-900/40 font-medium tracking-wide" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Requested by @vladyy__01 · Built by @clonkbot
        </p>
      </footer>
    </div>
  )
}

export default App
