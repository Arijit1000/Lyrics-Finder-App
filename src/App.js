import React from "react";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import { Provider } from "./context";
import Lyrics from "./components/tracks/Lyrics";

function App() {
    return (
        <Provider>
            <HashRouter>
                <React.Fragment>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Index} />
                            <Route
                                exact
                                path="/lyrics/track/:id"
                                component={Lyrics}
                            />
                        </Switch>
                    </div>
                </React.Fragment>
            </HashRouter>
        </Provider>
    );
}

export default App;
