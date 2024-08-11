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
        return "div by zero :(";
    }

    return Math.round((a / b)*100)/100;
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
    } else {
        return 0;
    }
}

const output = document.querySelector(".output");
const numbers = document.querySelectorAll("button:not(.clear):not(.equals):not(.operation)");
const operations = document.querySelectorAll(".operation");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");

let firstNumber = "";
let operation = "";
let secondNumber = "";

function clearValues() {
    firstNumber = "";
    negate = false;
    operation = "";
    secondNumber = "";
}

numbers.forEach((button) => {
        button.addEventListener("click", (e) => {
        const value = e.target.textContent;
        
        if (output.innerText === "0") {
            output.innerText = "";
        }

        output.innerText += value;
    });
});

operations.forEach((button) => {
    button.addEventListener("click", (e) => {
        const buttonOperation = e.target.textContent;
    
        firstNumber = "";
        operation = buttonOperation;

        firstNumber += output.innerText;
        console.log(firstNumber, operation);
        output.innerText = "0";
    });
});

clear.addEventListener("click", () => {
    output.innerText = "0";
    firstNumber = "";
    secondNumber = "";
});

equals.addEventListener("click", () => {
    firstNumber = +firstNumber;
    secondNumber = +output.innerText;
    if (operation === "") return;

    const result = operate(firstNumber, secondNumber, operation);

    output.innerText = result;
    clearValues();
});
