import React from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ActorList from "../components/actor-list";

const Actors = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <Row>
        <Col xs={12} md={10}>
          <h2>Actors</h2>
        </Col>
        <Col xs={12} md={2} className="align-self-center">
          <Button className="float-right" onClick={() => navigate('/actors/create-edit')}>Add New Actor</Button>
        </Col>
      </Row>

      <ActorList></ActorList>
    </div>
  );
};

export default Actors;
