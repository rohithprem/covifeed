
function SocialMedia() {
    return (
        <section id="social-media-footer">
            <div>
                <div id="social-media-title">Find us on social media</div>
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
    );
}

export default SocialMedia;
