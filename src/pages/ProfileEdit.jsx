import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../css/carregando.css';
import '../css/profileedit.css';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isLoading: false,
    btnDisable: true,
  };

  async componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const user = await getUser();
      this.setState({
        name: user.name,
        email: user.email,
        image: user.image,
        description: user.description,
        isLoading: false,
      });
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.handleValidate);
  };

  handleValidate = () => {
    const { name, email, description, image } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validateName = name.length !== 0;
    const validateEmail = regex.test(email);
    const validateImage = image.length !== 0;
    const validateDescription = description.length !== 0;
    this.setState({
      btnDisable:
      !(validateName
        && validateEmail
        && validateDescription
        && validateImage),
    });
  };

  update = async (name, email, description, image) => {
    const { history } = this.props;
    await updateUser({
      name,
      email,
      description,
      image,
    });
    history.push('/profile');
  };

  render() {
    const { isLoading, name, email, description, image, btnDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? (<Carregando />
        ) : (
          <div className="perfil-container">
            <p className="edit">Editar perfil</p>
            <p className="nome">Nome:</p>
            <input
              type="text"
              name="name"
              className="input-name"
              value={ name }
              data-testid="edit-input-name"
              onChange={ this.handleChange }
              autoComplete="off"
            />
            <p className="email">E-Mail:</p>
            <input
              type="text"
              name="email"
              className="input-email"
              value={ email }
              data-testid="edit-input-email"
              onChange={ this.handleChange }
              autoComplete="off"
            />
            <p className="descricao">Descrição:</p>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              value={ description }
              data-testid="edit-input-description"
              onChange={ this.handleChange }
              autoComplete="off"
            />
            <p className="foto">Foto de Perfil:</p>
            <input
              type="text"
              name="image"
              className="foto-input"
              value={ image }
              data-testid="edit-input-image"
              onChange={ this.handleChange }
              autoComplete="off"
            />
            <img
              className="foto-edit"
              src={ image }
              alt="foto-perfil"
            />
            <button
              type="button"
              className="button-save"
              disabled={ btnDisable }
              data-testid="edit-button-save"
              onClick={ () => this.update(name, email, description, image) }
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default ProfileEdit;
