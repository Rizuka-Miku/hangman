import Hangman from './components/Hangman'
import { songs } from './constants'
function App() {

  return (
    <div data-theme='valentine' className='w-screen h-screen flex justify-center items-center'>
      <Hangman words={songs} />
    </div>
  )
}

export default App
