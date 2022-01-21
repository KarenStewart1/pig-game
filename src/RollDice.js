import React from "react";

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
