let wordList;
let chosenWord;
let lives = 7;
let canGuess = true;
let jsonWords;
let ptsNeeded;
const delay = ms => new Promise(res => setTimeout(res, ms));

async function initializeGame() {
    await loadWords();
    chooseWord();
    document.getElementById("lives").innerHTML = "Lives Left: " + lives;
    establishSpaces();
    establishListeners();
}

async function loadWords() {
    wordList = data.dict;
}

function chooseWord() {
    var randomNumber = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[randomNumber];
    var trimmedPhrase = chosenWord.replace(" ", "").replace("-", "");
    ptsNeeded = trimmedPhrase.length;
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
        document.getElementById("lives").innerHTML = "Lives Left: " + lives;
        delay(250);
        setAlert("You lose! The word was: " + chosenWord + `<br><a href="https://www.merriam-webster.com/dictionary/${chosenWord}">Click here for the definition of the word!</a>`);
        canGuess = false;

        return;
    }
    document.getElementById("lives").innerHTML = "Lives Left:" + lives;
    document.getElementById("incorrectLetters").innerHTML += "<li><h3>"  + letter + "</h3></li>";
}

function establishSpaces() {
    var spacesNeeded = chosenWord.length;
    var spacesList = document.getElementById("spacesList");
    for(var i = 0; i < spacesNeeded; i++) {
        if(chosenWord.charAt(i) === "-" || chosenWord.charAt(i) === " ") {
            spacesList.innerHTML += "<li id='space" + i + "'>" + chosenWord.charAt(i) + "</li>"
            continue;
        }
        spacesList.innerHTML += "<li id='space" + i + "'>_</li>"
    }
}

function establishListeners() {
    document.addEventListener("keydown", (event) => keyPress(event.key));
}

const guesses = [];
let pts = 0;
function keyPress(key) {
    if(!canGuess) return;
    if(key.toUpperCase() >= "A" && key.toUpperCase() <= "Z" && !guesses.includes(key) && key.length === 1) {
        guesses.push(key);
        key = key.toLowerCase();
        var locator = locateLetters(key);
        if(locator.length === 0) {
            incorrectGuess(key);
        }
        else {
            for(var i = 0; i < locator.length; i++) {
                document.getElementById("space" + locator[i]).innerHTML = key;
                document.getElementById("space" + locator[i]).style.margin = "0.25vw";
                pts++;
            }
            if(pts === ptsNeeded) {
                win();
            }
        }
    }
}

async function win() {
    setAlert("Congratulations! You won with " + lives + " lives left!"  + `<br><a href="https://www.merriam-webster.com/dictionary/${chosenWord}">Click here for the definition of the word!</a>`);
    canGuess = false;
}


function setAlert(text) {
    document.getElementById("alertBox").style.display = "block";
    document.getElementById("alert").innerHTML = text;
}