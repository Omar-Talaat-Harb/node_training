let asyncData = async ()=> {
    let response = await fetch('https://jsonplaceholder.typicode.com/photos');
    let images = await response.json();
    return(images);
}
function wait(){
    return new Promise(resolve=>setTimeout(resolve, 3000));
}
async function changeImage(){
    let images = await  asyncData();
    let img = document.getElementById('imgid');
    for(let i=0; i<images.length; i++){
        // setInterval(()=>img.src = images[i].url,5000);
    //     // 
        await wait()
        img.src = images[i].url;
        console.log(i);
        
        }
    // console.log(images);
     //
}

// setInterval(changeImage, 3000);
// console.log(changeImage());
changeImage();