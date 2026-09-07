import type {
    ParsedReference,
    BibleVerse,
    BiblePassage
} from "./types.js";
    
import {
    displayPassage,
    displayError,
    displayLoading,
    setLoading
} from "./ui.js";

import {
    cleanReference,
    parseReference
} from "./reference.js";


import { getPassage } from "./api.js";

function getRequiredElement<T extends Element>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (element === null) {
        throw new Error(`Required element not found: ${selector}`);
    }

    return element;
}

const searchForm =
    getRequiredElement<HTMLFormElement>("#passage-search-form");

const referenceInput =
    getRequiredElement<HTMLInputElement>("#passage-reference");

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

// Event listener for the search form
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the reference entered by the user
    const reference = cleanReference(referenceInput.value);

    // Make sure the input is not empty
    if (reference === "") {
        displayError(
            "Invalid search",
            "Please enter a Bible reference."
        );
        return;
    }

    // Check that the reference has a valid structure
    const parsedReference = parseReference(reference);

    if (parsedReference === null) {
        displayError(
            "Invalid reference",
            "Please enter a reference like John 3:16."
        );
        return;
    }

    // Try to retrieve the passage from the Bible API
    try {
        displayLoading(reference);
        setLoading(true);
        const passage = await getPassage(reference);
   
        displayPassage(passage);

    } catch (error) {
        console.error(error);

        displayError(
            "Unable to load passage",
            "Something went wrong while retrieving the passage."
        );
    } finally {
        setLoading(false);
    }
});
