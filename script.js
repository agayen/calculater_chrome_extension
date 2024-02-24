document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('clearBtn')?.addEventListener('click', clearDisplay);

    const operators = ['/', '-', '*', '+', '.'];
    operators.forEach(operator => {
        document.getElementById(`add${operator.toUpperCase()}`)?.addEventListener('click', () => appendToDisplay(operator));
    });

    for (let i = 0; i <= 9; i++) {
        document.getElementById(`add${i}`)?.addEventListener('click', () => appendToDisplay(i));
    }

    document.getElementById('calculate')?.addEventListener('click', calculate);
    document.getElementById('delete')?.addEventListener('click', removeToDisplay);
});

let inputStr = '';

function appendToDisplay(value) {
    if(inputStr === ''){
        document.getElementById('display').value = value;
    }else{
        document.getElementById('display').value += value;
    }

    inputStr += value;
}

function removeToDisplay() {
    var display = document.getElementById('display');
    var currentInput = display.value;

    // Check if the display is not empty
    if (currentInput.length > 0) {
        // Remove the last character
        var newInput = currentInput.slice(0, -1);

        // Update the display
        display.value = newInput;

        // Update the inputStr variable if needed
        inputStr = newInput;
    }
}

function clearDisplay() {
    inputStr = '';
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        document.getElementById('display').value = evaluateExpression(inputStr);
    } catch (error) {
        document.getElementById('display').value = "error";
        inputStr = '';
    }
}

function evaluateExpression(expression) {
    // Tokenize the expression
    const tokens = expression.match(/\d+(\.\d+)?|\+|\-|\*|\//g);

    // Error handling for invalid expressions
    if (!tokens || tokens.length === 0) {
        throw new Error('Invalid expression token');
    }

    let result = parseFloat(tokens[0]); // Initialize result with the first number

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);

        // Error handling for invalid operators or missing operands
        if (!['+', '-', '*', '/'].includes(operator) || isNaN(operand)) {
            throw new Error('Invalid expression');
        }

        // Perform the operation
        switch (operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                // Error handling for division by zero
                if (operand === 0) {
                    throw new Error('Division by zero');
                }
                result /= operand;
                break;
        }
    }

    return result;
}


