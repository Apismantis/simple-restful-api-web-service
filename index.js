var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var students = [
  {"id": "1312678", "name": "Lê Băng Tú", "class": "13CTT3"},
  {"id": "1312112", "name": "Nguyễn Hòang Việt", "class": "13CTT3"},
  {"id": "1312113", "name": "Nguyễn Thị Hoa", "class": "13CTT3"},
  {"id": "1312114", "name": "Trần Văn Tuấn", "class": "13CTT3"},
  {"id": "1312115", "name": "Nguyễn Quốc Tuấn", "class": "13CTT3"}
];

// GET 
app.get('/students', function(req, res) {
    res.json(students);
});

// POST
app.post('/students', function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var sClass = req.body.class;

    for(var i = 0; i < students.length; i++) {
        if(students[i].id == id) {
          res.json(students);
        }
    }

    students.push(req.body);
    res.json(students);
});

// PUT
app.put('/students/:s_id', function(req, res) {
    students[req.params.s_id] = req.body;
    res.send(students);
    res.json(students);
});

// DELETE
app.delete('/students/:s_id', function(req, res) {
    var id = req.params.s_id;
    students.splice(id, 1);
    res.json(students);
});

var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Server running at http://localhost:8080');
});
