var expect = require('chai').expect;
var GrandSlamSingles = require('../GrandSlamSingles.js');
var data = require('./data.js');

describe('samples', function() {
    'use strict';

    describe('#findATournamentWinner', function() {
        it('should return "Roger Federer" for the year "2017" of "Australian Open"', function() {
            expect(GrandSlamSingles.findATournamentWinner('2017', 'Australian Open', data)).to.equal('Roger Federer');
        });
    });


    describe('#findAllTournamentWinners', function() {
        it('should return 4 tournaments and their winners for year 2016', function() {
            expect(GrandSlamSingles.findAllTournamentWinners('2016', data)).to.have.lengthOf(4);
        });
        it('should return Stan Wawrinka(U.S. Open), Andy Murray(Wimbledon), French Open(French Open), Novak Djokovic(Australian Open) for year 2016', function() {
            expect(GrandSlamSingles.findAllTournamentWinners('2016', data)).to.deep.equal([{
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

    describe('#findMostTournamentWinner', function() {
        it('should return ["Roger Federer"] who won 18 grand slam titles', function() {
            expect(GrandSlamSingles.findMostTournamentWinner(data)).to.deep.equal({ 'winners': ['Roger Federer'], 'maxWins': 18 });
        });
    });


    describe('#findMostConsecutiveWinner', function() {
        it('should return "Donald Budge" who won 6 consecutive grand slams', function() {
            expect(GrandSlamSingles.findMostConsecutiveWinner(data)).to.deep.equal({
                'winners': ['Donald Budge'],
                'consecutiveWins': 6
            });
        });
    });

    describe('#search', function() {
        it('should return the records which match all the keywords', function() {
            expect(GrandSlamSingles.search(data, '2016 Andy')).to.deep.equal([{
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



});


// Roger Federer has won 18 Major singles titles - the most by any man in history

// Any tennis player who wins all the four grandslams in his career is said to have achieved the Career Slam.
//all four of the major titles during their careers.     Fred Perry (age 26) – 1935 French Open
// Don Budge (23) – 1938 French Open
// Rod Laver* (24) – 1962 US Open
// Roy Emerson* (27) – 1964 Wimbledon
// Andre Agassi (29) – 1999 French Open
// Roger Federer (27) – 2009 French Open
// Rafeal Nadal (24) – 2010 US Open
// Novak Djokovic (29) – 2016 French Open
