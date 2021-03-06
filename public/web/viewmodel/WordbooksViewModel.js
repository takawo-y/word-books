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
	self.studyCard = ko.observable();  //勉強時のカードデータ

	self.displayRegister = ko.observable(false);  //単語帳登録画面
	self.regist_wordBookName = ko.observable();  //単語帳登録 単語帳名
	self.regist_biko = ko.observable();  //単語帳登録 備考

	self.displayCardRegister = ko.observable(false);  //カード登録画面
	self.regist_cardFront = ko.observable();  //カード登録 表
	self.regist_cardBack = ko.observable();  //カード登録 裏

	self.displayFront = ko.observable(false); //Study表
	self.card_front = ko.observable(false);  //カード表
	self.displayBack = ko.observable(false);  //Study裏
	self.card_back = ko.observable(false);  //カード裏
	self.numberStudy = ko.observable(0);  //カード枚数


	//単語帳一覧取得
	self.getWordbooks = function(){
		$.get('/wordbooks', function(data){
			self.title('Word book List');
			self.message(null);
			self.wordBookId(null);
			self.wordBookName(null);
			self.displayButtonRegist(true);
			self.displayButtonRegistCard(false);  //カード新規登録ボタン
			self.wordbooksData(data);
			self.cardsData(null);
			self.displayRegister(false);
		 	self.displayCardRegister(false);

			self.displayFront(false); //Study表
			self.card_front(false);  //カード表
			self.displayBack(false);  //Study裏
			self.card_back(false);  //カード裏
			self.numberStudy(0);  //カード枚数
		});
	};
	//単語帳登録画面を表示
	self.goToWordRegister = function() {
		self.title('Word book Addtion');
		self.message(null);
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
					var mesg = rtn.message;
					$.get('/wordbooks', function(data){
						self.title('Word book List');
						self.message(rtn.message);
						self.wordbooksData(data);
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
			self.message(null);
			self.wordbooksData(null);
			self.displayRegister(false);
		 	self.displayButtonRegist(false);
			self.displayButtonRegistCard(true);  //カード新規登録ボタン
			self.cardsData(data);
		});
	};
	//Study
	self.study = function(wordbook){
		$.get('/wordbooks/'+wordbook._id+'/cards', function(data){
			self.cardsData(null);
			self.wordBookId(wordbook._id);
			self.wordBookName(wordbook.word_book_name);
			self.title('Study ('+ wordbook.word_book_name +')');
			self.message(null);
			self.wordbooksData(null);
			self.studyCard(data);
			self.displayRegister(false);
			self.displayButtonRegist(false);

			self.displayFront(true);
			self.card_front(data.cards[0].front_card);
		});
	};
	//解答
	self.anser = function(){
		self.displayFront(false);
		self.displayBack(true);
		self.card_back(self.studyCard().cards[self.numberStudy()].back_card);

	};
	//次へ
	self.nextCard = function(){
		self.numberStudy(self.numberStudy()+1);
		self.displayFront(true);
		self.card_front(self.studyCard().cards[self.numberStudy()].front_card);
		self.displayBack(false);

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
	//カード新規登録
	self.registCard = function(){
		var wordBookId = self.wordBookId();
		var postData ={
			word_book_id: wordBookId,
			front_card: self.regist_cardFront(),
			back_card: self.regist_cardBack()
		};
		$.post('/wordbooks/'+wordBookId+'/cards', postData, function(rtn){
			self.message(rtn.message);
			$.get('/wordbooks/'+self.wordBookId()+'/cards', function(data){
				self.cardsData(data);
				self.displayCardRegister(false);  //カード登録画面
				self.title('Cards List ('+ wordbook.word_book_name +')');
				self.displayRegister(false);
				self.displayButtonRegist(false);
				self.displayButtonRegistCard(true);  //カード新規登録ボタン
			});
		});
	};
	//カード削除
	self.deleteCard = function(data){
		$.ajax({
			url: '/wordbooks/cards/'+data._id,
			type: 'DELETE',
			success: function(rtn){
				self.message(rtn.message);
				$.get('/wordbooks/'+self.wordBookId()+'/cards', function(data){
					self.cardsData(data);
					self.title('Cards List ('+ wordbook.word_book_name +')');
					self.displayRegister(false);
					self.displayCardRegister(false);  //カード登録画面
					self.displayButtonRegist(false);
					self.displayButtonRegistCard(true);  //カード新規登録ボタン
				});
			}
		});
	};


	//default
	self.getWordbooks();
};

// 次のコードで Knockout を起動します。
ko.applyBindings(new ViewModel());

