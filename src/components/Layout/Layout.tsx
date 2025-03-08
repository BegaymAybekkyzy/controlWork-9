import React, { PropsWithChildren } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" className="mb-5">
        <Container>
          <NavLink to="/" className="navbar-brand">Finance Tracker</NavLink>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/categories">Categories</NavLink>
            <Button className="nav-link">Add</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {children}
      </Container>

    </div>
  );
};

export default Layout;