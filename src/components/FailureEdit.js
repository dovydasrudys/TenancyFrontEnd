import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createFailure, updateFailure } from "../actions/FailuresActions";

import { Button, FormGroup, FormControl, FormLabel, Container, Row, Col as Column, Form, Image } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Colors } from "../Colors";

class FailureEdit extends Component {
  state = {
        description: "",
        isFixed: false,
        issueDate: "",
        contractId: this.props.contract.id,
        reporterId: this.props.user.id
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
      if(this.props.failure.id){
          this.setState(this.props.failure);
      }
  }

  validateForm = () => {
    const { description, isFixed, issueDate } = this.state;

    return description.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.id){
        console.log(this.state);
        this.props.updateFailure(this.state);
    }else{
        console.log(this.state);
        this.props.createFailure(this.state);
    }
    this.props.onSubmit();
  }

  render() { 
    const { description, isFixed, issueDate } = this.state;

    return (
          <Paper elevation={10} style={{ backgroundColor: Colors.first}}>
            <Form className="p-5">
              <FormGroup controlId="country">
                <FormLabel>Description</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={description}
                  onChange={e => this.setState({ description: e.target.value })}
                  placeholder="Something is broken"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="isFixed">
                <FormLabel>Is fixed</FormLabel>
                <FormControl
                  autoFocus
                  type="checkbox"
                  checked={isFixed}
                  onChange={e => this.setState({ isFixed: !this.state.isFixed })}
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="issueDate">
                <FormLabel>Date</FormLabel>
                <FormControl
                  autoFocus
                  type="date"
                  value={issueDate}
                  onChange={e => this.setState({ issueDate: e.target.value })}
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <Button disabled={!this.validateForm()} onClick={this.handleSubmit}>
                {this.state.id ? "Update" : "Create"}
              </Button>
            </Form>
          </Paper>
    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        realEstate: state.realEstatesReducer.realEstate,
        contract: state.contractsReducer.contract,
        failure: state.failuresReducer.failure
    }
}

const mapDispatchToProps = dispatch => {
  return {
    createFailure: (failure) => dispatch(createFailure(failure)),
    updateFailure: (failure) => dispatch(updateFailure(failure)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FailureEdit));