//CSS
import './App.css';
// React
import { useCallback, useEffect, useState } from 'react';
// Importação dados
import {wordslist} from './data/words'; 
// Componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id:2, name: 'game'},
  {id:3, name: 'end'}
];

function App() {
  const guessesNumber = 3;

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordslist);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesNumber);
  const [score, setScore] = useState(0);
  
  const pickWordAndCategory = () => {
    // Pick a random Category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return {word, category};
  }

  const StartGame = () => {
    // Pick Word and Pick Gategory
    const {word, category} = pickWordAndCategory();

    // Create a array from the word
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // Fill States
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    
    setGameStage(stages[1].name);
  }
  
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();
    
    // Check if letter has already been utilized;
    if(guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)){
      return;
    }

    // push guessed letter or remove a chance
    if(letters.includes(normalizeLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter
      ]);
    }else{
      setGuesses(guesses - 1);
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter
      ]);
    }
    // setGameStage(stages[2].name);
  }

  const clearLetterStates = () =>{
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(()=>{
    if(guesses <= 0){
      // reset all state
      setGameStage(stages[2].name);
      clearLetterStates();
    }
  },[guesses])

  const retry = () => {
    setScore(0);
    setGuesses(guessesNumber);
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen StartGame={StartGame}/>}
      {gameStage === 'game' && 
      <Game verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
