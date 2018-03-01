

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.FindDokument = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_FindDokument');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.FindKontoNummern = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_FindKontoNummern');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.FindKundeByKontoNr = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_FindKundeByKontoNr');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.FindKunden = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_FindKunden');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.GetBelegarten = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_GetBelegarten');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.GetDokument = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_GetDokument');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.GetEDHauptkategorien = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_GetEDHauptkategorien');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.GetObjektarten = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_GetObjektarten');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.GetUserBanks = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_GetUserBanks');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.Ping = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_Ping');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.UploadKundenDokument = function(req, res){
    res.status(400);
    
    // set response body and send
    res.type('xml');
    res.render('edossier_webservice_UploadKundenDokument');
};

/*
 * POST /edossier-webservice/EDossierWebservice
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 */
exports.UploadObjektDokument = function(req, res) {
	res.status(200);

	// set response body and send
	res.type('xml');
	res.render('edossier_webservice_UploadObjektDokument');
};