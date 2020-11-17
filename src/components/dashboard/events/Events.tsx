import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Add from "./Add";
import Details from "./Details";
import EventTable from "./EventTable";

const Events: React.FC = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} component={EventTable} />
        <Route exact path={`${match.path}/:mask`} component={Details} />
        <Route path={`${match.path}/add-event`} component={Add} />
      </Switch>
    </div>
  );
};

export default Events;
