import React, {Component} from 'react';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Layout extends Component {
    render() {
        return (
           <Container className={'Layout'} fluid>
               <Row>
                   <Col lg={12} className={'navigation'}>
                       <Navbar bg="light" expand="lg">
                           <NavLink to={'/'} exact className={'navbar-brand'}>Max Shubenok 12-16</NavLink>
                           <Navbar.Toggle aria-controls="basic-navbar-nav" />
                           <Navbar.Collapse id="basic-navbar-nav">
                               <Nav className="mr-auto">
                                   <NavLink to={'/'} exact className={'nav-link'}>Persons</NavLink>
                                   <NavLink to={'/information'} className={'nav-link'}>Info</NavLink>
                               </Nav>
                           </Navbar.Collapse>
                       </Navbar>
                   </Col>
                   <Col lg={12} className={'content'}>
                       {this.props.children}
                   </Col>
               </Row>
           </Container>
        );
    }
}

export default Layout;