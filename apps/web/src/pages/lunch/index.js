import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Lunch extends Component {
	state = {
		lunchs: [],
		lunchInfo: {},
		page: 1 
	}

	componentDidMount() {
		this.loadLunch();
	}

	loadLunch = async (page = 1) => {
		const response = await api.get(`/lunch?page=${page}`);

		const { docs, ...lunchInfo } = response.data;

		this.setState({ lunchs: docs, lunchInfo, page });
	}

	prevPage = () => {
		const { page } = this.state;

		if (page === 1) return;

		const pageNumber = page - 1;

		this.loadLunch(pageNumber);
	}

	nextPage = () => {
		const { page, lunchInfo } = this.state;

		if (page === lunchInfo.pages) return;

		const pageNumber = page + 1;

		this.loadLunch(pageNumber);
	}

	render() {
		const { lunchs, lunchInfo, page } = this.state;

		return (
			<div className="lunch-list">
				{lunchs.map(lunch => (
					<article key={lunch._id}>
						<h1>Almoço: {lunch.dateLunch}</h1>
						<p><strong>Principal:</strong> {lunch.main}</p>
						<p><strong>Vegetariano:</strong> {lunch.vegetarian}</p>
						<p><strong>Salada:</strong> {lunch.salad}</p>
						<p><strong>Guarnição:</strong> {lunch.garrison}</p>
						<p><strong>Acompanhamento:</strong> {lunch.sideDish}</p>
						<p><strong>Suco:</strong> {lunch.juice}</p>
						<p><strong>Sobremesa:</strong> {lunch.dessert}</p>
					</article>
				))}
				<form className="form-inline mt-2 mt-md-0">
					<button className="btn btn-outline-success my-2 my-sm-0" disabled={page === 1} onClick={this.prevPage}>Anterior</button>
					<button className="btn btn-outline-success my-2 my-sm-0" disabled={page === lunchInfo.pages} onClick={this.nextPage}>Próximo</button>
				</form>
			</div>
		);
	}
}