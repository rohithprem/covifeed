import logo from '../logo.svg';
import '../css/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    useLocation
} from "react-router-dom";

import About from './About.js'
import Home from './Home.js'
import Volunteer from './Volunteer.js'
import Register from './Register.js'

function App() {
    console.log(useLocation());
    return (
        <Router>
            <div className="App">
                <header>
                    <div id="navigationbar" className="navigationbar">
                        <div id="navigationtitle">
                            <span id="navigationtitlelogo" className="navigationtitleelement"></span>
                            <span id="navigationtitletext" className="navigationtitleelement">Covifeed India</span>
                        </div>
                        <div id="navigationelements">
                            <nav>
                                <ul>
                                    <li className="navigationelement">
                                        <NavLink exact activeClassName="selected" to="/home">Food Finder</NavLink>
                                    </li>
                                    <li className="navigationelement">
                                        <NavLink exact activeClassName="selected" to="/register-food-provider">Register Food Provide</NavLink>
                                    </li>
                                    <li className="navigationelement">
                                        <NavLink exact activeClassName="selected" to="/volunteer-to-help">Volunteer to Help</NavLink>
                                    </li>
                                    <li className="navigationelement">
                                        <NavLink exact activeClassName="selected" to="/about">About</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                <div id="pagebody">
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/register-food-provider">
                            <Register />
                        </Route>
                        <Route path="/volunteer-to-help">
                            <Volunteer />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>

    );
}

export default App;
