const fs = require("fs");
const superagent = require ('superagent');

//new read function using promises
const readFileP = file => {
    return new Promise((resolve,reject) => {
        fs.readFile(file, (err,data) => {
            if(err) reject('there is no file !');
            resolve(data);
        });
    });
};

const writeFileP= (file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
            if(err) reject('there is no file!');
            resolve('success');
        });
    });
}
// readFileP(`${__dirname}/dog.txt`).then(data=>{
//     console.log(`Breed : ${data}`);

//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res=>{
//         // if(err) return console.log(err.message);
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt',res.body.message,err=>{
//             if(err) return console.log(err.message);
//             console.log('random dog image saved to file');
//         });
//     }).catch(err=>{
//         console.log(err.message);
//     })
// });

//normal read file--------------
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed : ${data}`);

//callback hell------------
/*
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`).then(res=>{
            
        })
        .end((err,res)=>{
            if(err) return console.log(err.message);
            console.log(res.body.message);

            fs.writeFile('dog-img.txt',res.body.message,err=>{
                if(err) return console.log(err.message);
                console.log('random dog image saved to file');
            });
        });
});
*/

//promise chaining (then method :for success,catch method :for handling error)-------------
/*
superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res=>{
        // if(err) return console.log(err.message);
        console.log(res.body.message);

        fs.writeFile('dog-img.txt',res.body.message,err=>{
            if(err) return console.log(err.message);
            console.log('random dog image saved to file');
        });
    }).catch(err=>{
        console.log(err.message);
    })
});
*/

//(promises using then catch)
/*
readFileP(`${__dirname}/dog.txt`)
    .then(data=>{
    console.log(`Breed : ${data}`);
    return superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res=>{
        console.log(res.body.message);
        return writeFileP('dog-img.txt',res.body.message);
    }).
    then(()=>{
    console.log('random dog image saved to file');
    })
    .catch(err=>{
        console.log(err);
    });
*/
// async await
const getDogPic = async () => {
    try{
        const data = await readFileP(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);
    // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    
    //to add more than 1 image in the same time.
    const res1 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const all = await Promise.all([res1,res2,res3]);
    //create new array with only the body messages-----------(el-> the current value in each iteration and we will return as el.body.message )
    const imgs = all.map(el =>el.body.message);
    // console.log(imgs)
    // console.log(res.body.message);
    // await writeFileP('dog-img.txt',res.body.message);
    await writeFileP('dog-img.txt',imgs.join('\n'));
    console.log('random dog image saved to file');
    } catch (err) {
        console.log(err);
        throw err;
    }
    return 'num 2🐶';
};

//how promises work

/*
console.log('num 1');
getDogPic()
.then (x=>{
    console.log(x);
    console.log('num 3');
})
.catch(err =>{
    console.log('error💥💥');
});
*/

//better way to declare it
(async ()=>{
    try{
        console.log('num 1');
        const x = await getDogPic();
        console.log(x);
        console.log('num 3');
    }catch(err){
        console.log('error💥💥');
    }
})();