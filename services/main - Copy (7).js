var api = require("./routes/api.js")
var util = require("./util/util.js")
var egw = require("./routes/egw.js")
/* Route definition styles:
 *
 *	define(path, method, function)
 *	soap(path, soapAction, function)
 *
 */
Sandbox.define("/hello-world", "GET", api.getHelloWorld);
//Please try to make a GET call to localhost:9003/hello-vietnam
Sandbox.define("/hello-vietnam", "GET", function(req, res){
	res.status(200);
 	return res.send("Xin chao Viet Nam");
});

/* Route definition styles:
 *
 *	define(path, method, function)
 *	soap(path, soapAction, function)
 *
 */
Sandbox.soap("/egw/onboarding/v1/Channel", "", "CheckServiceRequest", egw.CheckServiceRequest);
Sandbox.soap("/egw/onboarding/v1/Channel", "", "HandoverFromAppRequest", egw.HandoverFromAppRequest);