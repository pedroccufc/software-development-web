import React, { Component } from 'react';

import './login.css';

import Header from './components/Header';
import Routes from './routes';

export default class Login extends Component {
	state = {
		logou: false
	}

	handleClick = () => {
		this.setState({ logou: "true" });
	}

	render() {
		const { logou } = this.state;

		if (logou === "true") {
			return <Header />
		}

		return (
			<div>
				<form className="form-signin">
					<h1 className="h3 mb-3 font-weight-normal">Bem-vindo ao SIGRU</h1>
					<label className="sr-only" for="inputMatricula">Matrícula</label>
					<input id="inputMatricula" className="form-control" placeholder="Matrícula" required="" autofocus="" />
					<label className="sr-only" for="inputSenha">Senha</label>
					<input id="inputSenha" className="form-control" placeholder="Senha" required="" />

					<div className="checkbox mb-3 text-center">
						<label>
							<input type="checkbox" value="lembre-me" />
							Lembre-me
						</label>
					</div>
					<form className="form-inline mt-2 mt-md-0">
						<button className="btn btn-lg btn-outline-success my-2 my-sm-0 btn-block" onClick={this.handleClick}>Entrar</button>
					</form>
				</form>)
			</div>
		);
	}
}