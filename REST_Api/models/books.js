var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/books');
var BookSchema = new Schema({
	name : String,
	availability : String,
	price : Number,
	image_url : String
});

module.exports = mongoose.model('Book',BookSchema);