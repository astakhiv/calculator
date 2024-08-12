function operate(firstNumber, secondNumber, operator) {
    if (operator === "+") {
        return (firstNumber + secondNumber);
    } else if (operator === "-") {
        return (firstNumber - secondNumber);
    } else if (operator === "*") {
        return (firstNumber * secondNumber);
    } else if (operator === "/") {
        return (secondNumber === 0) ? ("div by zero :(") :  (Math.round((firstNumber / secondNumber) * 100) / 100);
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

let needClearOutput = false;

numbers.forEach((button) => {
        button.addEventListener("click", (e) => {
        const value = e.target.textContent;
        
        if (output.innerText === "0" || needClearOutput) {
            output.innerText = "";
        }

        output.innerText += value;
    });
});

operations.forEach((button) => {
    button.addEventListener("click", (e) => {
        operation = e.target.textContent;
    
        firstNumber = isNaN(+output.innerText) ? 0 : output.innerText;

        needClearOutput = true;
    });
});

clear.addEventListener("click", () => {
    output.innerText = "0";
    firstNumber = "";
    secondNumber = "";
});

equals.addEventListener("click", () => {
    if (operation === "") return;
    secondNumber = output.innerText;

    const result = operate(+firstNumber, +secondNumber, operation);

    clearValues();
    output.innerText = result;
});
