import React from "react";
import "../style/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
                <div className="item2">
                    This is clone project made for learning purpose for any issue contact contact: gnikhil556@gmail.com
                </div>
            <div className="footer-container">

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>@Copyright:</span>
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} FlickNest. All Rights Reserved.
                    </span>
                </div>

                <a
                    href="https://github.com/ni774"
                    target="_blank"
                    className="item"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>

                <a
                    href="#"
                    target="_blank"
                    className="item"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </a>

                <a
                    href="https://www.linkedin.com/in/nikhil556/"
                    target="_blank"
                    className="item"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>

            </div>
        </footer>
    );
};

export default Footer;