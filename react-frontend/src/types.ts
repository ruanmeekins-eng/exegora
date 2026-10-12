export type ParsedReference = {
    book: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
};

export type BibleVerse = {
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
};

export type BiblePassage = {
    reference: string;
    translation_name: string;
    translation_id: string;
    text: string;
    verses: BibleVerse[];
};

export type OriginalWord = {
    original: string;
    transliteration: string;
    meaning: string;
    morphology: string;
};