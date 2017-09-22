var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res) => {
  res.sendStatus(200);
});


var db = require('./db');

app.get('/getAccounts', (req, res) => {
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 20;
  let search = req.query.search;
  db.getAccounts(parseInt(skip), parseInt(limit), search)
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => res.status(500).send(err));

});








app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => { console.log('Listening on port ' + app.get('port')) });
