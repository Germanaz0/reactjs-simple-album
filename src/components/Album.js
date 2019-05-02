import React, {Component} from 'react';
import './Album.css';

/**
 * Album component
 */
class Album extends Component {
    /**
     * Main constructor
     * @param props
     * @param state
     */
    constructor(props, state) {
        super(props, state);
    }

    /**
     * render a single picture from the album
     * @param pic
     * @returns {*}
     */
    renderSinglePic(pic) {
        return (<div key={pic.id} className="Album-Picture">
            <div className="Album-Picture-Title">
                {pic.title}
            </div>
            <a href={pic.url} title={pic.title} className="Album-Picture-Image" target="_blank">
                <img src={pic.thumbnailUrl} alt={pic.title}/>
            </a>
        </div>);
    }

    /**
     * Render album container with their pictures
     * @returns {*}
     */
    render() {
        let {pictures, picsQuantity} = this.props;
        pictures.sort((a, b) => a.id < b.id ? 1 : -1 );

        if (!picsQuantity) {
            picsQuantity = pictures.length;
        }

        return (
            <div className="Album-Container">
                {pictures.slice(0, picsQuantity).map((pic) => this.renderSinglePic(pic))}
            </div>
        );
    }
}

export default Album;