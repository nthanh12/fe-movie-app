import React from "react";
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import NoImage from '../no-image.png';

const MovieItem = (props) => {
    const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

    return (
        <div>
            <Row>
                <Col xs={12} md={2}>
                    <img src={props.data.coverImage || NoImage} style={{ width: 150, height: 150 }} alt="Movie Cover" />
                </Col>
                <Col xs={12} md={10}>
                    <div><b>{props.data.title}</b></div>
                    <div>Actors: {props.data.actors.map(x => x.name).join(", ")}</div>
                    <Button onClick={() => {
                        navigate('/details/' + props.data.id);
                    }}>
                        See details
                    </Button> {' '}
                    <Button onClick={() => {
                        navigate('/edit/' + props.data.id); 
                    }}>
                        Edit
                    </Button> {' '}
                    <Button variant="danger" onClick={() => {
                        props.deleteMovie(props.data.id)
                    }} danger="true">
                        Delete
                    </Button>{' '}
                </Col>
                <Col>
                    <hr />
                </Col>
            </Row>
        </div>
    );
}

export default MovieItem;
