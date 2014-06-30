/**
 * Created by Takawo on 14/06/17.
 */
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var model = require('../models/WordBook');
var cardModel = require('../models/Card');

/** 単語帳全件検索 **/
router.get('/', function(req, res) {
	model.find(function(err, wordbooks){
		res.send({wordbooks: wordbooks});
	});
});

/** 登録画面 **/
router.get('/new', function(req, res){
 res.render('wordBookRegist', {title: 'Word Book Addition'});
});

/** 登録 **/
router.post('/', function(req, res){
	model.create({
		word_book_name: req.body.word_book_name,
	 	biko: req.body.biko
	},function(err, result){
		if(!err){
			res.send({'message': '単語帳の登録が完了しました'});
		}else{
			res.send({'error': 'An error has occurred - ' + err});
		}
 	});
});

/** 削除 **/
router.delete('/:id', function(req, res){
 var objectId = ObjectID.createFromHexString(req.params.id);
	model.remove({'_id': objectId}, function(err){
		if(!err){
			res.send({'message': '削除が完了しました'});
		}else{
			res.send({'error': 'An error has occurred - ' + err});
		}
	});
});

/** 単語帳カード全件検索 **/
router.get('/:id/cards', function(req, res) {
	var objectId = ObjectID.createFromHexString(req.params.id);
	cardModel.find({word_book_id: objectId}, function(err, cards){
		res.send({cards: cards});
	});
});

/** 単語帳カード新規登録 **/
router.post('/:id/cards', function(req, res){
	var objectId = ObjectID.createFromHexString(req.params.id);
	cardModel.create({
		word_book_id: objectId,
		front_card: req.body.front_card,
		back_card: req.body.back_card
	}, function(err, result){
		if(!err){
			res.send({message: 'カードの登録が完了しました'});
		}else{
			res.send({'error': 'An error has occurred - ' + err});
		}
	});
});

module.exports = router;
