import { useState, useEffect } from 'react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface Word {
    title: string;
    hint: string[];
  }

interface HangmanProps {
    words: Word[];
}


const Hangman = ({words}: HangmanProps) => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<number>(0);
    const MAX_WRONG = 6;


    useEffect(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setWord(randomWord.title.toUpperCase())
    },[words])

    const handleGuess = (letter: string) => {
      if(guessedLetters.includes(letter)) return;

      setGuessedLetters(prev => [...prev,letter])

      if(!word.includes(letter)) {
        setWrongGuesses(prev => prev + 1)
      }
    }


    const renderWord = () => {
      return word.split('').map((char,index) => {
        if(char === ' ') {
          return <span key={index} className='mx-1'> </span>
        }

        return (
          <span key={index} className='border-b-2 border-gray-500 mx-1 w-6 text-center inline-block'>
            {guessedLetters.includes(char) ? char : ''}
          </span>
        )
      })
    }

    const isWinner = word.split('').every(
      (char) => char === ' ' || guessedLetters.includes(char)
    )

    const isGameOver = wrongGuesses >= MAX_WRONG


  return (
    <div className='flex flex-col items-center space-y-6 p-4'>
      <h1 className='text-3xl font-bold'>Try Out Sabung Wota</h1>

      <div className='text-2xl'>
        {renderWord()}
      </div>

      <div className='grid grid-cols-6 gap-2 mt-4'>
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            className='btn btn-sm'
            disabled={guessedLetters.includes(letter) || isGameOver || isWinner}
            >
              {letter}
            </button>
        ))}
      </div>
      <div className="mt-4">
        <p>Wrong guesses: {wrongGuesses}/{MAX_WRONG}</p>
      </div>


      {isWinner && <p className="text-green-500 text-2xl mt-4">You Win! 🎉</p>}
      {isGameOver && <p className="text-red-500 text-2xl mt-4">Game Over! The word was {word}</p>}
    </div>
  )
}

export default Hangman