import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <div className="intro-lead-in">Welcome To Our Studio!</div>
            <div className="intro-heading text-uppercase">
              It's Nice To Meet You
            </div>
            <Link
              to="/signin"
              className="btn btn-warning btn-xl text-uppercase js-scroll-trigger mr-1"
              href="#"
            >
              SignIn
            </Link>
            <Link
              to="/signup"
              className="btn btn-warning btn-xl text-uppercase js-scroll-trigger"
              href="#"
            >
              SignUp
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
