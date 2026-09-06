const searchForm = document.querySelector("#passage-search-form");
const referenceInput = document.querySelector("#passage-reference");
const resultReference = document.querySelector("#result-reference");
const resultTranslation = document.querySelector("#result-translation");
const resultVerses = document.querySelector("#result-verses");
console.log(resultVerses);

// Function to parse a Bible reference into its components (book, chapter, verse)
function parseReference(reference) {
    const trimmedReference = reference.trim().replace(/:\s+/g, ":");

    const parts = trimmedReference.split(" ");

    if (parts.length < 2) {
        return null;
    }

    const chapterVersePart = parts.pop();
    const book = parts.join(" ");

    const chapterAndVerse = chapterVersePart.split(":");

    if (chapterAndVerse.length !== 2) {
        return null;
    }

    const chapter = Number(chapterAndVerse[0]);

    const versePart = chapterAndVerse[1];
    const verseRange = versePart.split("-");

    if (verseRange.length > 2) {
        return null;
    }

    const startVerse = Number(verseRange[0]);

    let endVerse = startVerse;

    if (verseRange.length === 2) {
        endVerse = Number(verseRange[1]);
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
        book: book,
        chapter: chapter,
        startVerse: startVerse,
        endVerse: endVerse
    };
}

async function getPassage(reference) {
    const encodedReference = encodeURIComponent(reference);

    const url = `https://bible-api.com/${encodedReference}?translation=kjv`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
// Function to display a Bible passage
function displayPassage(passage) {
    resultReference.textContent = passage.reference;
    resultTranslation.textContent = passage.translation_name;

    resultVerses.innerHTML = "";

    passage.verses.forEach(function (verse) {
        const verseParagraph =
            document.createElement("p");

        const verseNumber =
            document.createElement("span");

        verseNumber.textContent = verse.verse;

        verseParagraph.appendChild(verseNumber);
        verseParagraph.appendChild(
            document.createTextNode("    \t")
        );
        verseParagraph.append(
            " " + verse.text.trim()
        );

        resultVerses.appendChild(
            verseParagraph
        );
    });
}

// Function to display an error message
function displayError(title, message) {
    resultReference.textContent = title;
    resultTranslation.textContent = "";

    resultVerses.innerHTML = "";

    const errorMessage =
        document.createElement("p");

    errorMessage.textContent = message;

    resultVerses.appendChild(errorMessage);
}

// Event listener for the search form
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the reference entered by the user
    const reference = referenceInput.value.trim().replace(/:\s+/g, ":");

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
        const passage = await getPassage(reference);
   
        displayPassage(passage);

    } catch (error) {
        console.error(error);

        displayError(
            "Unable to load passage",
            "Something went wrong while retrieving the passage."
        );
    }
});
