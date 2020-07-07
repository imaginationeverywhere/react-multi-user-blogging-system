import Link from 'next/link';
import { Row, Col } from 'reactstrap';

const SubNav = () => {
    return (
        <Row>
            <Col sm="12" md="12">
                <ul className="sub-nav">
                    <li>
                        <Link href="/money-talks">
                            <a>Money Talks</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/music-entertainment">
                            <a>Music & Entertainment</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/very-fly-life">
                            <a>Very Fly Life</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/advocacy-consulting">
                            <a>Advocacy & Consulting</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/lifestyle">
                            <a>Lifestyle</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/travel">
                            <a>Travel</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cultured-sports">
                            <a>Cultured Sports</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/black-lunch-break">
                            <a>Black Lunch Break</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/politics">
                            <a>Politics</a>
                        </Link>
                    </li>
                    <style jsx>{`
                    .sub-nav {
                        padding: 50px;
                        list-style: none;
                        background-color: black;
                    }
                    .sub-nav li {
                        display: inline-block;
                        padding: 0 50px;
                    }
                    .sub-nav li a {
                        font-size: 26px;
                        font-weight: 300;
                        margin: 0 10px;
                        text-decoration: none;
                        color: white;
                        display: inline-block;
                        font-family: Impact;
                    }
                    `}</style>
                </ul>
            </Col>
        </Row>
        
            
    );
};

export default SubNav;