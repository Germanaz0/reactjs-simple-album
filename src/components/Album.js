import React, {Component} from 'react';
import './Album.css';

class Album extends Component {
    constructor(props, state) {
        super(props, state);
    }

    renderSinglePic(pic) {
        return (<div key={pic.id} className="Album-Picture">
            <div className="Album-Picture-Title">
                {pic.title}
            </div>
            <a href="http://google.com" title={pic.title} className="Album-Picture-Image" target="_blank">
                <img src={pic.thumbnailUrl} alt={pic.title}/>
            </a>
        </div>);
    }
    render() {
        const {pictures} = this.props;
        return (
            <div className="Album-Container">
                {pictures.map((pic) => this.renderSinglePic(pic))}
            </div>
        );
    }
}

export default Album;