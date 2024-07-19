let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let currentNumber = "";
let previousNumber = "";
let operator = "";
let decimalPoint = false;

document.addEventListener("keydown", (e) => {
  let keyValue = e.key;
  if (keyValue >= 0 && keyValue <= 9) {
    currentNumber += keyValue;
    display.value = currentNumber;
  } else if (keyValue === ".") {
    if (!decimalPoint) {
      currentNumber += keyValue;
      display.value = currentNumber;
      decimalPoint = true;
    }
  } else if (keyValue === "+" || keyValue === "-" || keyValue === "*" || keyValue === "/") {
    operator = keyValue;
    previousNumber = currentNumber;
    currentNumber = "";
    display.value = previousNumber + " " + operator;
    decimalPoint = false;
  } else if (keyValue === "=" || keyValue === "Enter") {
    calculate();
  } else if (keyValue === "Backspace") {
    currentNumber = currentNumber.slice(0, -1);
    display.value = currentNumber;
  } else if (keyValue === "Escape") {
    clear();
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.value;
    if (value === "=") {
      calculate();
    } else if (value === "C") {
      clear();
    } else if (isNaN(value)) {
      if (value === ".") {
        if (!decimalPoint) {
          currentNumber += value;
          display.value = currentNumber;
          decimalPoint = true;
        }
      } else {
        operator = value;
        previousNumber = currentNumber;
        currentNumber = "";
        display.value = previousNumber + " " + operator;
        decimalPoint = false;
      }
    } else {
      currentNumber += value;
      display.value = currentNumber;
    }
  });
});

function calculate() {
  if (previousNumber !== "" && currentNumber !== "") {
    let result = eval(previousNumber + operator + currentNumber);
    display.value = result;
    currentNumber = result;
    previousNumber = "";
    operator = "";
    decimalPoint = false;
  }
}

function clear() {
  display.value = "";
  currentNumber = "";
  previousNumber = "";
  operator = "";
  decimalPoint = false;
}