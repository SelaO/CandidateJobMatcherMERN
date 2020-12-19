import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import logo from './logo.svg';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #CD204D;
    &:hover { color: white; }
  }
`;

const Logo = styled.img`
    width: 50px;
`

const NavigationBar = () => (
  <Styles>
    <Navbar>
      <Logo src={logo} />
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/Candidates">Candidates</Nav.Link>
      <Nav.Link href="/Jobs">Jobs</Nav.Link>
    </Navbar>
  </Styles>
)

export default NavigationBar;