import React from 'react';
import Loading from '../images/loading.png';
import '../css/carregando.css';

class Carregando extends React.Component {
  render() {
    return (
      <div className="container-loading">
        <img className="img-load" src={ Loading } alt="imagem de carregando" />
        <h1 className="loading">Carregando...</h1>
      </div>
    );
  }
}

export default Carregando;
