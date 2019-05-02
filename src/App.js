import React, {Component} from 'react';
import Axios from 'axios';
import { groupBy } from 'lodash';
import './App.css';
import Album from './components/Album';

/** Constant to limit the quantity of items */
const ALBUMS_QUANTITY = 3;
/** LIMIT THE PICS QUANTITY **/
const PICS_QUANTITY = 2;
/** API URL **/
const API_URL = 'https://jsonplaceholder.typicode.com/photos';

/**
 * Main App
 */
class App extends Component {

  /**
   * Base constructor
   * @param props
   * @param state
   */
  constructor(props, state) {
    super(props, state);

    this.state = {
      albums: [],
    };

    Axios.get(API_URL).then((data) => {
      this.setLastAlbumsFromData(data.data, ALBUMS_QUANTITY);
    });
  }

  /**
   * Set last X pictures from data response
   * @param data
   * @param albumQuantity
   */
  setLastAlbumsFromData = (data, albumQuantity) => {

    let albumIndexes = {};
    data.forEach((album) => albumIndexes[album.albumId] = album.albumId);

    albumIndexes = Object.values(albumIndexes);
    albumIndexes.sort((a, b) => a < b ? 1 : -1);

    const lastAlbums = albumIndexes.slice(0, albumQuantity);
    const groupedAlbums = groupBy(data, 'albumId');
    const albums = lastAlbums.map((albumId) => groupedAlbums[albumId]);

    this.setState({albums});
  };

  /**
   * Helper function to render the album
   * @returns {*}
   */
  renderAlbums() {
    const { albums } = this.state;
    let albumsContainers = albums.map((pictures, keyItem) => {
      return (<Album key={keyItem} pictures={pictures} picsQuantity={PICS_QUANTITY}/>);
    });

    return (<div className="App-Album-Wrapper">
      {albumsContainers}
    </div>);

  };

  /**
   * Render the main app
   * @returns {*}
   */
  render() {
    return (
        <div className="App">
          {this.renderAlbums()}
        </div>
    );
  }
}

export default App;
