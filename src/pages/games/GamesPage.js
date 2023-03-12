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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularGames from "./PopularGames";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function GamesPage({ message, filter = "" }) {
  const [games, setGames] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get(`/games/?${filter}search=${query}`);
        setGames(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchGames();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/games/create"
        >
          <i className="far fa-plus-square"></i>
          <span className={appStyles.SubHeading}>Add A Game</span>
        </NavLink>
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularGames mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search games"
          />
        </Form>
        {hasLoaded ? (
          <>
            {games.results.length ? (
              <InfiniteScroll
                children={games.results.map((game) => (
                  <Game key={game.id} {...game} setGames={setGames} />
                ))}
                dataLength={games.results.length}
                loader={<Asset spinner />}
                hasMore={!!games.next}
                next={() => fetchMoreData(games, setGames)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} height={60} />
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
        <PopularGames />
      </Col>
    </Row>
  );
}

export default GamesPage;
