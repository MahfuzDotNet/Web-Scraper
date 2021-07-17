import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react';
import {Container, Row, Col, Card, Form } from "react-bootstrap";
import Sidebar from "./sidebar";
import '../components/dashboard.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Feeds from "./feeds";
import Tracker from "./tracker";
import TrackerList from "./trackerList";
import TrackerProvider from './trackerContext';



class App extends Component<any> {
  componentWillMount() {
    console.log('Almost there...');
  }

  componentDidMount() {
    console.log('Finally...hello!');
  }

  render() {
    return (

      <div className="App">
         
      <>
      <Router>
         <Container fluid>

                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Sidebar sidebar="hello"/>
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                  
                    <Switch>
                    {/* <Route path="/" component={Feeds}  />  */}
                    <Route path="/feeds"  render={props => <Feeds/>}   /> 
            
                    <Route path="/track" component={TrackerList} />
      
                    </Switch>
             

                    </Col> 
                </Row>

            </Container>
            </Router>
         
        </>

      </div>

    
  
    );
  }
}

export default App;
