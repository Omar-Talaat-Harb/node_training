"use strict";
// let data = fetch('https://jsonplaceholder.typicode.com/posts').then(Response=>{
//     return Response.json();
// }).then(data=>{
//     console.log(data[2].title);
// }).catch(error=>{
//     console.log('Error:', error);
// }).finally(()=>{
//     console.log('succeed');
// });

let asyncData = async ()=> {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    function printTitle(){
        let random = Math.floor(Math.random()*100);
        let x = random + ` ${data[random].title}`;
        document.querySelector('.paragraph').textContent = x ;
    }
    setInterval(printTitle,3000)
}
asyncData();




