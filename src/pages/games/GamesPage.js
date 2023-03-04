import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/GamesPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Game from "./Game";

import NoResults from "../../assets/no-results.webp";
import Asset from "../../components/Asset";

function GamesPage({ message, filter = "" }) {
  const [games, setGames] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get(`/games/?${filter}`);
        setGames(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchGames();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular games mobile</p>
        {hasLoaded ? (
          <>
            {games.results.length ? (
              games.results.map((game) => (
                <Game key={game.id} {...game} setGames={setGames} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular games for desktop</p>
      </Col>
    </Row>
  );
}

export default GamesPage;
