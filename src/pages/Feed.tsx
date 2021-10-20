import React from "react";
import { useRouteMatch } from 'react-router-dom';
import Feed from "../components/Feed/Feed";

export const FeedPage = () => {
  const { path } = useRouteMatch();

  return <Feed path={path}/>;
}