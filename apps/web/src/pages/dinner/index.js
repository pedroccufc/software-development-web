import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Dinner extends Component {
	state = {
		dinners: [],
		dinnerInfo: {},
		page: 1
	}

	componentDidMount() {
		this.loadDinner();
	}

	loadDinner = async (page = 1) => {
		const response = await api.get(`/dinner?page=${page}`);

		const { docs, ...dinnerInfo } = response.data;

		this.setState({ dinners: docs, dinnerInfo, page });
	}

	prevPage = () => {
		const { page } = this.state;

		if (page === 1) return;

		const pageNumber = page - 1;

		this.loadDinner(pageNumber);
	}

	nextPage = () => {
		const { page, dinnerInfo } = this.state;

		if (page === dinnerInfo.pages) return;

		const pageNumber = page + 1;

		this.loadDinner(pageNumber);
	}

	render() {
		const { dinners, dinnerInfo, page } = this.state;

		return (
			<div className='dinner-list'>
				{dinners.map(dinner => (
					<article key={dinner._id}>
						<h1>Jantar: {dinner.dateDinner}</h1>
						<p><strong>Principal:</strong> {dinner.main}</p>
						<p><strong>Vegetariano:</strong> {dinner.vegetarian}</p>
						<p><strong>Salada:</strong> {dinner.salad}</p>
						<p><strong>Guarnição:</strong> {dinner.garrison}</p>
						<p><strong>Acompanhamento:</strong> {dinner.sideDish}</p>
						<p><strong>Suco:</strong> {dinner.juice}</p>
						<p><strong>Sobremesa:</strong> {dinner.dessert}</p>
					</article>
				))}
				<form className="form-inline mt-2 mt-md-0">
					<button className="btn btn-outline-success my-2 my-sm-0" disabled={page === 1} onClick={this.prevPage}>Anterior</button>
					<button className="btn btn-outline-success my-2 my-sm-0" disabled={page === dinnerInfo.pages} onClick={this.nextPage}>Próximo</button>
				</form>
			</div>
		);
	}
}