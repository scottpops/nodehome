//var http = require('http');
var express = require('express');
    light = require('./routes/lights');

var app = express();


//app.get('/lights', function(req, res){
//    res.send([{name:'front door'}, {name:'entryway'}]);
//});

//app.get('/lights/:id', function(req,res){
//	res.send({id:req.params.id, name:"Tha Name", description:"Description"});
//});

app.configure(function(){
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/lights', light.findAll);
app.get('/lights/:id', light.findById);
app.post('/lights', light.addLight);
app.put('/lights/:id', light.updateLight);
app.delete('/lights/:id', light.deleteLight);

app.listen(3000);

//http.createServer(function (req, res) {
//	res.writeHead(200, {'Content-Type': 'text/plain'});
//	res.end('Hello World\n');
//}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
