/* globals console require setTimeout Promise */
"use strict";

const os = require("os");

const genres = ["action", "sci-fi", "fantasy", "horror", "comedy"];
const pagesCount = 2;

const httpRequester = require("./utils/http-requester");
const htmlParser = require("./utils/html-parser");

const queuesFactory = require("./data-structures/queue");

let urlsQueue = queuesFactory.getQueue();

function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

genres.forEach(genre => {
    for (let i = 0; i < pagesCount; i += 1) {
        let url = `http://www.imdb.com/search/title?genres=${genre}&title_type=feature&0sort=moviemeter,asc&page=${i+1}&view=simple&ref_=adv_nxt`;
        urlsQueue.push(url);
    }
});

function getMoviesFromUrl(url) {
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const selector = ".col-title span[title] a";
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            console.log(movies.length);
            return wait(500);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getMoviesFromUrl(urlsQueue.pop());
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

const asyncPagesCount = 5;

Array.from({ length: asyncPagesCount })
    .forEach(_ => getMoviesFromUrl(urlsQueue.pop()));