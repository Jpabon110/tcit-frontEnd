import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src="/logo-tcit.svg"
            alt="Logo"
            height="80"
            className="me-2"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
