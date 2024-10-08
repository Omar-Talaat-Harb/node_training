const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate =require('./modules/replaceTemplate');

//blocking , synchronous way
// const textIn =fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `this is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('done');

//non-blocking , asynchronous way
//files
/*
fs.readFile('./txt/start.txt', 'utf-8',(err,data1)=>{
    fs.readFile(`./txt/${data1}.txt`, 'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8',(err,data3)=>{
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,err=>{
                console.log('your file has been written ');
            })
        });
    });
});
console.log('will read file');
*/
//server
const tempOverview =fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard =fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct =fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data =fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

    

const server = http.createServer((req,res)=>{
    const { query, pathname} = url.parse(req.url, true);
    // const pathName = req.url;


    //overview page
    if(pathname ==="/" || pathname === '/overview'){
        res.writeHead(200,{'content-type':'text/html'});

        const cardsHtml = dataObj.map(el=> replaceTemplate(tempCard,el) ).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);

    //product page    
    }else if(pathname ==='/product'){
        res.writeHead(200,{'content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct , product);
        // console.log(query);
        res.end(output);
    
    //api    
    }else if(pathname === '/api'){
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);

    //not found    
    }else{
        res.writeHead(404);
        res.end('page not found');
    }
    // res.end('     hello from the server');
});
server.listen(8000,'127.0.0.1',()=>{
    console.log('Server is running on port 8000');  //localhost:8000
});
