require('dotenv').config();
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const util = require('util');
const question = util.promisify(rl.question).bind(rl);

var Trello = require('trello-node-api')(process.env.API_KEY, process.env.API_TOKEN);


async function questionName() {
    try {
      const answer = await question('Give me a name for the board');
      return answer;
    } catch (err) {
      console.error('Question rejected', err);
    }
  }
  

const createBoard = async (req, res) => {
    const nameBoard = await questionName();
    var data = {
        name: nameBoard,
        defaultLabels: false,
        defaultLists: false,
        desc: 'Board for WYEWORKS',
    };
    let trelloBoard;
    try{
        trelloBoard = await Trello.board.create(data);
    }catch(err){
        throw err;
    }

    return trelloBoard;


  };

  module.exports={createBoard};