const searchForm = document.querySelector("#passage-search-form");
const searchButton = searchForm.querySelector("button[type='submit']");
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

    const url = `https://bible-api.com/${encodedReference}?translation=web`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Function to display a Bible passage
function displayPassage(passage) {
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

        verseNumber.textContent = verse.verse;

        verseParagraph.appendChild(verseNumber);
        
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



function displayLoading(reference) {
    resultReference.textContent = `Loading ${reference}...`;
    resultTranslation.textContent = "";

    resultVerses.innerHTML = "";

    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Retrieving passage...";

    resultVerses.appendChild(loadingMessage);
}

function setLoading(isLoading) {
    if (isLoading) {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;
    } else {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}
function cleanReference(reference) {
    return reference
        .trim()
        .replace(/:\s+/g, ":");
}
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
