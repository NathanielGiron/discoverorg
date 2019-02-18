var express = require("express");
var fs = require('fs');
var csv = require('fast-csv');
var ws = fs.createWriteStream('test.csv');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var data = fs.readFileSync('./data.json');
  data = JSON.parse(data);

  var searchText = req.query.searchText;
  var field = req.query.field;

  if(field == "name"){
    if (searchText) {
      data = data.filter(function(company) {
        return company.name.toLowerCase() === searchText.toLowerCase();
      });
    }
  } else {
    if (searchText) {
      data = data.filter(function(company) {
        return company.numEmployees >= parseInt(searchText);
      });
    }
  }

  res.render('index', {companies: data});
});

app.get('/csv', function(req, res) {
  csv
   .write([
       ["a", "b"],
       ["a1", "b1"],
       ["a2", "b2"]
   ], {headers: true})
   .pipe(ws);
   res.render('csv');

});

app.listen(process.env.PORT || 3000)
