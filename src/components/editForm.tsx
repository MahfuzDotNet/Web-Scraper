import { Form, Button } from "react-bootstrap";
import {TrackerContext} from './trackerContext';
import {useContext, useState} from 'react';
import Tracker from "../interfaces";
import { SnapshotOptions } from "puppeteer";
import ITracker from "../interfaces";

const EditForm = (theTracker: ITracker) => {

    console.log('theTracker.Id=============>>>' + theTracker.Id);
    const Id = theTracker.Id;


    const [pageName, setPageName] = useState(theTracker.pageName);
    const [trackerName, setTrackerName] = useState(  theTracker.trackerName);
    const [url, setUrl] = useState(  theTracker.url);
    const [className, setClassName] = useState(  theTracker.className);
    const [enable, setEnable] = useState(  theTracker.enable);
    const [scanningInterval, setScanningInterval] = useState(  theTracker.scanningInterval);
    const [duration, setDuration] = useState(  theTracker.duration);


    const {updateTracker} = useContext(TrackerContext);


    // const updatedTracker : Tracker = {};

    const updatedTracker : Tracker = { Id, pageName, trackerName, url, className, enable, scanningInterval, duration};

    const handleSubmit = (e : any) => {
        e.preventDefault();
        updateTracker(Id, updatedTracker)
    }




    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Page Name *"
                    name="pageName"
                    value={pageName}
                    onChange={(e)=> setPageName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Tracker Name *"
                    name="trackerName"
                    value={trackerName}
                    onChange={(e)=> setTrackerName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Url Name*"
                    name="url"
                    value={url}
                    onChange={(e)=> setUrl(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="class selector name*"
                    name="className"
                    value={className}
                    onChange={(e)=> setClassName(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="checkbox"
                    placeholder="enabled"
                    name="enabled"
                    checked={enable}
                    onChange={(e)=> setEnable(Boolean(e.target.value))}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Scanning Interval"
                    name="scanningInterval"
                    value={scanningInterval}
                    onChange={(e)=> setScanningInterval(Number(e.target.value))}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="duration"
                    name="duration"
                    value={duration}
                    onChange={(e)=> setDuration(Number(e.target.value))}
                />
            </Form.Group>
            
            <Button variant="success" type="submit" block>
                Edit Tracker
            </Button>
        </Form>

     )
}


export default EditForm;