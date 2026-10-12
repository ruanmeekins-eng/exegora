import { useState } from "react";
import type { BiblePassage, BibleVerse } from "../types.ts";
import VerseDetails from "./VerseDetails.tsx";
// Defines the props this component receives
type PassageResultProps = {
    passage: BiblePassage;
};

function PassageResult({ passage }: PassageResultProps) {

    // Stores the verse the user has selected
    const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);

    return (
        <div className="passage-result">

            {/* Passage title and translation */}
            <div className="passage-heading">
                <h3>{passage.reference}</h3>
                <span>{passage.translation_name}</span>
            </div>

            {/* Display each verse */}
            <div className="passage-verses">
                {passage.verses.map((verse) => (
                    <button
                        type="button"
                        className={`verse-button ${
                            selectedVerse?.chapter === verse.chapter &&
                            selectedVerse?.verse === verse.verse
                                ? "selected"
                                : ""
                        }`}
                        key={`${verse.chapter}-${verse.verse}`}
                        onClick={() => {setSelectedVerse((currentVerse) => {
                            if (currentVerse?.chapter === verse.chapter && currentVerse?.verse === verse.verse) {
                                return null;
                            }

                        return verse;
                    });
                }}
                    >
                        <span className="verse-number">
                            {verse.verse}
                        </span>

                        {verse.text.trim()}
                    </button>
                ))}
            </div>

            {/* Show details only when a verse is selected */}
            {selectedVerse !== null && (
                <VerseDetails verse={selectedVerse} />
            )}

        </div>
    );
}

export default PassageResult;