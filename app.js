/* globals console require setTimeout Promise */
'use strict';

const httpRequester = require('./utils/http-requester');
const htmlParser = require('./utils/html-parser');
const queuesFactory = require('./data-structures/queue');
const modelsFactory = require('./models');
const constants = require('./config/constants');
const getAllSimpleMovies = require('./data/simple-movie-data');

require('./config/mongoose')(constants.connectionString);

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

// let urlsQueue = queuesFactory.getQueue();
//
// constants.genres.forEach(genre => {
//     for (let i = 0; i < constants.pagesCount; i += 1) {
//         let url = `http://www.imdb.com/search/title?genres=${genre}&title_type=feature&0sort=moviemeter,asc&page=${i + 1}&view=simple&ref_=adv_nxt`;
//         urlsQueue.push(url);
//     }
// });

// function getMoviesFromUrl(url) {
//     console.log(`Working with ${url}`);
//     httpRequester.get(url)
//         .then((result) => {
//             const selector = '.col-title span[title] a';
//             const html = result.body;
//             return htmlParser.parseSimpleMovie(selector, html);
//         })
//         .then(movies => {
//             let dbMovies = movies.map(movie => {
//                 return modelsFactory.getSimpleMovie(movie.title, movie.url);
//             });

//             modelsFactory.insertManySimpleMovies(dbMovies);
//             const test = JSON.stringify(dbMovies[0]);
//             return wait(1000);
//         })
//         .then(() => {
//             if (urlsQueue.isEmpty()) {
//                 return;
//             }

//             getMoviesFromUrl(urlsQueue.pop());
//         })
//         .catch((err) => {
//             console.dir(err, { colors: true });
//         });
// }

// const asyncPagesCount = 15;

// Array.from({ length: asyncPagesCount })
//     .forEach(() => getMoviesFromUrl(urlsQueue.pop()));

//

getAllSimpleMovies()
    .then((allSimpleMovies) => {
        let simpleMoviesQueue = queuesFactory.getQueue();
        allSimpleMovies.forEach(movie => {
            let url = `http://www.imdb.com/title/${movie.imdbId}/?ref_=adv_li_tt`;
            simpleMoviesQueue.push(url);
        });

        return simpleMoviesQueue;
    })
    .then((urlQueue) => {
        const asyncDetailsPagesCount = 15;

        Array.from({ length: asyncDetailsPagesCount })
            .forEach(() => getDetailedMoviesFromUrl(urlQueue));
    })
    .catch((err) => {
        console.log(err.message);
    });

function getDetailedMoviesFromUrl(urlQueue) {
    const url = urlQueue.pop();
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((html) => {
            const parsedMovie = htmlParser.parseDetailedMovie(html.body);
            return parsedMovie;
        })
        .then(movie => {
            const detailedMovie = modelsFactory.getDetailedMovie(movie);
            modelsFactory.insertDetailedMovie(detailedMovie);
            return wait(1000);
        })
        .then(() => {
            if (urlQueue.isEmpty()) {
                return;
            }

            getDetailedMoviesFromUrl(urlQueue);
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}