/* global console */
/* jshint esversion: 6*/

/* Given an year and the tournament name, find the winner
 * Time complexity: O(n)
 */

module.exports.findAWinner = (year, tournament, data) => {
    'use strict';

    // Check whether all the arguments are passed 
    if (!year || !tournament || !data) {
        return;
    }

    // Find the record matching the year and the tournament
    let record = data.find(record => record.year === year && record.tournament === tournament);

    // Return the winner
    if (record) {
        return record.winner;
    }
};

/* 
 * Given an year, find the winners of all four tournaments. 
 * Return only the list of tournament name and its winner
 * Time complexity: O(n)
 */
module.exports.findWinnersOfTheYear = (year, data) => {
    'use strict';

    // Check whether all the arguments are passed 
    if (!year || !data) {
        return;
    }

    // Filter the records matching the year
    // Then, using map function, reformat the record to hold only the tournament and the winner
    return data.filter(record => record.year === year).map(record => ({
        'tournament': record.tournament,
        'winner': record.winner
    }));
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
        // In each record
        return keywords.every((keyword) => {
            // Search every keyword
            return Object.keys(record).find(k => {
                // If at least one field in the record matches the keyword, return that field name
                // Else, undefined is returned by find(), so the record is excluded from the result
                return record[k].includes(keyword);
            });
        });
    });
};

/*
 * Find the player who won the most number of tournaments
 * Time complexity: O(n)
 */
module.exports.findMostTournamentWinner = (data) => {
    'use strict';
    if (!data) {
        return;
    }
    // Reduce to count the total wins of each player
    // The reduced object, totalWins is of the format {player1: no_of_wins, player2: no_of_wins}
    // Time complexity: O(n)
    let totalWins = data.reduce((acc, record) => {
        if (acc.hasOwnProperty(record.winner)) {
            acc[record.winner]++;
        } else {
            acc[record.winner] = 1;
        }
        return acc;
    }, {}); // Empty initial object {}


    // Find the player with the most wins
    // Given the players from totalWins, reduce to find the player with maximum wins
    // Time complexity: O(n)
    return Object.keys(totalWins).reduce((acc, player) => {
        if (totalWins[player] > acc.maxWins) {
            acc.winners = [player];
            acc.maxWins = totalWins[player];
        } else if (totalWins[player] === acc.maxWins) {
            acc.winners.push(player);
        }
        return acc;
    }, { // Initial object 
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

    // Use reduce to find the player with the most consecutive wins
    var result = data.reduce((acc, record, index, records) => {
        // Start with second record
        if (index > 0) {
            if (record.winner === records[index - 1].winner) {
                // This is the consecutive win for this player. Increase the count.
                acc.currentWins++;
            }

            if (record.winner !== records[index - 1].winner || index === records.length - 1) {
                // Not a consecutive win, so check whether the previous player's consecutive win
                // is bigger the most consecutive wins. 
                if (acc.currentWins > acc.mostConsecutiveWins) {
                    // Mark this player and the most consecutive wins
                    acc.mostConsecutiveWins = acc.currentWins;
                    acc.winners = [records[index - 1].winner];
                } else if (acc.currentWins === acc.mostConsecutiveWins) {
                    // Same most conseutive wins by another player, add this player.
                    acc.winners.push(records[index - 1].winner);
                }
                // Reset the currentWins
                acc.currentWins = 1;
            }
        }
        return acc;
    }, { // Initial object
        'winners': [], // Players with the mostConsecutiveWins
        'mostConsecutiveWins': 2, // Start with 2 
        'currentWins': 1 // Temporary consecutive win. currentWins is always <= mostConsecutiveWins
    });

    // Delete the temporary memeber
    delete result.currentWins;

    return result;

};


// CONCEPTS:
// Array.prototype.reduce()
// Array.prototype.find()
// Array.prototype.filter()
// Array.prototype.map()
// Object.keys()
// Array.prototype.every()
