import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PopularGames = ({ mobile }) => {
  const [gameData, setGameData] = useState({
    popularGames: { results: [] },
  });
  const { popularGames } = gameData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/games/?ordering=-likes_count");
        setGameData((prevState) => ({
          ...prevState,
          popularGames: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularGames.results.length ? (
        <>
          <p>Most liked games.</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularGames.results.slice(0, 3).map((game) => (
                <p key={game.id}>{game.title}</p>
              ))}
            </div>
          ) : (
            popularGames.results
              .slice(0, 5)
              .map((game) => <p key={game.id}>{game.title}</p>)
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularGames;
