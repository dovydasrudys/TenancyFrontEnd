import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel, Container, Row, Col as Column, Form, Image} from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import { FacebookLoginButton } from "react-social-login-buttons";
import axios from "axios";
import { Colors } from "../../Colors";
const queryString = require('query-string');

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("https://localhost:44318/api/users/authenticate", {
      UserName: email,
      Password: password
    }).then(res => {
      console.log(res.data);
    })
  }

  useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    if(parsed.code)
      axios.post("https://localhost:44318/api/users/facebook", {
        code: parsed.code
      }).then(res => {
        console.log(res.data);
      })
  }, []);

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Column style={{textAlign: "center"}}>
          <Image src={process.env.PUBLIC_URL + '/Logo.png'}></Image>
        </Column>
      </Row>
      <Row className="justify-content-center">
        <Column xs='10' s='10' md='10' lg='4' xl='4'>
          <Paper elevation={10} style={{backgroundColor: Colors.first}}>
            <Form className="p-5" onSubmit={handleSubmit}>
              <FormGroup controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{backgroundColor: Colors.second}}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  style={{backgroundColor: Colors.second}}
                />
              </FormGroup>
              <Button disabled={!validateForm()} type="submit">
                Login
              </Button>
              <Button variant="secondary" style={{float: "right"}}>
                Register here
              </Button>
            </Form>
          </Paper>
        </Column>
      </Row>
      <Row className="justify-content-center mt-2">
        <Column xs='10' s='10' md='10' lg='4' xl='4'>
          <a rel="noopener noreferrer" href="https://www.facebook.com/v5.0/dialog/oauth?client_id=755621898232417&redirect_uri=http://localhost:3000/login&&scope=email" target="_blank"><FacebookLoginButton align="center" style={{width: '100%', margin: '0px'}}/></a>
        </Column>
      </Row>
    </Container>
  );
}