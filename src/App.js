import React, { useState } from "react";
import "./App.css";
import RollDice from "./RollDice";
import dice1 from "./images/dice-1.png";
import dice2 from "./images/dice-2.png";
import dice3 from "./images/dice-3.png";
import dice4 from "./images/dice-4.png";
import dice5 from "./images/dice-5.png";
import dice6 from "./images/dice-6.png";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentScore1, setCurrentScore1] = useState(0);
  const [totalScore1, setTotalScore1] = useState(0);
  const [currentScore2, setCurrentScore2] = useState(0);
  const [totalScore2, setTotalScore2] = useState(0);
  const [whoseTurn, setWhoseTurn] = useState({ player1: true, player2: false });
  let diceArray = [dice1, dice2, dice3, dice4, dice5, dice6];

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
        whoseTurn.player1 ? setCurrentScore1(0) : setCurrentScore2(0);
        switchPlayer();
      } else if (whoseTurn.player1) {
        setCurrentScore1(currentScore1 + randomNum);
      } else {
        setCurrentScore2(currentScore2 + randomNum);
      }
    }
  }

  function updateScores(...players) {
    if (players.includes("player1")) {
      setTotalScore1(totalScore1 + currentScore1);
      setCurrentScore1(0);
    }
    if (players.includes("player2")) {
      setTotalScore2(totalScore2 + currentScore2);
      setCurrentScore2(0);
    }
  }

  function handleHold(event) {
    event.preventDefault();
    if (totalScore1 + currentScore1 > 99) {
      setWhoseTurn({ player1: "winner", player2: false });
      updateScores("player1");
    } else if (totalScore2 + currentScore2 > 99) {
      setWhoseTurn({ player1: false, player2: "winner" });
      updateScores("player2");
    } else {
      updateScores("player1", "player2");
      switchPlayer();
    }
  }
  function startNewGame(event) {
    event.preventDefault();
    setCurrentScore1(0);
    setCurrentScore2(0);
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
              {currentScore1}
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
              {currentScore2}
            </p>
          </div>
        </section>
        <button className="btn btn--new" onClick={startNewGame}>
          🔄 New game
        </button>
        {randomNumber ? (
          <img
            src={diceArray[randomNumber - 1]}
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
