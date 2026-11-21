import React from 'react';

import './styles.css';

// The header must not render Main: Main is mounted alongside the header.
export default function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active"><a className="nav-link" href="#">Início</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Cardápio</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Perfil</a></li>
        </ul>
        <form className="form-inline mt-2 mt-md-0" onSubmit={(event) => event.preventDefault()}>
          <input className="form-control mr-sm-2" type="text" placeholder="Pesquisar cardápio" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form>
      </div>
    </nav>
  );
}
