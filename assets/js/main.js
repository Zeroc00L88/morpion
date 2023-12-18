let array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

const playerOne = 1;
const playerTwo = 2;
let playerSwitch = true;

const container = document.querySelector("#morpionContainer");
// const menu = document.querySelector("#menu");
const pvpBtn = document.querySelector("#pvpBtn");
const pvcBtn = document.querySelector("#pvcBtn");
const mainframe = document.querySelector("#main");
console.log(mainframe);

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
    console.log(morpionContainer);
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
                            break;
                        case "pvc":
                            playerPlay(i, j);
                            setTimeout(() => {
                                computerPlay();
                            }, "200");
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

function playerPlay(i, j) {
    array[i][j] = 1;
    displayContent();
}
// function secondPlayerPlay(i, j) {
//     displayContent();
// }

//computer random play
function computerPlay() {
    console.log("test");
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
        console.log("i", i, "j", j);
        array[i][j] = 2;
    }
    displayContent();
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//check horiizontally if full of 1 or 2 and return the index of the row, else null
function checkH(array, player) {
    rowNb = null;
    array.forEach((e, i) => {
        if (e.every((v) => v == player)) {
            row = i;
        }
    });
    return rowNb;
}

//check vertically if full of 1 or 2 and return the "index" of the column, else null
function checkV(array, player) {
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
    return colNb;
}

//check in diagonal if full of 1 or 2 and return the diagonal 1 (for a backslah-like) and 2 (for a slash-like)
function checkD(array, player) {
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
    return diagNb;
}

function game() {
    displayMenu();
}

game();
