const albumByDecade = (albums, decadeMin, decadeMax) => {
    let arrayDecades = [];
    for(let i = decadeMin; i<=decadeMax; i=i+10){
        let albumsByDecade = albums.filter(album => album.year >= i && album.year < i+10);
        arrayDecades.push(albumsByDecade);
    }
    return arrayDecades;
}

module.exports = { albumByDecade };