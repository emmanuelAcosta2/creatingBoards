

var Trello = require('trello-node-api')(process.env.API_KEY, process.env.API_TOKEN);

const createList = async(albumByDecade,boardId) => {
    let listId = [];
    for(let i = 0; i<albumByDecade.length; i++){
        let data = {
            name: `Decade ${i+1}`,
            idBoard: boardId,
            pos:'bottom'
        };
        let list;
        try{
            list = await Trello.list.create(data);
        }catch(err){
            throw err;
        }
        listId.push(list.id);
    }
    return listId;
}

module.exports = {createList};