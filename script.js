/*declare numbers and operators variables*/
let numbers = document.querySelectorAll(".numbers p");
let operators = document.querySelectorAll(".operators p");
let equation = document.querySelector(".equation p");
let deleteButton = document.querySelector(".delete");

/*add button effect to numbers*/
numbers.forEach((number)=>{
    number.addEventListener("mouseenter", () => {
        number.style.filter = "brightness(80%)"})
    number.addEventListener("mouseleave", () => {
        number.style.filter = "brightness(100%)"})
});

/*add button effect to operators*/
operators.forEach((operator)=>{
    operator.addEventListener("mouseenter", () => {
        operator.style.filter = "brightness(80%)"})
    operator.addEventListener("mouseleave", () => {
        operator.style.filter = "brightness(100%)"
    })
});

function updateEquation(equation, item) {
    let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let ops = ["+", "-", "x", "/", "^"]

    if (equation.textContent === "" && ops.includes(item)) {
        return false;
    }
    else if (ops.includes(equation.textContent.slice(-1)) && ops.includes(item)) {
        return false;
    }
    equation.textContent += item;
}

function deleteEquation(equation) {
    equation.textContent = equation.textContent.slice(0,-1);
}

function evaluateEquation(equation) {
    let expression = equation.textContent;
    expression = expression.replace(/x/g, "*").replace(/\^/g, "**");
    equation.textContent = new Function("return " + expression)();
}


/*make buttons able to update the equation except for equals sign*/
numbers.forEach((number) => {
    if (number.textContent !== "delete") {
        number.addEventListener("click", () => updateEquation(equation, number.textContent))
    }
});

operators.forEach((operator) => {
    if (operator.textContent !== "=") {
        operator.addEventListener("click", () => updateEquation(equation, operator.textContent))
    }
    else if (operator.textContent === "=") {
        operator.addEventListener("click", () => evaluateEquation(equation));
    }
});

deleteButton.addEventListener("click", () => deleteEquation(equation));

