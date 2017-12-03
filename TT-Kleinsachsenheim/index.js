/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const lib = require('./lib');

const Alexa = require('alexa-sdk');

const APP_ID = 'arn:aws:lambda:eu-west-1:331592779665:function:TischtennisKleinsachsenheim';  

const SKILL_NAME = 'Tischtennis Kleinsachsenheim';
const HELP_MESSAGE = 'Du kannst dich nach der Platzierung, der gesamten Tabelle oder nach dem letzten Spiel eines der vier Teams erkundigen.';
const HELP_REPROMPT = 'Wie kann ich dir helfen?';
const STOP_MESSAGE = 'Auf Wiedersehen!';

const handlers = {
    'LaunchRequest': function () {
        this.emit('Welcome');
    },
    'Welcome': function () {
        // Create speech output
        const speechOutput = 'Willkommen zu ' + SKILL_NAME + ' - ' + HELP_MESSAGE;
        this.emit(':tell', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_MESSAGE;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'Tabelle': function() {
		var number = this.event.request.intent.slots.number.value;
        lib.getScoreTable(number).then(speechOutput => {
			this.emit(':tell', speechOutput);
		});
    },
    'Platzierung': function() {
		var number = this.event.request.intent.slots.number.value;
        lib.getPosition(number).then(speechOutput => {
			this.emit(':tell', speechOutput);
		});
    },
    'LetztesMatch': function() {
		var number = this.event.request.intent.slots.number.value;
        lib.getLatestResult(number).then(speechOutput => {
			this.emit(':tell', speechOutput);
		});
    },	
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
