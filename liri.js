require("dotenv").config();

let keys = require('./keys.js');
let spotify = keys.spotify;
let client = keys.twitter;

let command = process.argv[2];

console.log(spotify);
console.log(client);


if(command == "my-tweets"){
    //do some stuff
    
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