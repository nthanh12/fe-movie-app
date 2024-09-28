import React, { useEffect, useState } from "react";
import NoImage from '../no-image.png';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const MovieDetail = () => {
    const [movie, setMovie] = useState(null);

    const { movieid } = useParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/movie/" + movieid)
                .then(res => res.json())
                .then(res => {
                    if (res.status === true) {
                        setMovie(res.data);
                    }
                })
                .catch(err => alert("Error in getting data"));
    }, [])

    return (
        <div>
        <Row>
            {movie && 
                <>
                    <Col item xs= {12} md={4}>
                        <img src={movie.coverImage || NoImage} style={{width: 300, height: 300}}></img>
                    </Col>
                    <Col item xs= {12} md={8}>
                        <h3>{movie.title}</h3>
                        <p>{movie.description || 'N/A'}</p>
                        <div><b>Language:</b></div>
                        <div>{movie.language}</div>
                        <div><b>Release Date:</b></div>
                        <div>{movie.releaseDate && movie.releaseDate.split('T')[0]}</div>
                        <div><b>Cast:</b></div>
                        <div>{movie.actors.map(x => x.name).join(", ")}</div>
                    </Col>
                    <Col>
                        <Link to="/">Go to Home page</Link>
                    </Col> 
                </>
            }
        </Row>
        </div>
    )
}

export default MovieDetail;