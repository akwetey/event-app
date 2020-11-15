import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./components/dashboard/Index";
const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Index} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
