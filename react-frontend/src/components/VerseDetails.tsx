import type { BibleVerse } from "../types.ts";
import OriginalLanguageAnalysis from "./OriginalLanguageAnalysis.tsx";
type VerseDetailsProps = {
    verse: BibleVerse;
};

function VerseDetails({ verse }: VerseDetailsProps) {
    return (
        <div className="verse-details">
            <p>Analysis for {verse.book_name} {verse.chapter}:{verse.verse}</p>

            <p>
                Sample vocabulary only. Verse-specific analysis
                is not available yet.
            </p>
            <h3>
                {verse.book_name} {verse.chapter}:{verse.verse}
            </h3>

            <p>{verse.text}</p>

            <div className="verse-analysis">
                <p>
                    <OriginalLanguageAnalysis verse={verse} />
                </p>
            </div>
        </div>
    );
}

export default VerseDetails;