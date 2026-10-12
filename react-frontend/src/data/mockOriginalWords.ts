import type { OriginalWord } from "../types.ts";

export const mockOriginalWords: Record<string, OriginalWord[]> = {
    "John 1:1": [
        {
            original: "Ἐν",
            transliteration: "en",
            meaning: "in",
            morphology: "Preposition"
        },
        {
            original: "ἀρχῇ",
            transliteration: "archē",
            meaning: "beginning",
            morphology: "Noun, dative, feminine, singular"
        },
        {
            original: "λόγος",
            transliteration: "logos",
            meaning: "word",
            morphology: "Noun, nominative, masculine, singular"
        }
    ],
    "John 1:2": [
        {
            original: "οὗτος",
            transliteration: "houtos",
            meaning: "this one",
            morphology: "Demonstrative pronoun, nominative, masculine, singular"
        },
        {
            original: "ἦν",
            transliteration: "ēn",
            meaning: "was",
            morphology: "Verb, imperfect, active, indicative, third-person singular"
        }
    ]
};