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
const menu = document.querySelector("#menu");
const playerTurn = document.querySelector("#playerTurn p");

// Menu evt listener
pvpBtn.addEventListener("click", () => {
    if (playerSwitch) {
        playerTurn.innerHTML = "Player 1 Play ...";
        playerTurn.style.color = "#53b849";
    } else {
        playerTurn.innerHTML = "Player 2 Play ...";
        playerTurn.style.color = "#CA343E";
    }
    displayFrame("pvp");
    menu.classList.add("hidden");
});
pvcBtn.addEventListener("click", () => {
    playerTurn.innerHTML = "Player 1 Play ...";
    playerTurn.style.color = "#53b849";
    displayFrame("pvc");
    menu.classList.add("hidden");
});
// Game Over Menu evt listener
replayBtn.addEventListener("click", () => {
    gameOverMenu.classList.add("hidden");
    array = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    mainframe.removeChild(morpionContainer);
    menu.classList.remove("hidden");
});

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
                            computerPlay();
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
            } else {
                cell.innerHTML = "";
            }
        });
    });
}

//display cell content
function pVspPlay(i, j) {
    if (playerSwitch) {
        playerTurn.innerHTML = "Player 2 Play ...";
        playerTurn.style.color = "#CA343E";
        array[i][j] = 1;
        playerSwitch = false;
        displayContent();
    } else {
        playerTurn.innerHTML = "Player 1 Play ...";
        playerTurn.style.color = "#53b849";
        array[i][j] = 2;
        playerSwitch = true;
        displayContent();
    }
}

function pVscPlay(i, j) {
    playerTurn.innerHTML = "Player 2 (computer) Play ...";
    playerTurn.style.color = "#CA343E";
    array[i][j] = 1;
    displayContent();
}

//computer random play
function computerPlay() {
    if (!check(array, 1)) {
        document
            .querySelectorAll(".cell")
            .forEach((e) => (e.style.pointerEvents = "none"));
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
        setTimeout(() => {
            document.querySelectorAll(".cell").forEach((e) => {
                e.style.pointerEvents = "auto";
            });
            displayContent();
            playerTurn.innerHTML = "Player 1 Play ...";
            playerTurn.style.color = "#53b849";
            check(array, 2);
        }, 1500);
    }
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
            switch (i) {
                case 0:
                    morpionContainer.classList.add("lineHorOne");
                    break;
                case 1:
                    morpionContainer.classList.add("lineHorTwo");
                    break;
                case 2:
                    morpionContainer.classList.add("lineHorThree");
                    break;
            }
            gameOver(player);
        }
    });
    if (rowNb != null) return true;

    // columns
    let colNb = null;
    array.forEach((elmt, i) => {
        if (array.every((v) => v[i] == player)) {
            colNb = i;
            switch (i) {
                case 0:
                    morpionContainer.classList.add("lineVertOne");
                    break;
                case 1:
                    morpionContainer.classList.add("lineVertTwo");
                    break;
                case 2:
                    morpionContainer.classList.add("lineVertThree");
                    break;
            }
            gameOver(player);
        }
    });
    if (colNb != null) return true;

    // diagonals
    let arrayTemp = [];
    array.forEach((e, i) => {
        arrayTemp.push(e[i]);
    });
    if (arrayTemp.every((v) => v == player)) {
        morpionContainer.classList.add("lineDiagOne");
        gameOver(player);
        return true;
    } else {
        let i = array.length - 1;
        arrayTemp = [];
        array.forEach((e) => {
            arrayTemp.push(e[i]);
            i--;
        });
        if (arrayTemp.every((v) => v == player)) {
            morpionContainer.classList.add("lineDiagTwo");
            gameOver(player);
            return true;
        }
    }

    // draw match
    if (!array.some((e) => e.includes(0))) {
        gameOver(null);
        return true;
    }
}

function gameOver(playerWin) {
    let player = "";
    switch (playerWin) {
        case 1:
            player = "Player 1";
            gameOverTitle.innerHTML = `${player} Win !`;
            playerTurn.innerHTML = "";
            break;
        case 2:
            player = "Player 2";
            gameOverTitle.innerHTML = `${player} Win !`;
            playerTurn.innerHTML = "";
            break;
        case null:
            gameOverTitle.innerHTML = "Draw !";
            playerTurn.innerHTML = "";
            break;
    }
    document
        .querySelectorAll(".cell")
        .forEach((e) => (e.style.pointerEvents = "none"));
    gameOverMenu.classList.toggle("hidden");
}
