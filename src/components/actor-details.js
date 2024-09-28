import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const ActorsDetail = () => {
    const [actor, setActor] = useState(null);
    const { actorid } = useParams(); // Lấy actorid từ URL

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/Person/" + actorid)
            .then(res => res.json())
            .then(res => {
                if (res.status === true) {
                    setActor(res.data);
                } else {
                    alert("No actor found");
                }
            })
            .catch(err => alert("Error in getting data"));
    }, [actorid]); // Thêm actorid vào dependency array

    return (
        <div>
            <Row>
                {actor ? (
                    <>
                        <Col xs={12} md={10}>
                            <h3>{actor.name}</h3>
                            <div><b>Date of Birth:</b></div>
                            <div>{actor.dateOfBirth && actor.dateOfBirth.split('T')[0]}</div>
                            <div><b>Movies:</b></div>
                            {/* Kiểm tra nếu danh sách phim tồn tại */}
                            <ul>
                                {actor.movies && actor.movies.length > 0 ? (
                                    actor.movies.map((movie, index) => <li key={index}>{movie}</li>)
                                ) : (
                                    <li>No movies available</li>
                                )}
                            </ul>
                        </Col>
                        <Col xs={12} md={2}>
                            <Link to="/actors">Go to Actors page</Link>
                        </Col>
                    </>
                ) : (
                    <p>Loading actor details...</p>
                )}
            </Row>
        </div>
    );
};

export default ActorsDetail;
