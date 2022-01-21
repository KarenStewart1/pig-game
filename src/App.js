import React, { useState } from "react";
import "./App.css";
import RollDice from "./RollDice";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
const images = importAll(require.context("./images", false, /\.(png)$/));

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentScore, setCurrentScore] = useState({ player1: 0, player2: 0 });
  const [totalScore1, setTotalScore1] = useState(0);
  const [totalScore2, setTotalScore2] = useState(0);
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

  function updateScores(...players) {
    if (players.includes("player1")) {
      setTotalScore1(totalScore1 + currentScore.player1);
      setCurrentScore({ player1: 0, player2: 0 });
    }
    if (players.includes("player2")) {
      setTotalScore2(totalScore2 + currentScore.player2);
    }
  }

  function handleHold(event) {
    event.preventDefault();
    if (totalScore1 + currentScore.player1 > 99) {
      setWhoseTurn({ player1: "winner", player2: false });
      updateScores("player1");
    } else if (totalScore2 + currentScore.player2 > 99) {
      setWhoseTurn({ player1: false, player2: "winner" });
      updateScores("player2");
    } else {
      updateScores("player1", "player2");
      switchPlayer();
    }
  }
  function startNewGame(event) {
    event.preventDefault();
    setCurrentScore({ player1: 0, player2: 0 });
    setTotalScore1(0);
    setTotalScore2(0);
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
          <h2 className="name" id="name--0">
            Player 1
          </h2>
          <p className="score" id="score--0">
            {totalScore1}
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--0">
              {currentScore.player1}
            </p>
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
          <h2 className="name" id="name--1">
            Player 2
          </h2>
          <p className="score" id="score--1">
            {totalScore2}
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--1">
              {currentScore.player2}
            </p>
          </div>
        </section>
        <button className="btn btn--new" onClick={startNewGame}>
          🔄 New game
        </button>
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
