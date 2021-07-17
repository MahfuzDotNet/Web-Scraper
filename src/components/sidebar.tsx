import React from "react";
import './dashboard.css';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
  
const Sidebar = (prop: {sidebar: string}): any => {
    return (
        <>    
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/feeds" >
        <Nav.Item>
        <Nav.Link>
              <Link to="/feeds">Feeds</Link>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
             <Link to="/track">Add Tracker</Link>
        </Nav.Item>
     
        </Nav>
      
    </>
    );
}

export default Sidebar;