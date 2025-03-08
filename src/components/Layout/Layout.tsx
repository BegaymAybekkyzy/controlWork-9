import React, { PropsWithChildren } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
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