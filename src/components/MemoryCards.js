import React, { useState } from "react";

import { cardItems } from "../utils/cardItems";
import Card from "./Card";
import { useEffect } from "react";

export default function MemoryCards() {
    const [selectedCard1, setSelectedCard1] = useState(null);
    const [selectedCard2, setSelectedCard2] = useState(null);
    const [shuffledArray, setShuffledArray] = useState(cardItems);
    const [movesCount, setMovesCount] = useState(0);
    const [isMatchWon, setIsMatchWon] = useState(false);
    const [timer, setTimer] = useState({
        seconds: 0,
        minutes: 0,
        hours: 0,
    });

    const [lastUpdatedCard, setLastUpdatedCard] = useState(null);

    const [matchedCards, setMatchedCards] = useState([]);

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const shuffleCards = () => {
        setShuffledArray(shuffleArray(cardItems));
    };

    const restartGame = () => {
        setShuffledArray(shuffleArray(cardItems));
        setMatchedCards([]);
        setSelectedCard1(null);
        setSelectedCard2(null);
        setIsMatchWon(false);
        setTimer({
            seconds: 0,
            minutes: 0,
            hours: 0,
        });
        setMovesCount(0);
    };

    useEffect(() => {
        shuffleCards();
    }, [cardItems]);

    useEffect(() => {
        if (selectedCard1?.id && selectedCard2?.id) {
            if (selectedCard1?.value === selectedCard2?.value) {
                setMatchedCards([...matchedCards, selectedCard1]);
            }
        }
    }, [selectedCard1, selectedCard2]);

    useEffect(() => {
        if (matchedCards.length === 8) {
            setIsMatchWon(true);

            // setTimeout(() => {
            //     shuffleCards();
            // }, 300);
        }
    }, [matchedCards]);

    useEffect(() => {
        const duration = setInterval(() => {
            setTimer((prev) => {
                let { seconds, minutes, hours } = prev;
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                }
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
                return { seconds, minutes, hours };
            });
        }, 1000);
    }, []);

    return (
        <div className="bg-gray-900 flex flex-col gap-5 p-5 rounded-[12px]">
            <div className="flex items-center justify-between">
                {!isMatchWon && (
                    <>
                        <span className="text-[#fff] text-[16px]">
                            Number of moves: {movesCount}
                        </span>
                        {/* {isMatchWon && <div className="text-[24px]">Match won</div>} */}
                        <span className="text-[#fff] text-[16px]">
                            Duration: {timer.hours.toString().padStart(2, "0")}:
                            {timer.minutes.toString().padStart(2, "0")}:
                            {timer.seconds.toString().padStart(2, "0")}
                        </span>
                    </>
                )}
            </div>
            {isMatchWon ? (
                <div className="h-[450px] w-[450px] flex flex-col  gap-4 justify-center items-center text-[24px] ">
                    <span className="text-[#fff] text-[24px] text-center">
                        Match won
                    </span>
                    <button
                        className="text-[16px] font-medium py-3 px-6 bg-[#fff]  rounded-[8px]"
                        onClick={() => {
                            restartGame();
                        }}
                    >
                        Restart Game
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-4 h-[450px] w-[450px]">
                        {shuffledArray.map((cardItem) => (
                            <Card
                                key={cardItem?.id}
                                data={cardItem}
                                setMovesCount={setMovesCount}
                                isFlipped={
                                    selectedCard1?.id === cardItem?.id ||
                                    selectedCard2?.id === cardItem?.id
                                }
                                matchedCards={matchedCards}
                                selectedCard1={selectedCard1}
                                setSelectedCard1={setSelectedCard1}
                                selectedCard2={selectedCard2}
                                setSelectedCard2={setSelectedCard2}
                                lastUpdatedCard={lastUpdatedCard}
                                setLastUpdatedCard={setLastUpdatedCard}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
