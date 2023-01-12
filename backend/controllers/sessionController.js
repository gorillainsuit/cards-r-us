const Session = require('../models/sessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
	// write code here
	const ssid = req.cookies['ssid'];
	if (!ssid) {
		console.log('No SSID cookie, redirecting...');
		return res.redirect('/signup');
	}
	Session.find({ cookieId: ssid }, (err, records) => {
		if (!records.length) {
			console.log('No session in database, redirecting...');
			return res.redirect('/signup');
		}

		return next();
	});
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
	//write code here
	const ssid = res.locals.user.id;
	console.log('Creating session for ssid: ', ssid);
	Session.create({ cookieId: ssid }, (err, document) => {
		if (err) return next(err);
		return next();
	});
};

module.exports = sessionController;
