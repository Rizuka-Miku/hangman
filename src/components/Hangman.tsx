import { useState, useEffect } from 'react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface Word {
  title: string;
  hint: string[];
}

interface HangmanProps {
  words: Word[];
}

const Hangman = ({ words }: HangmanProps) => {
  const [word, setWord] = useState('');
  const [hintList, setHintList] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const MAX_WRONG = 6;

  useEffect(() => {
    const random = words[Math.floor(Math.random() * words.length)];
    setWord(random.title.toUpperCase());
    setHintList(random.hint);
    setCurrentHint(null); // reset hint when new game starts
  }, [words]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters(prev => [...prev, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  const resetGame = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    setWord(random.title.toUpperCase());
    setHintList(random.hint);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setCurrentHint(null);
  };

  const showHint = () => {
    if (hintList.length > 0) {
      const randomHint = hintList[Math.floor(Math.random() * hintList.length)];
      setCurrentHint(randomHint);
    }
  };

  const renderWord = () => {
    return word.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index} className='mx-1'> </span>
      }

      return (
        <span key={index} className='border-b-2 border-gray-500 mx-1 w-6 text-center inline-block'>
          {guessedLetters.includes(char) ? char : ''}
        </span>
      )
    });
  };

  const isWinner = word.split('').every(
    (char) => char === ' ' || guessedLetters.includes(char)
  );

  const isGameOver = wrongGuesses >= MAX_WRONG;

  return (
    <div className='flex flex-col items-center space-y-6 p-6 w-[90%] max-w-4xl border-4 border-pink-500 rounded-2xl shadow-lg bg-white/70'>
      <div className='flex justify-around w-full items-center'>
        <div className="mt-4 min-w-[50%]">
          <p className="text-center text-2xl">
            {Array.from({ length: MAX_WRONG - wrongGuesses }).map((_, i) => (
              <span key={i}>💖 </span>
            ))}
          </p>
          <img src={`miku-0${wrongGuesses + 1}.png`} width={300} />
        </div>

        <div>
          <div className='text-2xl'>
            {renderWord()}
          </div>

          {currentHint && (
            <div className="mt-2 p-2 bg-pink-100 border border-pink-400 rounded-md text-center text-sm max-w-xs mx-auto">
              💡 Hint: {currentHint}
            </div>
          )}

          <div className='mt-4 flex justify-center gap-2'>
            <button onClick={showHint} className='btn btn-soft btn-secondary btn-sm'>Show Hint</button>
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
        </div>
      </div>

      {isWinner && (
        <dialog open className="modal">
          <div className="modal-box text-center">
            <h2 className="font-bold text-3xl text-pink-500 mb-4">You Win! 🎉</h2>
            <p className="mb-4">Ternyata kamu cukup berwawasan~💖</p>
            <div className="modal-action justify-center">
              <button className="btn btn-primary" onClick={resetGame}>Play Again</button>
            </div>
          </div>
        </dialog>
      )}

      {isGameOver && (
        <dialog open className="modal">
          <div className="modal-box text-center">
            <h2 className="font-bold text-3xl text-red-500 mb-4">Game Over 💔</h2>
            <p className="mb-2">Jawabannya adalah: <span className="font-semibold">{word}</span></p>
            <p className="mb-4">Ternyata hanya segitu saja kemampuanmu anak muda!!!</p>
            <div className="modal-action justify-center">
              <button className="btn btn-primary" onClick={resetGame}>Try Again</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Hangman;
