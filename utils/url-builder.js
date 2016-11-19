module.exports = {
    getDetailedMovedImdbUrl(imdbId) {
        const url = `http://www.imdb.com/title/${imdbId}/?ref_=adv_li_tt`;
        return url;
    }
};