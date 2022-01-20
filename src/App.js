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
  let diceArray = [dice1, dice2, dice3, dice4, dice5, dice6];

  function handleDiceRoll(randomNum) {
    setRandomNumber(randomNum);
    if (randomNum === 1) {
      setCurrentScore1(0);
      // switch player
    } else {
      setCurrentScore1(currentScore1 + randomNum);
    }
  }

  function handleHold(event) {
    event.preventDefault();
    setTotalScore1(totalScore1 + currentScore1);
    setCurrentScore1(0);
    // switch player
  }

  return (
    <div className="App">
      <main>
        <section className="player player--0 player--active">
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
        <section className="player player--1">
          <h2 className="name" id="name--1">
            Player 2
          </h2>
          <p className="score" id="score--1">
            0
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--1">
              0
            </p>
          </div>
        </section>
        <button className="btn btn--new">🔄 New game</button>
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
