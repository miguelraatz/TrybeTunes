import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/carregando.css';
import '../css/search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valueInput: '',
      nameArtista: '',
      album: [],
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ valueInput: value });
  }

  async fetchAPI(e) {
    e.preventDefault();
    const { valueInput } = this.state;
    this.setState({ isLoading: true });
    const resultAPI = await searchAlbumsAPI(valueInput);
    this.setState({
      valueInput: '',
      nameArtista: valueInput,
      isLoading: false,
      album: resultAPI,
    });
  }

  render() {
    const maxValue = 2;
    const { valueInput, isLoading, nameArtista, album } = this.state;
    return (
      <div data-testid="page-search">
        { isLoading ? <Carregando /> : (
          <>
            <Header />
            <form id="search-form">
              <label htmlFor="input-search">
                <div className="container-search">
                  <input
                    className="input-search"
                    data-testid="search-artist-input"
                    placeholder="Digite a sua pesquisa"
                    type="text"
                    value={ valueInput }
                    autoComplete="off"
                    onChange={ this.handleChange }
                  />
                  <button
                    className="button-search"
                    data-testid="search-artist-button"
                    type="submit"
                    form="search-form"
                    disabled={ valueInput.length < maxValue }
                    onClick={ this.fetchAPI }
                  >
                    Pesquisar
                  </button>
                </div>
              </label>
            </form>
          </>
        )}
        <div className="container-name-artist">
          { nameArtista && (
            <h3 className="result">
              Resultado de álbuns de:
              {' '}
              {nameArtista}
            </h3>)}
        </div>

        <div>
          {album.length > 0 ? (
            <div className="div-album">
              {album.map((artist) => (
                <>
                  <Link to={ `/album/${artist.collectionId}` }>
                    <img
                      className="imagem-album"
                      key={ artist.collectionId }
                      src={ artist.artworkUrl100 }
                      alt={ nameArtista }
                    />
                  </Link>
                  <Link
                    className="link-album"
                    key={ artist.collectionId }
                    data-testid={ `link-to-album-${artist.collectionId}` }
                    to={ `/album/${artist.collectionId}` }
                  >
                    {artist.collectionName}
                  </Link>
                </>
              ))}
            </div>
          ) : (
            <p>Nenhum álbum foi encontrado</p>
          )}
        </div>

      </div>
    );
  }
}

export default Search;
