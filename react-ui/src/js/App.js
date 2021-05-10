import logo from '../logo.jpeg';
import '../css/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";

import About from './About.js'
import Home from './Home.js'
import Volunteer from './Volunteer.js'
import Register from './Register.js'
import Login from './Login.js'
import FoodProviderDetails from "./FoodProviderDetails";
import ProviderCentral from "./ProviderCentral";
import React from 'react';

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <div id="navigationbar" className="navigationbar">
                        <a href={"/home"}><div id="navigationtitle">
                            <span id="navigationtitlelogo" className="navigationtitleelement"><img id="titlelogo" src={logo}/></span>
                            <span id="navigationtitletext" className="navigationtitleelement">Covifeed India</span>
                        </div></a>
                        <div id="navigationelements">
                            <nav>
                                <ul>
                                    <li className="navigationelement">
                                        <NavLink exact activeClassName="selected" to="/home">Food Finder</NavLink>
                                    </li>
                                    {/*<li className="navigationelement">
                                        <NavLink exact activeClassName="selected" to="/register-food-provider">Register Food Provider</NavLink>
                                    </li>
                                    <li className="navigationelement">
                                        <NavLink exact activeClassName="selected" to="/volunteer-to-help">Volunteer to Help</NavLink>
                                    </li>*/}
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
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
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
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/foodprovider/:providerid" component={FoodProviderDetails}/>
                        <Route path="/providercentral" component={ProviderCentral}/>
                    </Switch>
                </div>
            </div>
        </Router>

    );
}

export default App;
