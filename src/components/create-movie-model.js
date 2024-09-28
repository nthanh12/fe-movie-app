import React from "react";
import { Modal } from "react-bootstrap";
import EditMovie from "./edit-movie";

const CreateMovieModel = (props) => {
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Movie</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditMovie></EditMovie>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default CreateMovieModel;