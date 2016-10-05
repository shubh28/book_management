var bodyParser = require('body-parser');
var Book = require('../models/books.js');

module.exports = function(app,router){
	
	router.use(function(req,res,next){
		console.log('Something happening');
		next();
	});
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());
	
	router.get('/',function(req,res){
		res.json('Welcome to the books api');
	});

	router.route('/books').post(function(req,res){
		var book = new Book();
		book.name = req.body.name;
		book.availability = req.body.availability;
		book.price = req.body.price;
		book.image_url = req.body.image_url;
		book.save(function(err){
			if(err) res.send(err);
			else res.json({message:"Book Added"});
		});
	}).get(function(req,res){
		Book.find(function(err,books){
			if(err)
				console.log(err);
			else
				res.json(books);
		});
	});

	router.route('/books/:book_id').get(function(req,res){
		Book.findById(req.params.book_id,function(err,book){
			if(err)
				console.log(err);
			else
				res.json(book);
		});
	});

};
