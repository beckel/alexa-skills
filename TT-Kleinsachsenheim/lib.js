const got = require('got');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

const config = require('./config');

// use cheerioframe to extract relevant data from myTischtennis Website
function getScoreTableFromBody(body) {
	const $ = cheerio.load(body);
	jsonframe($);
	let frame = {
		table: {
			_s: "tr",  // selector
			_d: [{  
				"position": "td.visible-lg",
				"club": "td:nth-child(3) > a",
				"score": "td:nth-child(10)"
			}]
		}
	};
	let scrapeResult = $('table').eq(0).scrape(frame, {
		string: false
	});
	return scrapeResult.table;
}

// use cheerioframe to extract relevant match data from myTischtennis Website
function getMatchesFromBody(body) {
	const $ = cheerio.load(body);
	jsonframe($);
	let frame = {
		table: {
			_s: "tr",  // selector
			_d: [{  
				"date": "td:nth-child(1)",
				"team1": "td:nth-child(4)",
				"team2": "td:nth-child(5)",
				"result": "td:nth-child(6)"
			}]
		}
	};
	console.log('Start scraping - takes some time!');
	let scrapeResult = $('table').eq(1).scrape(frame, {
		string: false
	});
	console.log('Done scraping.');
	return scrapeResult.table;
}


// 3 exports: getScoreTable, getPosition, getLatestResult
module.exports = {

	// User asks for the complete score table of a team
	getScoreTable: function(teamNumber) {
		
		let url = config.getURLFromTeamNumber(teamNumber);
		
		// return error message if team does not exist
		if (url == undefined) {
			return new Promise(function(resolve, reject) {
				resolve("Es gibt nur vier Mannschaften.");
			});
		}
			
		// query myTischtennis and return text form of score table
		return new Promise(function(resolve, reject) {
			let result = ""
			got(url).then(res => {
				let scoreTable = getScoreTableFromBody(res.body);
				for (i in scoreTable) {
					// srsly, that's how you have to check for "empty"?
					if (Object.keys(scoreTable[i]).length > 0) {
						result += "Position " + scoreTable[i].position + ", ";
						result += scoreTable[i].club + ", ";
						result += scoreTable[i].score + " Punkte; \n";
					}
				}
			}).then( () => {
				resolve(result);
			});
		});
	},
	
	// User asks for the position of a team
	getPosition: function(teamNumber) {
	
		let url = config.getURLFromTeamNumber(teamNumber);
		let teamName = config.getTeamNameFromTeamNumber(teamNumber);
		
		// return error message if team does not exist
		if (url == undefined || teamName == undefined) {
			return new Promise(function(resolve, reject) {
				resolve("Es gibt nur vier Mannschaften.");
			});
		}

		// query myTischtennis and identify position of the team
		return new Promise(function(resolve, reject) {
			let result = "";
			got(url).then(res => {
				let scoreTable = getScoreTableFromBody(res.body);
				for (i in scoreTable) {
					if (Object.keys(scoreTable[i]).length > 0) {
						if (scoreTable[i].club == teamName) {
							result = scoreTable[i].club + " ist auf Platz " + scoreTable[i].position + ".";
							return;
						}
					}
				}
			}).then( () => {
				resolve(result);
			});
		});
	},
	
	// User asks for the latest result of a team
	getLatestResult: function(teamNumber) {
		
		let url = config.getURLFromTeamNumber(teamNumber);
		let teamName = config.getTeamNameFromTeamNumber(teamNumber);
		
		// return error message if team does not exist
		if (url == undefined || teamName == undefined) {
			return new Promise(function(resolve, reject) {
				resolve("Es gibt nur vier Mannschaften.");
			});
		}

		// query myTischtennis and identify last result of the team
		return new Promise(function(resolve, reject) {

			let result = "";
			got(url).then(res => {
				let scoreTable = getMatchesFromBody(res.body).reverse();
				
				for (i in scoreTable) {
					
					if (Object.keys(scoreTable[i]).length > 0) {
						if (scoreTable[i].date != '\n') {
							let date = scoreTable[i].date.substring(4,14);
							if (scoreTable[i].team1 == teamName || scoreTable[i].team2 == teamName) {
								if (scoreTable[i].result != '\n') {
									console.log("Found a match");
									result += 'Das letzte Spiel war am ' + date + ". ";
									result += scoreTable[i].team1 + " gegen " + scoreTable[i].team2 + ", ";
									result += scoreTable[i].result.replace(/ /g,'') + ".";
									return result;
								}
							}
						}
					}
				}
				
				console.log("Did not find corresponding match");
				result += "Ich kann kein Spiel finden."
			}).then( () => {
				resolve(result);
			});
		});
	}
}



