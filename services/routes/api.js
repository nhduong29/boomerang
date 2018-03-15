

/*
 * GET /api/v6/banks/{number}/amloDecision
 *
 * Parameters (named path params accessible on req.params and query params on req.query):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * riskReduction(type: integer) - query parameter - Code of the risk reduction
 * pepSystem(type: string) - query parameter - Automatically generated code for politically exposed persons
 * riskIncrease(type: integer) - query parameter - Code of the risk increase
 * clientMainType(type: integer) - query parameter - Client main type code according to KD_STAMM.KD_HTYP_CD
 * clientCategory(type: integer) - query parameter - Client category code
 * pepManual(type: string) - query parameter - Manually generated code for politically exposed persons
 * countryOfDomicile(type: string) - query parameter - ISO_3166-1 - Country code of the country of domicile
 * financialIntermediary(type: boolean) - query parameter - Yes / No code showing whether or not the client is a financial intermediary
 * nationality(type: string) - query parameter - ISO_3166-1 - Country code of the leading client's nationality
 * furtherRisks(type: boolean) - query parameter - Code showing whether there are further risk criteria
 * pepManual2ndPerson(type: string) - query parameter - Manually generated code for another politically exposed person with a relationship to the client
 * nationality2ndPerson(type: string) - query parameter - ISO_3166-1 - Country code of the referenced client's nationality
 * countryOfDomicileControllingCompany(type: string) - query parameter - Code of the controlling company's country of domicile. This is loaded if the client is controlled by a foreign company
 * domiciliaryCompany(type: boolean) - query parameter - Code for a domiciliary company (company that does not do business in the country of domicile)
 * cdbIdentification(type: string) - query parameter - CDB check type code of the client
 * legalStatus(type: integer) - query parameter - Code of the company's legal status
 * noga(type: string) - query parameter - Sector / NOGA code ((Nomenclature Generale des Activites economiques: General Classification of Economic Activities) according to version 2008)
 */
exports.getApiV6BanksAmlodecision = function(req, res) {
	req.check('number', 'Invalid parameter').notEmpty();
	if (req.validationErrors()) {
		return res.json(400,req.validationErrorsJson());
	}
	res.status(200);

	// set response body and send
	res.json({});
};

/*
 * GET /api/v6/banks/{number}/clients/
 *
 * Parameters (named path params accessible on req.params and query params on req.query):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * firstName(type: string) - query parameter - First name of the client or company name in the case of a company
 * lastName(type: string) - query parameter - Last name of the client
 * firstNamePartner(type: string) - query parameter - First name of the client's partner
 * lastNamePartner(type: string) - query parameter - Last name of the client's partner
 * dateOfBirthPartner(type: string) - query parameter - Date of birth of the client's partner
 * dateOfBirth(type: string) - query parameter - Date of birth of the client
 */
exports.getApiV6BanksClients = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(200);
    
    // set response body and send
    res.json([{
        "number": "1234",
        "externalNumber": "string",
        "id": "123",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string",
        "lastName": "string",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "5678",
        "externalNumber": "string",
        "id": "456",
        "clientStatus": 1,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string1",
        "lastName": "string1",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "9012",
        "externalNumber": "string",
        "id": "789",
        "clientStatus": 100,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string2",
        "lastName": "string2",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1278",
        "externalNumber": "string",
        "id": "012",
        "clientStatus": 300,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string3",
        "lastName": "string3",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1234",
        "externalNumber": "string",
        "id": "123",
        "clientStatus": 100,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string",
        "lastName": "string",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "5678",
        "externalNumber": "string",
        "id": "456",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string1",
        "lastName": "string1",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "9012",
        "externalNumber": "string",
        "id": "789",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string2",
        "lastName": "string2",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1278",
        "externalNumber": "string",
        "id": "012",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string3",
        "lastName": "string3",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1234",
        "externalNumber": "string",
        "id": "123",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string",
        "lastName": "string",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "5678",
        "externalNumber": "string",
        "id": "456",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string1",
        "lastName": "string1",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "9012",
        "externalNumber": "string",
        "id": "789",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string2",
        "lastName": "string2",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1278",
        "externalNumber": "string",
        "id": "012",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string3",
        "lastName": "string3",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1234",
        "externalNumber": "string",
        "id": "123",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string",
        "lastName": "string",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "5678",
        "externalNumber": "string",
        "id": "456",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string1",
        "lastName": "string1",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "9012",
        "externalNumber": "string",
        "id": "789",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string2",
        "lastName": "string2",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1278",
        "externalNumber": "string",
        "id": "012",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string3",
        "lastName": "string3",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1234",
        "externalNumber": "string",
        "id": "123",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string",
        "lastName": "string",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "5678",
        "externalNumber": "string",
        "id": "456",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string1",
        "lastName": "string1",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "9012",
        "externalNumber": "string",
        "id": "789",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string2",
        "lastName": "string2",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }, {
        "number": "1278",
        "externalNumber": "string",
        "id": "012",
        "clientStatus": 0,
        "closureDate": "2017-09-14T08:45:42.252Z",
        "firstName": "string3",
        "lastName": "string3",
        "clientHeaderRow2": "string",
        "clientHeaderRow3": "string",
        "postCode": 0,
        "place": "string",
        "canton": "string",
        "dateOfBirth": "2017-09-14T08:45:42.252Z",
        "clientIdentified": false
    }]);
};

/*
 * POST /api/v6/banks/{number}/clients/
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 */
exports.postApiV6BanksClients = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(201);
    
    var externalNumber = (Math.random() * 100).toFixed(3).toString();
    var id = Math.floor(Math.random() * 90000).toString();
    var number = Math.floor(Math.random() * 90000).toString();
    
    // set response body and send
    res.json({
        "externalNumber": externalNumber,
        "id": id,
        "number": number
    
    });
};

/*
 * GET /api/v6/banks/{number}/clients/{id}
 *
 * Parameters (named path params accessible on req.params and query params on req.query):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID
 */
exports.getApiV6Banks = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(200);
    
    // set response body and send
    res.json(
        [{
            "number": "1234",
            "externalNumber": "string",
            "id": "123",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "Tin",
            "lastName": "Tran",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "5678",
            "externalNumber": "string",
            "id": "456",
            "clientStatus": 1,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string1",
            "lastName": "string1",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "9012",
            "externalNumber": "string",
            "id": "789",
            "clientStatus": 100,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string2",
            "lastName": "string2",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1278",
            "externalNumber": "string",
            "id": "012",
            "clientStatus": 300,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string3",
            "lastName": "string3",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1234",
            "externalNumber": "string",
            "id": "123",
            "clientStatus": 1,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string",
            "lastName": "string",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "5678",
            "externalNumber": "string",
            "id": "456",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string1",
            "lastName": "string1",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "9012",
            "externalNumber": "string",
            "id": "789",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string2",
            "lastName": "string2",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1278",
            "externalNumber": "string",
            "id": "012",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string3",
            "lastName": "string3",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1234",
            "externalNumber": "string",
            "id": "123",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string",
            "lastName": "string",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "5678",
            "externalNumber": "string",
            "id": "456",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string1",
            "lastName": "string1",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "9012",
            "externalNumber": "string",
            "id": "789",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string2",
            "lastName": "string2",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1278",
            "externalNumber": "string",
            "id": "012",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string3",
            "lastName": "string3",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1234",
            "externalNumber": "string",
            "id": "123",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string",
            "lastName": "string",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "5678",
            "externalNumber": "string",
            "id": "456",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string1",
            "lastName": "string1",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "9012",
            "externalNumber": "string",
            "id": "789",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string2",
            "lastName": "string2",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1278",
            "externalNumber": "string",
            "id": "012",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string3",
            "lastName": "string3",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1234",
            "externalNumber": "string",
            "id": "123",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string",
            "lastName": "string",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "5678",
            "externalNumber": "string",
            "id": "456",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string1",
            "lastName": "string1",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "9012",
            "externalNumber": "string",
            "id": "789",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string2",
            "lastName": "string2",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }, {
            "number": "1278",
            "externalNumber": "string",
            "id": "012",
            "clientStatus": 0,
            "closureDate": "2017-09-14T08:45:42.252Z",
            "firstName": "string3",
            "lastName": "string3",
            "clientHeaderRow2": "string",
            "clientHeaderRow3": "string",
            "postCode": 0,
            "place": "string",
            "canton": "string",
            "dateOfBirth": "2017-09-14T08:45:42.252Z",
            "clientIdentified": false
        }]
    );
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Here, either the technical client ID obtained from POST call from resource '/api/v6/banks/{number}/clients', or a UUID generated on the client side can be used
 */
exports.putApiV6Banks = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(200);
    
    // set response body and send
    res.json({
        "counterpartyCategory": 1234,
        "id": "12345678"
    });
};

/*
 * POST /api/v6/banks/{number}/clients/{id}/accounts
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID
 */
exports.postApiV6BanksAccounts = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(201);
    
    // set response body and send
    res.json({
        "externalNumber": "699.999.99.100",
        "id": 222,
        "number": 3333
    });
    
    
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/accounts/{acId}/cards/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID
 * acId(type: string) - path parameter - Technical account ID.
 * uuid(type: string) - path parameter -
 */
exports.putApiV6Banks2 = function(req, res) {
	req.check('number', 'Invalid parameter').notEmpty();
	req.check('id', 'Invalid parameter').notEmpty();
	req.check('acId', 'Invalid parameter').notEmpty();
	req.check('uuid', 'Invalid parameter').notEmpty();
	if (req.validationErrors()) {
		return res.json(400,req.validationErrorsJson());
	}
	res.status(201);

	// set response body and send
	res.json({});
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/accounts/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID (KD_LNR)
 * uuid(type: string) - path parameter - Here, either the technical account ID obtained from POST call from resource '/banks/{number}/clients/{id}/accounts', or a UUID generated on the client side can be used.
 */
exports.putApiV6Banks3 = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    req.check('uuid', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(201);
    
    // set response body and send
    res.json({
        "category": 123456,
        "id": "666.666.66.100"
    });
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/cdb/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID (KD_LNR) of the client for which the CDB entry should be made.
 * uuid(type: string) - path parameter - A UUID generated on the client side that unambiguously identifies the CDB resource
 */
exports.putApiV6Banks4 = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    req.check('uuid', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(200);
    
    // set response body and send
    res.json({});
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/contracts/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID (KD_LNR)
 * uuid(type: string) - path parameter - A UUID generated on the client side that unambiguously identifies the contract resource
 */
exports.putApiV6Banks5 = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    req.check('uuid', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(200);
    
    // set response body and send
    res.json({
        "contractId": "1231234567",
        "id": 4567812,
    });
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/notes/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID)
 * uuid(type: string) - path parameter - A UUID generated on the client side that unambiguously identifies the note resource
 */
exports.putApiV6Banks6 = function(req, res) {
	req.check('number', 'Invalid parameter').notEmpty();
	req.check('id', 'Invalid parameter').notEmpty();
	req.check('uuid', 'Invalid parameter').notEmpty();
	if (req.validationErrors()) {
		return res.json(400,req.validationErrorsJson());
	}
	res.status(200);

	// set response body and send
	res.json({});
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/pendingTasks/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID
 * uuid(type: string) - path parameter - A UUID generated on the client side that unambiguously identifies the pending task resource
 */
exports.putApiV6Banks7 = function(req, res) {
	req.check('number', 'Invalid parameter').notEmpty();
	req.check('id', 'Invalid parameter').notEmpty();
	req.check('uuid', 'Invalid parameter').notEmpty();
	if (req.validationErrors()) {
		return res.json(400,req.validationErrorsJson());
	}
	res.status(200);

	// set response body and send
	res.json({});
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/powersOfAttorney/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Client ID
 * uuid(type: string) - path parameter - A UUID generated on the client side that unambiguously identifies the power of attorney resource.
 */
exports.putApiV6Banks8 = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    req.check('uuid', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(201);
    
    // set response body and send
    res.json({
        "contractId": "123456789",
        "id": 123456789
    });
};

/*
 * PUT /api/v6/banks/{number}/clients/{id}/relationships/{uuid}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * number(type: integer) - path parameter - Finnova USERBK_NR
 * id(type: string) - path parameter - Technical client ID (KD_LNR)
 * uuid(type: string) - path parameter - A UUID generated on the client side that unambiguously identifies the relationship resource
 */
exports.putApiV6Banks9 = function(req, res){
    req.check('number', 'Invalid parameter').notEmpty();
    req.check('id', 'Invalid parameter').notEmpty();
    req.check('uuid', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(201);
    
    // set response body and send
    res.json({
        "id": "123456789"
    });
};