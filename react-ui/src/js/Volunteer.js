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
                    <iframe  className="registration-form"
                        src="https://docs.google.com/forms/d/e/1FAIpQLScbviAtC4OZevq0bR65Owewf7JqQJC61aQjyiqv0ktjGpESWQ/viewform?embedded=true"
                        width="640" height="1146" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
                    </iframe>
                </section>
                <SocialMedia/>
            </div>
        );
    }
}

export default Volunteer;
