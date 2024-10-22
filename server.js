// gyümölcsök nyilvantartasa
const express = require('express'); //synchron csatlakozás
const app = express();
const port = 3000;
const cors = require('cors');
const { charsets } = require('mime');
app.use(cors({origin: 'http://localhost:3000'}));
const fs = require('fs');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

let errors = [];
let fruits = [
    {
        "megnevezes": "Alma",
        "egysegar": "200",
        "mennyisegiEgyseg": "db",
        "mennyiseg": "1"
    }
];
let success = true;

app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html; charset=utf8');
    res.status(200).sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    res.header('Content-Type', 'text/html');
    let fruit = req.body;
    if(fruit.megnevezes.length < 5) {
        success = false;
        errors.push('A megnevezés legalább 5 karakter hosszú kell legyen!');
    }
    if(fruit.egysegar <= 1) {
        success = false;
        errors.push('Az egységár egynél nagyobb kell legy!');
    }
    if(fruit.mennyiseg <= 0) {
        success = false;
        errors.push('A mennyiség nullánál nagyobb kell legyen!');
    }
    if(success) {
        fruits.push(fruit);
        res.status(200).sendFile(__dirname + '/public/index.html');//.send({success: true, fruits: fruits, errors: errors});
    }
    else {
        res.status(300).sendFile(__dirname + '/public/index.html');
        var alert = "";
        for (let i = 0; i < errors.length; i++) {
            alert += errors[i] + "\n";
        }
        console.log(alert);
    }
})

//Összes gyümölcs lekérdezése
app.get('/fruit', (re, res) => {
    res.header('Content-Type',);
    res.json(fruits);
    res.status(200);
});

//Egy gyümölcs lekérdezése
app.get('/fruit/:id', (req, res) => {
    let id = req.params.id;
    res.header('Content-Type',);
    res.json(fruits[id - 1]);
    res.status(200);
});

//Új gyümölcs létrehozása
app.post('/fruit', (req, res) => {
    let newFruit = req.body;
    fruits.push(newFruit);
    res.status(200);
    res.send(JSON.stringify(newFruit));
});

//Egy gyümölcs módosítása
app.put('/fruit/:id', (req, res) => {
    let id = req.params.id;
    let updatedFruit = req.body;
    fruits[0] = updatedFruit;
    res.send(JSON.stringify(updatedFruit));
});

//Egy gyümölcs törlése
app.delete('/fruit/:id', (req, res) => {
    let id = req.params.id;
    fruits.splice(id - 1, 1);
res.send(fruits[id -1]);
})

app.listen(port, () => {
    console.log(`Elérési port: ${port}`);
});