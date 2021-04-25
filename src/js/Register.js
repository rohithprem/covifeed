import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";

import SocialMedia from "./SocialMedia"

function Register() {
    console.log(useLocation());
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

export default Register;
