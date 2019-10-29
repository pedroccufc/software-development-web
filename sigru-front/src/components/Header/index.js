import React, { Component } from 'react';

import "./styles.css";
import Main from '../../pages/main';

class Header extends Component {
	state = {
		cardapio: "false"
	}

	handleClick = () => {
		this.setState({ cardapio: "true" });
	}

	render() {
		const { cardapio } = this.state;

		if (cardapio === "true") {
			return <Main />
		}

		return (
			<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          			<span class="navbar-toggler-icon"></span>
        		</button>
        		<div class="collapse navbar-collapse" id="navbarCollapse">
          			<ul class="navbar-nav mr-auto">
            			<li class="nav-item active">
              				<a class="nav-link" href="#">Início <span class="sr-only">(current)</span></a>
            			</li>
            			<li class="nav-item">
              				<a class="nav-link" href="#">Cardápio <span class="sr-only">(current)</span></a>
            			</li>
            			<li class="nav-item">
              				<a class="nav-link" href="#">Perfil <span class="sr-only">(current)</span></a>
            			</li>
          			</ul>
          			<form class="form-inline mt-2 mt-md-0">
            			<input class="form-control mr-sm-2" type="text" placeholder="Pesquisar cardápio" aria-label="Search" />
            			<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
          			</form>
        		</div>
        		<Main />
    		</nav>
		);
	}
	
};

export default Header;