import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import appStyles from "../../App.module.css";
import splashImage from "../../assets/splash-image.webp";

const Home = () => {
  return (
    <Row>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} text-center`}>
          <>
            <h2 className={appStyles.Heading}>Welcome to GoodGames!</h2>
            <p>
              Here you can track the video games you're currently playing, and
              leave reviews for those you love (or hate!)
            </p>
            <p>Sign up or log in now to see others' games and reviews!</p>
          </>
        </Container>
      </Col>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Image
          className={`${appStyles.FillerImage}`}
          src={splashImage}
          alt="Photo of two people's hands holding video game controllers"
        />
      </Col>
    </Row>
  );
};

export default Home;
