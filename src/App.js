import React, { useEffect, useState } from 'react';
import "./App.css";
import Card from './comps/Card';
import Swal from 'sweetalert2';
import { cardImagesAllLevels, numOfImage } from "./cardImages";
import StartGame from './comps/StartGame';
import Timer from './comps/Timer';

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [oneCard, setOneCard] = useState(null);
    const [twoCard, setTwoCard] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [counter, setCounter] = useState(0);
    const [level, setLevel] = useState(1);
    const [cardImages, setCardImages] = useState(cardImagesAllLevels[level - 1]);
    const [finish, setFinish] = useState(0);
    const [flagStop, setFlagStop] = useState(false);
    let [bestTime, setBestTime] = useState([0, 0, 0, 0]);
    const [flagStart, setFlagStart] = useState(false);

    useEffect(() => {
        const preventDefault = (e) => {
            e.preventDefault();
        };
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
        return () => {
            document.body.removeEventListener('touchmove', preventDefault);
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_LEVEL)) {
            setLevel(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_LEVEL)));
            setFinish(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_FINISH)));
            setBestTime(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_BEST_TIME)));
            setFlagStart(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_START_FLAG, flagStart)));
            shuffleCards(cardImagesAllLevels[localStorage.getItem(process.env.REACT_APP_LOCALHOST_LEVEL) - 1]);
        } else {
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_FINISH, finish);
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL, level);
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_START_FLAG, flagStart);
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_BEST_TIME, JSON.stringify(bestTime));
            shuffleCards(cardImages);
        }
    }, []);

    useEffect(() => {
        if (oneCard && twoCard) {
            setDisabled(true);
            if (oneCard.src === twoCard.src) {
                setCounter(prevCounter => prevCounter + 1);
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === oneCard.src) {
                            return { ...card, matched: true }
                        }
                        else {
                            return card;
                        }
                    })
                })
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [oneCard, twoCard]);

    useEffect(() => {
        if (counter === cardImages.length) {
            setFlagStop(true);

            if (level === numOfImage.length) {
                Swal.fire({
                    title: 'סיימת את המשחק - כל הכבוד',
                    imageUrl: "/images/bye.gif",
                    imageAlt: "end game image",
                    width: 550,
                    customClass: 'swal-style',
                    confirmButtonText: "שחק שוב",
                    color: '#716add',
                    background: '#fff url(/images/trees.png)',
                    html: '<img src="/images/happy.gif" alt="happy" width="370"/>',
                    backdrop: `rgba(0,0,123,0.4)`,
                    didOpen: () => {
                        const img = Swal.getImage();
                        if (img) {
                            img.style.setProperty('margin', 'auto', 'important');
                            img.style.display = 'block';
                        }
                    }
                }).then((result) => {
                    setLevel(1);
                    setCardImages(cardImagesAllLevels[0]);
                    shuffleCards(cardImagesAllLevels[0]);
                    setFinish(prevFinish => prevFinish + 1);
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_FINISH, finish + 1);
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL, 1);
                    setFlagStop(false);
                })
            } else {
                Swal.fire({
                    width: 550,
                    color: '#716add',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `rgba(0,0,123,0.4)`,
                    showConfirmButton: false,
                    html: `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <img src="/images/finish.png" alt="finish" style="width: 85%; margin-bottom: 20px;">
                <button id="custom-btn" class="swal2-confirm swal2-styled" style="background-color: #716add;font-size: 32px;">
                    שלב הבא
                </button>
                <img src="/images/bluey.gif" alt="bluey dance" style="height: 200px; margin-top: 20px;"/>
            </div>
        `,
                    didOpen: () => {
                        const btn = document.getElementById('custom-btn');
                        btn.addEventListener('click', () => {
                            Swal.clickConfirm();
                        });
                    }
                }).then((result) => {
                    setLevel(prevLevel => prevLevel + 1);
                    setCardImages(cardImagesAllLevels[level]);
                    shuffleCards(cardImagesAllLevels[level]);
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL, level + 1);
                    setFlagStop(false);
                })
            }
        }
    }, [counter]);

    const shuffleCards = (cardImages) => {
        const cardsShuffled = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }))
        setCards(cardsShuffled);
        setTurns(0);
        setCounter(0);
    }

    const handleChoice = (card) => {
        oneCard ? setTwoCard(card) : setOneCard(card);
    }

    const resetTurn = () => {
        setOneCard(null);
        setTwoCard(null);
        setTurns(prevTurn => prevTurn + 1);
        setDisabled(false);
    }

    const resetFinish = () => {
        localStorage.removeItem(process.env.REACT_APP_LOCALHOST_FINISH);
        localStorage.removeItem(process.env.REACT_APP_LOCALHOST_LEVEL);
        localStorage.removeItem(process.env.REACT_APP_LOCALHOST_BEST_TIME);
        window.location.reload(false);
    }

    const refreshCards = () => {
        window.location.reload(false);
    }

    return (
        <>
            {flagStart ?
                <div>
                    <div className='container' style={{ marginTop: "-5px" }}>
                        <div className='row'>
                            <div className='col-lg-2 py-3'>
                                <button style={{ margin: "5%" }} onClick={refreshCards}>אפס שלב</button>
                                <Timer
                                    flagStop={flagStop}
                                    setFlagStop={setFlagStop}
                                    level={level}
                                    setLevel={setLevel}
                                    shuffleCards={shuffleCards}
                                    cardImagesAllLevels={cardImagesAllLevels}
                                    setCardImages={setCardImages}
                                    bestTime={bestTime}
                                    setBestTime={setBestTime}
                                />
                            </div>
                            <h2 className='col-lg-8'>
                                <img src={"/images/alepp.png"} alt="title" width="62%" /> <br />
                                <span className='levelStyle'>{level} <img src={"/images/lvl.png"} alt="lvl" width="15%" /> </span>
                            </h2>
                            <div className='col-lg-2 py-3' style={{ fontSize: "18px" }}>
                                <button style={{ fontSize: "20px", margin: "5%" }} onClick={resetFinish}>משחק חדש</button>
                            </div>
                        </div>
                    </div>
                    <div className={level <= 2 ? (level === 1 ? "cards" : "cardsLevel2") : (level === 3 ? "cardsLevel3" : "cardsLevel4")}>
                        {cards.map((card, i) => {
                            return (
                                <Card
                                    card={card}
                                    key={card.id}
                                    handleChoice={handleChoice}
                                    flipped={card === oneCard || card === twoCard || card.matched}
                                    disabled={disabled}
                                />
                            )
                        })}
                    </div>
                </div>
                : <StartGame flagStart={flagStart} setFlagStart={setFlagStart} />}
        </>
    );
}

export default App;