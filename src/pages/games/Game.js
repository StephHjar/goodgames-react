import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Game.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Game = (props) => {
  const { id, reviews_count, likes_count, like_id, title, description, image } =
    props;

  const currentUser = useCurrentUser();

  return (
    <Card className={styles.Game}>
      <Link to={`/games/${id}`}>
        <Card.Img src={image} alt={title} className={styles.Image} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.PostBar}>
          {like_id ? (
            <span onClick={() => {}}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like games!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/games/${id}`}>
            <i className="fas fa-comment-dots" />
          </Link>
          {reviews_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Game;
