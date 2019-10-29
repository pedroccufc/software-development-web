const mongoose = require('mongoose');

const Breakfast = mongoose.model('Breakfast');

module.exports = {
	// Lista Cafés da Manhã
	async index(req, res) {
		const { page = 1 } = req.query;
		const breakfasts = await Breakfast.paginate({}, { page, limit: 1 });

		return res.json(breakfasts);
	},

	// mostra café da manhã
	async show(req, res) {
		const breakfast = await Breakfast.findById(req.params.id);

		return res.json(breakfast);
	},

	// Cria Café da Manhã
	async store(req, res) {
		const breakfast = await Breakfast.create(req.body);

		return res.json(breakfast);
	},

	// atualiza café da manhã
	async update(req, res) {
		const breakfast = await Breakfast.findByIdAndUpdate(req.params.id, req.body, { new: true });

		return res.json(breakfast);
	},

	// apagar jantar
	async destroy(req, res) {
		await Breakfast.findByIdAndRemove(req.params.id);

		return res.send();
	}
}