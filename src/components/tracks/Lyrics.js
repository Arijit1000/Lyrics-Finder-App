import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../layout/Spinner";

export default class Lyrics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            track: {},
            lyrics: {}
        };
    }
    componentWillMount() {
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
                    this.props.match.params.id
                }&apikey=${process.env.REACT_APP_MM_KEY ||
                    "a4b487225e425f0923e2ee4a15574bb3"}`
            )
            .then(res => {
                this.setState({ lyrics: res.data.message.body.lyrics });

                // Another axios request to get track data:
                return axios.get(
                    `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
                        this.props.match.params.id
                    }&apikey=${process.env.REACT_APP_MM_KEY ||
                        "a4b487225e425f0923e2ee4a15574bb3"}`
                );
            })
            .then(res => {
                this.setState({ track: res.data.message.body.track });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { track, lyrics } = this.state;
        console.log(track);
        if (
            track === "undefined" ||
            lyrics === "undefined" ||
            Object.keys(track).length === 0 ||
            Object.keys(lyrics).length === 0
        ) {
            return <Spinner />;
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">
                        Back
                    </Link>
                    <div className="card">
                        <h5 className="card-header">
                            {track.track_name} by{" "}
                            <span className="text-secondary">
                                {track.artist_name}
                            </span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">
                                {lyrics.lyrics_body
                                    .split("***")
                                    .reverse()
                                    .pop()}
                            </p>
                        </div>
                    </div>
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Artist Name</strong>: {track.artist_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Album Name</strong>: {track.album_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Album ID</strong>: {track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong>Genre</strong>:{" "}
                            {track.primary_genres !== "undefined" &&
                            track.primary_genres.music_genre_list.length !== 0
                                ? track.primary_genres.music_genre_list[0]
                                      .music_genre.music_genre_name
                                : "None"}
                        </li>
                        <li className="list-group-item">
                            <strong>Explicit Words</strong>:{" "}
                            {track.explicit === 0 ? "No" : "Yes"}
                        </li>
                        <li className="list-group-item">
                            <strong>Instrumental</strong>:{" "}
                            {track.instrumental === 0 ? "No" : "Yes"}
                        </li>
                    </ul>
                </React.Fragment>
            );
        }
    }
}
