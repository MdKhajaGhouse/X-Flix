import React, { useLayoutEffect } from "react";
import "antd/dist/antd.css";
import { Route, Switch, useLocation } from "react-router-dom";
import LandingPage from './components/LandingPage'
import Video from "./components/Video";

export const config = {
  endpoint: `https://7dbb9aa5-01cf-46ed-8884-fea114ba71d7.mock.pstmn.io/v1`,
};

export default function App(props){
  const location = useLocation();
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="App">
      <Switch>
        <Route path="/:videoId">
          <Video />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>  
      </Switch>
    </div>
  );
}
