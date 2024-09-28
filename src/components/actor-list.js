import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ActorList = () => {
    const [actors, setActors] = useState([]);
    const [actorsCount, setActorsCount] = useState(0);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getPersons();
    }, [page]);

    const getPersons = () => {
        fetch(`${process.env.REACT_APP_API_URL}/Person?pageSize=${process.env.REACT_APP_PAGING_SIZE}&pageIndex=${page}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === true && res.data.count > 0) {
                    setActors(res.data.person);
                    setActorsCount(Math.ceil(res.data.count / process.env.REACT_APP_PAGING_SIZE));
                } else {
                    setActors([]);
                    alert("There is no actor data in the system.");
                }
            })
            .catch(err => alert("Error getting data!"));
    };

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected);
    };

    const deletePerson = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/Person?id=${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === true) {
                    alert(res.message);
                    getPersons();
                }
            })
            .catch(err => alert("Error getting data"));
    };

    return (
        <div>
            {actors && actors.length > 0 ? (
                <div>
                    {actors.map((m, i) => (
                        <Row key={i}>
                            <Col>
                                <div onClick={() => navigate(`/actors/details/${m.id}`)}>
                                    <b><u>{m.name}</u></b>
                                </div>
                                <Button onClick={() => {
                                    navigate(`/actors/create-edit?id=${m.id}`, { state: { data: m } }); 
                                }}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => deletePerson(m.id)}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </div>
            ) : "No actors available"}

            <div className="d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'page-link'}
                    pageCount={actorsCount}
                    marginPagesDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-link'}
                    nextClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
}

export default ActorList;
