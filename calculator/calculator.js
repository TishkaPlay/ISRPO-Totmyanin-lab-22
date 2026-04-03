export class Calculator {
    constructor(displayElement) {
        this.display = displayElement;
        this.expression = '';
        this.hasError = false;
    }

    init(buttons) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleButtonClick(btn.textContent);
            });
        });
    }

    handleButtonClick(value) {
        if (this.hasError && value !== 'C') {
            this.clear();
        }

        if (value === 'C') return this.clear();
        if (value === '=') return this.calculate();
        
        this.addToExpression(value);
    }

    addToExpression(value) {
        if (this.expression === '' && this.isOperator(value) && value !== '-') return;
        if (this.isLastCharOperator() && this.isOperator(value)) return;
        if (value === '.' && this.hasDuplicateDot()) return;

        this.expression += value;
        this.updateDisplay();
    }

    calculate() {
        if (!this.isValidExpression()) {
            return this.showError();
        }

        try {
            const result = this.safeEvaluate(this.expression);
            if (result === Infinity || result === -Infinity || isNaN(result)) {
                return this.showError();
            }
            this.expression = String(result);
            this.updateDisplay();
            this.hasError = false;
        } catch {
            this.showError();
        }
    }

    safeEvaluate(expr) {
        const safeExpr = expr.replace(/[^0-9+\-*/.() ]/g, '');
        return eval(safeExpr);
    }

    isValidExpression() {
        if (this.expression === '') return false;
        const lastChar = this.expression[this.expression.length - 1];
        if (this.isOperator(lastChar)) return false;
        return true;
    }

    clear() {
        this.expression = '';
        this.hasError = false;
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.expression || '0';
    }

    showError() {
        this.hasError = true;
        this.display.value = 'Ошибка';
    }

    isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    isLastCharOperator() {
        return this.expression.length > 0 && this.isOperator(this.expression[this.expression.length - 1]);
    }

    hasDuplicateDot() {
        const parts = this.expression.split(/[\+\-\*\/]/);
        const currentNumber = parts[parts.length - 1];
        return currentNumber.includes('.');
    }
}