export function getRandomRoll() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  export function handlePlayerRoll(
    roll,
    setPlayerRoll,
    setDiceValue,
    setPlayerScore,
    playerScore,
    setWinner,
    gameMode,
    handleComputerRoll,
    setPlayerTurn
  ) {
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
  
  export function handlePlayer2Roll(
    roll,
    setPlayer2Roll,
    setDiceValue,
    setPlayer2Score,
    player2Score,
    setWinner,
    setPlayerTurn
  ) {
    setPlayer2Roll(roll);
    setDiceValue(roll);
    setPlayer2Score(prevScore => prevScore + roll);
  
    if (player2Score + roll >= 100) {
      setWinner('Player 2');
    }
  
    setPlayerTurn(1);
  }
  
  export function handleComputerRoll(
    roll,
    setComputerRoll,
    setDiceValue,
    setComputerScore,
    currentComputerScore,
    setWinner
  ) {
    setComputerRoll(roll);
    setDiceValue(roll);
    setComputerScore(prevScore => prevScore + roll);
  
    if (currentComputerScore + roll >= 10) {
      setWinner('Computer');
    }
  }
  
  
  export function resetGame(
    setPlayerScore,
    setPlayer2Score,
    setComputerScore,
    setPlayerRoll,
    setPlayer2Roll,
    setComputerRoll,
    setDiceValue,
    setWinner,
    setPlayerTurn
  ) {
    setPlayerScore(0);
    setPlayer2Score(0);
    setComputerScore(0);
    setPlayerRoll(0);
    setPlayer2Roll(0);
    setComputerRoll(0);
    setDiceValue(0);
    setWinner(null);
    setPlayerTurn(1);
  }
  