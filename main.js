const output = document.querySelector(".output");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const backspace = document.querySelector(".delete");
const negate = document.querySelector(".negate");
const modulo = document.querySelector(".modulo");
const dot = document.querySelector(".dot");

const PrintNumberUI = UIDecorator(PrintNumber);
const SelectOperationUI = UIDecorator(SelectOperation);
const EvaluateUI = UIDecorator(Evaluate);
const ModuloUI = UIDecorator(Modulo);
const NegateUI = UIDecorator(Negate);
const DeleteLastCharacterUI = UIDecorator(DeleteLastCharacter);
const DotUI = UIDecorator(Dot);
const ClearScreen = UIDecorator(ClearValues);

let firstNumber = "";
let operation = "";
let secondNumber = "";
let needClearOutput = false;

numbers.forEach((num) => { num.addEventListener("click", (e => PrintNumberUI(e.target.textContent))); });
operations.forEach((op) => { op.addEventListener("click", (e => SelectOperationUI(e.target.textContent))); });

equals.addEventListener("click", EvaluateUI);
clear.addEventListener("click", ClearScreen);
backspace.addEventListener("click", DeleteLastCharacterUI);
negate.addEventListener("click", NegateUI);
modulo.addEventListener("click", ModuloUI);
dot.addEventListener("click", DotUI);
document.addEventListener("keypress", KeyboardInput);

function StringIsNumber(str) {
    return isNaN(+str) === false;
}

const funcForKey = {
    "+": SelectOperationUI,
    "-": SelectOperationUI,
    "*": SelectOperationUI,
    "/": SelectOperationUI,
    "%": ModuloUI,
    ".": DotUI,
    "=": EvaluateUI,
};

function KeyboardInput(e) {
    if (StringIsNumber(e.key)) {
        PrintNumberUI(e.key);
    } else {
        const func = funcForKey[e.key];
        if (func === undefined) return;
        func(e.key);
    }

}

function PrintNumber(text, number) {
    result = text + number;
    
    if (text === "0" || needClearOutput) {
        result = number;
        needClearOutput = false;
    }
    
    return result;
}

function SelectOperation(text, symbol) {
    operation = symbol;

    firstNumber = isNaN(+text) ? 0 : text;

    needClearOutput = true;
}

function Evaluate(text) {
    if (operation === "") return;
    secondNumber = text;

    const result = Operate(+firstNumber, +secondNumber, operation);

    ClearValues();
    return result; 
}

function ClearValues(text) {
    firstNumber = "";
    operation = "";
    secondNumber = "";
    return "0";
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
        needClearOutput = true;
        return "div by zero :(";
    }
    
    return Math.round((a / b) * 100) / 100;
}

function Dot(text) {
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ".") {
            return;
        }
    }

    return text + ".";
}

function Modulo(text) {
    if (isNaN(+text)) return;

    return (+text / 100);
}

function Negate(text) {
    if (text === "0") {
        return;
    } else if (text[0] === "-") {
        return text.slice(1);
    } else {
        return "-" + text;        
    }
}

function DeleteLastCharacter(text) {
    if (text.length === 1 || (text.length === 2 && text[0] === "-")) {
        return "0";
    } else {
        return text.slice(0, -1);
    }
}

function UIDecorator(func) {
    return function f(...args) {
        const text = output.innerText;
        const result = func(text, ...args);
        output.innerText = result === undefined ? text : result;
    }
}
