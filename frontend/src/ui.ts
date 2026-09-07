import type { BiblePassage } from "./types.js";

function getRequiredElement<T extends Element>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (element === null) {
        throw new Error(`Required element not found: ${selector}`);
    }

    return element;
}

const resultReference =
    getRequiredElement<HTMLElement>("#result-reference");

const resultTranslation =
    getRequiredElement<HTMLElement>("#result-translation");

const resultVerses =
    getRequiredElement<HTMLElement>("#result-verses");

const searchButton =
    getRequiredElement<HTMLButtonElement>(
        "#passage-search-form button[type='submit']"
    );

export function displayPassage(passage: BiblePassage): void {
    resultReference.textContent = passage.reference;
    resultTranslation.textContent = passage.translation_name;

    resultVerses.innerHTML = "";

    passage.verses.forEach(function (verse) {
        const verseParagraph =
            document.createElement("p");

        verseParagraph.classList.add("verse");

        const verseNumber =
            document.createElement("span");

        verseNumber.classList.add("verse-number");

        verseNumber.textContent =
            String(verse.verse);

        verseParagraph.appendChild(verseNumber);

        verseParagraph.append(
            " " + verse.text.trim()
        );

        resultVerses.appendChild(verseParagraph);
    });
}

export function displayError(
    title: string,
    message: string
): void {
    resultReference.textContent = title;
    resultTranslation.textContent = "";

    resultVerses.innerHTML = "";

    const errorMessage =
        document.createElement("p");

    errorMessage.textContent = message;

    resultVerses.appendChild(errorMessage);
}

export function displayLoading(
    reference: string
): void {
    resultReference.textContent =
        `Loading ${reference}...`;

    resultTranslation.textContent = "";
    resultVerses.innerHTML = "";

    const loadingMessage =
        document.createElement("p");

    loadingMessage.textContent =
        "Retrieving Scripture...";

    resultVerses.appendChild(loadingMessage);
}

export function setLoading(
    isLoading: boolean
): void {
    if (isLoading) {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;
    } else {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}