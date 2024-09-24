const sudokuSpel = document.getElementById("sudokuSpel");
const tetrisSpel = document.getElementById("tetrisSpel");
const galgjeSpel = document.getElementById("galgjeSpel");

const sudokuVak = document.getElementById("sudokuVak");

function openSudoku(){
    sudokuSpel.style.display = "flex";
    tetrisSpel.style.display = "none";
    galgjeSpel.style.display = "none";
    memorySpel.style.display = "none";

}
function openTetris(){
    sudokuSpel.style.display = "none";
    tetrisSpel.style.display = "flex";
    galgjeSpel.style.display = "none";
    memorySpel.style.display = "none";

    sudokuVak.style.display = "none";
}
function openGalgje(){
    sudokuSpel.style.display = "none";
    tetrisSpel.style.display = "none";
    galgjeSpel.style.display = "flex";
    memorySpel.style.display = "none";

    sudokuVak.style.display = "none";
}
/*
function openMemory(){
    sudokuSpel.style.display = "none";
    tetrisSpel.style.display = "none";
    galgjeSpel.style.display = "none";
    memorySpel.style.display = "flex";

    sudokuVak.style.display = "none";
}
*/

// ----- sudoku code -----
let attempts;
let counter = 0;
let origineleSudoku;
let sudokuStarted = false;
function generateSudoku(){
    if (sudokuStarted){
        window.confirm("Weet je zeker dat je een nieuwe sudoku wil genereren? Al je voortgang gaat verloren.");
    }
    sudokuStarted = true;
    
    try {
        let difficulty = document.querySelector('input[name="difficulty"]:checked');
        if (difficulty.id == "extraHard") {
            attempts = 150;
        }
        else if (difficulty.id == "hard") {
            attempts = 75;
        }
        else if (difficulty.id == "medium") {
            attempts = 40;
        }
        else {
            attempts = 15;
        }
    } 
    catch (error) {
        window.alert("Duid a.u.b eerst een moeilijkheidsgraad aan.")
    }

    let sudoku = [[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0]];
    let numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    fillGrid(sudoku, numbersList);

    origineleSudoku = JSON.parse(JSON.stringify(sudoku));

    removeNumbers(sudoku);
    showSudoku(sudoku);
}
function fillGrid(sudoku, numbersList){    
    for (let i = 0; i < 81; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        if (sudoku[row][col] == 0){
            shuffle(numbersList);
            for (let value of numbersList) {
                if (!sudoku[row].includes(value)){
                    if (![sudoku[0][col], sudoku[1][col], sudoku[2][col], sudoku[3][col], sudoku[4][col], sudoku[5][col], sudoku[6][col], sudoku[7][col], sudoku[8][col]].includes(value)) {
                        let square = [];
                        if (row < 3) {
                            if (col < 3) {
                                square = [sudoku[0][0], sudoku[0][1], sudoku[0][2], sudoku[1][0], sudoku[1][1], sudoku[1][2], sudoku[2][0], sudoku[2][1], sudoku[2][2]];
                            }
                            else if(col < 6) {
                                square = [sudoku[0][3], sudoku[0][4], sudoku[0][5], sudoku[1][3], sudoku[1][4], sudoku[1][5], sudoku[2][3], sudoku[2][4], sudoku[2][5]];
                            }
                            else {
                                square = [sudoku[0][6], sudoku[0][7], sudoku[0][8], sudoku[1][6], sudoku[1][7], sudoku[1][8], sudoku[2][6], sudoku[2][7], sudoku[2][8]];
                            }
                        }
                        else if (row < 6) {
                            if (col < 3) {
                                square = [sudoku[3][0], sudoku[3][1], sudoku[3][2], sudoku[4][0], sudoku[4][1], sudoku[4][2], sudoku[5][0], sudoku[5][1], sudoku[5][2]];
                            }
                            else if(col < 6) {
                                square = [sudoku[3][3], sudoku[3][4], sudoku[3][5], sudoku[4][3], sudoku[4][4], sudoku[4][5], sudoku[5][3], sudoku[5][4], sudoku[5][5]];
                            }
                            else {
                                square = [sudoku[3][6], sudoku[3][7], sudoku[3][8], sudoku[4][6], sudoku[4][7], sudoku[4][8], sudoku[5][6], sudoku[5][7], sudoku[5][8]];
                            }
                        }
                        else {
                            if (col < 3) {
                                square = [sudoku[6][0], sudoku[6][1], sudoku[6][2], sudoku[7][0], sudoku[7][1], sudoku[7][2], sudoku[8][0], sudoku[8][1], sudoku[8][2]];
                            }
                            else if(col < 6) {
                                square = [sudoku[6][3], sudoku[6][4], sudoku[6][5], sudoku[7][3], sudoku[7][4], sudoku[7][5], sudoku[8][3], sudoku[8][4], sudoku[8][5]];
                            }
                            else {
                                square = [sudoku[6][6], sudoku[6][7], sudoku[6][8], sudoku[7][6], sudoku[7][7], sudoku[7][8], sudoku[8][6], sudoku[8][7], sudoku[8][8]];
                            }
                        }
                        if (!square.includes(value)) {
                            sudoku[row][col] = value;
                            if(checkGrid(sudoku)){
                                return true;
                            }
                            else if (fillGrid(sudoku, numbersList)){
                                return true;    
                            }
                            sudoku[row][col] = 0;
                        }
                    }
                }
            }
            break;
        }
    }
    
}
function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
    }
}
function checkGrid(grid){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] == 0) {
                return false;
            }
        }
    }
    return true;
}
function removeNumbers(sudoku){
    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        while (sudoku[row][col] == 0) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        }
        let backup = sudoku[row][col];
        sudoku[row][col] = 0;

        const copyGrid = JSON.parse(JSON.stringify(sudoku));
        
        counter = 0;
        solveGrid(copyGrid)

        if (counter !== 1) {
            sudoku[row][col] = backup;
        }
        attempts--;
    }
    return sudoku;
}
function solveGrid(grid){
    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;
        
        if (grid[row][col] == 0){
            for (let value = 1; value < 10; value++) {
                if (!grid[row].includes(value)){
                    if (![grid[0][col], grid[1][col], grid[2][col], grid[3][col], grid[4][col], grid[5][col], grid[6][col], grid[7][col], grid[8][col]].includes(value)) {
                        let square = [];
                        if (row < 3) {
                            if (col < 3) {
                                square = [grid[0][0], grid[0][1], grid[0][2], grid[1][0], grid[1][1], grid[1][2], grid[2][0], grid[2][1], grid[2][2]];
                            }
                            else if(col < 6) {
                                square = [grid[0][3], grid[0][4], grid[0][5], grid[1][3], grid[1][4], grid[1][5], grid[2][3], grid[2][4], grid[2][5]];
                            }
                            else {
                                square = [grid[0][6], grid[0][7], grid[0][8], grid[1][6], grid[1][7], grid[1][8], grid[2][6], grid[2][7], grid[2][8]];
                            }
                        }
                        else if (row < 6) {
                            if (col < 3) {
                                square = [grid[3][0], grid[3][1], grid[3][2], grid[4][0], grid[4][1], grid[4][2], grid[5][0], grid[5][1], grid[5][2]];
                            }
                            else if(col < 6) {
                                square = [grid[3][3], grid[3][4], grid[3][5], grid[4][3], grid[4][4], grid[4][5], grid[5][3], grid[5][4], grid[5][5]];
                            }
                            else {
                                square = [grid[3][6], grid[3][7], grid[3][8], grid[4][6], grid[4][7], grid[4][8], grid[5][6], grid[5][7], grid[5][8]];
                            }
                        }
                        else {
                            if (col < 3) {
                                square = [grid[6][0], grid[6][1], grid[6][2], grid[7][0], grid[7][1], grid[7][2], grid[8][0], grid[8][1], grid[8][2]];
                            }
                            else if(col < 6) {
                                square = [grid[6][3], grid[6][4], grid[6][5], grid[7][3], grid[7][4], grid[7][5], grid[8][3], grid[8][4], grid[8][5]];
                            }
                            else {
                                square = [grid[6][6], grid[6][7], grid[6][8], grid[7][6], grid[7][7], grid[7][8], grid[8][6], grid[8][7], grid[8][8]];
                            }
                        }
                        if (!square.includes(value)) {
                            grid[row][col] = value
                            if (solveGrid(grid)){
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                }
            }
            return false
        }
    }
    counter++;
    return counter === 1;
}
function showSudoku(sudoku){
    document.getElementById("square1").innerHTML = "";
    document.getElementById("square2").innerHTML = "";
    document.getElementById("square3").innerHTML = "";
    document.getElementById("square4").innerHTML = "";
    document.getElementById("square5").innerHTML = "";
    document.getElementById("square6").innerHTML = "";
    document.getElementById("square7").innerHTML = "";
    document.getElementById("square8").innerHTML = "";
    document.getElementById("square9").innerHTML = "";
    
    sudokuVak.style.display = "flex";
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudoku[row][col] == 0) {
                var element = document.createElement("input");
                element.type = "number";
                element.classList.add("sudokuElementInput", "sudokuElement");
                if (col < 3 && row < 3) {
                    document.getElementById("square1").append(element);
                }
                else if (col < 6 && row < 3) {
                    document.getElementById("square2").append(element);
                }
                else if (row < 3) {
                    document.getElementById("square3").append(element);
                }
                else if (col < 3 && row < 6) {
                    document.getElementById("square4").append(element);
                }
                else if (col < 6 && row < 6) {
                    document.getElementById("square5").append(element);
                }
                else if (row < 6) {
                    document.getElementById("square6").append(element);
                }
                else if (col < 3) {
                    document.getElementById("square7").append(element);
                }
                else if (col < 6) {
                    document.getElementById("square8").append(element);
                }
                else {
                    document.getElementById("square9").append(element);
                }
            }
            else {
                var element = document.createElement("p");
                element.textContent = `${sudoku[row][col]}`;
                element.classList.add("sudokuElementP", "sudokuElement");
                if (col < 3 && row < 3) {
                    document.getElementById("square1").append(element);
                }
                else if (col < 6 && row < 3) {
                    document.getElementById("square2").append(element);
                }
                else if (row < 3) {
                    document.getElementById("square3").append(element);
                }
                else if (col < 3 && row < 6) {
                    document.getElementById("square4").append(element);
                }
                else if (col < 6 && row < 6) {
                    document.getElementById("square5").append(element);
                }
                else if (row < 6) {
                    document.getElementById("square6").append(element);
                }
                else if (col < 3) {
                    document.getElementById("square7").append(element);
                }
                else if (col < 6) {
                    document.getElementById("square8").append(element);
                }
                else {
                    document.getElementById("square9").append(element);
                }
            }
            
        }
    }
}
function emptyOutSudoku(){
    window.confirm("Weet je zeker dat je de sudoku wil leegmaken? Al je voortgang gaat verloren.");

    let sudokuElementen = document.getElementsByClassName("sudokuElementInput");
    for (let i = 0; i < sudokuElementen.length; i++) {
        sudokuElementen[i].value = "";
    }
}
function checkSudokuSolution(){
    let sudokuElementen = document.querySelectorAll(".sudokuElement");
    let oplossingComputer = [];
    let oplossingUserStr = [];
    
    oplossingComputer = [origineleSudoku[0][0], origineleSudoku[0][1], origineleSudoku[0][2], origineleSudoku[1][0], origineleSudoku[1][1], origineleSudoku[1][2], origineleSudoku[2][0], origineleSudoku[2][1], origineleSudoku[2][2], origineleSudoku[0][3], origineleSudoku[0][4], origineleSudoku[0][5], origineleSudoku[1][3], origineleSudoku[1][4], origineleSudoku[1][5], origineleSudoku[2][3], origineleSudoku[2][4], origineleSudoku[2][5], origineleSudoku[0][6], origineleSudoku[0][7], origineleSudoku[0][8], origineleSudoku[1][6], origineleSudoku[1][7], origineleSudoku[1][8], origineleSudoku[2][6], origineleSudoku[2][7], origineleSudoku[2][8], origineleSudoku[3][0], origineleSudoku[3][1], origineleSudoku[3][2], origineleSudoku[4][0], origineleSudoku[4][1], origineleSudoku[4][2], origineleSudoku[5][0], origineleSudoku[5][1], origineleSudoku[5][2], origineleSudoku[3][3], origineleSudoku[3][4], origineleSudoku[3][5], origineleSudoku[4][3], origineleSudoku[4][4], origineleSudoku[4][5], origineleSudoku[5][3], origineleSudoku[5][4], origineleSudoku[5][5], origineleSudoku[3][6], origineleSudoku[3][7], origineleSudoku[3][8], origineleSudoku[4][6], origineleSudoku[4][7], origineleSudoku[4][8], origineleSudoku[5][6], origineleSudoku[5][7], origineleSudoku[5][8], origineleSudoku[6][0], origineleSudoku[6][1], origineleSudoku[6][2], origineleSudoku[7][0], origineleSudoku[7][1], origineleSudoku[7][2], origineleSudoku[8][0], origineleSudoku[8][1], origineleSudoku[8][2], origineleSudoku[6][3], origineleSudoku[6][4], origineleSudoku[6][5], origineleSudoku[7][3], origineleSudoku[7][4], origineleSudoku[7][5], origineleSudoku[8][3], origineleSudoku[8][4], origineleSudoku[8][5], origineleSudoku[6][6], origineleSudoku[6][7], origineleSudoku[6][8], origineleSudoku[7][6], origineleSudoku[7][7], origineleSudoku[7][8], origineleSudoku[8][6], origineleSudoku[8][7], origineleSudoku[8][8]];
    for (let i = 0; i < sudokuElementen.length; i++) {
        if (sudokuElementen[i].classList.contains("sudokuElementP")) {
            oplossingUserStr.push(sudokuElementen[i].textContent);
        }
        else {
            oplossingUserStr.push(sudokuElementen[i].value);
        }
    }
    
    let oplossingUser = oplossingUserStr.map(Number);
    oplossingUser = JSON.stringify(oplossingUser);
    oplossingComputer = JSON.stringify(oplossingComputer);
    console.log(oplossingUser);
    console.log(oplossingComputer);
    console.log(oplossingComputer == oplossingUser);


    if (oplossingComputer == oplossingUser) {
        window.alert("Goed gedaan, helemaal juist!!");
    }
    else{
        window.alert("Niet helemaal juist, probeer nog eens.");
    }
}

// ----- galgje code -----
let woord;
let levens;
const maxLevens = 8;
let galgjeScore = 0;
const galgImgs = document.querySelectorAll(".galg img");
async function newGalgjeGame(){
    if (woord) {
        clearGalgjeGame();
    }    
    levens = 7;
    const res = await fetch("./woorden.json");
    const data = await res.json();
    let woorden = data[0].split(", ");
    let woordIndex = Math.floor(Math.random()*woorden.length);

    woord = woorden[woordIndex];
    console.log(woord);
    console.log(woord.length);

    document.getElementById("galgjeSpelBord").style.display = "flex";
    galgImgs[0].classList.add("displayGalg");

    prepareGuessBoard();
}
function prepareGuessBoard(){
    for (let i = 0; i < woord.length; i++) {
        var letterVak = document.createElement("p");
        letterVak.classList.add("galgjeLetterVak");
        letterVak.id = `galgjeLetter${i}`;
        document.getElementById("woordEnGalg").append(letterVak);
    }
}
async function checkLetter(letter){

    if (woord.includes(letter)) {
        for (let i = 0; i < woord.length; i++){
            if (woord[i] == letter) {
                let vakjeVeranderen = document.getElementById(`galgjeLetter${i}`);
                if (vakjeVeranderen.textContent == ""){
                    vakjeVeranderen.textContent = letter;
                    galgjeScore++;
                }
            }
        }
        console.log(galgjeScore, woord.length);
        if (galgjeScore == woord.length) {
            await new Promise((resolve) => {
                setTimeout(() => {window.alert("Goed gedaan, je hebt gewonnen!"); resolve();}, 100);
            });
            await clearGalgjeGame();
            woord = false;
        }
    }
    else{
        galgImgs.forEach(slide => {slide.classList.remove("displayGalg")});
        galgImgs[maxLevens - levens].classList.add("displayGalg");

        if(levens == 0){
            await new Promise((resolve) => {
                setTimeout(() => {window.alert(`Jammer, je levens zijn op, het woord was: ${woord}`); resolve();}, 100);
            });    
            clearGalgjeGame();
            woord = false;
        }
        levens--;
    }
}
function clearGalgjeGame(){
    document.getElementById("galgjeSpelBord").style.display = "none";
    galgImgs.forEach(slide => {slide.classList.remove("displayGalg")});
    for (let i = 0; i < woord.length; i++) {
        let letterVak = document.getElementById(`galgjeLetter${i}`);
        document.getElementById("woordEnGalg").removeChild(letterVak);
    }
    let lettersTeGokken = document.querySelectorAll(".lettersTeGokken");
    lettersTeGokken.forEach((letter) => {
        letter.style.backgroundColor = "#0077b6";
    });
    galgjeScore = 0;
}
function giveUpGalgje(){
    window.confirm("Weet je zeker dat je wil opgeven? Al je voortgang gaat verloren.");
    window.alert(`jammer, het woord was: ${woord}`);
    if (woord) {
        clearGalgjeGame();
    }
    woord = false;
}

function guessLetterA(){
    buttonClicked = document.getElementById("a");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterB(){
    buttonClicked = document.getElementById("b");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterC(){
    buttonClicked = document.getElementById("c");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterD(){
    buttonClicked = document.getElementById("d");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterE(){
    buttonClicked = document.getElementById("e");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterF(){
    buttonClicked = document.getElementById("f");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterG(){
    buttonClicked = document.getElementById("g");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterH(){
    buttonClicked = document.getElementById("h");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterI(){
    buttonClicked = document.getElementById("i");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterJ(){
    buttonClicked = document.getElementById("j");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterK(){
    buttonClicked = document.getElementById("k");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterL(){
    buttonClicked = document.getElementById("l");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterM(){
    buttonClicked = document.getElementById("m");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterN(){
    buttonClicked = document.getElementById("n");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterO(){
    buttonClicked = document.getElementById("o");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterP(){
    buttonClicked = document.getElementById("p");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterQ(){
    buttonClicked = document.getElementById("q");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterR(){
    buttonClicked = document.getElementById("r");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterS(){
    buttonClicked = document.getElementById("s");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterT(){
    buttonClicked = document.getElementById("t");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterU(){
    buttonClicked = document.getElementById("u");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterV(){
    buttonClicked = document.getElementById("v");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterW(){
    buttonClicked = document.getElementById("w");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterX(){
    buttonClicked = document.getElementById("x");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterY(){
    buttonClicked = document.getElementById("y");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}
function guessLetterZ(){
    buttonClicked = document.getElementById("z");
    buttonClicked.style.backgroundColor = "#03045e";
    checkLetter(buttonClicked.id)
}

// ----- memory code ----- 
/*
function newMemoryGame(){
    console.log("hello");
}
*/