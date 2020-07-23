const Footer = () => (
    <div className="footer-wrapper">
        <div className="copyright">Black With No Chaser LLC Copyright © All rights reserved {new Date().getFullYear()}</div>
        <style jsx>{`
        .footer-wrapper {
            text-align: center;
            margin-top: 80px;
            padding: 60px 30px;
            background-color: black;
            color: white;
            font-size: 10pt;
        }
        .copyright {
            margin-bottom: 20px;
        }
    `}</style>
    </div>
);
  
export default Footer;