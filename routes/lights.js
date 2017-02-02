var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = require('bson').BSONPure; //mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect:true});
db = new Db('lightsdb', server);

db.open(function(err, db){
    if(!err){
        console.log("Connected to 'lights' database");
        db.collection('lights', {strict:true}, function(err, collection){
            if(err){
                console.log("The 'lights' collection does not exist.  Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req,res){
    var id = req.params.id;
    console.log('Retrieving light: ' + id);

    var test = new BSON.ObjectID(_id);
    console.log(test);
    db.collection('lights', function(err,collection){
        collection.findOne({'_id':id}, function(err, item){ //new BSON.ObjectID(id)
            res.send(item);
        });
    });
};

exports.findAll = function(req, res){
    db.collection('lights', function(err,collection){
        collection.find().toArray(function(err,items){
            res.send(items);
        });
    });
};

exports.addLight = function(req,res){
    var light = req.body;
    console.log('Adding light: ' + JSON.stringify(light));
    db.collection('lights', function(err,collection){
        collection.insert(light, {safe:true}, function(err,result){
            if(err){
                res.send({'error':'An error has occured'});
            } else{
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateLight = function(req,res){
  var id = req.params.id;
  var light = req.body;
  console.log('Updating lights: ' + id);
  console.log(JSON.stringify(light));
  db.collection('lights', function(err,collection){
    collection.update({'_id':new BSON.ObjectID(id)}, light, {safe:true}, function(err,result){
      if(err){
        console.log('Error updating light: ' + err);
        res.send({'error':'An error has occured'});
      } else{
        console.log('' + result + ' document(s) updated');
      }
    });
  });
}

exports.deleteLight = function(req,res){
  var id = req.params.id;
  console.log('Deleting light: ' + id);
  db.collection('lights', function(err,collection){
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err,result){
      if(err){
        res.send({'error':'An error has occured - ' + err});
      } else{
        console.log('' + result + ' document(s) deleted');
      }
    });
  });
}

/**************************/
//Sample data 
//Only for example

var populateDB = function(){
  var lights = [
  {
    name: "Front Outdoor Light",
    stat: "on",
    brand: "GE",
    local: "outside",
    description: "Outdoor light front of house"
  },
  {
    name: "Entryway Light",
    stat: "on",
    brand: "GE",
    local: "entryway",
    description: "Front entrywya light"
  }];

  db.collection('lights', function(err,collection){
    collection.insert(lights, {safe:true}, function(err,result){});
  });

};



