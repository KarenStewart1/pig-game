import React, { useState } from "react";
import dice1 from "./images/dice-1.png";
import dice2 from "./images/dice-2.png";
import dice3 from "./images/dice-3.png";
import dice4 from "./images/dice-4.png";
import dice5 from "./images/dice-5.png";
import dice6 from "./images/dice-6.png";

export default function RollDice() {
  const [randomNumber, setRandomNumber] = useState(null);

  // shows the image of the dice corresponding to the randomly generated number
  function ShowDice() {
    if (!randomNumber) {
      return null;
    } else {
      let diceArray = [dice1, dice2, dice3, dice4, dice5, dice6];
      return (
        <img
          src={diceArray[randomNumber - 1]}
          alt="Playing dice"
          className="dice"
        />
      );
    }
  }

  //   pressing button generates a random number between 1-6
  function handleClick(event) {
    event.preventDefault();
    setRandomNumber(
      Math.floor(Math.random() * (Math.floor(6) - Math.ceil(0)) + Math.ceil(1))
    );
  }

  console.log("number " + randomNumber);
  // console.log("diceImage " + diceImage);
  return (
    <div className="RollDice">
      <ShowDice />
      <button className="btn btn--roll" onClick={handleClick}>
        🎲 Roll dice
      </button>
    </div>
  );
}
