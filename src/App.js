import React, { useState } from "react";
import "./App.css";
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
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentScore, setCurrentScore] = useState({ player1: 0, player2: 0 });
  const [totalScore, setTotalScore] = useState({ player1: 0, player2: 0 });
  const [whoseTurn, setWhoseTurn] = useState({ player1: true, player2: false });

  function switchPlayer() {
    setWhoseTurn(
      whoseTurn.player1
        ? { player1: false, player2: true }
        : { player1: true, player2: false }
    );
  }
  function handleDiceRoll(randomNum) {
    if (whoseTurn.player1 !== "winner" && whoseTurn.player2 !== "winner") {
      setRandomNumber(randomNum);
      if (randomNum === 1) {
        setCurrentScore({ player1: 0, player2: 0 });
        switchPlayer();
      } else if (whoseTurn.player1) {
        setCurrentScore({
          player1: currentScore.player1 + randomNum,
          player2: 0,
        });
      } else {
        setCurrentScore({
          player1: 0,
          player2: currentScore.player2 + randomNum,
        });
      }
    }
  }

  function handleHold(event) {
    event.preventDefault();
    if (totalScore.player1 + currentScore.player1 > 99) {
      setWhoseTurn({ player1: "winner", player2: false });
    } else if (totalScore.player2 + currentScore.player2 > 99) {
      setWhoseTurn({ player1: false, player2: "winner" });
    } else {
      switchPlayer();
    }
    setTotalScore({
      player1: totalScore.player1 + currentScore.player1,
      player2: totalScore.player2 + currentScore.player2,
    });
    setCurrentScore({ player1: 0, player2: 0 });
  }

  function startNewGame(event) {
    event.preventDefault();
    setCurrentScore({ player1: 0, player2: 0 });
    setTotalScore({ player1: 0, player2: 0 });
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
          🔄 New game
        </button>
        <Rules />
        {randomNumber ? (
          <img
            src={images[`dice-${randomNumber}.png`]}
            alt="Playing dice"
            className="dice"
          />
        ) : null}
        <RollDice onDiceRoll={handleDiceRoll} />
        <button className="btn btn--hold" onClick={handleHold}>
          📥 Hold
        </button>
      </main>
    </div>
  );
}

export default App;
