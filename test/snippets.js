/* global console */
/* jshint esversion: 6 */
(function() {
    'use strict';
    let names = ['McQueen', 'Mater', 'Sally'];

    // regular function used as a callback
    let greetings1 = names.map(function(name) {
        return 'Hello ' + name;
    });
    console.log(greetings1);

    // arrow function used as a callback
    // Concise body with implicit return
    let greetings2 = names.map((name) => 'Hello ' + name);
    console.log(greetings2);

    // arrow function used as a callback
    // Block body with explicit return
    let greetings3 = names.map((name) => {
        return 'Hello ' + name;
    });
    console.log(greetings3);

})();
