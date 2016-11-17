/* globals console require */
"use strict";

const listMoviesUrl = "http://www.imdb.com/search/title?genres=fantasy&title_type=feature&0sort=moviemeter,asc&page=2&view=simple&ref_=adv_nxt";

const genres = ["fantasy", "horror", "comedy", "action", "sci-fi"];

const httpRequester = require("./utils/http-requester");
const htmlParser = require("./utils/html-parser");

httpRequester.get(listMoviesUrl)
    .then((result) => {
        const selector = ".col-title span[title] a";
        const html = result.body;
        return htmlParser.parseSimpleMovie(selector, html);
    })
    .then(movies => {
        console.log(movies);
    })
    .catch((err) => {
        console.dir(err, { colors: true });
    });