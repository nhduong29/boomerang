

/*
 * POST /egw/onboarding/v1/Channel
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.CheckServiceRequest = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('egw_CheckServiceRequest');
};

/*
 * POST /egw/onboarding/v1/Channel
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.HandoverFromAppRequest = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('egw_HandoverFromAppRequest');
};