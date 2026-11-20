import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Breakfast extends Component {
	state = {
		breakfasts: [],
		breakfastInfo: {},
		page: 1
	}

	componentDidMount() {
		this.loadBreakfast();
	}

	loadBreakfast = async (page = 1) => {
		const response = await api.get(`/breakfast?page=${page}`);

		const { docs, ...breakfastInfo } = response.data;

		this.setState({ breakfasts: docs, breakfastInfo, page });
	}

	prevPage = () => {
		const { page } = this.state;

		if (page === 1) return;

		const pageNumber = page - 1;

		this.loadBreakfast(pageNumber);
	}

	nextPage = () => {
		const { page, breakfastInfo } = this.state;

		if (page === breakfastInfo.pages) return;

		const pageNumber = page + 1;

		this.loadBreakfast(pageNumber);
	}

	render() {
		const { breakfasts, page, breakfastInfo } = this.state;

		return (
			<div className="breakfast-list">
				{breakfasts.map(breakfast => (
					<article key={breakfast._id}>
						<h1>Café da Manhã: {breakfast.dateBreakfast}</h1>
						<p><strong>Bebidas:</strong> {breakfast.drinks}</p>
						<p><strong>Pães:</strong> {breakfast.breads}</p>
						<p><strong>Frutas:</strong> {breakfast.fruits}</p>
						<p><strong>Especial:</strong> {breakfast.special}</p>
					</article>
				))}
				
				<form className="form-inline mt-2 mt-md-0">
					<button className="btn btn-outline-success my-2 my-sm-0" disabled={page === 1} onClick={this.prevPage}>Anterior</button>
					<button className="btn btn-outline-success my-2 my-sm-0" disabled={page === breakfastInfo.pages} onClick={this.nextPage}>Próximo</button>
				</form>
			</div>
		);
	}
}