var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;
app.set('port', port);

app.use('/', express.static(path.join(__dirname, 'build/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/account.json', function(req, res) {
  fs.readFile('account.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
