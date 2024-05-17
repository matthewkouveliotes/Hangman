let wordList;
let chosenWord;
let lives = 10;
let canGuess = true;

async function initializeGame() {
    await loadWords()
    chooseWord();
    document.getElementById("lives").innerHTML = "Lives Left: 10";
    establishSpaces();
    establishListeners();
}

async function loadWords() {
    var jsonWords = await fetch("dictionary.json");
    var converted = await jsonWords.json();
    wordList = Object.keys(converted);
}

function chooseWord() {
    var randomNumber = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[randomNumber];
}

function locateLetters(letter) {
    var positions = [];
    for(var i = 0; i < chosenWord.length; i++) {
        if(chosenWord.substring(i, i+1) === letter) {
            positions.push(i);
        }
    }
    return positions;
}

function incorrectGuess(letter) {
    lives--;
    if(lives === 0) {
        alert("You lose!\nThe word was: " + chosenWord)
        canGuess = false;
        return;
    }
    document.getElementById("lives").innerHTML = "Lives Left:" + lives;
    document.getElementById("incorrectLetters").innerHTML += "<li><h3>"  + letter + "</h3></li>";
}

function establishSpaces() {
    var spacesNeeded = chosenWord.length;
    for(var i = 0; i < spacesNeeded; i++) {
        document.getElementById("spacesList").innerHTML += "<li>_</li>"
    }
}

function establishListeners() {
    document.addEventListener("keydown", (event) => keyPress(event.key))
}

var allowedKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function keyPress(key) {
    if(allowedKeys.includes(key.toUpperCase())) {
        console.log(key);
    }
}