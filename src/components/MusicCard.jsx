import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';
import '../css/musiccard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      checkedFavorite: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.setState({
      checkedFavorite: await this.favorite(),
    });
  }

  async handleChange({ target: { checked } }) {
    const { music } = this.props;
    this.setState({
      isLoading: true,
      checkedFavorite: checked,
    });
    if (checked) await addSong(music);
    if (!checked) await removeSong(music);
    this.setState({ isLoading: false });
  }

  favorite = async () => {
    const { music: { trackId } } = this.props;
    const getFavorites = await getFavoriteSongs();
    return getFavorites.map((music) => music.trackId).includes(trackId);
  };

  render() {
    const { music, updateList } = this.props;
    const { isLoading, checkedFavorite } = this.state;
    const { previewUrl, trackName, trackId } = music;
    return (
      <div className="music-card">
        {isLoading ? (<Carregando />) : (
          <ul>
            <li>{trackName}</li>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label className="switch" htmlFor="check-music">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ this.handleChange }
                checked={ checkedFavorite }
                name="check-music"
                id="check-music"
                onClick={ updateList }
              />
              Favorita
            </label>
          </ul>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  updateList: PropTypes.func.isRequired,
  musics: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;

export default MusicCard;
