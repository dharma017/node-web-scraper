var express = require('express');
var router = express.Router();

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');

 // GET home page 
router.get('/', function(req, res, next) {
    
    // Get content from file
    var contents = fs.readFileSync('./output.json');
    
    // Define to JSON type
    var jsonContent = JSON.parse(contents);
    
    res.render('index', { title: 'Web Scraper', path: req.path,todaysPriceData: jsonContent });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Page', path: req.path });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' , path: req.path});
});

// Scraping Nepal Stock real time data
router.get('/scrape', function(req, res, next) {

    url = 'http://www.nepalstock.com.np/todaysprice/export/';

      var json = {};

      request(url, function(error, response, html){

        if(!error){                    
                var $ = cheerio.load(html),
                        tablesAsJson = tabletojson.convert($.html()),
                         firstTableAsJson = tablesAsJson[0];

            json = firstTableAsJson;

        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
          console.log('File successfully written! - Check your project directory for the output.json file');
        });

        res.send('Check your console!');

      });

});

module.exports = router;
