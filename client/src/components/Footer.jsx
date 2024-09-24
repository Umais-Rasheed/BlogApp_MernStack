import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Welcome to our blog where we share insights, stories, and resources about a wide range of topics.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex mt-3">
              <li className="me-3">
                <a href="https://facebook.com" className="text-white" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </li>
              <li className="me-3">
                <a href="https://twitter.com" className="text-white" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-white" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col className="text-center">
            <p>&copy; 2024 Blog App. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
