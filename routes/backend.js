var express = require('express');
var http = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/listdata', function(req, res, next) {
  res.render('process-pcap', { title: 'pcapfilter' });
});
module.exports = router;
