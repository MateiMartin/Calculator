document.addEventListener('DOMContentLoaded', function () {
    const color = document.querySelector('.color');
    const btns = document.querySelectorAll('.button');
    const display = document.querySelector('.text');
    const btn0 = document.querySelector('.zero');
    const btn1 = document.querySelector('.one');
    const btn2 = document.querySelector('.two');
    const btn3 = document.querySelector('.three');
    const btn4 = document.querySelector('.four');
    const btn5 = document.querySelector('.five');
    const btn6 = document.querySelector('.six');
    const btn7 = document.querySelector('.seven');
    const btn8 = document.querySelector('.eight');
    const btn9 = document.querySelector('.nine');
    const btnDot = document.querySelector('.dot');
    const btnEqual = document.querySelector('.equal');
    const btnPlus = document.querySelector('.plus');
    const btnMinus = document.querySelector('.minus');
    const btnMultiply = document.querySelector('.multiply');
    const btnDivide = document.querySelector('.divide');
    const btnClear = document.querySelector('.C');
    const btnBackspace = document.querySelector('.delete');

    //change color
    color.addEventListener('input', function () {
        btns.forEach(btn => {
            btn.style.backgroundColor = color.value;
            btn.style.color = 'white';

            btnClear.style.color = '#00FF00';
            btnDivide.style.color = '#00FF00';
            btnDivide.style.color = '#00FF00';
            btnMultiply.style.color = '#00FF00';
            btnMinus.style.color = '#00FF00';
            btnPlus.style.color = '#00FF00';
            
            display.style.borderColor = color.value;
            display.style.color = color.value;
            btnEqual.style.filter = 'invert(100%)';
            btn.addEventListener('mouseover', function() {
                btn.style.backgroundColor = '#FFC0CB';
            });
            btn.addEventListener('mouseout', function() {
                btn.style.backgroundColor = color.value;
            });
        });
    });



    function validDot(str) {//check if there is a dot in the number for the dot event listener
        let isDot = false;
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] === '.')
                isDot = true;
            if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/' || i === 0) {
                if (isDot)
                    return false;
                else
                    return true;
            }
        }
    }

    btn0.addEventListener('click', () => { display.value += 0 });
    btn1.addEventListener('click', () => { display.value += 1 });
    btn2.addEventListener('click', () => { display.value += 2 });
    btn3.addEventListener('click', () => { display.value += 3 });
    btn4.addEventListener('click', () => { display.value += 4 });
    btn5.addEventListener('click', () => { display.value += 5 });
    btn6.addEventListener('click', () => { display.value += 6 });
    btn7.addEventListener('click', () => { display.value += 7 });
    btn8.addEventListener('click', () => { display.value += 8 });
    btn9.addEventListener('click', () => { display.value += 9 });
    btnDot.addEventListener('click', () => {
        if (display.value[display.value.length - 1] === '.' || display.value[display.value.length - 1] === '+' || display.value[display.value.length - 1] === '-' || display.value[display.value.length - 1] === '*' || display.value[display.value.length - 1] === '/' || !display.value || !validDot(display.value))
            display.value += '';
        else
            display.value += '.'
    });


    btnPlus.addEventListener('click', () => {
        if (display.value[display.value.length - 1] === '+' || display.value[display.value.length - 1] === '-' || display.value[display.value.length - 1] === '*' || display.value[display.value.length - 1] === '/')
            display.value += '';
        else
            display.value += '+'
    });
    btnMinus.addEventListener('click', () => {
        if (display.value[display.value.length - 1] === '+' || display.value[display.value.length - 1] === '-' || display.value[display.value.length - 1] === '*' || display.value[display.value.length - 1] === '/')
            display.value += '';
        else
            display.value += '-'
    });
    btnMultiply.addEventListener('click', () => {
        if (display.value[display.value.length - 1] === '+' || display.value[display.value.length - 1] === '-' || display.value[display.value.length - 1] === '*' || display.value[display.value.length - 1] === '/' || !display.value)
            display.value += '';
        else
            display.value += '*'
    });
    btnDivide.addEventListener('click', () => {
        if (display.value[display.value.length - 1] === '+' || display.value[display.value.length - 1] === '-' || display.value[display.value.length - 1] === '*' || display.value[display.value.length - 1] === '/' || !display.value)
            display.value += '';
        else
            display.value += '/'
    });
    btnClear.addEventListener('click', () => { display.value = '' });
    btnBackspace.addEventListener('click', () => { display.value = display.value.slice(0, -1) });

    //equal button
    btnEqual.addEventListener('click', () => {
        let str = display.value;
        if (str[0] !== '+' && str[0] !== '-')
            str = '+' + str;

        if (str[str.length - 1] === '+' || str[str.length - 1] === '-' || str[str.length - 1] === '*' || str[str.length - 1] === '/') {
            //remove the last character
            str = str.slice(0, -1);
            str += '+0';
        }

        str = '0' + str;

        //separate the numbers and operators in a string array keeping the order of the string
        let arr = [];
        let num = '';
        for (let i = 0; i < str.length; i++) {
            if (i === str.length - 1) {
                num += str[i];
                arr.push(num);
            }
            else
                if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {
                    arr.push(num);
                    arr.push(str[i]);
                    num = '';
                }
                else
                    num += str[i];
        }

        while (arr.indexOf('*') !== -1 || arr.indexOf('/') !== -1) {

            if (arr.indexOf('*') !== -1) {
                let index = arr.indexOf('*');
                let num1 = parseFloat(arr[index - 1]);
                let num2 = parseFloat(arr[index + 1]);
                let result = num1 * num2;
                arr.splice(index - 1, 3, result.toString());
            }
            else if (arr.indexOf('/') !== -1) {
                let index = arr.indexOf('/');
                let num1 = parseFloat(arr[index - 1]);
                let num2 = parseFloat(arr[index + 1]);
                let result = num1 / num2;
                arr.splice(index - 1, 3, result.toString());

            }

        }
        let ans = 0;
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] === '+')
                ans += Number(arr[i + 1]);
            else if (arr[i] === '-')
                ans -= Number(arr[i + 1]);

        }
        display.value = ans.toString();
    });
});