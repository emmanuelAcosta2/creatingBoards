
var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const token = require('./getToken');
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_KEY,
  clientSecret: process.env.CLIENT_SECREAT,
  redirectUri: 'http://www.example.com/callback'
});

const getToken = async () => {
    const spotifyToken = await token.fetchToken();
    spotifyApi.setAccessToken(spotifyToken);
    return spotifyToken;
}
getToken();





const getImage =async  (name) => {
    const result = await spotifyApi.getArtistAlbums('74ASZWbe4lXaubB36ztrGX', { limit: 50});
    
    const albums = result.body.items;
    for(let i = 0; i< albums.length; i++){
        if(albums[i].name.toLowerCase().includes(name.toLowerCase())){
            return albums[i].images[0].url;
        }
    }
    return "";
}

module.exports = {getImage}

