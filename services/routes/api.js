exports.getHelloWorld = function(req, res) {
	res.status(200);
	res.json({
        "text" : "Hello world", 
       	year : 2018, 
       	happiness : true,
       	anObject : {
          name : "Juno",
          city : ["Hung Yen", "Sai gon", "Can Tho"]
        }
      });
};
