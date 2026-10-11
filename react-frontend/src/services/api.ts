import type { BiblePassage } from "../types.ts";

export async function getPassage(
    reference: string
): Promise<BiblePassage> {

    const encodedReference =
        encodeURIComponent(reference);

    const url =
        `https://bible-api.com/${encodedReference}?translation=web`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `HTTP error! status: ${response.status}`
        );
    }

    return await response.json();
}