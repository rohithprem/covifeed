import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import SocialMedia from "./SocialMedia"

function About() {
    console.log(useLocation());
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
                    <span></span>
                    <span></span>
                </div>
            </section>
            <SocialMedia/>
        </div>
    );
}

export default About;
