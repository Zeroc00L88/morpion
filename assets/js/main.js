let array = [
    [1, 2, 2],
    [0, 2, 1],
    [2, 0, 2],
];

const playerOne = 1;
const playerTwo = 2;

const container = document.querySelector("#morpionContainer");

//display frame
function displayFrame() {
    array.forEach((e) => {
        const row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);
        e.forEach((el) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
            cell.addEventListener("click", () => {
                console.log(el);
                displayCellContent(cell, true);
            });
        });
    });
}

//display cell content
function displayCellContent(cell, humanPlayer) {
    if (humanPlayer) {
        const img = document.createElement("img");
        img.src = "./assets/images/cross.png";
        img.width = "200";
        cell.appendChild(img);
    } else {
        const img = document.createElement("img");
        img.src = "./assets/images/circle.png";
        cell.appendChild(img);
    }
}

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

displayFrame();
