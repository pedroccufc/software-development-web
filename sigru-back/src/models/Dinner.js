const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const DinnerSchema = new mongoose.Schema({
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
	dateDinner: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

DinnerSchema.plugin(mongoosePaginate);

mongoose.model("Dinner", DinnerSchema);