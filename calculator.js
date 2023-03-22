
const operationBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".num");
const equalBtn = document.getElementById("equal");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const pointBtn = document.getElementById("point");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

numberBtns.forEach(number => { 
  number.addEventListener("click", () => {
    calculator.appendNumber(number.textContent);
    calculator.updateDisplay();
  })
})

operationBtns.forEach(operation => { 
  operation.addEventListener("click", () => {
    if (operation.textContent == "➕") {
      operation = "+";
    }
    else if (operation.textContent == "➖") {
      operation = "-";
    }
    else if (operation.textContent == "➖") {
      operation = "-";
    }
    else if (operation.textContent == "➗") {
      operation = "/";
    }
    else if (operation.textContent == "✖️") {
      operation = "*";
    }
    else if (operation.textContent == "xy") {
      operation = "^";
    }
    calculator.chooseOperation(operation);
    calculator.updateDisplay();
  })
})    

equalBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
})

clearBtn.addEventListener("click", () => {
calculator.clear();
calculator.updateDisplay();
})

backspaceBtn.addEventListener("click", () => {
calculator.backspace();
calculator.updateDisplay();
})

pointBtn.addEventListener("click", () => {
  calculator.appendNumber(pointBtn.textContent);
  calculator.updateDisplay();
  })

document.addEventListener("keydown", (e) => {
  let patternForNums = /[0-9]/g;
  let patternForOperators = /[+\-*\/^]/g;
  if (e.key.match(patternForNums)) {
    e.preventDefault();
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  }
  if (e.key.match(patternForOperators)) {
    e.preventDefault();
    calculator.chooseOperation(e.key);
    calculator.updateDisplay();
  }
  if (e.key === ".") {
    e.preventDefault();
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  }
  if (e.key === "Enter") {
    e.preventDefault();
    calculator.calculate();
    calculator.updateDisplay();
  }
  if (e.key === "Backspace") {
    e.preventDefault();
    calculator.backspace();
    calculator.updateDisplay();
  }
})

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
  }

  backspace() {
  this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(num) {
    // does not add another dot when current operand includes one yet
    if (num === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand + num;
  }

  chooseOperation(operation) {
    // does not choose operator because the first operand is not set
    if (this.currentOperand == "") return
    // calculate the operation of two operands when the third operand is chosen
    if (this.previousOperand !== "") {
      this.calculate()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  calculate() {
    let calculation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
      case "+":
        calculation = previous + current;
        break;
      case "-":
        calculation = previous - current;
        break;
      case "/":
        calculation = previous / current;
        break;
      case "*":
        calculation = previous * current;
        break;    
      case "^":
        calculation = Math.pow(previous, current);;
        break;  
      default:
        return
    }
    this.currentOperand = calculation;
    this.operation = undefined
    this.previousOperand = "";
  }

  getDisplayNumber(num) {
    const stringNum = num.toString();
    const integerDigits = parseFloat(stringNum.split('.')[0]);
    const decimalDigits = stringNum.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString('en') // { maximumFractionDigits: 10 })
    }
    if (decimalDigits !== undefined) {
      return `${integerDisplay}.${decimalDigits.slice(0, 5)}`; 
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand);
    if (this.operation !== undefined) {
      this.previousOperandTextElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }
    else {
      this.previousOperandTextElement.textContent = "";
    }
  }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);



