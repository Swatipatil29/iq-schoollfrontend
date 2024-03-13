import React, { useState } from "react";
import { Container, Row, Col, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChalkboardTeacher, faDollarSign, faUsers, faBook, faCalendarAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function NavComponent() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={4}>
          <div>
            <Navbar color="faded" light>
              <NavbarToggler onClick={toggleNavbar} className="me-2" />
              <NavbarBrand href="/" className="me-auto">
              </NavbarBrand>
              <Collapse isOpen={!collapsed}>
                <Nav >
                  <NavItem className="nav-item">
                    <NavLink href="/">
                      <FontAwesomeIcon icon={faHome} className="nav-icon" />
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/students">
                      <FontAwesomeIcon icon={faUsers} className="nav-icon" />
                      Students
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/subjects">
                      <FontAwesomeIcon icon={faBook} className="nav-icon" />
                      Subjects
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/teacher">
                      <FontAwesomeIcon icon={faChalkboardTeacher} className="nav-icon" />
                      Teacher
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/fee">
                      <FontAwesomeIcon icon={faDollarSign} className="nav-icon" />
                      Fee
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/calendar">
                      <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
                      Calendar
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/logout" >
                      <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NavComponent;


