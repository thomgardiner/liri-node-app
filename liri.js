require("dotenv").config();

let Twitter = require("twitter");
let keys = require('./keys.js');
let spotify = keys.spotify;
let client = new Twitter(keys.twitter);
let command = process.argv[2];

let twitterParams = {
    screen_name: 'nodejs',
    count: 5
};


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

if(command == "my-tweets"){
    //do some stuff
    callTwitter();
    
}
else if(command == "spotify-this-song"){
    //do some stuff
}
else if(command == "movie-this"){
    //do some stuff
}
else if(command == "do-what-it-says"){
    //do some stuff
}
else{
    console.log("Not a recognized command.");
}
