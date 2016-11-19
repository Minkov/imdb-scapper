const SimpleMovie = require("../models/simple-movie-model");

function getAllSimpleMovies() {
    return new Promise((resolve, reject) => {
        SimpleMovie.find()
            .exec((err, res) => {
                if (err) {
                    reject(err.message);
                }

                resolve(res);
            });
    });
}

module.exports = getAllSimpleMovies;