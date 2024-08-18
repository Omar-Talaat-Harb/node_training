'use strict';

let num1,num2,num3;
console.log(typeof(num1));

let str1 = "";
console.log(typeof(str1));

//var
var x = 4;
console.log(x);
function helloX() {
    x = 10;
    console.log(x);
}
helloX();
console.log(x);

//let
let y = 5;
console.log(y);
function helloY() {
    let y = 10;
    console.log(y);
}
helloY();
console.log(y);


//object
let user = {
    firstName: "omar",
    lastName: "harb",
    age: 25,
    address: "25 st...",
};
console.log(user.firstName);
console.log(user["firstName"]);


//array
let arr = [1,2,'ahmed',2.55,true];
console.log(typeof(arr));
console.log(arr[4]);
console.log(typeof(arr[4]));


//the difference between the + & - operator 

let a = 1;
let b = ' omar';
let c = a+b;
console.log(c);
console.log(typeof(c));

let num = 1;
let name =  '4omar';
let numName = a-b;
console.log(numName);
console.log(typeof(numName));

//sets
//no duplicated output
//no index in set
let set1 = new Set([1,2,3,3,4,4,5]);
console.log(set1);
console.log(set1.size);
console.log(set1[2]);
