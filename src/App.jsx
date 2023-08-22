import { useState, useEffect } from 'react';
import Player from './components/Player/Player';
import styles from './App.scss';
import Dice from './components/Dice/Dice';
import Confetti from 'react-confetti';


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
  const [winner, setWinner] = useState(null);

{/* react-confetti width control */}

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  {/* player/computer functions */}

  const handlePlayerRoll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setPlayerRoll(roll);
    setDiceValue(roll);
    setPlayerScore(prevScore => prevScore + roll);

    if (playerScore + roll >= 100) {
      setWinner('Player');
    }

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

    if (player2Score + roll >= 100) {
      setWinner('Player 2');
    }

    setPlayerTurn(1);
}

const handleComputerRoll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setComputerRoll(roll);
    setDiceValue(roll);
    setComputerScore(prevScore => prevScore + roll);

    if (computerScore + roll >= 10) {
      setWinner('Computer');
    }
}

{/* reset controls */}

const resetGame = () => {
  setPlayerScore(0);
  setPlayer2Score(0);
  setComputerScore(0);
  setPlayerRoll(0);
  setPlayer2Roll(0);
  setComputerRoll(0);
  setDiceValue(0);
  setWinner(null);
  setPlayerTurn(1); 
};

{/* fix cuz scss sucks */}
  
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  zIndex: 1000, 
};


return (
  <div className={styles.appcon}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Dice Game</h1>
      <button className="controls" onClick={() => setGameMode(prevMode => (prevMode === 'PvC' ? 'PvP' : 'PvC'))} >
        {gameMode === 'PvC' ? "Player vs Player" : "Player vs Computer"}
      </button>
    </div>

    <div className={styles.gameArea}>
      {gameMode === 'PvC' ? (
        <>
          <Player name={`Player (Score: ${playerScore})`} rollValue={playerRoll} onRoll={handlePlayerRoll} isBlinking={winner === 'Player'} />
          <div className={styles.duodices}>
            <Dice value={playerRoll} />
            <Dice value={computerRoll} />
          </div>
          <Player name={`Computer (Score: ${computerScore})`} rollValue={computerRoll} onRoll={handleComputerRoll} isComputer={true} />
        </>
      ) : (
        <>
          <Player name={`Player 1 (Score: ${playerScore})`} rollValue={playerRoll} onRoll={playerTurn === 1 ? handlePlayerRoll : null} />
          <Dice value={diceValue} />
          <Player name={`Player 2 (Score: ${player2Score})`} rollValue={player2Roll} onRoll={playerTurn === 2 ? handlePlayer2Roll : null} />
        </>
      )}

{
      winner && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <div style={overlayStyle}>
            <h2 className={styles.blinking}>{winner} Wins!</h2>
            <div>
              <button className="controls" onClick={resetGame}>Start New Game</button>
            </div>
          </div>
        </>
  )
}
    </div>
  </div>
);
}

export default App;
