import React, { useState } from "react";
import "./styling/App.css";
import RollDice from "./RollDice";
import Rules from "./Rules";

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
const images = importAll(require.context("./images", false, /\.(png)$/));

function App() {
  const startingScores = { player1: 0, player2: 0 };
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentScore, setCurrentScore] = useState(startingScores);
  const [totalScore, setTotalScore] = useState(startingScores);
  const [whoseTurn, setWhoseTurn] = useState({ player1: true, player2: false });

  // switches player when a player's turn is over
  function switchPlayer() {
    setWhoseTurn(
      whoseTurn.player1
        ? { player1: false, player2: true }
        : { player1: true, player2: false }
    );
  }
  // produces random number when dice is rolled if neither player has won the game yet. If random number is equal to 1, current scores are reset to 0 and the player's turn is switched. if the random number is not equal to 1, the current score gets updated to current score plus the random number
  function handleDiceRoll(randomNum) {
    if (whoseTurn.player1 !== "winner" && whoseTurn.player2 !== "winner") {
      setRandomNumber(randomNum);
      if (randomNum === 1) {
        setCurrentScore(startingScores);
        switchPlayer();
      } else {
        setCurrentScore({
          player1: whoseTurn.player1 ? currentScore.player1 + randomNum : 0,
          player2: whoseTurn.player2 ? currentScore.player2 + randomNum : 0,
        });
      }
    }
  }
  // when the user presses the hold button: checks if either player has score above 99 (if so, declares winner), if not, switches player and sets total score equal to previous total score plus current score.
  function handleHold(event) {
    event.preventDefault();
    let player1HasWon = totalScore.player1 + currentScore.player1 > 99;
    let player2HasWon = totalScore.player2 + currentScore.player2 > 99;
    if (player1HasWon || player2HasWon) {
      setWhoseTurn({
        player1: player1HasWon ? "winner" : null,
        player2: player2HasWon ? "winner" : null,
      });
    } else {
      switchPlayer();
    }
    setTotalScore({
      player1: totalScore.player1 + currentScore.player1,
      player2: totalScore.player2 + currentScore.player2,
    });
    setCurrentScore(startingScores);
  }
  // resets all values when user presses "New Game" button
  function startNewGame(event) {
    event.preventDefault();
    setCurrentScore(startingScores);
    setTotalScore(startingScores);
    setRandomNumber(null);
    setWhoseTurn({ player1: true, player2: false });
  }

  return (
    <div className="App">
      <main>
        <section
          className={
            whoseTurn.player1 === "winner"
              ? "player player--winner"
              : whoseTurn.player1
              ? "player player--active"
              : "player"
          }
        >
          <h2 className="name">Player 1</h2>
          <p className="score">{totalScore.player1}</p>
          <div className="current">
            <p className="current-label">CURRENT</p>
            <p className="current-score">{currentScore.player1}</p>
          </div>
        </section>
        <section
          className={
            whoseTurn.player2 === "winner"
              ? "player player--winner"
              : whoseTurn.player2
              ? "player player--active"
              : "player"
          }
        >
          <h2 className="name">Player 2</h2>
          <p className="score">{totalScore.player2}</p>
          <div className="current">
            <p className="current-label">CURRENT</p>
            <p className="current-score">{currentScore.player2}</p>
          </div>
        </section>
        <button className="btn btn--new" onClick={startNewGame}>
          ???? New game
        </button>
        <Rules />
        {randomNumber ? (
          <img src={images[`dice-${randomNumber}.png`]} alt="playing dice" />
        ) : null}
        <RollDice onDiceRoll={handleDiceRoll} />
        <button className="btn btn--hold" onClick={handleHold}>
          ???? Hold
        </button>
      </main>
      <footer>
        Coded by{" "}
        <a href="https://karenstewart.nl" target="_blank" rel="noreferrer">
          Karen Stewart
        </a>
      </footer>
    </div>
  );
}

export default App;
