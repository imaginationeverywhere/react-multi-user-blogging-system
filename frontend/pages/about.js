import Layout from '../components/Layout';
import { Row, Col } from 'reactstrap';

// add meet the team section


const About = () => (
  <Layout>
    <h2>About Us</h2>
    <div className="about-text">
      <img src="/static/images/BWNCICON-4.png" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut est euismod, iaculis ante efficitur, sodales
        nisl. Nulla non orci vitae nibh ullamcorper finibus. Morbi a nisl tempor, sodales ex quis, aliquet neque. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p>
        Praesent gravida a diam ut faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Sed sed nibh a ipsum sagittis finibus ac in magna. Curabitur id mauris quis nulla commodo
        tristique.
      </p>
      <p>
        Nunc eu mi et justo sodales vehicula. Vestibulum velit erat, tincidunt sed tortor id, viverra egestas felis.
        Cras in ullamcorper ex. Etiam diam lacus, interdum sed rhoncus vel, ultricies ut nisi. Nam ut orci at ante
        auctor mollis. Phasellus eget augue ac nibh vestibulum pellentesque. Nulla enim augue, placerat id malesuada at,
        maximus sed tortor.
      </p>
    </div>
    <h2>Who are we?</h2>

    <Row>
        <Col sm="12" md={{size: 8, offset: 2}}>
        <Row>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="team-member">
              <img src="/static/images/BWNCICON-4.png"/>
              <span>First Last</span>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
    <style jsx>{`
      .company-info {
        margin: 0 0 100px 0;
        padding: 0;
        list-style: none;
        font-size: 18px;
      }
      .company {
        font-weight: 700;
        font-size: 24px;
      }
      .about-text {
        color: #777;
        text-align: left;
        max-width: 800px;
        margin: 0 auto 100px;
        padding: 20px;
      }
      img {
        float: right;
        margin: 10px 0 20px 20px;
      }
      @media (max-width: 600px) {
        .about-text img {
          float: none;
          display: block;
          margin: 0 auto 30px;
        }
      }
      .team-member {
        height: 200px;
        width: 200px;
        margin: 20px;
      }
      .team-member img {
        width:150px;
        height:150px;
        object-fit:cover;
        border-radius:50%;
        float: none;
        display:block;
      }
      .team-member span {
        margin: 0 auto;
      }
    `}</style>
  </Layout>
);

export default About;