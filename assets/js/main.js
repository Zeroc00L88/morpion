let array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let playerSwitch = true;

const container = document.querySelector("#morpionContainer");
const pvpBtn = document.querySelector("#pvpBtn");
const pvcBtn = document.querySelector("#pvcBtn");
const mainframe = document.querySelector("#main");
const gameOverMenu = document.querySelector("#gameOver");
const gameOverTitle = document.querySelector("#gameOver h2");
const replayBtn = document.querySelector("#replayBtn");

//menu
function displayMenu() {
    pvpBtn.addEventListener("click", () => {
        displayFrame("pvp");
        menu.classList.add("hidden");
    });
    pvcBtn.addEventListener("click", () => {
        displayFrame("pvc");
        menu.classList.add("hidden");
    });
}

//display frame
function displayFrame(mode) {
    const morpionContainer = document.createElement("div");
    mainframe.appendChild(morpionContainer);
    morpionContainer.id = "morpionContainer";

    array.forEach((e, i) => {
        const row = document.createElement("div");
        row.classList.add("row");
        morpionContainer.appendChild(row);
        e.forEach((el, j) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
            cell.addEventListener(
                "click",
                () => {
                    switch (mode) {
                        case "pvp":
                            pVspPlay(i, j, playerSwitch);
                            playerSwitch ? check(array, 2) : check(array, 1);
                            break;
                        case "pvc":
                            pVscPlay(i, j);
                            if (!check(array, 1)) {
                                computerPlay();
                                check(array, 2);
                            }
                            break;
                    }
                },
                { once: true },
            );
        });
    });
}

//display content
function displayContent() {
    array.forEach((e, i) => {
        i++;
        const row = document.querySelector(
            `#morpionContainer > :nth-child(${i})`,
        );
        e.forEach((el, j) => {
            j++;
            const cell = row.querySelector(`:nth-child(${j})`);
            if (el == 1) {
                cell.innerHTML = "";
                const img = document.createElement("img");
                img.width = "200";
                cell.appendChild(img);
                img.src = "./assets/images/cross.png";
                cell.style.pointerEvents = "none";
            } else if (el == 2) {
                cell.innerHTML = "";
                const img = document.createElement("img");
                img.width = "200";
                cell.appendChild(img);
                img.src = "./assets/images/circle.png";
                cell.style.pointerEvents = "none";
            }
        });
    });
}

//display cell content
function pVspPlay(i, j) {
    if (playerSwitch) {
        array[i][j] = 1;
        playerSwitch = false;
        displayContent();
    } else {
        array[i][j] = 2;
        playerSwitch = true;
        displayContent();
    }
}

function pVscPlay(i, j) {
    array[i][j] = 1;
    displayContent();
}

//computer random play
function computerPlay() {
    let zero = false;
    array.forEach((e) => {
        e.forEach((el) => {
            if (el == 0) {
                zero = true;
            }
        });
    });
    if (zero) {
        i = getRandom(0, 2);
        j = getRandom(0, 2);
        while (array[i][j] != 0) {
            i = getRandom(0, 2);
            j = getRandom(0, 2);
        }
        array[i][j] = 2;
    }
    displayContent();
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function check(array, player) {
    // rows
    rowNb = null;
    array.forEach((e, i) => {
        if (e.every((v) => v == player)) {
            rowNb = i;
        }
    });
    if (rowNb != null) {
        gameOver("row", rowNb, player);
        return true;
    }

    // columns
    let colNb = null;
    array.forEach((elmt, i) => {
        let arrayTemp = [];
        array.forEach((e) => {
            arrayTemp.push(e[i]);
        });
        if (arrayTemp.every((v) => v == player)) {
            colNb = i;
        }
    });
    if (colNb != null) {
        gameOver("col", colNb, player);
        return true;
    }

    // diagonals
    let diagNb = null;
    let arrayTemp = [];
    array.forEach((e, i) => {
        arrayTemp.push(e[i]);
    });
    if (arrayTemp.every((v) => v == player)) {
        diagNb = 1;
    } else {
        let i = array.length - 1;
        arrayTemp = [];
        array.forEach((e) => {
            arrayTemp.push(e[i]);
            i--;
        });
        if (arrayTemp.every((v) => v == player)) {
            diagNb = 2;
        }
    }
    if (diagNb != null) {
        gameOver("col", colNb, player);
        return true;
    }

    // draw match
    if (!array.some((e) => e.includes(0))) {
        gameOver("draw", null, null);
        return true;
    }
}

function gameOver(direction, index, playerWin) {
    let player = "";
    switch (playerWin) {
        case 1:
            player = "Player 1";
            gameOverTitle.innerHTML = `${player} Win !`;
            break;
        case 2:
            player = "Player 2";
            gameOverTitle.innerHTML = `${player} Win !`;
            break;
        case null:
            gameOverTitle.innerHTML = "Draw !";
            break;
    }
    document
        .querySelectorAll(".cell")
        .forEach((e) => (e.style.pointerEvents = "none"));
    gameOverMenu.classList.toggle("hidden");
}

function game() {
    displayMenu();
}

game();
