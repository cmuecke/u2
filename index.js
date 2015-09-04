/* eslint-env: node */
'use strict';

var express = require('express'),
    hbs = require('express-handlebars'),
    path = require('path'),
    livereload = require('connect-livereload'),
    routes = require('./controller');
console.log(routes);
var app = express();

// LIVERELOAD
app.use(livereload({port: 35729}));

// TEMPLATE ENGINE
app.engine('.hbs', hbs({
    defaultLayout: 'page',
    extname: '.hbs',
    layoutsDir: 'theme/layouts/',
    partialsDir: 'theme/partials/'
}));

app.set('view engine', '.hbs');
app.set('views', path.resolve('theme'));

// ROUTES
app.use('/data', express.static('mock-data'));
app.use('/dist', express.static('theme/dist'));

app.use('/', routes.startpage);
app.use('/product', routes.product);

app.listen(8080, function () {
    console.log('Listening on http://%s:%s', 'localhost', 8080);
});
