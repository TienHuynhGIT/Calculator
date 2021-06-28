class Calculator {
    constructor(pastOpDisplay, currentOpDisplay) {
        this.pastOpDisplay = pastOpDisplay;
        this.currentOpDisplay = currentOpDisplay;
        this.clear()
    }

    clear() {
        this.pastOp = "";
        this.currentOp = "";
        this.op = null;
    }

    del() {
        this.currentOp = this.currentOp.toString().slice(0, -1);
    }

    insertNum(num) {
        if (num === "." && this.currentOp.includes(".")) {
            return;
        }
        this.currentOp = this.currentOp.toString() + num.toString();
    }

    insertOp(op) {
        if (this.currentOp == "") {
            return;
        }
        if (this.pastOp != "") {
            this.calc();
        } 
        this.op = op;
        this.pastOp = this.currentOp;
        this.currentOp = "";
    }

    calc() {
        let result;
        const firstValue = parseFloat(this.pastOp);
        const secondValue = parseFloat(this.currentOp);
        if (isNaN(firstValue) || isNaN(secondValue)) {
            return;
        }
        else if (this.op == "%") {
            result = firstValue % secondValue;
        }
        else if (this.op == "/") {
            result = firstValue / secondValue;
        }
        else if (this.op == "*") {
            result = firstValue * secondValue;
        }
        else if (this.op == "+") {
            result = firstValue + secondValue;
        }
        else if (this.op == "-") {
            result = firstValue - secondValue;
        }
        else {
            return;
        }
        this.currentOp = Math.round(result * 100) / 100;
        this.op = null;
        this.pastOp = "";
    }

    updateDisplay() {
        this.currentOpDisplay.innerText = this.currentOp;
        if (this.op != null) {
            this.pastOpDisplay.innerText = this.pastOp + " " + this.op;
        }
        else {
            this.pastOpDisplay.innerText = this.pastOp;
        }
    }
}

const numBtn = document.querySelectorAll("[data-num]");
const opBtn = document.querySelectorAll("[data-op]");

const pastOpDisplay = document.querySelector("[data-past-op]");
const currentOpDisplay = document.querySelector("[data-current-op]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-del]");
const calcBtn = document.querySelector("[data-calc]");

const calculator = new Calculator(pastOpDisplay, currentOpDisplay);

numBtn.forEach(function(button) {
    button.addEventListener("click", function() {
        calculator.insertNum(button.innerText);
        calculator.updateDisplay();
    })
})

opBtn.forEach(function(button) {
    button.addEventListener("click", function() {
        calculator.insertOp(button.innerText);
        calculator.updateDisplay();
    })
})

calcBtn.addEventListener("click", function() {
    calculator.calc();
    calculator.updateDisplay();
})

clearBtn.addEventListener("click", function() {
    calculator.clear();
    calculator.updateDisplay();
})

delBtn.addEventListener("click", function() {
    calculator.del();
    calculator.updateDisplay();
})