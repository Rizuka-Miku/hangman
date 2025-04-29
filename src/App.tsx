import { useState } from 'react'
import Hangman from './components/Hangman'
import { songs } from './constants'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div data-theme='valentine' className='w-screen h-screen flex justify-center items-center bg-pink-900'>
      {!started ? (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-[#fff089]">💖 Teka Teki Wota 💖</h1>
          {/* <h1 className="text-4xl font-bold text-pink-700">🎀 Teka Teki Wota 🎀</h1> */}
          <p className="text-lg text-[#fff089]">Mari kita lihat seberapa tahukah kalian tentang JKT48</p>
          <button 
            onClick={() => setStarted(true)}
            className="btn btn-primary btn-lg"
          >
            Start Game
          </button>
        </div>
      ) : (
        <Hangman words={songs} />
      )}
    </div>
  )
}

export default App
