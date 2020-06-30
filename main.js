const Calculator = function(){
    this.inputArray = [];
    this.mathArray = [];
    this.cacheArray = [];

    // Disable Keyboard Input
    this.disableKeyPress = () => {
        document
            .getElementById('input')
            .addEventListener('keypress', (ev => ev.preventDefault()))
    };

    // Combine Input Array To Show In Calculator Input Field
    this.combineInputArray = () => {
        document
            .getElementById('input')
            .setAttribute('value', this.inputArray.join(''));
    };

    // Define Button Click Functionalities
    this.numClick = (e) => {
        this.inputArray.push(e.target.innerText);
        this.combineInputArray();
    };

    this.decimalClick = (e) => {
        if (this.inputArray
            .join()
            .toString()
            .split('')
            .includes('.')){
            return false;
        }
        else {
            this.inputArray.push(e.target.innerText);
            this.combineInputArray()
        }
    };

    this.operatorClick = (e) => {
        if(isNaN(this.inputArray[this.inputArray.length-1]) && this.inputArray[this.inputArray.length-1] !== '.'){
            this.mathArray.pop();
            this.mathArray.push(e.target.innerText);
            return;
        }
        if(this.mathArray.length === 2){
            this.mathArray.push(this.inputArray.join(''));
            this.showMath();
            this.mathArray.push(this.inputArray[0]);
            this.mathArray.push(e.target.innerText);
            this.inputArray = [];
        }
        else {
            this.mathArray.push(this.inputArray.join(''));
            this.mathArray.push(e.target.innerText);
            this.inputArray = [];
        }
    };

    this.equalsClick = () => {
        this.mathArray.push(this.inputArray.join(''));
        if(this.mathArray.length === 3) {
            this.showMath()
        }
        else if(this.inputArray.length === 1){
            this.mathArray.push(this.cacheArray[0]);
            this.mathArray.push(this.cacheArray[1]);
            this.showMath();
        }
    };

    this.clearClick = () => {
        this.inputArray.pop();
        this.combineInputArray();
    };

    this.allClearClick = () => {
        document.getElementById('input')
            .setAttribute('value', '');
        this.inputArray = [];
        this.mathArray = [];
    };

    // Handle Button Clicks
    this.numClickHandler = () => {
        Array
            .from(document.getElementsByClassName('number'))
            .forEach(num => {num.addEventListener('click', this.numClick)});
    };

    this.decimalClickHandler = () => {
        document
            .getElementById('decimal')
            .addEventListener('click', this.decimalClick)
    };

    this.operatorClickHandler = () => {
        Array
            .from(document.getElementsByClassName('operator'))
            .forEach(op => {op.addEventListener('click', this.operatorClick)})
    };

    this.equalsClickHandler = () => {
        document.getElementById('equals')
            .addEventListener('click', this.equalsClick)
    };

    this.clearClickHandler = () => {
        document.getElementById('clear')
            .addEventListener('click', this.clearClick)
    };

    this.allClearClickHandler = () => {
        document.getElementById('allClear')
            .addEventListener('click', this.allClearClick)
    };

    // Perform The Arithmetic Given To Us By Our Math Array.
    this.arithmetic = (num1,num2,operator) => {
        let result;

        switch(operator){
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*" || "x" || "X":
                result = num1 * num2;
                break;
            case "/":
                result = num1/num2;
                break;
            default:
                console.error("Invalid Operator Passed!");
        }

        result === 1/0 ? result = "ERROR" : null;

        // Cache Our Result And Reset Input and Math Arrays
        this.cacheArray = [operator,num2];
        this.inputArray = [];
        this.mathArray = [];
        this.inputArray.push(result);
        return this.inputArray[0];
    };

    // Show The Returned Value In Our Calculator's Input Field
    this.showMath = () => {
        document
            .getElementById('input')
            .setAttribute(
                'value',
                this.arithmetic(parseFloat(this.mathArray[0]), parseFloat(this.mathArray[2]), this.mathArray[1])
            );
    };

    // Instantiate Event Handlers
    this.addEventHandlers = () => {
        this.numClickHandler();
        this.decimalClickHandler();
        this.operatorClickHandler();
        this.equalsClickHandler();
        this.clearClickHandler();
        this.allClearClickHandler();
    };
};

const calculator = new Calculator();

window.onload = function() {
    calculator.addEventHandlers();
    calculator.disableKeyPress();
};
