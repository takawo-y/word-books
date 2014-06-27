var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('wordBook', {title: 'Word Book List'});
});

module.exports = router;
