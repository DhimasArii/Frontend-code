import Button from "@mui/material/Button";
import "../components/style.css";
import ImageNavbar from "../assets/image-navbar-confirm.png";
import { Outlet, Link, useNavigate } from 'react-router-dom'

import Phone from "../assets/phone.png";
import Instagram from "../assets/instagram.png";
import Youtube from "../assets/youtube.png";
import Telegram from "../assets/telegram.png";
import Email from "../assets/email.png";

const Footer = () => {
    const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
    const column2 = ["Deutsch", "French", "Japanese", "Melayu"];
    
    return (
        <>
            {/* Footer */}
            <div>
                <footer
                    className="footer flex flex-row mt-144 px-95 py-24 bg-green text-white gap-80 font-poppins text-justify"
                    style={{
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}
                >
                    <div className="aboutUsContainer gap-8">
                        <h3 className="font-500 text-16">About Us</h3>
                        <p className="font-400 text-14">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto
                            beatae vitae dicta sunt explicabo.{" "}
                        </p>
                    </div>
                    <div className="productContainer">
                        <h3 className="font-500 text-16">Product</h3>
                        <div
                            style={{ display: "flex", marginTop: -20 }}
                            className="font-400 text-14"
                        >
                            <ul className="column">
                                {column1.map((item, index) => (
                                    <li style={{ margin: 5 }} key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <ul className="column">
                                {column2.map((item, index) => (
                                    <li style={{ margin: 5 }} key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="addresContactContainer">
                        <div className="address">
                            <h3 className="font-500 text-16">Address</h3>
                            <p className="font-400 text-14">
                                Sed ut perspiciatis unde omnis iste natus error sit
                                voluptatem accusantium doloremque.
                            </p>
                        </div>
                        <div className="contactUs">
                            <h3 className="font-500 text-16">Contact Us</h3>
                            <div style={{ display: "flex" }} className="gap-16">
                                <img src={Phone} alt="Phone" />
                                <img src={Instagram} alt="Phone" />
                                <img src={Youtube} alt="Phone" />
                                <img src={Telegram} alt="Phone" />
                                <img src={Email} alt="Phone" />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer