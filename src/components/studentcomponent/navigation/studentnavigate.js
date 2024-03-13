import React, { useState } from "react";
import { Container, Row, Col, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChalkboardTeacher, faEdit,  faClipboardCheck,faUsers, faBook, faCalendarAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function StudentNavComponent() {
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/')
};

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Container  fluid >
      <Row>
        <Col xs={12} md={4}>
          <div>
            <Navbar color="faded" light>
              <NavbarToggler onClick={toggleNavbar} className="me-2" />
              <NavbarBrand href="/" className="me-auto">
              </NavbarBrand>
              <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                  <NavItem className="nav-item">
                    <NavLink href="/studentdashboard">
                      <FontAwesomeIcon icon={faHome} className="nav-icon" />
                      Home
                    </NavLink>
                  </NavItem>
                  {/* <NavItem className="nav-item">
                    <NavLink href="/liststudent">
                      <FontAwesomeIcon icon={faUsers} className="nav-icon"/>
                      Students
                    </NavLink>
                  </NavItem> */}
                  <NavItem className="nav-item">
                    <NavLink href="/listSubjects">
                      <FontAwesomeIcon icon={faBook} className="nav-icon" />
                      Subjects
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/listteacher">
                      <FontAwesomeIcon icon={faChalkboardTeacher} className="nav-icon"/>
                      Teacher
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href='/oneclassattendance'>
                      <FontAwesomeIcon icon={faClipboardCheck} className="nav-icon"/>
                      Attendence
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/listonestudentmarks/:classid/:studentid" >
                      <FontAwesomeIcon icon={faEdit} className="nav-icon" />
                      marksCard
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/listEvents" >
                      <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
                      Calendar
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink href="/"  onClick={handleLogout} >
                      <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon"  />
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

export default StudentNavComponent;


