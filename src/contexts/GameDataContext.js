import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const GameDataContext = createContext();
const SetGameDataContext = createContext();

export const useGameData = () => useContext(GameDataContext);
export const useSetGameData = () => useContext(SetGameDataContext);

export const GameDataProvider = ({ children }) => {
  const [gameData, setGameData] = useState({
    popularGames: { results: [] },
  });
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
        // console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);
  return (
    <GameDataContext.Provider value={gameData}>
      <SetGameDataContext.Provider value={setGameData}>
        {children}
      </SetGameDataContext.Provider>
    </GameDataContext.Provider>
  );
};
