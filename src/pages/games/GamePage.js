import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: game }] = await Promise.all([
          axiosReq.get(`/games/${id}`),
        ]);
        setGame({ results: [game] });
        console.log(game);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular games for mobile</p>
        <p>Game component</p>
        <Container className={appStyles.Content}>Reviews</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular games for desktop
      </Col>
    </Row>
  );
}

export default GamePage;
