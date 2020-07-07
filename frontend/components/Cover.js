import Link from 'next/link';

const Cover = () => {
    return (
        <div className="cover">
            <div className="hello">
                <h1>We're BWNC </h1>
                <div>Insert Captivating graphic</div>
                <Link href="/about">
                    <a className="view-more">Who we are</a>
                </Link>
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
        </div>
    )
}

export default Cover;