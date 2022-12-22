import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../css/album.css';
import '../css/carregando.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      albumList: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const album = await getMusics(id);
    this.setState({
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      albumList: album,
    });
  }

  render() {
    const { artistName, albumName, albumList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{albumName}</h3>
        <div className="card-music">
          {albumList.map((music) => music.kind && <MusicCard
            key={ music.trackId }
            music={ music }
          />)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
