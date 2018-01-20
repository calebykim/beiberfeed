var app = require('express').createServer(),
    twitter = require('ntwitter');

// var http = require('http'); // for some reason including this module breaks express

var most_recent = [];

app.listen(8000);

var twit = new twitter({
    consumer_key: 'CxNW4dbGgBhpPvt0YRn6tOgPg',
    consumer_secret: 'xnv05OUBTvpwZyw2n8ujWxLiYpRQiMY766paD7ojqXloaqlylt',
    access_token_key: '4846560701-JDwgLQHKAdZiASRnpwdAHQSx9qzDvSX25JLDcQU',
    access_token_secret: 'Y6gG4tpZiReGydRHigSWFZTszCW31iKpRxuKTj8whKpAP'
});

twit.stream('statuses/filter', {track: ['DJ Khaled', 'DJ KHALED', '@djkhaled']}, function(stream){
        stream.on('data', function(data){
            if(most_recent.length > 25){
                most_recent.shift();
            }
            most_recent.push(data);
        });
        stream.on('destroy', function(response){
            console.log("stream destroyed!");
        });
        stream.on('error', function(error){
            console.log(error);
        });
});

app.get('/feed/*', function(req, res){
    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
    res.write(JSON.stringify(most_recent));
    res.end();
});

app.get('/', function(req, res){
    res.send("Homepage");
});

// http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
//     res.write(JSON.stringify(most_recent));
//     res.end();
// }).listen(8080);
