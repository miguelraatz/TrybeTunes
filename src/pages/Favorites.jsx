import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import '../css/favorites.css';
import '../css/carregando.css';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    musicList: [],
  };

  componentDidMount() {
    this.updateList();
  }

  updateList = async () => this.setState({ isLoading: true }, async () => {
    const listMusic = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      musicList: listMusic,
    });
  });

  render() {
    const { isLoading, musicList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="card">
          {isLoading ? <Carregando /> : musicList.map((list) => (
            <MusicCard
              music={ list }
              key={ list.trackCensoredName }
              updateList={ this.updateList }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
