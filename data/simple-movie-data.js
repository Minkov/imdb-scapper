const SimpleMovie = require("../models/simple-movie-model");
const mongoose = require('mongoose');

function getAllSimpleMovies() {
    mongoose.connect('mongodb://localhost:27017/moviesDb');
    // return SimpleMovie.find();

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