import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Add from "./Add";
import EventTable from "./EventTable";

const Events: React.FC = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} component={EventTable} />
        <Route path={`${match.path}/add-event`} component={Add} />
      </Switch>
    </div>
  );
};

export default Events;
