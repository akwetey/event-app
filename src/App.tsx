import React from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/dashboard/Index";
import UserContext from "./contexts/UserContexts";

interface JwtDecode {
  exp: number;
}
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(true);

  React.useEffect(() => {
    function checkStatus() {
      let token = localStorage.getItem("userToken");

      if (!token) {
        setLoggedIn(false);
        return;
      }

      const { exp } = jwtDecode<JwtDecode>(token);
      if (((new Date() as unknown) as number) > exp * 1000) {
        setLoggedIn(false);
        localStorage.removeItem("token");
        return;
      }

      setLoggedIn(true);
      return;
    }

    checkStatus();
  }, []);

  const AuthRoute: React.FC<RouteProps> = ({
    component: Component,
    ...rest
  }) => {
    if (!Component) return null;
    return (
      <Route
        {...rest}
        render={(props) =>
          !loggedIn ? <Component {...props} /> : <Redirect to="/dashboard" />
        }
      />
    );
  };

  const PrivateRoute: React.FC<RouteProps> = ({
    component: Component,
    ...rest
  }) => {
    if (!Component) return null;
    return (
      <Route
        {...rest}
        render={(props) =>
          loggedIn ? <Component {...props} /> : <Redirect to="/green-admin" />
        }
      />
    );
  };
  return (
    <div className="App">
      <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/green-admin" />
            </Route>
            <AuthRoute path="/green-admin" component={Login} />
            <PrivateRoute path="/dashboard" component={Index} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
