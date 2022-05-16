const getImage = require("../spotify/getImage");
var Trello = require('trello-node-api')(process.env.API_KEY, process.env.API_TOKEN);

const createCard = async (albumByDecade,listId) => {
    let cardId = [];
    for(let i = 0; i<albumByDecade.length; i++){
        for( let e = 0; e < albumByDecade[i].length; e++){
            const fileSource = await getImage.getImage(albumByDecade[i][e].album);
            let data = {
                name: `${albumByDecade[i][e].album} - ${albumByDecade[i][e].year}`,
                idList: listId[i],
                desc: `${albumByDecade[i][e].year}`,
                urlSource: fileSource
            };
            let card;
            try{
                
                card = await Trello.card.create(data);
                
            }catch(err){
                throw err;
            }
            cardId.push(card.id);
        }
       
    }
    return cardId;
}

module.exports = {createCard};