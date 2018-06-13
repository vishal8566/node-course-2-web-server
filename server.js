const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n');
    next();
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) =>{
  res.render('home.hbs', {
      pageTitle : 'Home Page Title',
      welcomeMessage: 'Welcome to my website'
  });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page title'
    });
});

app.listen(port, ()=>{
  console.log(`Server is ruuning on port : ${port}`);
});
