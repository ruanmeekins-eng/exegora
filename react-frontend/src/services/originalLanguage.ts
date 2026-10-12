import type { OriginalWord } from "../types.ts";

export async function getOriginalWords(
    book: string,
    chapter: number,
    verse: number
): Promise<OriginalWord[]> {

    console.log(`Requesting analysis for ${book} ${chapter}:${verse}`);
    
    await new Promise<void>((resolve) => {
    setTimeout(resolve, 1500);
});
    
    return [
        {
            original: "ἀγάπη",
            transliteration: "agapē",
            meaning: "love",
            morphology: "Noun, feminine, singular"
        },
        {
            original: "λόγος",
            transliteration: "logos",
            meaning: "word, message, reason",
            morphology: "Noun, masculine, singular"
        }
    ];
}