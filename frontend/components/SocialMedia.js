import { Row, Col } from 'reactstrap';


const SocialMedia = () => {
    return (
        <Row>
            <Col>
                <div className="social-media">
                    <a href="https://www.facebook.com/blackwithnochaser" className="social-media-icon facebook" data-title="Facebook" target="_blank">
                        <span class="font-icon-social-facebook"><i className="fa fa-facebook"></i></span>
                    </a>
                    <a href="https://twitter.com/blacknochaser" className="social-media-icon twitter" data-title="Twitter" target="_blank">
                        <span class="font-icon-social-twitter"><i className="fa fa-twitter"></i></span>
                    </a>
                    <a href="http://www.youtube.com/channel/UCMhhD71qlQVXqm2-Ph3k-dw" className="social-media-icon youtube" data-title="Youtube" target="_blank">
                        <span class="font-icon-social-youtube"><i className="fa fa-youtube"></i></span>
                    </a>
                    <a href="https://www.instagram.com/blackwithnochaser/" className="social-media-icon instagram" data-title="Instagram" target="_blank">
                        <span class="font-icon-social-instagram"><i className="fa fa-instagram"></i></span>
                    </a>
                </div>
                <style jsx>{`
                .social-media {
                    display: inline-block;
                    font-size: 30px;
                    line-height: 36px;
                    margin-left: 12px;
                }
                .social-media-icon {
                    color: black;
                    padding-left: 20px;
                }
                .social-media-icon:first-child {
                    padding:0;
                }
                `}    
                </style>
            </Col>
        </Row>
        
    )
}

export default SocialMedia;