import { useState } from 'react'
import Hangman from './components/Hangman'
import { songs } from './constants'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div data-theme='valentine' className='w-screen min-h-screen flex justify-center items-center bg-pink-900 relative p-4'>
      {/* Top-right logo */}
      <img 
        src="logo-miku.png" 
        alt="Logo Miku" 
        className="absolute top-2 right-2 w-24 sm:w-36 md:w-[150px] h-auto"
      />

      {!started ? (
        <div className="text-center space-y-4 sm:space-y-6 max-w-sm sm:max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#fff089]">💖 Teka Teki Wota 💖</h1>
          <p className="text-base sm:text-lg text-[#fff089]">Mari kita lihat seberapa tahukah kalian tentang JKT48</p>
          <button 
            onClick={() => setStarted(true)}
            className="btn btn-primary btn-md sm:btn-lg w-full"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          <Hangman words={songs} />
        </div>
      )}
    </div>
  )
}

export default App
