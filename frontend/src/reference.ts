import type { ParsedReference } from "./types.js";

export function cleanReference(reference: string): string {
    return reference
        .trim()
        .replace(/:\s+/g, ":");
}

export function parseReference(
    reference: string
): ParsedReference | null {

    const trimmedReference =
        reference.trim().replace(/:\s+/g, ":");

    const parts = trimmedReference.split(" ");

    if (parts.length < 2) {
        return null;
    }

    const chapterVersePart = parts.pop();

    if (chapterVersePart === undefined) {
        return null;
    }

    const book = parts.join(" ");

    const chapterAndVerse =
        chapterVersePart.split(":");

    if (chapterAndVerse.length !== 2) {
        return null;
    }

    const chapter =
        Number(chapterAndVerse[0]);

    const versePart =
        chapterAndVerse[1];

    const verseRange =
        versePart.split("-");

    if (verseRange.length > 2) {
        return null;
    }

    const startVerse =
        Number(verseRange[0]);

    let endVerse = startVerse;

    if (verseRange.length === 2) {
        endVerse =
            Number(verseRange[1]);
    }

    if (
        Number.isNaN(chapter) ||
        Number.isNaN(startVerse) ||
        Number.isNaN(endVerse)
    ) {
        return null;
    }

    if (
        chapter <= 0 ||
        startVerse <= 0 ||
        endVerse <= 0
    ) {
        return null;
    }

    if (endVerse < startVerse) {
        return null;
    }

    return {
        book,
        chapter,
        startVerse,
        endVerse
    };
}