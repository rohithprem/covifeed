import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";

import CovifeedFrontPage from "../covifeed_intro.png"
import CovifeedIntroVideo from "../cfeed_instructions.mp4"

function Home() {
    console.log(useLocation());
    return (
        <div id="page">
            <section>
                <span id="topscrollmessage" className="titletext fullwidth">
                    Scroll down to search for food providers near you
                </span>
            </section>
            <section>
                <div className="halfwidth">
                    <img id="covifeedfrontimage" src={CovifeedFrontPage}/>
                    <div id="frontintrotextdiv">
                        Home - food providers: tiffin services, home-chefs, volunteers, restaurants providing Covid special meals, click to add your details quickly & make yourself searchable. CoviFeedIndia is a volunteer initiative and does not charge anyone to use this website or to add their details
                    </div>
                    <div className="buttondiv">
                        <a id="foodproviderfrontbutton" className="button" href="/register-food-provider">
                            <div>Food Providers - Register Here</div>
                        </a>
                    </div>
                </div>
                <div className="halfwidth">
                    <video id="covifeedfrontvideo" src={CovifeedIntroVideo} controls="controls"/>
                </div>
            </section>
            <section>
                <div className="dataheader">
                    Finder - Use the filters to find details and phone numbers of home food providers near your location
                </div>
                <iframe className="embeddeddata" height="1000"
                        src="https://datastudio.google.com/embed/reporting/3a7151da-593c-4193-82f0-01991d8fdc8c/page/RNCEC"
                         allowFullScreen/>
            </section>
            <section>
                <div className="separator">
                </div>
            </section>
            <section>
                <div>
                    <div>Follow us on social media</div>
                    <div className="buttons">
                        <a href="https://twitter.com/covifeedindia" className="tw socialmediaicons" title="Join us on Twitter">
                            <i className="fa fa-twitter" aria-hidden="true"/>
                        </a>
                        <a href="mailto:info@covifeedindia.com" className="mail socialmediaicons" title="Send us an email">
                            <i className="fa fa-envelope" aria-hidden="true"/>
                        </a>
                        <a href="https://www.instagram.com/covifeedindia/" className="insta socialmediaicons" title="Join us on Instagram">
                            <i className="fa fa-instagram" aria-hidden="true"/>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
