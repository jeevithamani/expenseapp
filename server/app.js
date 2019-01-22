require('./../config/config');

var express = require('express');
var {mongoose} = require('./db/mongoose');
var Expense = require('./models/expensetracker');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(require('./api'));


app.use(function(err, req, res, next) {
    res.status(422).send(err);
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
module.exports = app;