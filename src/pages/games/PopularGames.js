import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useGameData } from "../../contexts/GameDataContext";

const PopularGames = ({ mobile }) => {
  const { popularGames } = useGameData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularGames.results.length ? (
        <>
          <p className={appStyles.Heading}>Most liked games</p>
          {mobile ? (
            // refactored with help from Sean on Tutor Support
            <div className="d-flex justify-content-around">
              {popularGames.results.slice(0, 3).map((game, index) => (
                <Link
                  key={`${game.id}-mobile-${index}`}
                  className={appStyles.GameLink}
                  to={`/games/${game.id}`}
                >
                  <p>{game.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            popularGames.results.slice(0, 5).map((game, index) => (
              <Link
                key={`${game.id}-desktop-${index}`}
                className={appStyles.GameLink}
                to={`/games/${game.id}`}
              >
                <p>{game.title}</p>
              </Link>
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularGames;
