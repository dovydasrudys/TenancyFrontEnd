import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createAd, updateAd, deleteAd } from "../actions/AdsActions";

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

class AdEdit extends Component {
  state = {
        description: "",
        loanPrice: 0,
        ownerId: this.props.user.id,
        realEstateId: this.props.myRealEstates[0].id
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
      if(this.props.ad.id){
          this.setState(this.props.ad);
      }
  }

  validateForm = () => {
    const {description, loanPrice} = this.state;

    return description.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.id){
        this.props.updateAd(this.state);
    }else{
        this.props.createAd(this.state);
    }
    this.props.onSubmit();
  }

  render() { 
    const {description, loanPrice, realEstateId} = this.state;

    return (
          <Paper elevation={10} style={{ backgroundColor: Colors.first}}>
            <Form className="p-5">
              <FormGroup controlId="description">
                <FormLabel>Description</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={description}
                  onChange={e => this.setState({ description: e.target.value })}
                  placeholder="Amazing apartment."
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="loanPrice">
                <FormLabel>Price (monthly)</FormLabel>
                <FormControl
                  autoFocus
                  type="number"
                  value={loanPrice}
                  onChange={e => this.setState({ loanPrice: e.target.value })}
                  placeholder="0"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="realEstateId">
                <FormLabel style={{marginRight: "30px"}}>Real estate</FormLabel>
                    <Select
                        labelId="realEstate"
                        id="realEstate"
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
        ad: state.adsReducer.ad,
        myRealEstates: state.realEstatesReducer.myRealEstates
    }
}

const mapDispatchToProps = dispatch => {
  return {
    createAd: (ad) => dispatch(createAd(ad)),
    updateAd: (ad) => dispatch(updateAd(ad)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdEdit));