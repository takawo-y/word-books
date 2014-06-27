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
	self.wordbooksData = ko.observable();
	self.cardsData = ko.observable();
	self.displayRegister = ko.observable(false);
	self.message = ko.observable();
	self.regist_wordBookName = ko.observable();
	self.regist_biko = ko.observable();

	//単語帳一覧取得
	self.getWordbooks = function(){
		$.get('/wordbooks', function(data){
			self.title('Word book List');
			self.wordbooksData(data);
			self.displayRegister(false);
			self.cardsData(null);
		});
	};
	//登録画面を表示
	self.goToRegister = function() {
		self.title('Word book Addtion');
		self.wordbooksData(null);
		self.displayRegister(true);
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
			self.title('Cards List ('+ wordbook.word_book_name+')');
			self.wordbooksData(null);
			self.displayRegister(false);
			self.cardsData(data);
		});
	};

	//default
	self.getWordbooks();
};

// 次のコードで Knockout を起動します。
ko.applyBindings(new ViewModel());

