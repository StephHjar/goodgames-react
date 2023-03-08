import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/game_upload.webp";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const [games, setGames] = useState({ results: [] });

  const [postData, setPostData] = useState({
    game_title: "",
    currently_playing: "",
    completed: "",
    content: "",
  });
  const { game, game_title, currently_playing, completed, content } = postData;

  useEffect(() => {
    const fetchGames = async (page = 1) => {
      try {
        const { data } = await axiosReq.get(`/games/?page=${page}`);
        setGames((prevState) => ({
          ...prevState,
          results: prevState.results
            .concat(data.results)
            .sort((a, b) => a.title.localeCompare(b.title)),
        }));
        if (data.next) {
          await fetchGames(page + 1);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchGames();
  }, []);

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Game</Form.Label>
        <Form.Control as="select" defaultValue="-- Select A Game --">
          <option disabled={true}>-- Select A Game --</option>
          {games.results.map((game) => (
            <option value={game_title} key={game.id}>
              {game.title}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Currently Playing?</Form.Label>
        <Form.Control type="checkbox" name="currently-playing" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Completed?</Form.Label>
        <Form.Control type="checkbox" name="complete" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control as="textarea" rows={6} name="content" />
      </Form.Group>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="image-upload"
              >
                <Asset src={Upload} />
              </Form.Label>
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
