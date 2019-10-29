const mongoose = require('mongoose');

const Dinner = mongoose.model('Dinner');

module.exports = {
	// listar jantares
	async index(req, res) {
		const { page = 1 } = req.query;
		const dinners = await Dinner.paginate({}, { page, limit: 1 });

		return res.json(dinners);
	},

	// mostrar jantar
	async show(req, res) {
		const dinner = await Dinner.findById(req.params.id);

		return res.json(dinner);
	},

	// criar jantar
	async store(req, res) {
		const dinner = await Dinner.create(req.body);

		return res.json(dinner);
	},

	// atualizar jantar
	async update(req, res) {
		const dinner = await Dinner.findByIdAndUpdate(req.params.id, req.body, { new: true });

		return res.json(dinner);
	},

	// apagar jantar
	async destroy(req, res) {
		await Dinner.findByIdAndRemove(req.params.id);

		return res.send();
	}
}