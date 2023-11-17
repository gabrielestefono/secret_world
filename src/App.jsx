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
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordslist);

  const StartGame = () => {
    setGameStage(stages[1].name);
  }
  
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen StartGame={StartGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
