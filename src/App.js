import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Match from "./containers/Match";
import {MuiThemeProvider} from "material-ui";
import Ranking from "./containers/Ranking";

injectTapEventPlugin()


const App = () => (
    <Router>
        <MuiThemeProvider>
            <div>
                <Route exact path="/" component={Ranking}/>
                <Route path="/match" component={Match}/>
            </div>
        </MuiThemeProvider>
    </Router>
)

export default App;
