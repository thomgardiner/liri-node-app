require("dotenv").config();

let fs = require('fs');

let request = require("request");
let Twitter = require("twitter");
let Spotify = require("node-spotify-api");
let keys = require('./keys.js');
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let command = process.argv[2];
let searchterm = process.argv[3];

let twitterParams = {
    screen_name: 'nodejs',
    count: 5
};

let callSpotify = function(){

    if(searchterm == undefined){
        searchterm = "The Sign Ace of Base";
    }

    spotify.search({type: 'track', query: searchterm, limit: 3}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            // console.log(data.tracks.items[0]);
            console.log("------------------");
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Song Link: " + data.tracks.items[0].external_urls.spotify);
            // let newdata = JSON.stringify(data, null, 2);
            // console.log(newdata);
    })
}
1
let callTwitter = function(){
    client.get('statuses/user_timeline', twitterParams, function(error, tweets, response) {
        if (!error) {
          for(i=0; i < tweets.length; i++){
              console.log("---------------");
              console.log(tweets[i].created_at);
              console.log(tweets[i].text);
          }
        }
      })
}

let callOMDB = function(){


    if(searchterm == undefined){
        searchterm = "Mr+Nobody";
    }

    request("http://www.omdbapi.com/?t=" + searchterm +"&y=&plot=short&apikey=trilogy", function(error, response, body) {

    if (!error && response.statusCode === 200) {

    // console.log(JSON.parse(body));
    console.log("--------------------------------");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language(s): " + JSON.parse(body).Language);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Plot: " + JSON.parse(body).Plot);
  }
});

}

fs.appendFile("log.txt", command + " " + searchterm + ", ", function(err){
    if(err){
        return console.log(err);
 
    }
    console.log("log.txt was updated!");
})

let getCommand = function(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        console.log(data);
        let dataArr = data.split(",");
        command = dataArr[0];
        searchterm = dataArr[1];
        logic(command);
      
      });
}

let logic = function(command){

    if(command == "my-tweets"){
        callTwitter();
        
    }
    else if(command == "spotify-this-song"){
        callSpotify();
    }
    else if(command == "movie-this"){
        callOMDB();
    }
    else if(command == "do-what-it-says"){
        getCommand();
    }
    else{
        console.log("Not a recognized command.");
    }

}

logic(command);