import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trackTitle: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${
                    this.state.trackTitle
                }&page_size=10&page=1&s_track_rating=desc&apikey=${process.env
                    .REACT_APP_MM_KEY || "a4b487225e425f0923e2ee4a15574bb3"}`
            )
            .then(res => {
                // console.log(res.data);

                // Updating context state
                dispatch({
                    type: "SEARCH_TRACKS",
                    payload: res.data.message.body.track_list
                });
                this.setState({ trackTitle: "" });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music" /> Search for a song
                            </h1>
                            <p className="lead text-center">
                                Get the lyrics for any song
                            </p>
                            <form
                                onSubmit={this.findTrack.bind(this, dispatch)}
                            >
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Song title..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Get track lyrics"
                                    className="btn btn-lg btn-primary btn-block mb-5"
                                />
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}
