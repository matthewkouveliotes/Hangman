let wordList;
let chosenWord;

async function initializeGame() {
    await loadWords()
    chooseWord();
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

