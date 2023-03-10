import React from "react";
import { Container } from "react-bootstrap";
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
            <div className="d-flex justify-content-around">
              {popularGames.results.slice(0, 3).map((game) => (
                <Link className={appStyles.GameLink} to={`/games/${game.id}`}>
                  <p key={game.id}>{game.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            popularGames.results.slice(0, 5).map((game) => (
              <Link className={appStyles.GameLink} to={`/games/${game.id}`}>
                <p key={game.id}>{game.title}</p>
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
