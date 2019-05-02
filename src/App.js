import React, {Component} from 'react';
import './App.css';
import Album from './components/Album';

import Axios from 'axios';
import { groupBy } from 'lodash';

const API_URL = 'https://jsonplaceholder.typicode.com/photos';


class App extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      albums: [],
    };

    Axios.get(API_URL).then((data) => {
      let lastAlbums = data.data;
      // lastAlbums.sort((a, b) => a.albumId < b.albumId ? 1 : -1);

      let albumIndexes = {};
      lastAlbums.forEach((album) => albumIndexes[album.albumId] = album.albumId);
      albumIndexes = Object.values(albumIndexes);
      albumIndexes.sort((a, b) => a < b ? 1 : -1);

      const last3Albums = albumIndexes.slice(0, 3);

      const groupedAlbums = groupBy(lastAlbums, 'albumId');
      const lastPhotos = last3Albums.map((albumId) => groupedAlbums[albumId]);
      this.setState({albums: lastPhotos});
    });
  }

  renderAlbums() {
    const { albums } = this.state;
    let albumsContainers = albums.map((pictures, keyItem) => {
      return (<Album key={keyItem} pictures={pictures} />);
    });

    return (<div className="App-Album-Wrapper">
      {albumsContainers}
    </div>);

  };
  render() {
    return (
        <div className="App">
          {this.renderAlbums()}
        </div>
    );
  }
}

export default App;
