import React, { Component } from "react";
import api from "../../services/api";

import './styles.css';

import Header from '../../components/Header';
import Lunch from '../lunch';
import Breakfast from '../breakfast';
import Dinner from '../dinner';

export default class Main extends Component {
	render() {
		return (
			<div className="menu">
				<Header />
				<Breakfast />
				<Lunch />
				<Dinner />
			</div>
		);
	}
}