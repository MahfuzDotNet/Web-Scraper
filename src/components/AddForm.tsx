import { Form, Button } from "react-bootstrap"
import {TrackerContext} from './trackerContext';
import {useContext, useState} from 'react';
import Tracker from "../interfaces";

const AddForm = (prop : any) => {

    let tracker = {} as Tracker;

    const {addTracker} = useContext(TrackerContext);

    const [newTracker, setNewTracker] = useState(tracker);

    const onInputChange = (e : any) => {
        setNewTracker({...newTracker,[e.target.name]: e.target.value})
    }

    tracker = newTracker;

    const handleSubmit = (e : any) => {
        e.preventDefault();
        addTracker(tracker);
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="pageName *"
                    name="pageName"
                    value={tracker.pageName}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="trackerName *"
                    name="trackerName"
                    value={tracker.trackerName}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="url"
                    name="url"
                    value={tracker.url}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="class selector name"
                    name="className"
                    value={tracker.className}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                  type="checkbox"
                    placeholder="enable "
                    name="enable"
                    checked={tracker.enable}
                    onChange = { (e) => onInputChange(e)}
                />

            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="scanningInterval"
                    name="scanningInterval"
                    value={tracker.scanningInterval}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="duration"
                    name="duration"
                    value={tracker.duration}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Add New Tracker
            </Button>
        </Form>

     )
}

export default AddForm;