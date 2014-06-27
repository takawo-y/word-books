/**
 * Created by Takawo on 14/06/17.
 */
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var model = require('../models/Card');

/** 単語帳カード全件検索 **/
router.get('/:id', function(req, res) {
	alert('Find cards!');
	var objectId = ObjectID.createFromHexString(req.params.id);
	model.find({word_book_id: objectId}, function(err, cards){
		res.send({cards: cards});
	});
});


module.exports = router;
