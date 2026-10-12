import type { OriginalWord } from "../types.ts";

type OriginalWordCardProps = {
    word: OriginalWord;
};

function OriginalWordCard({ word }: OriginalWordCardProps) {
    return (
        <article className="original-word-card">
            <h4>{word.original}</h4>

            <p>
                <strong>Transliteration:</strong>{" "}
                {word.transliteration}
            </p>

            <p>
                <strong>Meaning:</strong> {word.meaning}
            </p>

            <p>
                <strong>Morphology:</strong> {word.morphology}
            </p>
        </article>
    );
}

export default OriginalWordCard;