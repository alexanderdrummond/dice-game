import React, { useState, useEffect } from 'react';
import Player from '../Player/Player';
import Dice from '../Dice/Dice';
import Confetti from 'react-confetti';
import styles from './GameArea.module.scss';
import winnerAudio from '../../winner.mp3';
import rollAudio from '../../dice.wav';
import computerAudio from '../../trombone.wav'

function GameArea() {
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

  // controls for confetti size

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // roll handler start

  const handleRoll = (setter, isComputer) => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setter(roll);
    setDiceValue(roll);

    // dice audio

    const audio = new Audio(rollAudio);
    audio.play();

    // PvC gamemode controls

    if (gameMode === 'PvC') {
      if (!isComputer) {
        const updatedPlayerScore = playerScore + roll;
        setPlayerScore(updatedPlayerScore);
        if (updatedPlayerScore >= 50) {
          setWinner('Player');
        }
      } else {
        const updatedComputerScore = computerScore + roll;
        setComputerScore(updatedComputerScore);
        if (updatedComputerScore >= 50) {
          setWinner('Computer');
          const computerWinAudio = new Audio(computerAudio);
          computerWinAudio.play();
        }
      }

      if (!isComputer) {
        handleRoll(setComputerRoll, true);
      }

      // Player1 controls

    } else {
      if (playerTurn === 1) {
        const updatedPlayerScore = playerScore + roll;
        setPlayerScore(updatedPlayerScore);
        if (updatedPlayerScore >= 50) {
          setWinner('Player 1');
        }

        // Player 2 controls

      } else {
        const updatedPlayer2Score = player2Score + roll;
        setPlayer2Score(updatedPlayer2Score);
        if (updatedPlayer2Score >= 100) {
          setWinner('Player 2');
        }
      }

      // Turn determinator

      setPlayerTurn(prevTurn => 3 - prevTurn);
    }
  };

  // controls to reset game - resets states and sets the player turn.

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

  return (
    <div className={styles.appcon}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Dice Game</h1>
        <div className={styles.controlwrap}>
          <button className={styles.controls} onClick={() => {
            setGameMode(prevMode => (prevMode === 'PvC' ? 'PvP' : 'PvC'));
            resetGame();
          }}>
            {gameMode === 'PvC' ? "Player vs Player" : "Player vs Computer"}
          </button>
          <button className={styles.controls} onClick={resetGame}>Reset game</button></div>
      </div>
      <div className={styles.gameArea}>
        {gameMode === 'PvC' ? (
          <React.Fragment>
            <Player name={`Player (Score: ${playerScore})`} rollValue={playerRoll} onRoll={() => handleRoll(setPlayerRoll)} isBlinking={winner === 'Player'} />
            <div className={styles.duodices}>
              <Dice value={playerRoll} />
              <Dice value={computerRoll} />
            </div>
            <Player name={`Computer (Score: ${computerScore})`} rollValue={computerRoll} onRoll={() => handleRoll(setComputerRoll, true)} isComputer={true} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Player name={`Player 1 (Score: ${playerScore})`} rollValue={playerRoll} onRoll={playerTurn === 1 ? () => handleRoll(setPlayerRoll) : null} />
            <Dice value={diceValue} />
            <Player name={`Player 2 (Score: ${player2Score})`} rollValue={player2Roll} onRoll={playerTurn === 2 ? () => handleRoll(setPlayer2Roll) : null} />
          </React.Fragment>
        )}
        {winner && (
        <React.Fragment>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <div className={styles.overlayz}>
            <h2 className={styles.blinking}>{winner} wins! 🎉</h2>
            {winner !== 'Computer' && (
              <audio src={winnerAudio} autoPlay={winner !== null} preload="auto" style={{ display: 'none' }} />
            )}
            <div>
              <button className={styles.controls} onClick={resetGame}>Start New Game</button>
            </div>
          </div>
        </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default GameArea;