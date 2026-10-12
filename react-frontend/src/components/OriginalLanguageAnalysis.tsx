import { useEffect, useState } from "react";

import type { BibleVerse, OriginalWord } from "../types.ts";
import { getOriginalWords } from "../services/originalLanguage.ts";
import OriginalWordCard from "./OriginalWordCard.tsx";

// Defines the props this component receives
type OriginalLanguageAnalysisProps = {
    verse: BibleVerse;
};

function OriginalLanguageAnalysis({
    verse
}: OriginalLanguageAnalysisProps) {

    // Stores the original-language words
    const [words, setWords] = useState<OriginalWord[]>([]);

    // Tracks whether data is being loaded
    const [loading, setLoading] = useState<boolean>(false);

    // Stores any error message
    const [error, setError] = useState<string>("");

    // Tracks how many times the user retries
    const [retryCount, setRetryCount] = useState<number>(0);

    // Runs when the selected verse changes or the user retries
    useEffect(() => {
        let cancelled = false;

        async function loadWords() {
            setLoading(true);
            setError("");
            setWords([]);

            try {
                const result = await getOriginalWords(
                    verse.book_name,
                    verse.chapter,
                    verse.verse
                );

                if (!cancelled) {
                    setWords(result);
                }

            } catch (error) {
                if (!cancelled) {
                    console.error(error);
                    setError("Unable to load original-language data.");
                }

            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadWords();

        // Prevents outdated requests from updating state
        return () => {
            cancelled = true;
        };

    }, [verse.book_name, verse.chapter, verse.verse, retryCount]);

    return (
        <section className="original-language-analysis">

            <h4>Original Language Analysis</h4>

            <p>
                Analysis for {verse.book_name}{" "}
                {verse.chapter}:{verse.verse}
            </p>

            <p>
                Sample vocabulary only. Verified verse-specific
                analysis is not available yet.
            </p>

            {/* Loading message */}
            {loading && (
                <p className="analysis-loading" role="status">
                    Loading word analysis...
                </p>
            )}

            {/* Error message and retry button */}
            {error && (
                <div className="analysis-error">
                    <p className="search-error">{error}</p>

                    <button
                        type="button"
                        onClick={() =>
                            setRetryCount((count) => count + 1)
                        }
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Message when no words are available */}
            {!loading && !error && words.length === 0 && (
                <p>
                    Original-language analysis is not available
                    for this verse yet.
                </p>
            )}

            {/* Display the original-language word cards */}
            {!loading && !error && words.length > 0 && (
                <div className="original-words-grid">
                    {words.map((word, index) => (
                        <OriginalWordCard
                            key={`${word.original}-${index}`}
                            word={word}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}

export default OriginalLanguageAnalysis;