import React from 'react'
import "../css/cards.css";

export default function Card({card, handleChoice, flipped, disabled}) {

    const playSound = () => {
        if (!card.sound) return;
        const audio = new Audio(card.sound);
        audio.play();
    };

    const handleClick = () => {
        if (!disabled){
            handleChoice(card);
            playSound();  
        }
    };

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="back" alt="back card" />
                <img
                  src="images/front.png"
                  className="front"
                  alt="front card"
                  onClick={handleClick}
                />
            </div>
        </div>
    );
}
