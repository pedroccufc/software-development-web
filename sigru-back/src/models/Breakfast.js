const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BreakfastSchema = new mongoose.Schema({
	drinks: {
		type: String,
		required: true
	},
	breads: {
		type: String,
		required: true
	},
	fruits: {
		type: String,
		required: true
	},
	special: {
		type: String,
		required: true
	},
	dateBreakfast: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

BreakfastSchema.plugin(mongoosePaginate);

mongoose.model("Breakfast", BreakfastSchema);