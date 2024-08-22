let x = 4 ;

//if else statement
if(x <0){
    console.log("x is negative");
}else{
    console.log("x is positive");
}

//ifelse statement

if(x <0){
    console.log("x is negative");
}else if(x === 0){
    console.log("x is 0");
}else{
    console.log("x is positive'elseif'");
}
//switch statement

switch(x){
    case -4:
        console.log("x is -4");
        break;
    case 0:
        console.log("x is 0");
        break;
    case 4:
        console.log("x is 4");
        break;
    default:
        console.log("x is not -4, 0, or 4");
}

//for loop
let arr = [2,4,6,8,10];

for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}


//while loop

let i = 0;
while(i < arr.length){
    console.log(arr[i]);
    i++;
}

//do while loop

let num = 0;
do{
    console.log(arr[num]);
    num++;
}while(num < arr.length);

//functions

function greet(name){
    console.log(`Hello ${name}😃 `);
}

greet("omar");

function sum(a, b){
    return a + b;
}
let calc = sum(4,14);
console.log(calc);
