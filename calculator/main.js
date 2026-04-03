import { Calculator } from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    const calc = new Calculator(display);
    calc.init(buttons);
});

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const clearBtn = document.querySelector('button.C');

let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            expression = '';
            display.value = '';
            return;
        }

        if (value === '=') {
            try {
                const result = eval(expression);
                expression = String(result);
                display.value = result;
            } catch (error) {
                display.value = 'Ошибка';
                expression = '';
            }
            return;
        }

        expression += value;
        display.value = expression;
    });
});