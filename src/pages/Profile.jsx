import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../css/carregando.css';
import '../css/profile.css';

class Profile extends React.Component {
  state = {
    isLoading: false,
    info: {},
  };

  async componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const user = await getUser();
      this.setState({
        isLoading: false,
        info: user,
      });
    });
  }

  render() {
    const { isLoading, info: { name, email, image, description } } = this.state;
    return (
      <div className="perfil" data-testid="page-profile">
        <Header />
        {isLoading ? <Carregando />
          : (
            <div className="card-perfil">
              <img
                className="img-perfil"
                data-testid="profile-image"
                src={ image }
                alt="foto de perfil"
              />
              <h3 className="perfil-name">
                Nome:
                {' '}
                {name}
              </h3>
              <h3 className="perfil-email">
                E-mail:
                {' '}
                {email}
              </h3>
              <h3 className="perfil-description">
                Descrição:
                {' '}
                {description}
              </h3>
              <button className="button-edit" type="button">
                <Link className="link" to="/profile/edit">Editar perfil</Link>
              </button>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
