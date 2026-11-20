import React, { Component } from "react";

import './styles.css';

import Lunch from '../lunch';
import Breakfast from '../breakfast';
import Dinner from '../dinner';

export default class Main extends Component {
	render() {
		return (
			<div className="menu">
				<Breakfast />
				<Lunch />
				<Dinner />
			</div>
		);
	}
}