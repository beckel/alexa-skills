var exports = module.exports = {};

exports.getURLFromTeamNumber = function (teamNumber) {
	if (teamNumber == 1) {
		return 'https://www.mytischtennis.de/clicktt/TTVWH/17-18/ligen/Bezirksklasse-Gr-2/gruppe/310495/tabelle/gesamt';
	} else if (teamNumber == 2) {
		return 'https://www.mytischtennis.de/clicktt/TTVWH/17-18/ligen/Kreisliga-A-Gr-3/gruppe/310502/tabelle/gesamt';
	} else if (teamNumber == 3) {
		return 'https://www.mytischtennis.de/clicktt/TTVWH/17-18/ligen/Kreisliga-A-Gr-1/gruppe/310501/tabelle/gesamt';
	} else if (teamNumber == 4) {
		return 'https://www.mytischtennis.de/clicktt/TTVWH/17-18/ligen/Kreisliga-D-Gr-2/gruppe/310546/tabelle/gesamt';
	} 
};

exports.getTeamNameFromTeamNumber = function (teamNumber) {
	if (teamNumber == 1) {
		return 'TSV Kleinsachsenheim';
	} else if (teamNumber == 2) {
		return 'TSV Kleinsachsenheim II';
	} else if (teamNumber == 3) {
		return 'TSV Kleinsachsenheim III';
	} else if (teamNumber == 4) {
		return 'TSV Kleinsachsenheim IV';
	} 
};

