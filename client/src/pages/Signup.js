import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../utils/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./landing.css";

class Login extends Component {
  state = {
    success: false,
    username: "",
    password: ""
  }
  
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }

  // Method to register a new user
  register = (e) => {
    e.preventDefault();
    API
      .register({ username: this.state.username, password: this.state.password })
      .then(res => {
        console.log(res.data);
        this.setState({ success: res.data })

      })
      .catch(err => console.log(err.response.data));
      this.notifyError();
  };

  notifyError = () => {
    toast.error("Signup failed. Please try again", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };

  notifySuccess = () => {
    toast.success("Success! Please login with your credentials", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };



  render() {
    // If Signup was a success, take them to the Login page
    if (this.state.success) {
      this.notifySuccess();
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Navbar />
        <div className="backlay1"></div>
        <div className="overlay"></div>
      <div className="container my-5">
        <div className="row justify-content-center">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        
          <form>
            <h3>Sign Up!</h3>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Username" />
              <small id="usernameHelp" className="form-text text-muted">Enter your username</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up!</button>
          </form>

        </div>
      </div>
      </div>
    )
  }
}

export default Login;