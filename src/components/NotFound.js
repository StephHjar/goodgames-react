import React from "react";
import NoResults from "../assets/no-results.webp";
import styles from "../styles/NotFound.module.css";
import btnStyles from "../styles/Button.module.css";
import Asset from "./Asset";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className={`${styles.NotFound} text-center`}>
      <Asset
        src={NoResults}
        message="Sorry, the page you're looking for doesn't exist"
      />
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        go back
      </Button>
    </div>
  );
};

export default NotFound;
