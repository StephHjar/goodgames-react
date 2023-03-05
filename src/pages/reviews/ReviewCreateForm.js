import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
  const { game, setGame, setReviews } = props;
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        content,
        game,
        rating: parseInt(rating),
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }));
      setGame((prevGame) => ({
        results: [
          {
            ...prevGame.results[0],
            reviews_count: prevGame.results[0].reviews_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Rating (1-5 stars)</Form.Label>
          <Form.Control
            as="select"
            className={styles.Form}
            aria-label="Rating from 1 to 5"
            value={rating}
            onChange={handleChangeRating}
          >
            <option value="1">1 *</option>
            <option value="2">2 **</option>
            <option value="3">3 ***</option>
            <option value="4">4 ****</option>
            <option value="5">5 *****</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} className="mt-2">
          <Form.Control
            className={styles.Form}
            placeholder="My review..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>
      </Row>

      <button
        className={`${btnStyles.Button} ${btnStyles.Blue} btn d-block m-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default ReviewCreateForm;
