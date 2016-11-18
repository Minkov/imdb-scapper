/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

module.exports.parseSimpleMovie = (selector, html) => {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr("href")
        });
    });

    return Promise.resolve()
        .then(() => {
            return items;
        });
};

module.exports.parseDetailedMovie = function (html) {
    $("body").html(html);
    // console.log($("body").html());

    const movie = {
        image: $('div.poster img').attr('src'),
        trailer: $('div.slate a').attr('href'),
        title: $('div.title_wrapper h1').text(),
        description: $('div.plot_summary_wrapper div.plot_summary div.summary_text').text().trim(),
        reelaseDate: getDateFromRealeaseDate($('a[title="See more release dates"]').text())
    };

    const genres = $('span.itemprop[itemprop="genre"]').text();
    const cast = $('div#titleCast table.cast_list').html();

    return movie;
};

function getDateFromRealeaseDate(imdbReleaseDate) {
    const bracketIndex = imdbReleaseDate.indexOf('(');
    const dateString = imdbReleaseDate.substring(0, bracketIndex);
    const date = new Date("15:00 " + dateString);

    return date;
}

function splitGenresFromImdbGenresHtml(genresFromHtml) {
    const genresInputLength = genresFromHtml.length;
    
    let currentGenre = '';
    const genresList = [];
    const genresChars = genresFromHtml.split();
    for (let i = 0; i < genresInputLength; i += 1) {
        const nextChar = genresChars.splice(0, 1);
        
        const charIsUpper = nextChar === nextChar.toUpperCase();
        if (charIsUpper) {
            if (currentGenre.length > 0) {
                genresList.push(currentGenre);
            }

            currentGenre = '' + nextChar;
        } else {
            currentGenre += nextChar;
        }
    }

    return genresList;
}