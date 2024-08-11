function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
} 

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }

    return a / b;
}

function operate(firstNumber, secondNumber, operator) {
    if (operator === "+") {
        return add(firstNumber, secondNumber);
    } else if (operator === "-") {
        return subtract(firstNumber, secondNumber);
    } else if (operator === "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator === "/") {
        return divide(firstNumber, secondNumber);
    }
}

const operations = {
    "+": true,
    "-": true,
    "*": true,
    "/": true,
};

let firstNumber = "";
let operation = "";
let secondNumber = "";

let displayValue = "";
const output = document.querySelector(".output");


function readValues() {
    const text = output.innerText;
    let i = 0;
    while(isNaN(+text[i]) === false) {
        console.log(text[i]);
        firstNumber += text[i++];
    }

    if (firstNumber === "") return false;

    while (operations[text[i]]) {
        console.log(text[i++]);
    }

    operation = text[i-1];

    while (isNaN(+text[i]) === false) {
        secondNumber += text[i++];
    }

    if (secondNumber === "") return false;

    return true;
}

document.querySelectorAll("button:not(.clear):not(.equals)").forEach((button) => {
        button.addEventListener("click", (e) => {
        const value = e.target.textContent;
        
        output.innerText += value;
        displayValue += value;
    })
});

document.querySelector(".clear").addEventListener("click", () => {
    output.innerText = "";
});

document.querySelector(".equals").addEventListener("click", () => {
    const state = readValues();

    console.log(state);
    console.log(firstNumber, operation, secondNumber);

    operate(firstNumber, operation, secondNumber);
});
