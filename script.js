// Select the elements
const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

let currentInput = "";
let operator = null;
let previousInput = "";

// Handle number button clicks
numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerText;
    // Prevent multiple decimal points
    if (value === "." && currentInput.includes(".")) return;
    // Prevent starting with multiple zeros
    if (currentInput === "0" && value === "0") return;
    if (currentInput === "0" && value !== ".") {
      currentInput = value;
    } else {
      currentInput += value;
    }

    display.value = currentInput;
  });
});

// Handle operator button clicks
operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (currentInput === "") return;
    if (previousInput !== "") {
      calculate();
    }
    operator = e.target.innerText;
    previousInput = currentInput;
    currentInput = "";
  });
});

// Handle equals button click
equalsButton.addEventListener("click", () => {
  calculate();
});

// Handle clear button click
clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = null;
  display.value = "";
});

document.addEventListener("keydown", (e)=> {
  if((e.key >= '0' && e.key <= '9' || e.key == '.'))
  {
    const btn = Array.from(numberButtons).find((b)=> b.innerText === e.key);
    if(btn) btn.click();
  }
  else if(['+','-','*','/'].includes(e.key))
  {
    const btn = Array.from(operatorButtons).find((b)=> b.innerText === e.key);
    if(btn) btn.click();
  }
  else if (e.key === "Enter" || e.key === "=") {
    equalsButton.click();
  }
  else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
    clearButton.click();
  }
  else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
})

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if(current == 0){
        display.value = 'Error';
        currentInput = '';
        previousInput = '';
        operator = null;
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  result = Math.round(result * 100000000) / 100000000;

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  display.value = currentInput;
}
