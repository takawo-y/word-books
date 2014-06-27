/**
 * Created with JetBrains WebStorm.
 * User: 9004027600
 * Date: 14/06/18
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var cardSchema = new mongoose.Schema({
	"word_book_id" : ObjectId,
	"front_card" : String,
	"back_card" : String,
	"results" : [
		{
			"date" : String,
			"result" : Boolean
		}
	],
 "regist_date" : { type: Date, default: Date.now },
 "update_date" : { type: Date, default: Date.now }
});

module.exports = mongoose.model('card', cardSchema);