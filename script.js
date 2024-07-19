let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let currentNumber = "";
let previousNumber = "";
let operator = "";
let decimalPoint = false;
let darkMode = false;

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

document.getElementById("mode-switcher").addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    document.querySelector(".calculator").classList.add("dark-mode");
    document.querySelector(".calculator").classList.remove("light-mode");
    buttons.forEach((button) => {
      button.style.backgroundColor = "#333";
      button.style.color = "#fff";
    });
    display.style.backgroundColor = "#333";
    display.style.color = "#fff";
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    document.querySelector(".calculator").classList.add("light-mode");
    document.querySelector(".calculator").classList.remove("dark-mode");
    buttons.forEach((button) => {
      button.style.backgroundColor = "#fff";
      button.style.color = "#333";
    });
    display.style.backgroundColor = "#fff";
    display.style.color = "#333";
  }
});