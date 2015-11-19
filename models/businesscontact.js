//Import mongoose
var mongoose = require('mongoose');

//mongoose.Schema
var Schema = mongoose.Schema;

//Define Schema
var BussSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	created: {
        type: Date,
        default: Date.now
    },
	updated: Date
}, {
	collection: 'businessContact'
});

module.exports = mongoose.model('Businesscontact', BussSchema);