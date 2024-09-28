import React, { act, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";


const CreateEditActor = (props) => {
    const [validated, setValidated] = useState(false);
    const [actor, setActor] = useState({
        id: 0,
        name: '',
        dateOfBirth: undefined
    })

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.data && location.state.data.id > 0) {
            let personData = location.state.data;
            if (personData.dateOfBirth) {
                personData.dateOfBirth = personData.dateOfBirth.split('T')[0];                        
            }
            setActor(personData);
        } else {
            setActor({
                id: 0,
                name: '',
                dateOfBirth: ''
            });
        }
    }, [location.state]);

    const handleFieldChang = (event) => {
        var da = actor;
        da[event.target.name] = event.target.value;

        setActor(oldData => {
            return { ...oldData, ...da };
        })
    };

    const handleSave = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        console.log("Actor data being saved:", actor);

        if (actor && actor.id > 0) {
            //update
            fetch(process.env.REACT_APP_API_URL + "/person", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actor)
            })
                .then(res => res.json())
                .then(res => { 
                    if (res.status === true && res.data) {
                        let personData = res.data;
                        if (personData.dateOfBirth !== null && personData.dateOfBirth !== undefined) {
                            personData.dateOfBirth = personData.dateOfBirth.split('T')[0];
                        }
                        setActor(personData);
                        alert('Updated successfully!');
                    }
                })
                .catch(err => alert("Error getting data"));
        }
        else {
            //create
            fetch(process.env.REACT_APP_API_URL + "/person", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actor)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === true && res.data) {
                        let personData = res.data;
                        if (personData.dateOfBirth !== null && personData.dateOfBirth !== undefined) {
                            personData.dateOfBirth = personData.dateOfBirth.split('T')[0];
                        }
                        setActor(personData);
                        alert('Create successfully!');
                    }
                })
                .catch(err => alert("Error getting data"));
        }
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSave}>               
                <Form.Group controlId="formActorName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value= {actor.name || ''} required type="text" placeholder="Enter name.."
                        onChange={handleFieldChang}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter name
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="forActorDateOfBirth">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control name="dateOfBirth" value={actor.dateOfBirth || ''} required type="date"
                        onChange={handleFieldChang}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter date of birth
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Button type="submit">{actor && actor.id > 0 ? "Update" : "Create"}</Button>
            </Form>
        </div>
    )
}
export default CreateEditActor;