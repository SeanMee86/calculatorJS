const Calculator = function(){
    this.inputArray = [];
    this.mathArray = [];
    this.cacheArray = [];

    this.disableKeyPress = () => {
        document
            .getElementById('input')
            .addEventListener('keypress', (ev => ev.preventDefault()))
    };

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
                console.error("invalid");
        }
        if(result === 1/0){
            result = "ERROR";
        }
        this.cacheArray = [operator,num2];
        this.inputArray = [];
        this.mathArray = [];
        this.inputArray.push(result);
        return this.inputArray[0];
    };

    this.numClick = function(){
        console.log(this.inputArray);
        document
            .getElementById('input')
            .setAttribute('value', inputArray.join(''));
    };

    this.addNumClick = function(){
        Array
            .from(document.getElementsByClassName('number'))
            .forEach(num => {num.addEventListener('click', this.numClick.bind(this))});

    };

    this.addEventHandlers = () => {
        this.addNumClick();
        this.disableKeyPress();
    };
};

const calculator = new Calculator();

var inputArray = [];
var mathArray = [];
var cacheArray = [];

//**********************************************************************************************************************

$(document).ready(function(){

    calculator.addEventHandlers();

    function disableKeyPress() {
        $('#input').on('keypress', function () {
            return false;
        });
    }

//**********************************************************************************************************************

    function do_math(num1,num2,operator){
        num1 = parseFloat(mathArray[0]);
        operator = mathArray[1];
        num2 = parseFloat(mathArray[2]);
        switch(operator){
            case "+":
                var result = num1 + num2;
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
                console.error("invalid");
        }
        if(result === 1/0){
            result = "ERROR";
        }
        cacheArray = [operator,num2];
        inputArray = [];
        mathArray = [];
        inputArray.push(result);
        return inputArray[0];
    }

//**********************************************************************************************************************

    //BEGIN EVENT HANDLERS

    // function numberClick(){
    //     inputArray.push($(this).find('p').text());
    //     $('#input').val(inputArray.join(''));
    // }

    function decimalClick(){
        if (inputArray
            .join()
            .toString()
            .split('')
            .includes('.')){
            return false;
        }
        else {
            inputArray.push($(this).find('p').text());
            $('#input').val(inputArray.join(''));
        }
    }

    function operatorClick(){
        if(isNaN(inputArray[inputArray.length-1]) && inputArray[inputArray.length-1] !== '.'){
            mathArray.pop();
            mathArray.push($(this).find('p').text());
            return;
        }
        if(mathArray.length===2){
            mathArray.push(inputArray.join(''));
            $('#input').val(do_math());
            mathArray.push(inputArray[0]);
            mathArray.push($(this).find('p').text());
            inputArray = [];
        }
        else {
            mathArray.push(inputArray.join(''));
            mathArray.push($(this).find('p').text());
            inputArray = [];
        }
    }

    function equalsClick(){
        mathArray.push(inputArray.join(''));
        if(mathArray.length === 3) {
            $('#input').val(do_math());
        }
        else if(inputArray.length ===1){
            mathArray.push(cacheArray[0]);
            mathArray.push(cacheArray[1]);
            $('#input').val(do_math());
        }
        else{

        }
    }

    function clearClick(){
        inputArray.pop();
        $('#input').val(inputArray.join(''));
    }

    function allClearClick(){
        $('#input').val("");
        inputArray = [];
        mathArray = [];
    }

    function clickHandler(){
        $('.decimal').click(decimalClick);
        $('.clear').click(clearClick);
        $('.allClear').click(allClearClick);
        $('.number').click(numberClick);
        $('.operator').click(operatorClick);
        $('.equals').click(equalsClick);
    }

    //END EVENT HANDLERS

//**********************************************************************************************************************

    // clickHandler();
    // disableKeyPress();
    // calculator.disableKeyPress()
});