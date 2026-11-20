const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LunchSchema = new mongoose.Schema({
	main: {
		type: String,
		required: true
	},
	vegetarian: {
		type: String,
		required: true
	},
	salad: {
		type: String,
		required: true
	},
	garrison: {
		type: String,
		required: true
	},
	sideDish: {
		type: String,
		required: true
	},
	juice: {
		type: String,
		required: true
	},
	dessert: {
		type: String,
		required: true
	},
	dateLunch: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

LunchSchema.plugin(mongoosePaginate);

mongoose.model("Lunch", LunchSchema);