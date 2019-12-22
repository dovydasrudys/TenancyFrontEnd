import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createContract, updateContract } from "../actions/ContractActions";

import { Button, FormGroup, FormControl, FormLabel, Container, Row, Col as Column, Form, Image } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Colors } from "../Colors";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class ContractEdit extends Component {
  state = {
        price: 0,
        start: "",
        duration: 1,
        tenantId: 0,
        landlordId: this.props.user.id,
        realEstateId: this.props.myRealEstates[0].id
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
      if(this.props.contract.id){
          this.setState(this.props.contract);
      }
  }

  validateForm = () => {
    const { price, start, duration, tenantId, landlordId, realEstateId } = this.state;

    return price > 0
        && start.length > 0
        && duration > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.id){
        this.props.updateContract(this.state);
    }else{
        this.props.createContract(this.state);
    }
    this.props.onSubmit();
  }

  render() { 
    const { price, start, duration, tenantId, realEstateId } = this.state;

    return (
          <Paper elevation={10} style={{ backgroundColor: Colors.first}}>
            <Form className="p-5">
              <FormGroup controlId="price">
                <FormLabel>Monthly price</FormLabel>
                <FormControl
                  autoFocus
                  type="number"
                  value={price}
                  onChange={e => this.setState({ price: e.target.value })}
                  placeholder="280"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="startDate">
                <FormLabel>Starting date</FormLabel>
                <FormControl
                  autoFocus
                  type="date"
                  value={start}
                  onChange={e => this.setState({ start: e.target.value })}
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="duration">
                <FormLabel>Duration (months)</FormLabel>
                <FormControl
                  autoFocus
                  type="number"
                  value={duration}
                  onChange={e => this.setState({ duration: e.target.value })}
                  placeholder="12"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="tenantId">
                <FormLabel>Tenant ID</FormLabel>
                <FormControl
                  autoFocus
                  type="number"
                  value={tenantId}
                  onChange={e => this.setState({ tenantId: e.target.value })}
                  placeholder="0"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="realEstateId">
                <FormLabel style={{marginRight: "30px"}}>Real estate</FormLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={realEstateId}
                        onChange={e => this.setState({ realEstateId: e.target.value })}
                        >
                            {this.props.myRealEstates.map(realEstate =>(
                                <MenuItem key={realEstate.id} value={realEstate.id}>{`${realEstate.street}, ${realEstate.houseNr}`}</MenuItem>
                            ))}
                    </Select>
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
        myRealEstates: state.realEstatesReducer.myRealEstates,
        contract: state.contractsReducer.contract,
        failure: state.failuresReducer.failure
    }
}

const mapDispatchToProps = dispatch => {
  return {
    createContract: (contract) => dispatch(createContract(contract)),
    updateContract: (contract) => dispatch(updateContract(contract)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractEdit));