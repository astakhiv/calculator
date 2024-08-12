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

let needClearOutput = false;

numbers.forEach((num) => { num.addEventListener("click", (e => PrintNumber(e))); });
operations.forEach((op) => { op.addEventListener("click", (e) => { SelectOperation(e) }); });

equals.addEventListener("click", Evaluate);

clear.addEventListener("click", ClearScreen);
backspace.addEventListener("click", DeleteLastCharacter);
negate.addEventListener("click", Negate);
modulo.addEventListener("click", Modulo);
dot.addEventListener("click", Dot);

function PrintNumber(e) {
    const value = e.target.textContent;
       
    if (output.innerText === "0" || needClearOutput) {
        output.innerText = "";
        needClearOutput = false;
    }

    output.innerText += value; 
}

function SelectOperation(e) {
    operation = e.target.textContent;

    firstNumber = isNaN(+output.innerText) ? 0 : output.innerText;

    needClearOutput = true;
}

function Evaluate() {
    if (operation === "") return;
    secondNumber = output.innerText;

    const result = Operate(+firstNumber, +secondNumber, operation);

    output.innerText = result;
    clearValues();
   
}

function ClearScreen() {
    output.innerText = "0";
    clearValues();
}

function clearValues() {
    firstNumber = "";
    operation = "";
    secondNumber = "";
}

function Operate(firstNumber, secondNumber, operator) {
    if (operator === "+") {
        return (firstNumber + secondNumber);
    } else if (operator === "-") {
        return (firstNumber - secondNumber);
    } else if (operator === "*") {
        return (firstNumber * secondNumber);
    } else if (operator === "/") {
        return Divide(firstNumber, secondNumber);
    } else {
        return 0;
    }
}

function Divide(a, b) {
    if (b === 0) {
        return "div by zero :(";
    }
    
    return Math.round((a / b) * 100) / 100;
}

function Dot() {
    const text = output.innerText;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === ".") {
            return;
        }
    }

    output.innerText += ".";
}

function Modulo() {
    const text = output.innerText;

    if (isNaN(+text)) {
        return;
    }

    output.innerText = text / 100;

}

function Negate() {
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
}

function DeleteLastCharacter() {
    const text = output.innerText;
   
    let result = "";
    if (text.length === 1 || (text.length === 2 && text[0] === "-")) {
        result = "0";
    } else {
        result = text.slice(0, -1);
    }
    output.innerText = result

}
