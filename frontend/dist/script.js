import { displayPassage, displayError, displayLoading, setLoading } from "./ui.js";
import { cleanReference, parseReference } from "./reference.js";
import { getPassage } from "./api.js";
function getRequiredElement(selector) {
    const element = document.querySelector(selector);
    if (element === null) {
        throw new Error(`Required element not found: ${selector}`);
    }
    return element;
}
const searchForm = getRequiredElement("#passage-search-form");
const referenceInput = getRequiredElement("#passage-reference");
const resultReference = getRequiredElement("#result-reference");
const resultTranslation = getRequiredElement("#result-translation");
const resultVerses = getRequiredElement("#result-verses");
const searchButton = getRequiredElement("#passage-search-form button[type='submit']");
// Event listener for the search form
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Get the reference entered by the user
    const reference = cleanReference(referenceInput.value);
    // Make sure the input is not empty
    if (reference === "") {
        displayError("Invalid search", "Please enter a Bible reference.");
        return;
    }
    // Check that the reference has a valid structure
    const parsedReference = parseReference(reference);
    if (parsedReference === null) {
        displayError("Invalid reference", "Please enter a reference like John 3:16.");
        return;
    }
    // Try to retrieve the passage from the Bible API
    try {
        displayLoading(reference);
        setLoading(true);
        const passage = await getPassage(reference);
        displayPassage(passage);
    }
    catch (error) {
        console.error(error);
        displayError("Unable to load passage", "Something went wrong while retrieving the passage.");
    }
    finally {
        setLoading(false);
    }
});
