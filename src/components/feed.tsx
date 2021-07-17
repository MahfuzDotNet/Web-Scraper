import {useContext, useState, useEffect} from 'react';
import {FeederContext} from './feederContext';
import {Modal, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import EditForm from './editForm';
import IFeed from '../feederInterface';

const Feeder = (prop: 
    {
      feeder: IFeed
    }
  ): any => {

    const {sendDiscord} = useContext(FeederContext)

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const [showAlert, setShowAlert] = useState(false);  
  
    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 2000)
    }


    useEffect(() => {
        handleClose()   

        return () => {
            handleShowAlert();
        }
    }, [prop.feeder])

    return (
        <>
            <td>{prop.feeder.trackerName}</td>
            <td>{prop.feeder.articleTitle}</td>
            <td>{prop.feeder.url}</td>   
            {/* <td>
            <Alert show={showAlert} variant="success">
                Discord send Succefully!
            </Alert>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Send Discord
                        </Tooltip>
                    }>
                  <button onClick={() => {            
                      if (sendDiscord(prop.feeder)){
                        setShowAlert(true);

                        handleShowAlert();
                      }
                      
                    }
                   } className="btn text-primary" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>   

            </td>      */}

    </>
    )
}

export default Feeder;