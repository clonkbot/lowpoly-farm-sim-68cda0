import { useState } from 'react'

interface GameUIProps {
  wheat: number
  harvested: number
}

export function GameUI({ wheat, harvested }: GameUIProps) {
  const [showHelp, setShowHelp] = useState(true)

  return (
    <>
      {/* Top Stats Bar */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex justify-between items-start pointer-events-none">
        {/* Wheat Counter */}
        <div className="pointer-events-auto">
          <div
            className="bg-amber-50/90 backdrop-blur-md rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-lg border-2 border-amber-200/50"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-inner">
                  <span className="text-xl md:text-2xl">🌾</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow">
                  {wheat > 99 ? '99+' : wheat}
                </div>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-amber-600/70 uppercase tracking-wider font-medium">Seeds</p>
                <p className="text-xl md:text-2xl font-bold text-amber-800">{wheat}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Harvest Counter */}
        <div className="pointer-events-auto">
          <div
            className="bg-emerald-50/90 backdrop-blur-md rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-lg border-2 border-emerald-200/50"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
                <span className="text-xl md:text-2xl">🌻</span>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-emerald-600/70 uppercase tracking-wider font-medium">Harvested</p>
                <p className="text-xl md:text-2xl font-bold text-emerald-800">{harvested}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div
          className="absolute bottom-12 md:bottom-16 left-4 md:left-6 max-w-xs md:max-w-sm pointer-events-auto animate-fade-in"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-xl border-2 border-amber-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base md:text-lg font-bold text-amber-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                🌾 How to Farm
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-600 transition-colors text-sm md:text-base"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-amber-900/80">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-amber-100 rounded-full flex items-center justify-center text-[10px] md:text-xs flex-shrink-0">1</span>
                <span>Click empty plot to <b>plant</b> wheat (costs 1 seed)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-amber-100 rounded-full flex items-center justify-center text-[10px] md:text-xs flex-shrink-0">2</span>
                <span>Click growing wheat to <b>water</b> it (speeds growth)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-amber-100 rounded-full flex items-center justify-center text-[10px] md:text-xs flex-shrink-0">3</span>
                <span>Click golden wheat to <b>harvest</b> (+3 seeds)</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-amber-100">
              <p className="text-[10px] md:text-xs text-amber-600/70 italic">Drag to rotate · Scroll to zoom</p>
            </div>
          </div>
        </div>
      )}

      {/* Reopen Help Button */}
      {!showHelp && (
        <button
          onClick={() => setShowHelp(true)}
          className="absolute bottom-12 md:bottom-16 left-4 md:left-6 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border-2 border-amber-100 flex items-center justify-center text-lg md:text-xl hover:scale-110 transition-transform pointer-events-auto"
        >
          ❓
        </button>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
