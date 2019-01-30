import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      gender: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      userName: this.state.userName,
      password: this.state.password,
      gender: this.state.gender,
    };

    //pass componnet data thru redux
    this.props.registerUser(newUser, this.props.history);

    // console.log(newUser);
    // axios.post("/api/users/register", newUser).then(res => console.log(res.data)).catch(err => this.setState({errors: err.response.data}));
  }

  render() {
    const { errors } = this.state;

    //get data passed from cpmponent to reducer and show back in component
    // const {user} = this.props.auth;

    return (
      <div className="container signup">
        {/* get data passed from cpmponent to reducer and show back in component */}
        {/* {
                user
                    ? user.name
                    : null
            } */}
        <div className="col-md-6 mx-auto text-center">
          <div className="header-title">
            <h1 className="wv-heading--title">SignUp</h1>
            <h2 className="wv-heading--subtitle">
              Fill in the details to SignUp
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="myform form ">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="userName"
                    className={classnames("form-control my-input", {
                      "is-invalid": errors.errorMessage,
                    })}
                    placeholder="userName"
                    value={this.state.userName}
                    onChange={this.onChange}
                  />{" "}
                  {errors.errorMessage && (
                    <div className="invalid-feedback">
                      {errors.errorMessage}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="password"
                    className={classnames("form-control my-input", {
                      "is-invalid": errors.errorMessage,
                    })}
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />{" "}
                  {errors.errorMessage && (
                    <div className="invalid-feedback">
                      {errors.errorMessage}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="gender"
                    className={classnames("form-control my-input", {
                      "is-invalid": errors.errorMessage,
                    })}
                    placeholder="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                  />{" "}
                  {errors.errorMessage && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="text-center ">
                  <input
                    type="submit"
                    className=" btn btn-block send-button tx-tfm"
                  />
                  Create Your Account
                </div>
                {/* <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or"/>
                                    <span className="span-or">or</span>
                                </div>
                            </div> */}
                {/* <div className="form-group">
                                <a className="btn btn-block g-button" href="#">
                                    <i className="fa fa-google"/>
                                    Sign up with Google
                                </a>
                            </div> */}
                <p className="small mt-3">
                  By signing up, you are indicating that you have read and agree
                  to the
                  <Link to="/home" className="ps-hero__content__link">
                    Terms of Use
                  </Link>
                  and
                  <Link to="/home">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
