import React from 'react';
import Logo from '../../components/Logo/Logo'

function Footer() {
    return (
        <div className="footer-container">
            <div className="logo">
                <Logo />
            </div>
            <div className="about-us">
                <h2>About Us</h2>
                <p>Deal Mart is a Online Shopping System where user can buy and sell their product in a convienent manner.
                Handle your bussiness smartly and join us today. You will not regret your decision because we provide best service in the town.</p>
            </div>
            <div className="developer">
                <h2>Developers</h2>
                <div className="dev-name">
                    <p>Atush Maharjan</p>
                    <p>Bipin Budhathoki</p>
                    <p>Sabin Sharma Poudel</p>
                    <p>Saman Maharjan</p>
                    <p>Saugat Bhusal</p>
                    <p>Sumit Maharjan</p>
                </div>   
            </div>

        </div>

    )
}
export default Footer;