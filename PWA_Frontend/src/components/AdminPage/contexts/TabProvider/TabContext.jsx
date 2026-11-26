import React from "react";

const context = {
  setGamesCount: () => {},
  countGames: () => {},
  setClicksCount: () => {},
  countClicks: () => {},
};

export const TabContext = React.createContext(context);
