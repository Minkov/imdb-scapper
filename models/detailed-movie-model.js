/* globals require module */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const actorSchema = new Schema({
    name: String,
    character: String,
    imdbId: String,
    image: String
});

const genreSchema = new Schema({
    name: String
});

let DetailedMovieSchema = new Schema({
    image: {
        type: String
    },
    trailer: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    genres: [genreSchema],
    releaseDate: Date,
    actors: [actorSchema]
});

let DetailedMovie;
DetailedMovieSchema.statics.getDetailedMovieFromObject =
    function (object) {
        return new DetailedMovie({
            image: object.image,
            trailer: object.trailer,
            title: object.title,
            description: object.description,
            releaseDate: object.releaseDate,
            genres: object.genres,
            actors: object.actors
        });
    };

mongoose.model('DetailedMovie', DetailedMovieSchema);
DetailedMovie = mongoose.model('DetailedMovie');
module.exports = DetailedMovie;