const reader = require("./reader/reader.js");
const orderer = require("./helpers/orderAlbums");
const albumsByDecade = require("./helpers/orderByDecade");
const createTrelloBoard = require("./trello/createBoard");
const createList = require("./trello/createList");
const createCard = require("./trello/createCard");
require('dotenv').config();

var Trello = require("trello-node-api")(
  process.env.API_KEY,
  process.env.API_TOKEN
);



const albumsAsync = async () => {
  //Read albums from files and convert them into an array of objects with year and album
  const albumsReaded = await reader.readFile();
  //Order albums by year and alphabetically
  const orderedAlbums = await orderer.orderAlbum(albumsReaded);
  //Order albums by decade
  const albumsByDecadeOrder =  albumsByDecade.albumByDecade(orderedAlbums,1960,2019);
  //Create a board
  const trelloBoard = await createTrelloBoard.createBoard();
  console.log("Creating trello board...");
  console.log("Wait for a moment...");
  const boardId = trelloBoard.id;
  const boardUrl = trelloBoard.url;
  //Create lists for each decade
  const listId = await createList.createList(albumsByDecadeOrder,boardId);
  //Create cards for each album
  const cardId = await createCard.createCard(albumsByDecadeOrder,listId);
  console.log("Your trello board is ready!");
  console.log("Visit this url: ",boardUrl);
};

albumsAsync();
