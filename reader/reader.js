const fs = require("fs/promises");

/**
 * Read data from file and returns in a promise
 * @returns Data from file
 */
const readData = async  () => {
  try {
    const data = await fs.readFile("./discography.txt", { encoding: "utf8" });
    
    return data;
  } catch (err) {
    console.log(err);
  }
};

const readFile = async  () => {
  let data = await readData();
  const array = data.toString().replace(/\r\n/g, "\n").split("\n");

  let arrayObjects = [];

  for (let i = 0; i < array.length; i++) {
    let year = parseInt(array[i].substring(0, 4));

    let album = array[i].substring(5);
    let object = {
      year: year,
      album: album,
    };
    arrayObjects.push(object);
  }

  return arrayObjects;
};

module.exports = {readFile};
