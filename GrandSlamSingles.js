/* global console */
/* jshint esversion: 6*/

/* Given an year and the tournament name, find the winner */

module.exports.findAWinner = (year, tournament, data) => {
    'use strict';
    if (!year || !tournament || !data) {
        return;
    }
    let record = data.find(record => record.year === year && record.tournament === tournament);
    if (record) {
        return record.winner;
    }
};

/* 
 * Given an year, find the winners of all four tournaments. 
 * Return only the list of tournament name and its winner
 */
module.exports.findWinnersOfTheYear = (year, data) => {
    'use strict';
    if (!year || !data) {
        return;
    }
    return data.filter(record => record.year === year).map(record => ({
            'tournament': record.tournament,
            'winner': record.winner
    }));
};


/*
 * Find the player who won the most number of tournaments
 *
 */
module.exports.findMostTournamentWinner = (data) => {
    'use strict';
    if (!data) {
        return;
    }
    let totalWins = data.reduce((acc, record) => {
        if (acc.hasOwnProperty(record.winner)) {
            acc[record.winner]++;
        } else {
            acc[record.winner] = 1;
        }
        return acc;
    }, {});


    return Object.keys(totalWins).reduce((acc, player) => {
        if (totalWins[player] > acc.maxWins) {
            acc.winners = [player];
            acc.maxWins = totalWins[player];
        } else if (totalWins[player] === acc.maxWins) {
            acc.winners.push(player);
        }
        return acc;
    }, {
        'winners': [],
        'maxWins': 1
    });

};


/* 
 * Find the player(s) with most consecutive tournament wins
 *
 */
module.exports.findMostConsecutiveWinner = (data) => {
    'use strict';

    var result = data.reduce((acc, record, index, records) => {
        if (index > 0) {
            if (record.winner === records[index - 1].winner) {
                acc.currentWins++;
            }

            if (record.winner !== records[index - 1].winner || index === records.length - 1) {
                if (acc.currentWins > acc.consecutiveWins) {
                    acc.consecutiveWins = acc.currentWins;
                    acc.winners = [records[index - 1].winner];
                } else if (acc.currentWins === acc.consecutiveWins) {
                    acc.winners.push(records[index - 1].winner);
                }
                // Reset the currentWins
                acc.currentWins = 1;
            }
        }
        return acc;
    }, {
        'winners': [],
        'consecutiveWins': 2,
        'currentWins': 1
    });

    delete result.currentWins;

    console.log(result);
    return result;

};

/**
 * Given a search string which is a space seperated keywords, 
 * return the records which matches all keywords
 * Example, "2016 Andy" should return all 2016 finals in which Andy played (either a winner or runner)
 * Example, "2016 Andy Novak" should return all 2016 finals in which both Andy and Novak played.
 */
module.exports.search = (searchStr, data) => {
    'use strict';
    if (!searchStr || !searchStr.trim()) {
        return;
    }

    var keywords = searchStr.split(' ');
    // Filter the empty strings out :)
    keywords = keywords.filter(keyword => keyword);

    return data.filter((record) => {
        // Search every keyword
        return keywords.every((keyword) => {
            // In each record
            return Object.keys(record).find(k => {
                // at least one field in the record matches
                var res = record[k].includes(keyword);
                if (res) {
                    console.log(` ${record[k]} : ${keyword}`);
                }
                return res;
            });
        });
    });
};

// reduce
// find
// filter
// map
// Object.keys()
// every
