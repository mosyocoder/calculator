const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculatorKeys");
const display = document.querySelector(".calculatorOutput");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
	display.value = displayValue;
}

keys.addEventListener("click", function (e) {
	const element = e.target;
	const value = element.value;

	if (!element.matches("button")) return;

	switch (value) {
		case "+":
		case "-":
		case "*":
		case "/":
		case "=":
			handleOperator(value);
			break;
		case ".":
			inputDecimal();
			break;
		case "clear":
			clear();
			break;
		default:
			inputNumber(value);
	}
	updateDisplay();
});

function handleOperator(op) {
	const value = parseFloat(displayValue);

	if (operator && waitingForSecondValue) {
		operator = op;
		return;
	}

	if (firstValue === null) {
		firstValue = value;
	} else if (operator) {
		const result = calculate(firstValue, value, operator);

		displayValue = parseFloat(result.toFixed(3));
		updateDisplay();
		firstValue = result;
	}

	waitingForSecondValue = true;

	operator = op;
}

function calculate(first, second, op) {
	if (op === "+") return first + second;
	else if (op === "-") return first - second;
	else if (op === "*") return first * second;
	else if (op === "/") return first / second;

	return second;
}

function inputNumber(num) {
	console;
	if (waitingForSecondValue) {
		displayValue = num;
		waitingForSecondValue = false;
	} else {
		displayValue === "0" ? (displayValue = num) : (displayValue += num);
	}
}

function inputDecimal() {
	if (!displayValue.includes(".")) displayValue += ".";
}

function clear() {
	displayValue = "0";
}
