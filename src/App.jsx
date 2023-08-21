import { useState } from 'react';
import Player from './components/Player/Player';
import styles from './App.scss';
import Dice from './components/Dice/Dice';
import Player2 from './components/Player/Player2'; 

function App() {
  const [diceValue, setDiceValue] = useState(0);
  const [playerRoll, setPlayerRoll] = useState(0);
  const [player2Roll, setPlayer2Roll] = useState(0);
  const [computerRoll, setComputerRoll] = useState(0);
  const [gameMode, setGameMode] = useState('PvC'); 
  const [playerTurn, setPlayerTurn] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [computerScore, setComputerScore] = useState(0);


  const handlePlayerRoll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setPlayerRoll(roll);
    setDiceValue(roll);
    setPlayerScore(prevScore => prevScore + roll);
    
    if (gameMode === 'PvC') {
      handleComputerRoll();
    } else {
      setPlayerTurn(2);
    }
  }
  
  const handlePlayer2Roll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setPlayer2Roll(roll);
    setDiceValue(roll);
    setPlayer2Score(prevScore => prevScore + roll); 
    setPlayerTurn(1);
  }
  
  const handleComputerRoll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setComputerRoll(roll);
    setDiceValue(roll);
    setComputerScore(prevScore => prevScore + roll); 
  }
  


  return (
    <div className={styles.app}>
      <h1>Dice Game</h1>
      <button onClick={() => setGameMode(prevMode => (prevMode === 'PvC' ? 'PvP' : 'PvC'))}>
        Toggle Game Mode
      </button>

      <div className={styles.gameArea}>
      
  {gameMode === 'PvC' ? (
    <>
      <Player name={`Player (Score: ${playerScore})`} rollValue={playerRoll} onRoll={handlePlayerRoll} />
      <div className={styles.duodices}>
        <Dice value={playerRoll} />
        <Dice value={computerRoll} />
      </div>
      <Player2 name={`Computer (Score: ${computerScore})`} rollValue={computerRoll} onRoll={handleComputerRoll} />
    </>
  ) : (
    <>
      <Player name={`Player 1 (Score: ${playerScore})`} rollValue={playerRoll} onRoll={playerTurn === 1 ? handlePlayerRoll : null} />
      <Dice value={diceValue} />
      <Player name={`Player 2 (Score: ${player2Score})`} rollValue={player2Roll} onRoll={playerTurn === 2 ? handlePlayer2Roll : null} />
    </>
  )}
</div>


    </div>
  );
}

export default App;
