import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Add from "./Add";
import Details from "./Details";
import Edit from "./Edit";
import EventTable from "./EventTable";

const Events: React.FC = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} component={EventTable} />
        <Route path={`${match.path}/add-event`} component={Add} />
        <Route path={`${match.path}/update-event/:mask`} component={Edit} />
        <Route path={`${match.path}/:mask`} component={Details} />
      </Switch>
    </div>
  );
};

export default Events;
