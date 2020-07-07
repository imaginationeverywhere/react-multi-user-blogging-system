import Layout from '../components/Layout';
import SocialMedia from '../components/SocialMedia';
import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Contact = (props) => {
    return (
        <Layout>
            <Row>
                <Col sm="12" md={{ size: 4, offset: 2 }}>
                    <h3>Get in touch</h3>
                    <p>Plese fill out the below form and we will get back to you shortly</p>
                    <br></br>
                    <Form>
                        <FormGroup>
                            <Label for="name" className="float-left">Name (required)</Label>
                            <Input type="text" name="name" id="name" placeholder="Your name here" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className="float-left">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="example@example.com" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="comments" className="float-left">Comments</Label>
                            <Input type="textarea" name="comments" id="comments" />
                        </FormGroup>
                        <Button className="float-right">Submit</Button>
                    </Form>
                </Col>
                <Col sm="12" md={{ size: 3, offset: 2 }}>
                    <h3>Connect with us</h3>
                    <SocialMedia />
                </Col>
            </Row>
        </Layout>
    );
}

export default Contact;