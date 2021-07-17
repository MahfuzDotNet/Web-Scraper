import {useContext, useState, useEffect} from 'react';
import {TrackerContext} from './trackerContext';
import {Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './editForm';
import ITracker from '../interfaces';

const Tracker = ( tracker: ITracker ) => {

    const {deleteTracker} = useContext(TrackerContext)

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [tracker])

    return (
        <>
            <td>{tracker.pageName}</td>
            <td>{tracker.trackerName}</td>
            <td>{tracker.url}</td>
            <td>{tracker.enable}</td>
            <td>{tracker.scanningInterval}</td>
            <td>{tracker.duration}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
                </td>
                <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={() => deleteTracker(tracker.Id)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>               
                
            </td>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Tracker
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm {...tracker} />
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

export default Tracker;