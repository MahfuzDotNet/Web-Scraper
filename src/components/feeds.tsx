import { Modal, Button, Alert, OverlayTrigger, Tooltip} from 'react-bootstrap';
import React, {Component, useContext, useEffect, useState } from 'react';
import FeederProvider, {FeederContext} from './feederContext';
import IFeeder from '../feederInterface';
import Pagination from './Pagination';
import Feeder from './feed';
import Delayed from "./delayed";
import Loader from "./loader";
import config from '../configs.json'


const Feeds = () => {

    const [isLoading, setIsLoading] = useState(false);

    const {sortedFeeders} = useContext(FeederContext);



    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
          }, 80000);
      
    }, [80000]);


    useEffect(() => {
      setTimeout(() => {
          window.location.reload(false);
      }, config.reloadDuration  )
    
  })


    console.log("sortedFeeders-------->>>>" + sortedFeeders);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [feedersPerPage] = useState(10)


    const indexOfLastTracker = currentPage * feedersPerPage;
    const indexOfFirstTracker = indexOfLastTracker - feedersPerPage;
    const currentFeders = sortedFeeders.slice(indexOfFirstTracker, indexOfLastTracker);
    const totalPagesNum = Math.ceil(sortedFeeders.length / feedersPerPage);

    return (
    <>

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Tracker Name</th>
                <th>Article Title</th>       
                <th>Url</th>            
            </tr>
        </thead>
   
        <tbody>  
       
                
            
            {                   
            
            isLoading ? <Loader css='margin-left: 100%; margin-top: 40% ;' loading={isLoading}/> :
            
            currentFeders.map(
                      (feeder : IFeeder) => (
                      <tr >
                        <Feeder feeder = { feeder } />
                    </tr>
                    
                    )
                  )
                     
                }    
               
               
        </tbody>
     
    </table>

    <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentTrackers ={currentFeders}
                sortedTrackers = {sortedFeeders} /> 
    </>

    )
}
export default () => (
    <FeederProvider>
      <Feeds />
    </FeederProvider>
  );