import Layout from '../components/Layout';
import Link from 'next/link';

const Brands = () => (
    <Layout>
        <div className="cover">
            <div className="hello">
                <h1>Black With No Chaser</h1>
                <div>Discover what we have to offer</div>
                <div>Explore our brands</div>
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
        `}</style>
    </Layout>
);

export default Brands;