'use strict';
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
console.log(arr[4]);
console.log(typeof(arr[4]));
