/**
 * Created with JetBrains WebStorm.
 * User: 9004027600
 * Date: 14/06/25
 * Time: 11:05
 * To change this template use File | Settings | File Templates.
 */
var ViewModel = function() {
	var self = this;
	self.title = ko.observable();
	self.message = ko.observable();  //メッセージ
	self.wordBookId = ko.observable();
	self.wordBookName = ko.observable();

 	self.displayButtonRegist = ko.observable(false);  //単語帳新規登録ボタン
	self.displayButtonRegistCard = ko.observable(false);  //カード新規登録ボタン

	self.wordbooksData = ko.observable();  //単語帳一覧データ
	self.cardsData = ko.observable();  //カード一覧データ

	self.displayRegister = ko.observable(false);  //単語帳登録画面
	self.regist_wordBookName = ko.observable();  //単語帳登録 単語帳名
	self.regist_biko = ko.observable();  //単語帳登録 備考

	self.displayCardRegister = ko.observable(false);  //カード登録画面
	self.regist_cardFront = ko.observable();  //カード登録 表
	self.regist_cardBack = ko.observable();  //カード登録 裏


	//単語帳一覧取得
	self.getWordbooks = function(){
		$.get('/wordbooks', function(data){
			self.title('Word book List');
			self.wordBookId(null);
			self.wordBookName(null);
			self.displayButtonRegist(true);
			self.displayButtonRegistCard(false);  //カード新規登録ボタン
			self.wordbooksData(data);
			self.displayRegister(false);
		 	self.displayCardRegister(false);
		 	self.cardsData(null);
		});
	};
	//登録画面を表示
	self.goToRegister = function() {
		self.title('Word book Addtion');
		self.wordBookId(null);
		self.wordBookName(null);
		self.wordbooksData(null);
		self.cardsData(null);
		self.displayRegister(true);
		self.displayCardRegister(false);  //カード登録画面
		self.displayButtonRegistCard(false);  //カード新規登録ボタン
		self.regist_wordBookName(null);
		self.regist_biko(null);
	};
	//単語帳新規登録
	self.registWordbooks = function(){
		var postData ={
			word_book_name: self.regist_wordBookName(),
			biko: self.regist_biko()
		};
		$.post('/wordbooks', postData, function(rtn){
			self.message(rtn.message);
			$.get('/wordbooks', function(data){
				self.title('Word book List');
				self.wordbooksData(data);
				self.displayRegister(false);
				self.cardsData(null);
			});
		});
	}
	//単語帳削除
	self.deleteWordbook = function(wordbook){
		$.ajax({
				url: 'wordbooks/'+wordbook._id,
				type: 'DELETE',
				success: function(rtn){
					self.message(rtn.message);
					$.get('/wordbooks', function(data){
						self.title('Word book List');
						self.wordbooksData(data);
						self.displayRegister(false);
						self.cardsData(null);
					});
				}
		});
	};
	//カード一覧取得
	self.getCards = function(wordbook){
		$.get('/wordbooks/'+wordbook._id+'/cards', function(data){
			self.wordBookId(wordbook._id);
			self.wordBookName(wordbook.word_book_name);
			self.title('Cards List ('+ wordbook.word_book_name +')');
			self.wordbooksData(null);
			self.displayRegister(false);
		 	self.displayButtonRegist(false);
			self.displayButtonRegistCard(true);  //カード新規登録ボタン
			self.cardsData(data);
		});
	};
	//カード登録画面
	self.goToCardRegister = function(){
		self.title('Card Addition (' + self.wordBookName() + ')');
	 	self.displayButtonRegist(false);
		self.wordbooksData(null);  //単語帳一覧データ
		self.cardsData(null);  //カード一覧データ
		self.displayRegister(false);  //単語帳登録画面
		self.displayCardRegister(true);  //カード登録画面
		self.message(null);  //メッセージ
		self.regist_cardFront(null);  //カード登録 表
		self.regist_cardBack(null);  //カード登録 裏

	};

	//default
	self.getWordbooks();
};

// 次のコードで Knockout を起動します。
ko.applyBindings(new ViewModel());

