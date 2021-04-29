import SocialMedia from "./SocialMedia"
import React from 'react';
import aboutLogo from '../logo_about.jpeg'
import '../css/About.css'

export class About extends React.Component {
    render() {
        return (
            <div id="page">
                <section>
                    <div id="topscrollmessage" className="titleheader">
                        <span>
                            About
                        </span>
                    </div>
                </section>
                <section>
                    <div>
                        <img id="about-logo" src={aboutLogo}/>
                    </div>
                </section>
                <section>
                    <div>
                        <p><b>CoviFeedIndia</b> is a volunteer initiative to
                            <span className="bold-red-text">help COVID-impacted families</span>
                            (and others finding it hard to cook for themselves due to restrictions),
                            <span className="bold-red-text">quickly and easily find home-food providers</span>
                            (volunteers, home chefs, tiffin services) in their location. This is live as we build coz
                            time is key, keep coming back as the providers keep getting added.
                            A simpler tech-based solution in the works!</p>
                        <p>Families struggling with COVID-19 are often too weak to cook themselves, and struggle with
                            access to help due to quarantine norms.  While food and nutrition is key to faster recovery,
                            that itself becomes a challenge. With our hospitals choked, we need to help people recover
                            at home. There are numerous home-chefs, tiffin services, and volunteers who have come
                            forward to provide home-cooked meals in their neighborhoods. Currently, their reach is
                            dependent on word-of-mouth and multiple versions of messages, images and lists prepared
                            and circulated in WhatsApp groups and social media platforms, making it hard for people
                            to keep tracking at scale.</p>
                        <p>We are in this together, and CoviFeedIndia is an attempt to help all Covid impacted families
                            find home-food services easily, so there is one less thing to worry about in the current
                            crisis.</p>
                        <p>All food-providers (paid services or free) - please use this as a single place to list
                            yourselves and make yourself easily searchable by families who need your help.</p>
                        <p className="bold-red-text">Please help in spreading the word and sharing in your networks, society groups, alum groups,
                            office communities. Let's join hands and make this possible!</p>
                    </div>
                </section>
                <SocialMedia/>
            </div>
        );
    }
}

export default About;
