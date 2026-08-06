const searchForm = document.querySelector("#passage-search-form");
const referenceInput = document.querySelector("#passage-reference");
const passageResult = document.querySelector("#passage-result");
const reference = referenceInput.value;
const passages = {
    "john 3:16": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "genesis 1:1": "In the beginning God created the heavens and the earth.",
    "psalm 23:1": "The Lord is my shepherd, I lack nothing.",
    "romans 8:28": "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    "philippians 4:13": "I can do all this through him who gives me strength."
}




searchForm.addEventListener("submit", function (event){
    event.preventDefault();
    
    const reference = referenceInput.value.trim().toLowerCase();
    
    if(reference === ""){
        passageResult.textContent = "Your passage will appear here.";
        return;
    }
    const passage = passages[reference];
    if (passage){
        passageResult.textContent = passage;
    }else{
        passageResult.textContent = "Passage not found.";
    }
    
    


})

console.log(searchForm);
console.log(referenceInput);
console.log(passageResult);
