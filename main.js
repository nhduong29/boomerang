
/*
 * Client Onboarding Interface
 *
 * Client Onboarding Interface
 */


var api = require("./routes/api.js")
var util = require("./util/util.js")
/* Route definition styles:
 *
 *	define(path, method, function)
 *	soap(path, soapAction, function)
 *
 */
Sandbox.define("/api/v6/banks/{number}/amloDecision", "GET", api.getApiV6BanksAmlodecision);
Sandbox.define('/api/v6/banks/{number}/clients', 'GET', api.getApiV6BanksClients);
Sandbox.define('/api/v6/banks/{number}/clients', 'POST', api.postApiV6BanksClients);
Sandbox.define("/api/v6/banks/{number}/clients/{id}", "GET", api.getApiV6Banks);
Sandbox.define('/api/v6/banks/{number}/clients/{id}', 'PUT', api.putApiV6Banks);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/accounts", "POST", api.postApiV6BanksAccounts);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/accounts/{acId}/cards/{uuid}", "PUT", api.putApiV6Banks2);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/accounts/{uuid}", "PUT", api.putApiV6Banks3);
Sandbox.define('/api/v6/banks/{number}/clients/{id}/cdb/{uuid}', 'PUT', api.putApiV6Banks4);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/contracts/{uuid}", "PUT", api.putApiV6Banks5);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/notes/{uuid}", "PUT", api.putApiV6Banks6);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/pendingTasks/{uuid}", "PUT", api.putApiV6Banks7);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/powersOfAttorney/{uuid}", "PUT", api.putApiV6Banks8);
Sandbox.define("/api/v6/banks/{number}/clients/{id}/relationships/{uuid}", "PUT", api.putApiV6Banks9);

Sandbox.define('/j_spring_security_check', 'POST', function(req, res){
    req.check('j_username', 'Invalid parameter').notEmpty();
    req.check('j_password', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    
    var SESSION_ID_LOGIN_SUCCESS = "JSESSIONID=SESSION_ID";
    var SESSION_ID_LOGIN_FAILED = "JSESSIONID=INVALID";
    var FINNOVA_USERNAME = "vz";
    var FINNOVA_PASSWORD = "1234";
    
    var j_password = req.body.j_password;
    if (req.body.j_username == FINNOVA_USERNAME && req.body.j_password == FINNOVA_PASSWORD) {
        res.status(200);
        res.header("Set-Cookie", SESSION_ID_LOGIN_SUCCESS);
        return res.send(SESSION_ID_LOGIN_SUCCESS);
    } else {
        res.status(400);
        res.header("Set-Cookie", SESSION_ID_LOGIN_FAILED);
        return res.send(SESSION_ID_LOGIN_FAILED);
        //res.status(302);
        //res.header("Set-Cookie", SESSION_ID_LOGIN_FAILED);
        // return res.send(SESSION_ID_LOGIN_FAILED);
    }
})

Sandbox.define('/token', 'POST', function(req, res){
    req.check('client_id', 'Invalid parameter').notEmpty();
    req.check('client_secret', 'Invalid parameter').notEmpty();
    req.check('redirect_uri', 'Invalid parameter').notEmpty();
    req.check('code', 'Invalid parameter').notEmpty();
    req.check('grant_type', 'Invalid parameter').notEmpty();
    
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    
    var validAccessToken = "0c81ece2-a93f-4ac9-8272-ce513a390dab";
    var invalidAccessToken = "";
    var tokenType = "token_type";
    var expiresIn = 3600;
    var idToken = "id_token";
    
    var userWithValidToken = {
        'access_token': validAccessToken,
        'token_type': tokenType,
        'expires_in': expiresIn,
        'id_token': idToken
    }
    
    var userWithInvalidToken = {
        'access_token': invalidAccessToken,
        'token_type': tokenType,
        'expires_in': expiresIn,
        'id_token': idToken
    }
    
    var cookie = (req.headers) ? req.headers.Cookie : undefined
    if (cookie == 'JSESSIONID=SESSION_ID') {
        res.status(200);
        return res.send(userWithValidToken);
    } else {
        res.status(200);
        return res.send(userWithInvalidToken);
    }
})

Sandbox.define('/authorize', 'POST', function(req, res){
    req.check('client_id', 'Invalid parameter').notEmpty();
    req.check('response_type', 'Invalid parameter').notEmpty();
    req.check('redirect_uri', 'Invalid parameter').notEmpty();
    req.check('scope', 'Invalid parameter').notEmpty();
    
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    
    
    // Set the status code of the response.
    
    
    // Send the response
    res.status(302);
    var validAuthorizationCode = "12345678901234567890";
    var invalidAuthorizationCode = "";
    var cookie = (req.headers) ? req.headers.Cookie : undefined
    if (cookie == 'JSESSIONID=SESSION_ID') {
        res.header("Location", "code=" + validAuthorizationCode);
        return res.send(validAuthorizationCode);
    } else {
        res.header("Location", "code=" + invalidAuthorizationCode);
        return res.send(invalidAuthorizationCode);
    }
})

/**
 * My API Sandbox
 * 
 */

// A basic route returning a canned response
Sandbox.define('/assetallocation/{assetAllocationTypeId}/details/{languageCode}', 'GET', function(req, res){
    req.check('assetAllocationTypeId', 'Invalid parameter').notEmpty();
    req.check('languageCode', 'Invalid parameter').notEmpty();
    if (req.validationErrors()) {
        return res.json(400, req.validationErrorsJson());
    }
    res.status(200);
    // send 'Hello world' response
    res.json(
    {
        "ExpectedYield":0.06581,
        "ExpectedVolatility":0.14440242,
        "StdDeviation1Low":0.055,
        "StdDeviation1High": 0.04,
        "StdDeviation2Low":0.081,
        "StdDeviation2High":0.022,
     
        "Bandwidths": [
            {
                "ProgramCode": "AKTIEN",
                "Description": "Aktien",
                "MinValue": 0.4,
                "MaxValue": 1,
                "TargetWeight": 0.85,
                "SortOrder": 0
            },
     
            {
                "ProgramCode": "IMMO",
                "Description": "Immobilien",
                "MinValue": 0,
                "MaxValue": 0.07,
                "TargetWeight": 0,
                "SortOrder": 0
            },
     
     
            {
                "ProgramCode": "SPEZ",
                "Description": "Spezialitäten und Rohstoffe",
                "MinValue": 0,
                "MaxValue": 0.2,
                "TargetWeight": 0.02,
                "SortOrder": 0
            },
     
     
            {
                "ProgramCode": "ZW",
                "Description": "Zinswerte",
                "MinValue": 0,
                "MaxValue": 0.55,
                "TargetWeight": 0.1,
                "SortOrder": 0
            },
     
     
            {
                "ProgramCode": "RVV_MULTI",
                "Description": "Multi-Anlageklasse",
                "MinValue": 0,
                "MaxValue": 0.11,
                "TargetWeight": 0.1,
                "SortOrder": 0
     
            },
     
            {
                "ProgramCode": "LIQ",
                "Description": "Liquidität",
                "MinValue": 0,
                "MaxValue": 1,
                "TargetWeight":0.03,
                "SortOrder": 0
     
           }
     
     
        ],
     
     
        "PastReturns": [
     
            {
                "MaxValuePerYear":0.21,
                "AverageValuePerYear":0.17,
                "MinValuePerYear":0.15,
                "PeriodInYears": 1
            },
     
     
            {
                "MaxValuePerYear":0.22,
                "AverageValuePerYear":0.18,
                "MinValuePerYear":0.16,
                "PeriodInYears": 2
     
            },
     
     
            {
                "MaxValuePerYear":0.23,
                "AverageValuePerYear":0.19,
                "MinValuePerYear":0.17,
                "PeriodInYears": 3
     
            },
     
     
            {
                "MaxValuePerYear":0.24,
                "AverageValuePerYear": 0.2,
                "MinValuePerYear":0.18,
                "PeriodInYears": 4
            },
     
     
            {
                "MaxValuePerYear":0.25,
                "AverageValuePerYear":0.21,
                "MinValuePerYear":0.19,
                "PeriodInYears": 5
            },
     
     
            {
                "MaxValuePerYear":0.26,
                "AverageValuePerYear":0.22,
                "MinValuePerYear": 0.2,
                "PeriodInYears": 8
            },
     
     
            {
                "MaxValuePerYear":0.27,
                "AverageValuePerYear":0.23,
                "MinValuePerYear":0.21,
                "PeriodInYears": 10
     
            }
     
     
        ]
     
     
    }    
    );
});


// Using stateful behaviour to simulate creating users
Sandbox.define('/assetallocation/getcurrent', 'POST', function(req, res){
        state.users = state.users || [];
        
        // persist user by adding to the state object
        state.users.push(req.body);
        
        var json;
        
        var jsonFoundationMandateIndividual = {
            "AssetAllocationTypeId": 105,
            "FoundationSpecificAssetAllocationTypes": [
                98,
                108
            ]
        };
        
        var jsonFoundationMandateSpecific = {
            "AssetAllocationTypeId": 100,
            "FoundationSpecificAssetAllocationTypes": null
        };
        
        var jsonStandardMandate = {
            "AssetAllocationTypeId": 155,
            "FoundationSpecificAssetAllocationTypes": null
        };
        
        
        var riskProfileProducts = [62, 59, 18, 24, 17, 16, 58, 60, 49, 54, 14];
        var investmentDetailsProduct = [19, 29];
        
        if (isContain(investmentDetailsProduct, req.body.ProductId)) {
            if (req.body.InvestmentDetails.length > 1) {
                json = jsonFoundationMandateIndividual;
            } else {
                json = jsonFoundationMandateSpecific;
            }
            res.status(200);
        } else if (isContain(riskProfileProducts, req.body.ProductId)) {
            json = jsonStandardMandate;
            res.status(200);
        } else {
            json = {
                "error": "NVALID_INPUT"
            };
            res.status(400);
        }
        
        return res.json(json);
});

// Using stateful behaviour to simulate getting all users
Sandbox.define('/users', 'GET', function(req, res) {
    // retrieve users or, if there are none init, to empty array
    state.users = state.users || [{test: "test"}];

    return res.json(state.users);
});

// Using named route parameters to simulate getting a specific user
Sandbox.define('/users/{username}', 'GET', function(req, res) {
    // retrieve users or, if there are none, init to empty array
    state.users = state.users || [];

    // route param {username} is available on req.params
    var username = req.params.username;

    // log it to the console
    console.log("Getting user " + username + " details");

    // use lodash to find the user in the array
    var user = _.find(state.users, { "username": username});
    
    return res.json(user);
});

Sandbox.define('/getsample','POST', function(req, res) {
   state.users = state.users || [];
    
    // persist user by adding to the state object
    state.users.push(req.body);
    
    var json;
    
    var jsonFoundationMandateIndividual = {
        "AssetAllocationTypeId": 105,
        "FoundationSpecificAssetAllocationTypes": [
            98,
            108
        ]
    };
    
    var jsonFoundationMandateSpecific = {
        "AssetAllocationTypeId": 100,
        "FoundationSpecificAssetAllocationTypes": null
    };
    
    var jsonStandardMandate = {
        "AssetAllocationTypeId": 155,
        "FoundationSpecificAssetAllocationTypes": null
    };
    
    
    var riskProfileProducts = [62, 59, 18, 24, 17, 16, 58, 60, 49, 54, 14];
    var investmentDetailsProduct = [19, 29];
    
    if ( util.isContain(investmentDetailsProduct,req.body.ProductId)) {
        if ( req.body.InvestmentDetails.length > 1){
            json = jsonFoundationMandateIndividual;
        } else {
            json = jsonFoundationMandateSpecific;
        }
        res.status(200);
    } 
    else if ( util.isContain(riskProfileProducts, req.body.ProductId) ) {
        json = jsonStandardMandate;
        res.status(200);
    }
    else {
        json = {
            "error" : "NVALID_INPUT"
        };
        res.status(400);
    }
    
    return res.json(json);
});


/*
*ELCA service
*/
var edossier_webservice = require("./routes/edossier_webservice.js")

Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "findDokument", edossier_webservice.FindDokument);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "findKontoNummern", edossier_webservice.FindKontoNummern);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "findKundeByKontoNr", edossier_webservice.FindKundeByKontoNr);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "findKunden", edossier_webservice.FindKunden);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "getBelegarten", edossier_webservice.GetBelegarten);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "getDokument", edossier_webservice.GetDokument);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "getEDHauptkategorien", edossier_webservice.GetEDHauptkategorien);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "getObjektarten", edossier_webservice.GetObjektarten);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "getUserBanks", edossier_webservice.GetUserBanks);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "ping", edossier_webservice.Ping);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "uploadKundenDokument", edossier_webservice.UploadKundenDokument);
Sandbox.soap("/edossier-webservice/EDossierWebservice", "", "uploadObjektDokument", edossier_webservice.UploadObjektDokument);