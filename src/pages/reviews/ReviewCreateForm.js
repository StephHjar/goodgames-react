import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
  const { game, setGame, setReviews, profileImage, profile_id } = props;
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
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my review..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
          <Form.Label>Rating (1-5 stars)</Form.Label>
          <Form.Control
            as="select"
            // className={styles.Form}
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
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default ReviewCreateForm;
