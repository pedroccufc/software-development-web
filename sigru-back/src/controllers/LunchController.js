const mongoose = require("mongoose");

const Lunch = mongoose.model("Lunch");

module.exports = {
	// Lista almoços
	async index(req, res) {
		const { page = 1 } = req.query;
		const lunchs = await Lunch.paginate({}, { page, limit: 1 });

		return res.json(lunchs);
	},

	// Mostra almoço
	async show(req, res) {
		const lunch = await Lunch.findById(req.params.id);

		return res.json(lunch);
	},

	// Cria almoços
	async store(req, res) {
		const lunch = await Lunch.create(req.body);

		return res.json(lunch);
	},

	// Atualiza almoço
	async update(req, res) {
		const lunch = await Lunch.findByIdAndUpdate(req.params.id, req.body, { new: true });

		return res.json(lunch);
	},

	// Deleta almoço
	async destroy(req, res) {
		await Lunch.findByIdAndRemove(req.params.id);

		return res.send();
	}


};