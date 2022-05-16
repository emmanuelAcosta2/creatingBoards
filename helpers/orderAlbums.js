function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

const orderAlbum = async (albums) => {
  const albumsOrdered = await albums.sort(function (a, b) {
    if (a.year > b.year) {
      return 1;
    }
    if (a.year < b.year) {
      return -1;
    }
    // when years are equal, sort by album name
    if(a.year == b.year){
        return compare(a.album, b.album);
    }
  });
  return albumsOrdered;
};

module.exports = { orderAlbum };
