var mongoose = require("mongoose"),
	Schema = mongoose.Schema, 
	ArticleSchema = new Schema({
		topic: {
			type: String,
		},
		title: {
			type: String,
			required: true,
			unique: true
		},
		link: {
			type: String,
			required: true
		},
		isSaved: {
			type: Boolean,
			default: false
		},
		note: {
			type: Schema.Types.ObjectId,
			ref: "Note"
			}
	});

	var Article = mongoose.model("Article", ArticleSchema);

	module.exports = Article;