var express = require('express'),
    path = require('path'),
    http = require('http'),
    tb = require('./routes/tb');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 8080);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/getLog/:id', tb.getLog);
app.get('/getLogAtTime/:id/:time', tb.getLogAtTime);
/*
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
*/

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
