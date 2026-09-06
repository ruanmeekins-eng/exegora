const searchForm = document.querySelector("#passage-search-form");
const referenceInput = document.querySelector("#passage-reference");
const passageResult = document.querySelector("#passage-result");
const reference = referenceInput.value;
const resultReference = document.querySelector("#result-reference");
const resultTranslation = document.querySelector("#result-translation");
const resultText = document.querySelector("#result-text");
const passages = [
    {
        book: "John",
        chapter: 3,
        verse: 16,
        translation: "KJV",
        text: "For God so loved the world, that he gave his only begotten Son..."
    },

    {
        book: "Genesis",
        chapter: 1,
        verse: 1,
        translation: "KJV",
        text: "In the beginning God created the heaven and the earth."
    },

    {
        book: "Psalm",
        chapter: 23,
        verse: 1,
        translation: "KJV",
        text: "The Lord is my shepherd; I shall not want."
    },

    {
        book: "Romans",
        chapter: 8,
        verse: 28,
        translation: "KJV",
        text: "And we know that all things work together for good..."
    }
];

// Helper function for normalizing Bible references
function normalizeReference(reference) {
    return reference.trim().toLowerCase();
}

// Function to format a Bible reference with the first letter capitalized
function formatReference(reference) {

    const parsedReference = parseReference(reference);

    const book = parsedReference.book;
    const formattedBook =
        book.charAt(0).toUpperCase() +
        book.slice(1).toLowerCase();

    return `${formattedBook} ${parsedReference.chapter}:${parsedReference.verse}`;

}

// Function to parse a Bible reference into its components (book, chapter, verse)
function parseReference(reference) {
    const trimmedReference = reference.trim();
    const parts = trimmedReference.split(" ");
    // Validate that there are at least two parts (book and chapter:verse)
    if (parts.length < 2) {
        return null;
    }
    
    const chapterAndVersePart = parts.pop();
    const book = parts.join(" ");

    const chapterAndVerse = chapterAndVersePart.split(":");
    // Validate that chapter and verse are present
    if (chapterAndVerse.length !== 2) {
        return null;
    }
    
    const chapter = Number(chapterAndVerse[0]);
    const verse = Number(chapterAndVerse[1]);

    // Validate that chapter and verse are numbers
    if(Number.isNaN(chapter) || Number.isNaN(verse)) {
        return null;
    }
    // Validate that chapter and verse are positive integers
    if (chapter <= 0 || verse <= 0) {
        return null;
    }

   // Return the parsed reference as an object
    return {
        book: book,
        chapter: chapter,
        verse: verse
    };
}

// Function to find a Bible passage by reference
function findPassage(parsedReference) {
    return passages.find(function (passage) {
        return (
            passage.book.toLowerCase() === parsedReference.book.toLowerCase() &&
            passage.chapter === parsedReference.chapter &&
            passage.verse === parsedReference.verse
        );
    });
}

// Function to display a Bible passage
function displayPassage(reference, passage) {
    resultReference.textContent = reference;
    resultTranslation.textContent = passage.translation;
    resultText.textContent = passage.text;
}

// Function to display an error message
function displayError(title, message) {
    resultReference.textContent = title;
    resultTranslation.textContent = "";
    resultText.textContent = message;
}

// Event listener for the search form
searchForm.addEventListener("submit", function (event){
    event.preventDefault();
    
    const reference = normalizeReference(referenceInput.value);
    
    // Search result handler
    if(reference === ""){
        displayError("Invalid search", "Please enter a valid Bible reference.");
        return;
    }
    const parsedReference = parseReference(reference);

    if (parsedReference === null) {
        displayError("Invalid search", "Please enter a valid Bible reference.");
        return;
    }
    const passage = findPassage(parsedReference);
    const formattedReference = formatReference(reference);
    
    if (passage){
        // Display the found passage
        displayPassage(formattedReference, passage);
    }
    else {
        displayError("Passage not found", `We could not find a passage for "${formattedReference}".`);
    }
    
});

console.log(searchForm);
console.log(referenceInput);
console.log(passageResult);
