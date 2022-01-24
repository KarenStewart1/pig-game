import React, { useState } from "react";
import "./Rules.css";

export default function Rules() {
  const [rulesBox, setRulesBox] = useState(null);

  function closeRules(event) {
    event.preventDefault();
    setRulesBox(null);
  }

  function showRules(event) {
    event.preventDefault();
    setRulesBox(
      <div>
        <div className="modal hidden">
          <button className="close-modal" onClick={closeRules}>
            &times;
          </button>
          <h1>🎲 Rules 🎲 </h1>
          <p>
            Each turn, a player repeatedly rolls a die until either a 1 is
            rolled or the player decides to "hold".{" "}
          </p>

          <p>
            If the player rolls a 1, they score nothing and it becomes the next
            player's turn. If the player rolls any other number, it is added to
            their turn total and the player's turn continues.{" "}
          </p>
          <p>
            If a player chooses to "hold", their turn total is added to their
            score, and it becomes the next player's turn. The first player to
            score 100 or more points wins.
          </p>
        </div>
        <div className="overlay hidden"></div>
      </div>
    );
  }

  return (
    <div className="Rules">
      <button className="btn--rules show-modal" onClick={showRules}>
        📝 Rules
      </button>
      {rulesBox}
    </div>
  );
}
