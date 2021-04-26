import SocialMedia from "./SocialMedia"
import React from 'react';

export class Volunteer extends React.Component {
    render() {
        return (
            <div id="page">
                <section>
                    <div id="topscrollmessage" className="titleheader">
                    <span>
                        Volunteer
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

export default Volunteer;
