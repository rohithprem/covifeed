import SocialMedia from "./SocialMedia"
import React from 'react';
import aboutLogo from '../logo_about.jpeg'
import '../css/Login.css'

export class Login extends React.Component {

    checkPhoneNumberPasswordExists(){
        
    }

    onUsernameBlur (event){
        let phoneNumber = event.target.value;

    }

    render() {
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
                                    onBlur={}
                                    id="login-username"
                                    className="login-inputbox"
                                    type="text"
                                    placeholder=""/>
                            </span>
                        </div>
                        <div className="login-input-div">
                            <span className="loginfieldlabel">Password</span>
                            <span>
                                <input
                                    id="login-password"
                                    className="login-inputbox"
                                    type="password"
                                    placeholder=""/>
                            </span>
                        </div>
                        <div className="login-input-div">
                            <button className="login-button">Login</button>
                        </div>
                        <a href="/register-food-provider">Register</a>
                   </div>
                </section>
                <SocialMedia/>
            </div>
        );
    }
}

export default Login;
