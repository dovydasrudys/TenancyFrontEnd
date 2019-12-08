import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel, Container, Row, Col as Column, Form, Image, Alert} from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Colors } from "../../Colors";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return email.length > 0 
        && password.length > 0 
        && repeatPassword.length > 0
        && firstName.length > 0 
        && lastName.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if(password !== repeatPassword){
        setError("Passwords don't match !");
        return;
    }

    axios.post("https://localhost:44318/api/users", {
      UserName: email,
      Password: password
    }).then(res => {
      console.log(res.data);
    })
  }

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
                  onChange={e => {setEmail(e.target.value); setError("");}}
                  placeholder="john@doe.com"
                  style={{backgroundColor: Colors.second}}
                />
              </FormGroup>
              <FormGroup controlId="firstName">
                <FormLabel>First Name</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={firstName}
                  onChange={e => {setFirstName(e.target.value); setError("");}}
                  placeholder="John"
                  style={{backgroundColor: Colors.second}}
                />
              </FormGroup>
              <FormGroup controlId="lastName">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={lastName}
                  onChange={e => {setLastName(e.target.value); setError("");}}
                  placeholder="Doe"
                  style={{backgroundColor: Colors.second}}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={password}
                  onChange={e => {setPassword(e.target.value); setError("");}}
                  type="password"
                  placeholder="Type your password here"
                  style={{backgroundColor: Colors.second}}
                />
              </FormGroup>
              <FormGroup controlId="repeatPassword">
                <FormLabel>Repeat your password</FormLabel>
                <FormControl
                  value={repeatPassword}
                  onChange={e => {setRepeatPassword(e.target.value); setError("");}}
                  type="password"
                  placeholder="Type your password here"
                  style={{backgroundColor: Colors.second}}
                />
              </FormGroup>
              <Button disabled={!validateForm()} type="submit">
                Register
              </Button>
            </Form>
          </Paper>
        </Column>
      </Row>
      {error.length > 0 ?
      <Row className="justify-content-center">
      <Alert variant="danger" style={{position: "fixed", bottom: "0px"}}>
        <Alert.Heading>{error}</Alert.Heading>
      </Alert>
      </Row>
      :""
      }
    </Container>
  );
}