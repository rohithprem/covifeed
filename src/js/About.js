import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";

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
        </div>
    );
}

export default About;
