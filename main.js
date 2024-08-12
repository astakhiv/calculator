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
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const backspace = document.querySelector(".delete");
const negate = document.querySelector(".negate");
const modulo = document.querySelector(".modulo");
const dot = document.querySelector(".dot");

let firstNumber = "";
let operation = "";
let secondNumber = "";

function clearValues() {
    firstNumber = "";
    operation = "";
    secondNumber = "";
}

let needClearOutput = false;

numbers.forEach((button) => {
        button.addEventListener("click", (e) => {
        const value = e.target.textContent;
       
        if (output.innerText === "0" || needClearOutput) {
            output.innerText = "";
            needClearOutput = false;
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

backspace.addEventListener("click", () => {
    const text = output.innerText;
   
    let result = "";
    if (text.length === 1 || (text.length === 2 && text[0] === "-")) {
        result = "0";
    } else {
        result = text.slice(0, -1);
    }
    output.innerText = result
});

negate.addEventListener("click", () => {
    const text = output.innerText;

    let result = "";
    if (text[0] === "-") {
        result = text.slice(1);
    } else if (text === "0") {
        return;
    } else {
        result = "-" + text;        
    }
    
    output.innerText = result;
});

modulo.addEventListener("click", () => {
    const text = output.innerText;

    if (isNaN(+text)) {
        return;
    }

    output.innerText = text / 100;
});

dot.addEventListener("click", () => {
    const text = output.innerText;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === ".") {
            return;
        }
    }

    output.innerText += ".";
});
