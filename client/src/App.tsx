import { useState } from 'react'
import GameWheel from './components/GameWheel.tsx'

function App() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const players = [
    { id: '1', username: 'You', avatar: 'https://avatars.githubusercontent.com/u/12345678', bet: 1.5, color: '#22ff88' },
    { id: '2', username: 'Player2', avatar: 'https://i.pravatar.cc/150?img=2', bet: 0.8, color: '#ff3366' },
    { id: '3', username: 'ProLega', avatar: 'https://i.pravatar.cc/150?img=3', bet: 0.3, color: '#4488ff' },
  ]

  const spinWheel = () => {
    setIsSpinning(true)
    const randomRotation = Math.floor(Math.random() * 3600) + 720
    setRotation(randomRotation)
    
    setTimeout(() => {
      setIsSpinning(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">ROYAL DUEL</h1>
        
        <GameWheel players={players} isSpinning={isSpinning} rotation={rotation} />
        
        <button
          onClick={spinWheel}
          className="mt-8 w-full bg-yellow-400 text-black font-bold py-4 rounded-2xl text-xl"
        >
          TEST SPIN
        </button>
      </div>
    </div>
  )
}

export default App
