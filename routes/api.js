var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET todaysprice nepse listing. */
router.get('/todaysprice', function(req, res, next) {
  	// res.json({ message: 'hooray! welcome to our api!' });   

	/*fs.readFile('./output.json', 'utf8', function (err, data) {
  	if (err) throw err;
  		// obj = JSON.parse(data);
		console.log("data",data);
	});*/

	// Get content from file
	var contents = fs.readFileSync('./output.json');
	// Define to JSON type
	var jsonContent = JSON.parse(contents);
  	res.send(jsonContent);

});

module.exports = router;
