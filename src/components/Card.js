import React, { useEffect, useState } from "react";

export default function Card({
    data,
    isFlipped,

    selectedCard1,
    selectedCard2,
    setSelectedCard1,
    setSelectedCard2,
    lastUpdatedCard,
    setLastUpdatedCard,
    matchedCards,
    setMovesCount,
}) {
    const [isMatched, setIsMatched] = useState(false);

    useEffect(() => {
        if (matchedCards.length > 0) {
            const isItemMatched = matchedCards.some(
                (item) => item.value === data.value
            );
            setIsMatched(isItemMatched);
        }
    }, [matchedCards]);

    return (
        <div
            className={`w-[100px] h-[100px] box-border flex items-center justify-center bg-zinc-100 rounded-[8px] ${
                isMatched ? "cursor-not-allowed bg-amber-200" : "cursor-pointer"
            }`}
            onClick={() => {
                if (!isMatched) {
                    if (!selectedCard1?.id) {
                        setSelectedCard1(data);
                        setLastUpdatedCard(data);
                    } else if (!selectedCard2?.id) {
                        setSelectedCard2(data);
                        setLastUpdatedCard(data);
                    } else if (selectedCard1?.id && selectedCard2.id) {
                        if (lastUpdatedCard.id === selectedCard1?.id) {
                            setSelectedCard2(data);
                            setLastUpdatedCard(data);
                        } else if (lastUpdatedCard.id === selectedCard2?.id) {
                            setSelectedCard1(data);
                            setLastUpdatedCard(data);
                        }
                    }
                    setMovesCount((prev) => prev + 1);
                }
            }}
        >
            <span className="text-[32px]">
                {isMatched ? data.value : isFlipped ? data.value : "?"}
            </span>
        </div>
    );
}
