import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import NoImage from '../no-image.png';
import AsyncSelect from 'react-select/async';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const EditMovie = () => {
    const { movieid } = useParams();
    const [movie, setMovie] = useState({}) ;
    const [validated, setValidated] = useState(false);
    const [actors, setActors] = useState(false);

    useEffect(() => {
        if (movieid) {
            fetch(process.env.REACT_APP_API_URL + "/movie/" + movieid)
                .then(res => res.json())
                .then(res => {
                    if (res.status === true) {
                        let movieData = res.data;
                        if (movieData.releaseDate !== null && movieData.releaseDate !== undefined) {
                            movieData.releaseDate = movieData.releaseDate.split('T')[0];
                        }
                        setMovie(movieData);
                        setActors(movieData.actors.map(x => ({ value: x.id, label: x.name })));
                    }
                })
                .catch(err => alert("Error in getting data"));
        }
    }, [movieid]);

    const handleFileUpload = (event) => {
        event.preventDefault();
        var file = event.target.files[0];
        const form = new FormData();
        form.append("imageFile", file)
        console.log('nani')

        fetch(process.env.REACT_APP_API_URL + "/Movie/upload-movie-poster", {
            method: "POST",
            body: form
        })
            .then(res => {
            console.log('response', res)
            return res.json()
        })
            .then(res => {
            console.log('res', res)
                var da = movie;
                da.coverImage = res.profileImage;

                setMovie(oldData => {
                    return { ...oldData, ...da };
                })
            })
            .catch(err => alert("Error in file upload"));
    };

    const handleFieldChang = (event) => {
        var da = movie;
        da[event.target.name] = event.target.value;

        setMovie(oldData => {
            return { ...oldData, ...da };
        })
    };

    const promiseOptions = (inputValue) => {
        return fetch(process.env.REACT_APP_API_URL + "/Person/Search/" + inputValue)
            .then(res => res.json())
            .then(res => {
                if (res.status === true && res.data.length > 0) {
                    return res.data.map(x => { return { value: x.id, label: x.name } })
                }
                if (res.data.count === 0) {
                    alert("There is no actor matching this name.");
                }
            })
            .catch(err => alert("Error getting data"));
    }

    const multiselectchange = (data) => {
        setActors(data);

        var people = data.map(x => { return { id: x.value, name: x.label } });
        var da = movie;
        da.actors = people;

        setMovie(oldData => {
            return { ...oldData, ...da };
        })
    }

    const handleSave = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        let movieToPost = movie;
        movieToPost.actors = movieToPost.actors.map(x => x.id);

        if (movie && movie.id > 0) {
            //update
            fetch(process.env.REACT_APP_API_URL + "/movie", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieToPost)
            })
                .then(res => res.json())
                .then(res => { 
                    if (res.status === true && res.data) {
                        let movieData = res.data;
                        if (movieData.releaseDate !== null && movieData.releaseDate !== undefined) {
                            movieData.releaseDate = movieData.releaseDate.split('T')[0];
                        }
                        setMovie(res.data);
                        alert('Updated successfully!');
                    }
                })
                .catch(err => alert("Error getting data"));
        }
        else {
            //create
            fetch(process.env.REACT_APP_API_URL + "/movie", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieToPost)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === true && res.data) {
                        let movieData = res.data;
                        if (movieData.releaseDate !== null && movieData.releaseDate !== undefined) {
                            movieData.releaseDate = movieData.releaseDate.split('T')[0];
                        }
                        setMovie(res.data);
                        alert('Create successfully!');
                    }
                })
                .catch(err => alert("Error getting data"));
        }
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSave}>
                <Form.Group className="d-flex justify-content-center">
                    <Image width="200" height="200" src={movie && movie.coverImage || NoImage}></Image>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <div><input type="file" onChange={handleFileUpload}></input></div>
                </Form.Group>
                <Form.Group controlId="formmovieTitle">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control name="title" value={movie && movie.title || ''} required type="text" placeholder="Enter movie name.."
                        onChange={handleFieldChang}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter movie name
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formmovieDescription">
                    <Form.Label>Movie Description</Form.Label>
                    <Form.Control name="description" value={movie && movie.description || ''} required type="textarea" rows={3} placeholder="Enter movie description.."
                        onChange={handleFieldChang}></Form.Control>
                </Form.Group>
                <Form.Group controlId="formovieReleaseDate">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control name="releaseDate" value={movie && movie.releaseDate || ''} required type="date"
                        onChange={handleFieldChang}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter movie release date
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formovieActor">
                    <Form.Label>Actors</Form.Label>
                    <AsyncSelect cacheOptions isMulti value={actors} loadOptions={promiseOptions} onChange={multiselectchange}></AsyncSelect>
                </Form.Group>
                <Form.Group controlId="formmovieLanguage">
                    <Form.Label>Movie Language</Form.Label>
                    <Form.Control name="language" value={movie && movie.language || ''} required type="text" placeholder="Enter movie language.."
                        onChange={handleFieldChang}></Form.Control>
                </Form.Group>
                <Button type="submit">{movie && movie.id > 0 ? "Update" : "Create"}</Button>
            </Form>
        </div>
    )
}

export default EditMovie;