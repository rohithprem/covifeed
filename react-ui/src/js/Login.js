import SocialMedia from "./SocialMedia"
import React from 'react';
import aboutLogo from '../logo_about.jpeg'
import '../css/Login.css'
import {Redirect} from "react-router-dom";

export class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isUnauthorized: true,
            username: "",
            password: ""
        }
    }

    componentDidMount() {
        console.log("Mount");
        fetch("/users/current")
            .then((res) => {
                if(res.ok){
                    var response = res.json();
                    this.setState({isUnauthorized: false});
                } else {
                    this.state.isUnauthorized = true;
                }
            })
    }

    authenticate() {
        let formData = new FormData();
        let data = btoa(this.state.username + "::" + this.state.password);
        formData.append("data", data);
        fetch("/users/login", {
            method:'POST',
            body: formData
        }).then((res) => {
                if(res.ok){
                    var response = res.json();
                    this.setState({isUnauthorized: false});
                } else {
                    this.state.isUnauthorized = true;
                }
        })
    }

    onLogin(){
        this.authenticate();
    }

    onInputChange (event){
        let value = event.target.value;
        let id = event.target.id;
        let idElements = id.split("-");
        this.state[idElements[1]] = value;
        console.log(this.state);
    }

    render() {
        if(!this.state.isUnauthorized){
            return (<Redirect to="/providercentral" />);
        } else {
            return (
                <div id="page">
                    <section>
                        <div id="topscrollmessage" className="titleheader">
                            <span>
                                Login
                            </span>
                        </div>
                    </section>
                    <section>
                        <div id="login-form">
                            <div className="login-input-div">
                                <span className="loginfieldlabel">Phone Number</span>
                                <span>
                                    <input
                                        id="login-username"
                                        className="login-inputbox"
                                        type="text"
                                        placeholder=""
                                        onChange={this.onInputChange.bind(this)}
                                    />
                                </span>
                            </div>
                            <div className="login-input-div">
                                <span className="loginfieldlabel">Password</span>
                                <span>
                                    <input
                                        id="login-password"
                                        className="login-inputbox"
                                        type="password"
                                        placeholder=""
                                        onChange={this.onInputChange.bind(this)}
                                    />
                                </span>
                            </div>
                            <div className="login-input-div">
                                <button
                                    onClick={this.onLogin.bind(this)}
                                    className="login-button">Login
                                </button>
                            </div>
                            <a href="/register-food-provider">Register</a>
                       </div>
                    </section>
                    <SocialMedia/>
                </div>
            );
        }
    }
}

export default Login;
