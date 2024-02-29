import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12} className="text-center">
                    <h1 className="mt-5">404 Not Found</h1>
                    <p className="lead">The page you are looking for does not exist.</p>
                </Col>
                <Col md={12} className="text-center">
                    <button onClick={() => {navigate('/')}} className="btn btn-primary btn-lg mt-5">
                        Want to go Home?
                    </button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;
