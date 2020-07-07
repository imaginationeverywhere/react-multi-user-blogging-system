import Link from 'next/link';
import Layout from '../components/Layout';
import Gallery from '../components/Gallery';
import ImageCarousel from '../components/ImageCarousel';
import { MultipleCarousel } from '../components/Carousel/MultipleCarousel';
import SocialMedia from '../components/SocialMedia';
import SubNav from '../components/SubNav';

const images = [
  'https://picsum.photos/600/300',
  'https://picsum.photos/600/300',
  'https://picsum.photos/600/300',
  'https://picsum.photos/600/300',
];

const Homepage = () => (
  <Layout>
   <SubNav />
    <div className="social-container">
      <SocialMedia />
    </div>
    <div className="latest-work">
      <h2>Latest Work</h2>
      <MultipleCarousel />
    </div>
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <p>An example Contact Form and Google Map embed has been added to this page. The contact page is using the default Page Template.</p>

        <p>Phone: 808-123-4567</p>
        <p>Email: info@organicthemes.com</p>
        <p>Twitter: OrganicThemes</p>
        <Link href="/contact">
          <a className="contact-us">More info</a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .cover {
        position: relative;
        min-height: 600px;
        background: transparent url(https://picsum.photos/600/300) no-repeat center center;
        background-size: cover;
      }
      .hello {
        position: absolute;
        top: 60px;
        left: 60px;
        background: #fff;
        padding: 30px;
      }
      .hello h1 {
        margin: 0 0 10px 0;
      }
      a.view-more {
        text-transform: uppercase;
        font-size: 16px;
      }
      .latest-work {
        text-align: center;
        padding: 30px 0;
        margin-bottom: 60px;
      }
      @media (max-width: 480px) {
        .hello {
          left: 30px;
          right: 30px;
          font-size: 18px;
          padding: 20px;
        }
        h1 {
          font-size: 28px;
        }
      }
      .contact {
        color: #fff;
        background-color: #121212;
        min-height: 600px;
        padding: 20px;
      }
      .contact-info {
        text-align: left;
        padding-left: 100px;

      }
    `}</style>
  </Layout>
);

export default Homepage;