var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('logexplorer', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'logexplorer' database");
        db.collection('logexplorer', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'longrequestlog' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
                populateDB();
        });
    }
});

exports.getLog = function(req, res) {
/*
 * return {max time, url, id, login etc}
 */
    var id = req.params.id;
    console.log('Retrieving longrequestlog: ' + id);
    db.collection('logexplorer', function(err, collection) {
        collection.find({id: id}).toArray(function(err, item) {
            console.log(err, item)
            res.send(item[0]);
        });
    });
};

exports.getLogAtTime = function(req, res) {
/*
 * return {traceback, sql}
 */
    var id = req.params.id, time = req.params.time;
    console.log('Retrieving longrequestlog: ' + id + " at time " + time);
    db.collection('logexplorer', function(err, collection) {
        collection.find({id:id, time: time}).toArray( function(err, item) {
            console.log(err, item)
            res.send(item[0]);
        });
    });
};



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var logs = [
    {
        id: "1234",
        time: "1",
        url: "https://example.com/",
        traceback: "File \"<doctest>\", line 10, in <module>\n    another_function()\n   File \"<doctest>\", line 3, in another_function\n    lumberstack()\n  File \"<doctest>\", line 2, in lumberstack\n     traceback.print_stack()\n",
        sql: "",
        max_time: 10
    },
    {
        id: "1234",
        time: "3",
        url: "https://example.com/",
        traceback: "File \"<doctest>\", line 11, in <module>\n    another_function()\n   File \"<doctest>\", line 3, in another_function\n    lumberstack()\n  File \"<doctest>\", line 4, in lumberstack\n     traceback.print_stack()\n",

        sql: "",
        max_time: 10
    },
    {
        id: "1234",
        time: "4",
        url: "https://example.com/",
        traceback: "File \"<doctest>\", line 10, in <module>\n    another_function()\n   File \"<doctest>\", line 3, in another_function\n    lumberstack()\n  File \"<doctest>\", line 6, in lumberstack\n     traceback.print_stack() #{\n",
        sql: "",
        max_time: 10
    }  
    ];

    db.collection('logexplorer', function(err, collection) {
        collection.remove();
        console.log("cleared !");
        collection.insert(logs, {safe:true}, function(err, result) {console.log(err,result)});
    });

};
