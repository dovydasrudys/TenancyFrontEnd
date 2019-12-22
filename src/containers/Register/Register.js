import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { register } from "../../actions/UserActions";

import { Button, FormGroup, FormControl, FormLabel, Container, Row, Col as Column, Form, Image } from "react-bootstrap";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Colors } from "../../Colors";

class Register extends Component {
  state = {
    userName: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: ""
  }

  validateForm = () => {
    const {userName, password, repeatPassword, firstName, lastName} = this.state;

    return userName.length > 0
      && password.length > 0
      && repeatPassword.length > 0
      && firstName.length > 0
      && lastName.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {userName, password, repeatPassword, firstName, lastName} = this.state;

    if (password !== repeatPassword) {
      return;
    }

    this.props.register(this.state);
    this.props.history.push("/")
  }

  render() { 
    const {userName, password, repeatPassword, firstName, lastName} = this.state;

    return (
      <Container>
      <Row className="justify-content-center my-5">
        <Column style={{ textAlign: "center" }}>
          <Image src={process.env.PUBLIC_URL + '/Logo.png'}></Image>
        </Column>
      </Row>
      <Row className="justify-content-center">
        <Column xs='12' lg='6'>
          <Paper elevation={10} style={{ backgroundColor: Colors.first }}>
            <Form className="p-5">
              <FormGroup controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={userName}
                  onChange={e => this.setState({ userName: e.target.value })}
                  placeholder="john@doe.com"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="firstName">
                <FormLabel>First Name</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                  placeholder="John"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="lastName">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  placeholder="Doe"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password"
                  placeholder="Type your password here"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="repeatPassword">
                <FormLabel>Repeat your password</FormLabel>
                <FormControl
                  value={repeatPassword}
                  onChange={e => this.setState({ repeatPassword: e.target.value })}
                  type="password"
                  placeholder="Type your password here"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <Button disabled={!this.validateForm()} type="submit" onClick={this.handleSubmit}>
                Register
              </Button>
              <Button variant="outline-success" style={{float: "right"}} onClick={() => this.props.history.push("/")}>
                Go to homepage
              </Button>
            </Form>
          </Paper>
        </Column>
      </Row>
    </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (user) => dispatch(register(user))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Register));