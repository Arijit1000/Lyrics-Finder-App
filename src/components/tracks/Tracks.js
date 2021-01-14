import React, { Component } from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

export default class Tracks extends Component {
    render() {
        return (
            // Consumer is the wrapper
            <Consumer>
                {value => {
                    // value is the values passed to Context.Provider
                    // console.log(value);
                    const { track_list, heading } = value;
                    if (
                        track_list === "undefinded" ||
                        track_list.length === 0
                    ) {
                        return <Spinner />;
                    }
                    return (
                        <React.Fragment>
                            <h3 className="text-center mb-4">{heading}</h3>
                            <div className="row">
                                {track_list.map(item => (
                                    <Track
                                        key={item.track.track_id}
                                        track={item.track}
                                    />
                                ))}
                            </div>
                        </React.Fragment>
                    );
                }}
            </Consumer>
        );
    }
}
