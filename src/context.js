import React, { createContext, Component } from "react";
import axios from "axios";

export const Context = createContext();

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_TRACKS":
            return {
                ...state,
                track_list: action.payload, // updating the track_list with api response from the search component
                heading: "Search Results"
            };

        default:
            return state;
    }
};

export class Provider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            track_list: [],
            heading: "Top 10 tracks",
            dispatch: action => this.setState(state => reducer(state, action)) // reducer to update the context state from any other component
        };
    }
    componentDidMount() {
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process
                    .env.REACT_APP_MM_KEY ||
                    "a4b487225e425f0923e2ee4a15574bb3"}`
            )
            .then(res => {
                // console.log(res.data);
                this.setState({ track_list: res.data.message.body.track_list });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
