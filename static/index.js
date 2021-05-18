root = document.querySelector(':root');

// Change THEME starts
let theme = 0;

function updateTheme(){
    if(theme===0){
        root.style.setProperty('--main-background-clr','hsl(222, 26%, 31%)');
        root.style.setProperty('--keypad-background-clr','hsl(223, 31%, 20%)');
        root.style.setProperty('--screen-background-clr','hsl(224, 36%, 15%)');

        root.style.setProperty('--toogle-clr','hsl(6, 63%, 50%)');

        root.style.setProperty('--key-background-clr','hsl(30, 25%, 89%)');
        root.style.setProperty('--key-shadow-clr','hsl(28, 16%, 65%)');
        root.style.setProperty('--key-del-background-clr','hsl(225, 21%, 49%)');
        root.style.setProperty('--key-del-shadow-clr','hsl(224, 28%, 35%)');
        root.style.setProperty('--key-eql-background-clr','hsl(6, 63%, 50%)');
        root.style.setProperty('--key-eql-shadow-clr','hsl(6, 70%, 34%)');

        root.style.setProperty('--key-text-clr','hsl(221, 14%, 31%)');

        root.style.setProperty('--display-text-clr','white');

        root.style.setProperty('--theme-btn-pos','5px');
    }
    if(theme===1){
        root.style.setProperty('--main-background-clr','hsl(0, 0%, 90%)');
        root.style.setProperty('--keypad-background-clr','hsl(0, 5%, 81%)');
        root.style.setProperty('--screen-background-clr','hsl(0, 0%, 93%)');

        root.style.setProperty('--toogle-clr','hsl(25, 98%, 40%)');

        root.style.setProperty('--key-background-clr','hsl(45, 7%, 89%)');
        root.style.setProperty('--key-shadow-clr','hsl(35, 11%, 61%)');
        root.style.setProperty('--key-del-background-clr','hsl(185, 42%, 37%)');
        root.style.setProperty('--key-del-shadow-clr','hsl(185, 58%, 25%)');
        root.style.setProperty('--key-eql-background-clr','hsl(25, 98%, 40%)');
        root.style.setProperty('--key-eql-shadow-clr','hsl(25, 99%, 27%)');

        root.style.setProperty('--key-text-clr','hsl(60, 10%, 19%)');

        root.style.setProperty('--display-text-clr','hsl(60, 10%, 19%)');

        root.style.setProperty('--theme-btn-pos','25px');
    }
    if(theme===2){
        root.style.setProperty('--main-background-clr','hsl(268, 75%, 9%)');
        root.style.setProperty('--keypad-background-clr','hsl(268, 71%, 12%)');
        root.style.setProperty('--screen-background-clr','hsl(268, 71%, 12%)');

        root.style.setProperty('--toogle-clr','hsl(176, 100%, 44%)');

        root.style.setProperty('--key-background-clr','hsl(268, 47%, 21%)');
        root.style.setProperty('--key-shadow-clr','hsl(290, 70%, 36%)');
        root.style.setProperty('--key-del-background-clr','hsl(281, 89%, 26%)');
        root.style.setProperty('--key-del-shadow-clr','hsl(177, 92%, 70%)');
        root.style.setProperty('--key-eql-background-clr','hsl(176, 100%, 44%)');
        root.style.setProperty('--key-eql-shadow-clr','hsl(176, 100%, 44%)');

        root.style.setProperty('--key-text-clr','hsl(52, 100%, 62%)');

        root.style.setProperty('--display-text-clr','hsl(52, 100%, 62%)');

        root.style.setProperty('--theme-btn-pos','45px');
    }
}

updateTheme();

function handleTheme(){
    theme+=1;
    theme = theme%3;
    updateTheme();
}

themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click',handleTheme);
// Change THEME ends



let displayElm = document.getElementsByClassName('display')[0];


// Taking Input and displaying it on the screen
function handleInput(event){
    let input = event.target.innerText;
    if(input == 'DEL'){
        let dis = displayElm.value;
        displayElm.value = dis.slice(0,dis.length-1);
    }
    else{
        displayElm.value = displayElm.value +  input;
    }
}


smallButtons = document.getElementsByClassName('small-btn');
let length = smallButtons.length;

for(let i=0;i<length;i++){
    currBtn = smallButtons[i];
    currBtn.addEventListener('click',handleInput);
}



// Reset functionality
document.getElementById('reset').addEventListener('click',()=>{
    displayElm.value = '';
    
})


// Submit Functionality

let validNum = {'0':1,'1':0,'2':1,'3':1,'4':1,'5':1,'6':1,'7':1,'8':1,'9':1,'.':1};
let validOper = {'x':1,'+':1,'-':1,'/':1}

document.getElementById('submit').addEventListener('click',()=>{
    let input = displayElm.value;
    // Handling Errors
    if(input.length==0){
        displayElm.value = '';
        return;
    }
    if(!(input[0] in validNum) && !(input[input.length-1] in validNum)){
        displayElm.value = '';
        return;
    }

    // Handling output
    let temp = ''
    let numbers = [];
    let operations = [];
    for(let i=0; i<input.length; i++){
        let val = input[i];
        
        if (!(val in validNum) && !(val in validOper)){
            displayElm.value = '';
            return;
        }

        if(val in validNum){
            if(temp in validOper){
                temp = '';
            }
            temp += val;
        }
        else{
            if( temp in validOper){
                displayElm.value = '';
                return;
            }
            numbers.push(Number(temp));
            temp = val;
            operations.push(val);
        }
    }
    numbers.push(Number(temp));

    if(numbers.length !== operations.length + 1){
        displayElm.value = '';
        return;
    }

    // Division
    let index = 0;
    let length = operations.length;
    while(index<length){
        if(operations[index]==='/'){
            let res = numbers[index] / numbers[index+1];
            numbers[index] = res;
            numbers.splice(index+1, 1);
            operations.splice(index,1);
            length -= 1;
        }
        else{
            index += 1;
        }
    }

    // Multiply
    index = 0;
    length = operations.length;
    while(index<length){
        if(operations[index]==='x'){
            let res = numbers[index] * numbers[index+1];
            numbers[index] = res;
            numbers.splice(index+1, 1);
            operations.splice(index,1);
            length -= 1;
        }
        else{
            index += 1;
        }
    }

    // Add Sub
    index = 0;
    length = operations.length;
    while(index<length){
        if(operations[index]==='+'){
            let res = numbers[index] + numbers[index+1];
            numbers[index] = res;
            numbers.splice(index+1, 1);
            operations.splice(index,1);
            length -= 1;
        }
        else if(operations[index]==='-'){
            let res = numbers[index] - numbers[index+1];
            numbers[index] = res;
            numbers.splice(index+1, 1);
            operations.splice(index,1);
            length -= 1;
        }
        else{
            index += 1;
        }
    }

    displayElm.value = numbers[0];
})