let array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

const playerOne = 1;
const playerTwo = 2;

const container = document.querySelector("#morpionContainer");

//display frame
function displayFrame() {
    array.forEach((e, i) => {
        const row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);
        e.forEach((el, j) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
            cell.addEventListener(
                "click",
                () => {
                    playerPlay(i, j);
                    displayContent();
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
            } else if (el == 2) {
                cell.innerHTML = "";
                const img = document.createElement("img");
                img.width = "200";
                cell.appendChild(img);
                img.src = "./assets/images/circle.png";
            }
        });
    });
}

//display cell content
function playerPlay(i, j) {
    array[i][j] = 1;
}

//computer random play
function computerPlay() {
    array.forEach((e, i) => {
        e.forEach((el, j) => {});
    });
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

displayFrame();

// const img = document.createElement("img");
// let bla = 2;
// const testfst = document.querySelector(
//     `#morpionContainer > :nth-child(${bla})`,
// );
// console.log(testfst);
// const test = testfst.querySelector(":nth-child(2)");
// img.src = "./assets/images/cross.png";
// img.width = "200";
// test.appendChild(img);
