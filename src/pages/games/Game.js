import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "../../styles/Game.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Game = (props) => {
  const {
    id,
    reviews_count,
    likes_count,
    like_id,
    title,
    description,
    image,
    setGames,
  } = props;

  const currentUser = useCurrentUser();
  const is_admin = currentUser?.username === "admin";
  const history = useHistory();
  const { pathname } = useLocation();

  const handleEdit = () => {
    history.push(`/games/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/games/${id}/`);
      pathname === "/games" ? history.go(0) : history.push("/games");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { game: id });
      setGames((prevGames) => ({
        results: prevGames.results.map((game) => {
          return game.id === id
            ? { ...game, likes_count: game.likes_count + 1, like_id: data.id }
            : game;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setGames((prevGames) => ({
        results: prevGames.results.map((game) => {
          return game.id === id
            ? { ...game, likes_count: game.likes_count - 1, like_id: null }
            : game;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Game}>
      <Card.Body>
        <Media>
          <div className="ml-auto">
            {is_admin && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/games/${id}`}>
        <Card.Img src={image} alt={title} className={styles.Image} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.PostBar}>
          {like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
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
