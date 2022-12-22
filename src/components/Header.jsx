import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import '../css/header.css';
import Logo from '../images/logo.png';

class Header extends React.Component {
  state = {
    name: '',
    isLoading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      isLoading: false,
    });
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      <header className="container-header" data-testid="header-component">
        {isLoading ? <Carregando />
          : (
            <>
              <img className="header" src="https://i.stack.imgur.com/YEZvK.png" alt="imagem-header" />
              <img className="logo" src={ Logo } alt="logotrybetunes" />
              <div className="container-name">
                <img src="https://media.licdn.com/dms/image/C4D03AQEcG_LT9YGSOA/profile-displayphoto-shrink_800_800/0/1662469479962?e=1676505600&v=beta&t=WOGNBvUonRpRk58P5pEQuJ2qkWyNV3pydTx3mNq6vOU" alt="foto-perfil" className="foto-perfil" />
                <h2 className="name" data-testid="header-user-name">{ name }</h2>
              </div>

              <div className="container-link">
                <Link
                  className="link-search"
                  data-testid="link-to-search"
                  to="/search"
                >
                  Pesquisa

                </Link>
                <Link
                  className="link-favorite"
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  Favoritas
                </Link>
                <Link
                  data-testid="link-to-profile"
                  to="/profile"
                  className="link-profile"
                >
                  Profile

                </Link>
              </div>
            </>
          )}
      </header>
    );
  }
}

export default Header;
