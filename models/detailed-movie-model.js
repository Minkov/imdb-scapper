/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const actorSchema = mongoose.schema({
    name: String,
    character: String,
    imdbId: String,
    image: String
});

const genreSchema = mongoose.schema({
    name: String
});

let DetailedMovieSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: [genreSchema],
    releaseDate: Date,
    actors: [actorSchema]
});

let DetailedMovie;
DetailedMovieSchema.statics.getSimpleMovieByNameAndUrl =
    function (name, url) {

    };

mongoose.model("DetailedMovie", DetailedMovieSchema);
DetailedMovie = mongoose.model("DetailedMovie");
module.exports = DetailedMovie;