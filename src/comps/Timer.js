import React, { useEffect } from 'react';
import { useStopwatch } from "react-timer-hook";
import { numOfImage } from "../cardImages";
import Swal from 'sweetalert2';

export default function Timer({ flagStop, setFlagStop, level, setLevel, shuffleCards, cardImagesAllLevels, setCardImages, bestTime, setBestTime }) {

    const timeLimit = numOfImage[level - 1] * 15;

    const {
        seconds,
        minutes,
        totalSeconds,
        pause,
        reset,
        start,
        isRunning
    } = useStopwatch({ autoStart: true });

    useEffect(() => {
        if (totalSeconds >= timeLimit) {
            pause();
            setFlagStop(true);

            Swal.fire({
                title: 'You Lose, Try Again!!!',
                imageUrl: "/images/jerryLoser.png",
                imageAlt: "end game image",
                width: 460,
                customClass: 'swal-style',
                confirmButtonText: "Play Again",
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `rgba(0,0,123,0.4)`
            }).then((result) => {
                setLevel(1);
                setCardImages(cardImagesAllLevels[0]);
                shuffleCards(cardImagesAllLevels[0]);
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL, 1);
                setFlagStop(false);
                reset(null, true);
            });
        }
    }, [totalSeconds, timeLimit]);

    useEffect(() => {
        if (flagStop) {
            pause();
            const currentTime = totalSeconds;
            if (bestTime[level - 1] === 0 || currentTime < bestTime[level - 1]) {
                bestTime[level - 1] = currentTime;
                setBestTime([...bestTime]);
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_BEST_TIME, JSON.stringify(bestTime));
            }
        } else {
            if (totalSeconds === 0) {
                 reset(null, true);
            }
        }
    }, [flagStop, level]);

    const handleTimerToggle = () => {
        if (isRunning) {
            pause();
        } else {
            start();
        }
    };

    const handleReset = () => {
        reset(null, false); 
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: "25px", marginBottom: "8px" }}>
                <span>זמן: </span>
                <span>{minutes}</span>:
                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
            
            {!flagStop && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                        onClick={handleReset} 
                        style={{ fontSize: "16px", padding: "4px 12px", cursor: "pointer", minWidth: "80px", borderRadius: "8px" }}
                    >
                        אפס 🔄
                    </button>
                     <button 
                        onClick={handleTimerToggle} 
                        style={{ fontSize: "16px", padding: "4px 12px", cursor: "pointer", minWidth: "80px", borderRadius: "8px" }}
                    >
                        {isRunning ? "עצור ⏸" : "המשך ▶"}
                    </button>

                </div>
            )}
        </div>
    );
}