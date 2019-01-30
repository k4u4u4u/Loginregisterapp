import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";

import Register from "./component/auth/Register";
import Login from "./component/auth/Login";

import "./App.css";

//check for  token
if (localStorage.jwtToken) {
  // set suth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user  and isAutheticated
  store.dispatch(setCurrentUser(decoded));

  //check for expiration token
  const CurrentTime = Date.now() / 1000;
  if (decoded.exp < CurrentTime) {
    // logout user
    store.dispatch(logoutUser());
    //todo: clear current profile

    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/signup" component={Register} />
              <Route exact path="/signin" component={Login} />
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
