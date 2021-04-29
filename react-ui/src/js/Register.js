import SocialMedia from "./SocialMedia"
import React from 'react';
import '../css/Register.css'

export class Register extends React.Component {
    render() {
        return (
            <div id="page">
                <section>
                    <div id="topscrollmessage" className="titleheader">
                    <span>
                        Register
                    </span>
                    </div>
                </section>
                <section>
                    <iframe className="registration-form"
                        src="https://docs.google.com/forms/d/e/1FAIpQLSegL16PQ3RuLbJJoG0wMszeIILYkFptjQ_wHXqc2hH9btkbNw/viewform?embedded=true"
                        width="700" height="520" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
                    </iframe>
                </section>
                <SocialMedia/>
            </div>
        );
    }
}

export default Register;
