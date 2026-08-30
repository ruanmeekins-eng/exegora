const searchForm = document.querySelector("#passage-search-form");
const referenceInput = document.querySelector("#passage-reference");
const passageResult = document.querySelector("#passage-result");
const reference = referenceInput.value;
const resultReference = document.querySelector("#result-reference");
const resultText = document.querySelector("#result-text");
const passages = {
    "john 3:16": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "genesis 1:1": "In the beginning God created the heavens and the earth.",
    "psalm 23:1": "The Lord is my shepherd, I lack nothing.",
    "romans 8:28": "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    "philippians 4:13": "I can do all this through him who gives me strength."
}

// Helper function for normalizing Bible references
function normalizeReference(reference) {
    return reference.trim().toLowerCase();
}

// Function to find a Bible passage by reference
function findPassage(reference) {
    return passages[reference];
}

// Function to display a Bible passage
function displayPassage(reference, passage) {
    resultReference.textContent = reference;
    resultText.textContent = passage;
}

// Function to display an error message
function displayError(title, message) {
    resultReference.textContent = title;
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
    
    const passage = findPassage(reference);

    if (passage){
        // Display the found passage
        displayPassage(reference, passage);
    }
    else {
        displayError("Passage not found", `We could not find a passage for "${reference}".`);
    }
    
});

console.log(searchForm);
console.log(referenceInput);
console.log(passageResult);
