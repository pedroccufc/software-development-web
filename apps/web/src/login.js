import React, { Component } from 'react';

import './login.css';

import Header from './components/Header';
import Main from './pages/main';

// This is an interface-only entry screen, not server-side authentication.
export default class Login extends Component {
  state = { logou: false };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ logou: true });
  };

  render() {
    if (this.state.logou) {
      return <><Header /><Main /></>;
    }

    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Bem-vindo ao SIGRU</h1>
        <label className="sr-only" htmlFor="inputMatricula">Matrícula</label>
        <input id="inputMatricula" className="form-control" placeholder="Matrícula" required autoFocus />
        <label className="sr-only" htmlFor="inputSenha">Senha</label>
        <input id="inputSenha" className="form-control" placeholder="Senha" type="password" required />
        <div className="checkbox mb-3 text-center">
          <label><input type="checkbox" value="lembre-me" /> Lembre-me</label>
        </div>
        <button type="submit" className="btn btn-lg btn-outline-success my-2 my-sm-0 btn-block">Entrar</button>
      </form>
    );
  }
}
