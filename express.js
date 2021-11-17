const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

let addToCart = require('./server/addToCart/index.post');
let banners = require('./server/banners/index.get');
let categories = require('./server/categories/index.get');
let productsList = require('./server/products/index.get');


app.use(express.static(path.join(__dirname, "client")));
// app.use(express.static(path.join(__dirname, 'static')));
app.use('/static', express.static('static'));



app.use(express.json());
app.get('/', (req,res) => res.sendFile('./client/home/home.html', {root: __dirname}));

app.get('/login', (req,res) => res.sendFile('./client/login/Login.html', {root: __dirname}));

app.get('/cart', (req,res) => res.sendFile('./client/cart/cart.html', {root: __dirname}));

app.get('/register', (req,res) => res.sendFile('./client/register/Sign-up.html', {root: __dirname}));

app.get('/products', (req,res) => res.sendFile('./client/products/products.html', {root: __dirname}));

app.get('/banners', (req,res)=>{
   res.json(banners);
});

app.get('/categories', (req,res)=>{
    res.json(categories);
});

app.get('/productsList', (req,res)=>{
    res.json(productsList);
});

app.post('/addToCart', (req,res)=>{
    let newItemtoCart = req.body;

    res.end('success');
});



app.listen(port, () => console.log(`server listening on port : ${port}`));

