/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const DetailedMovie = require("./detailed-movie-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    getDetailedMovie(movie) {
        return DetailedMovie.getDetailedMovieFromObject(movie);
    },
    insertDetailedMovie(...movies) {
        DetailedMovie.insertMany(movies, (err, res) => {
            if (err) {
                console.log(err.message);
            }
        });
    }
};