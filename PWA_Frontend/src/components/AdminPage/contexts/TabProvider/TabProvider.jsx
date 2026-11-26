import React, { useState, useMemo } from "react";
import { TabContext } from "./TabContext";

export const TabProvider = ({ children }) => {
  const [countGames, setGamesCount] = useState(0);
  const [countClicks, setClicksCount] = useState(0);

  const value = useMemo(
    () => ({
      setGamesCount,
      countGames: countGames,
      setClicksCount,
      countClicks: countClicks,
    }),
    [countGames, countClicks]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};
