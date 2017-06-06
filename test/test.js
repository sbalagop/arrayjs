var expect = require('chai').expect;
var GrandSlamSingles = require('../GrandSlamSingles.js');
var data = require('./data.js');

describe('GrandSlamSingles', function() {
    'use strict';

    describe('#findAWinner', function() {
        it('should return "Roger Federer" for the year "2017" of "Australian Open"', function() {
            expect(GrandSlamSingles.findAWinner('2017', 'Australian Open', data)).to.equal('Roger Federer');
        });
    });


    describe('#findWinnersOfTheYear', function() {
        it('should return 4 tournaments and their winners for year 2016', function() {
            expect(GrandSlamSingles.findWinnersOfTheYear('2016', data)).to.have.lengthOf(4);
        });
        it('should return Stan Wawrinka(U.S. Open), Andy Murray(Wimbledon), French Open(French Open), Novak Djokovic(Australian Open) for year 2016', function() {
            expect(GrandSlamSingles.findWinnersOfTheYear('2016', data)).to.deep.equal([{
                "tournament": "U.S. Open",
                "winner": "Stan Wawrinka"
            }, {
                "tournament": "Wimbledon",
                "winner": "Andy Murray"
            }, {
                "tournament": "French Open",
                "winner": "Novak Djokovic"
            }, {
                "tournament": "Australian Open",
                "winner": "Novak Djokovic"
            }]);
        });
    });

    describe('#search', function() {
        it('should return the records which match all the keywords', function() {
            expect(GrandSlamSingles.search('2016 Andy', data)).to.deep.equal([{
                "year": "2016",
                "tournament": "Wimbledon",
                "winner": "Andy Murray",
                "runner": "Milos Raonic"
            }, {
                "year": "2016",
                "tournament": "French Open",
                "winner": "Novak Djokovic",
                "runner": "Andy Murray"
            }, {
                "year": "2016",
                "tournament": "Australian Open",
                "winner": "Novak Djokovic",
                "runner": "Andy Murray"
            }]);
        });
    });

    describe('#findMostTournamentWinner', function() {
        it('should return ["Roger Federer"] who won 18 grand slam titles', function() {
            expect(GrandSlamSingles.findMostTournamentWinner(data)).to.deep.equal({ 'winners': ['Roger Federer'], 'maxWins': 18 });
        });
    });


    describe('#findMostConsecutiveWinner', function() {
        it('should return "Donald Budge" who won 6 consecutive grand slams', function() {
            expect(GrandSlamSingles.findMostConsecutiveWinner(data)).to.deep.equal({
                'winners': ['Donald Budge'],
                'mostConsecutiveWins': 6
            });
        });
    });

});