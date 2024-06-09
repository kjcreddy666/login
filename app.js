const express = require('express');
const app = express();
const port = 80;

app.set('views', './views');

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});