import React, { Component } from 'react'
import {
    Col, Row, Input
} from 'reactstrap';
import './index.css';

class SearchContact extends Component {
    render() {
        return (
            <Row className='search-contact'>
                <Col md='12'>
                    <Input placeholder='Buscar' />
                </Col>
            </Row>
        )
    }
}

export default SearchContact