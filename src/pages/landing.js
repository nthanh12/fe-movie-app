import React, { useState } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import MovieList from "../components/movie-list";
import CreateMovieModel from "../components/create-movie-model";

const Landing = () => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Row>
                <Col xs={12} md={10}>
                    <h2>Movies</h2>
                </Col>
                <Col xs={12} md={2} className="align-self-center">
                    <Button className="float-right" onClick={() => {
                        setShow(true)
                    }}>Add new movie</Button>
                </Col>
            </Row>

            <MovieList>

            </MovieList>

            <CreateMovieModel show={show} handleClose={() => {
                setShow(false)
            }}>

            </CreateMovieModel>
        </div>
    )
}
export default Landing;