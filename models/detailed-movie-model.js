/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

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
    genres: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date
    }
});

let DetailedMovie;
DetailedMovieSchema.statics.getSimpleMovieByNameAndUrl =
    function(name, url) {
        let imdbId = extractImdbIdFromUrl(url);
        return new DetailedMovie({ name, imdbId });
    };

mongoose.model("DetailedMovie", DetailedMovieSchema);
DetailedMovie = mongoose.model("DetailedMovie");
module.exports = DetailedMovie;