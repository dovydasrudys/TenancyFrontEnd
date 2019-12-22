import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Button, FormGroup, FormControl, FormLabel, Container, Row, Col as Column, Form, Image } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import { FacebookLoginButton } from "react-social-login-buttons";
import axios from "axios";
import { Colors } from "../../Colors";

import { login } from "../../actions/UserActions";
import { connect } from "react-redux";

const queryString = require('query-string');


class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  // componentDidMount() {
  //   if(!this.props.location)
  //     return;
  //   const parsed = queryString.parse(this.props.location.search);
  //   if (parsed.code)
  //     axios.post("https://localhost:44318/api/users/facebook", {
  //       code: parsed.code
  //     }).then(res => {
  //       console.log(res.data);
  //     })
  // }

  //history = useHistory();

  componentDidUpdate(prevProps, prevState) {
    if(this.props.user.token){
      this.props.history.push("/");
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() { 
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
            <Form className="p-5" onSubmit={this.handleSubmit}>
              <FormGroup controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value})}
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value})}
                  type="password"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <Button disabled={!this.validateForm()} type="submit">
                Login
              </Button>
              <Button onClick={() => this.props.history.push("/register")} variant="secondary" style={{ float: "right" }}>
                Register here
              </Button>
            </Form>
          </Paper>
        </Column>
      </Row>
      <Row className="justify-content-center mt-2">
        <Column xs='12' lg='6'>
          <a rel="noopener noreferrer" href="https://www.facebook.com/v5.0/dialog/oauth?client_id=755621898232417&redirect_uri=http://localhost:3000/login&&scope=email" target="_blank"><FacebookLoginButton align="center" style={{ width: '100%', margin: '0px' }} /></a>
        </Column>
      </Row>
    </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    ads: state.adsReducer.ads
  };
};

function mapDispatchToProps(dispatch) {
  return {
      login: (username, password) => dispatch(login(username, password))
  };
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));