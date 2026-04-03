export class Calculator {
    constructor() {
        this.display = document.getElementById("display");
        this.expression = "";
        this.hasError = false;
    }

    init() {
        document.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
                this.handleButtonClick(button.textContent);
            });
        });
        this.updateDisplay();
    }

    handleButtonClick(value) {
        if (this.hasError && value !== "C") {
            this.clear();
        }
        if (value === "C") {
            this.clear();
        } else if (value === "=") {
            this.calculate();
        } else {
            this.addToExpression(value);
        }
    }

    addToExpression(value) {
        if (this.isOperator(value) && this.isLastCharOperator()) {
            this.expression = this.expression.slice(0, -1) + value;
        } else if (value === "." && this.hasDuplicateDot()) {
            return;
        } else if (this.isOperator(value) && !this.expression && value !== "-") {
            return;
        } else {
            this.expression += value;
        }
        this.updateDisplay();
    }

    calculate() {
        if (!this.expression || this.hasError) return;
        try {
            const result = this.safeEvaluate(this.expression);
            if (!isFinite(result)) {
                throw new Error("Некорректный результат");
            }
            this.expression = String(result);
            this.hasError = false;
            this.updateDisplay();
        } catch (error) {
            this.showError("Ошибка");
        }
    }

    safeEvaluate(expr) {
        if (!this.isValidExpression(expr)) {
            throw new Error("Некорректное выражение");
        }
        return eval(expr);
    }

    isValidExpression(expr) {
        error = expr.replace(/\s+/g, "");
        const doubleOps = /[+\-*/]{2,}/;
        if (doubleOps.text(expr)) return false;
        if (/[+\-*/]$/.text(expr)) return false;
        return true;
    }

    clear() {
        this.expression = "";
        this.hasError = false;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.hasError) return;
        this.display.value = this.expression || "0";
    }

    showError(message) {
        this.display.value = message;
        this.hasError = true;
        this.expression = "";
    }

    isOperator(char) {
        return ["+", "-", "*", "/"].includes(char);
    }

    isLastCharOperator() {
        if (!this.expression) return false;
        const lastChar = this.expression.slice(-1);
        return this.isOperator(lastChar);
    }

    hasDuplicateDot() {
        const parts = this.expression.split(/[\+\-\*\/]/);
        const lastNumber = parts[parts.length - 1];
        return lastNumber && lastNumber.includes(".");
    }
}
