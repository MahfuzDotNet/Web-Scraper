import { Modal, Button, Alert} from 'react-bootstrap';
import {useContext, useEffect, useState } from 'react';
import TrackerProvider,{TrackerContext} from './trackerContext';
import Tracker from './tracker';
import ITracker from '../interfaces'
import AddForm from './AddForm';
import Pagination from './Pagination';

const TrackerList = () => {

    const {sortedTrackers} = useContext(TrackerContext);

    console.log("sortedTrackers-------->>>>" + sortedTrackers);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [trackerssPerPage] = useState(10)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        handleClose();     

        return () => {
            handleShowAlert();
        }
    }, [sortedTrackers])


    const indexOfLastTracker = currentPage * trackerssPerPage;
    const indexOfFirstTracker = indexOfLastTracker - trackerssPerPage;
    const currentTrackers = sortedTrackers.slice(indexOfFirstTracker, indexOfLastTracker);
    const totalPagesNum = Math.ceil(sortedTrackers.length / trackerssPerPage);

    return (
    <>
   
      <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h2>Manage <b>Trackers</b></h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Tracker</span></Button>					
            </div>
        </div>
    </div>

    <Alert show={showAlert} variant="success">
        Tracker List Updated Succefully!
    </Alert>

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Page Name</th>
                <th>Tracker Name</th>
                <th>url</th>
                <th>enable</th>
                <th>Scanning Interval</th>
                <th>Duration</th>
            </tr>
        </thead>
        <tbody>
                {                  
                   currentTrackers.map(
                      (tracker : ITracker) => (
                      <tr key={ tracker.Id } >
                        <Tracker  {...tracker }  />
                    </tr>
                    
                    )
                  )  
                }                

        </tbody>
    </table>

    <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentTrackers ={currentTrackers}
                sortedTrackers = {sortedTrackers} />

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Tracker
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddForm />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
    </>
    )
}
export default () => (
    <TrackerProvider>
      <TrackerList />
    </TrackerProvider>
  );