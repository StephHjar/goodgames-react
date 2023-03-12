import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";

import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [games, setGames] = useState({ results: [] });

  const [postData, setPostData] = useState({
    game: "",
    currently_playing: "",
    completed: "",
    content: "",
  });
  const { game, currently_playing, completed, content } = postData;

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { game, currently_playing, completed, content, is_owner } = data;

        is_owner
          ? setPostData({
              game,
              currently_playing,
              completed,
              content,
            })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };
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
        // console.log(err);
      }
    };
    handleMount();
    fetchGames();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeChecked = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("game", game);
    formData.append("currently_playing", currently_playing);
    formData.append("completed", completed);
    formData.append("content", content);

    try {
      await axiosReq.put(`/posts/${id}`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label className={appStyles.SubHeading}>Game</Form.Label>
        <Form.Control
          as="select"
          name="game"
          value={game}
          onChange={handleChange}
        >
          <option disabled={true}>-- Select A Game --</option>
          {games.results.map((game, index) => (
            <option value={game.id} key={`${game.id}-${index}`}>
              {game.title}
            </option>
          ))}
        </Form.Control>
        <span>
          Don't see your game in the list?{" "}
          <Link to={"/games/create"}>Add it here!</Link>
        </span>
      </Form.Group>
      {errors?.game?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className={appStyles.SubHeading}>
          Currently Playing?
        </Form.Label>
        <Form.Control
          type="checkbox"
          name="currently_playing"
          className={styles.Checkbox}
          checked={currently_playing}
          onChange={handleChangeChecked}
        />
      </Form.Group>
      {errors?.currently_playing?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className={appStyles.SubHeading}>Completed?</Form.Label>
        <Form.Control
          type="checkbox"
          name="completed"
          className={styles.Checkbox}
          checked={completed}
          onChange={handleChangeChecked}
        />
      </Form.Group>
      {errors?.completed?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className={appStyles.SubHeading}>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <span className={appStyles.Heading}>Edit A Tracked Game</span>
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
