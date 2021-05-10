import CovifeedFrontPage from "../covifeed_intro.png"
import CovifeedIntroVideo from "../cfeed_instructions.mp4"
import SocialMedia from "./SocialMedia"
import LocationFinder from "./LocationFinder"
import React from 'react';
import FoodSearchWidget from "./FoodSearchWidget";
//  import { useSelector, useDispatch } from 'react-redux';

export class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {testValue: 1};
    }

    render(){
        return (
            <div id="page">
                {/*<section>
                <span id="topscrollmessage" className="titletext fullwidth">
                    Scroll down to search for food providers near you
                </span>
                </section>
                <section>
                    <div className="info-div">
                        <div className="halfwidth">
                            <img id="covifeedfrontimage" src={CovifeedFrontPage}/>
                        </div>
                        <div className="halfwidth">
                            <div id="frontintrotextdiv">
                                <b>Home - food providers: tiffin services, home-chefs, volunteers, restaurants</b>
                                providing Covid special meals, click to add your details quickly & make yourself searchable.
                                <b>CoviFeedIndia is a volunteer initiative and does not charge anyone to use this website or to add their details</b>
                            </div>
                            <div className="buttondiv">
                                <a id="foodproviderfrontbutton" className="button" href="/register-food-provider">
                                    <div>Food Providers - Register Here</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="dataheader">
                        Finder - Use the filters to find details and phone numbers of home food providers near your location
                    </div>
                    <LocationFinder/>
                </section>*/}
                <FoodSearchWidget/>
                <SocialMedia/>
            </div>
        );
    }
}

/*function Home() {
    //console.log(useLocation());
    //const dispatch = useDispatch();

}*/
export default Home;

