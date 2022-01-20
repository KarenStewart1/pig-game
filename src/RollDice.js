import React, { useState } from "react";
import dice1 from "./images/dice-1.png";
import dice2 from "./images/dice-2.png";
import dice3 from "./images/dice-3.png";
import dice4 from "./images/dice-4.png";
import dice5 from "./images/dice-5.png";
import dice6 from "./images/dice-6.png";

export default function RollDice(props) {
  function handleClick(event) {
    event.preventDefault();
    let number = Math.floor(
      Math.random() * (Math.floor(6) - Math.ceil(0)) + Math.ceil(1)
    );
    props.onDiceRoll(number);
  }
  return (
    <div className="RollDice">
      <button className="btn btn--roll" onClick={handleClick}>
        🎲 Roll dice
      </button>
    </div>
  );
}
