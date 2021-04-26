import SocialMedia from "./SocialMedia"
import React from 'react';

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
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                </section>
                <SocialMedia/>
            </div>
        );
    }
}

export default Register;
