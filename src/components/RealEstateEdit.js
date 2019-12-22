import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createRealEstate, updateRealEstate, setRealEstate } from "../actions/RealEstateActions";

import { Button, FormGroup, FormControl, FormLabel, Container, Row, Col as Column, Form, Image } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Colors } from "../Colors";

class RealEstateEdit extends Component {
  state = {
        country: "",
        city: "",
        street: "",
        houseNr: "",
        area: 0,
        rooms: 1,
        floor: 1,
        buildYear: 2000,
        imageUrl: "",
        ownerId: this.props.user.id
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
      if(this.props.realEstate.id){
          this.setState(this.props.realEstate);
      }
  }

  validateForm = () => {
    const {country, city, street, houseNr, area, rooms, floor, buildYear, imageUrl} = this.state;

    return country.length > 0
      && city.length > 0
      && street.length > 0
      && houseNr.length > 0
      && area > 0
      && rooms > 0
      && imageUrl.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.id){
        this.props.updateRealEstate(this.state);
    }else{
        this.props.createRealEstate(this.state);
    }
    this.props.onSubmit();
  }

  render() { 
    const {country, city, street, houseNr, area, rooms, floor, buildYear, imageUrl} = this.state;

    return (
          <Paper elevation={10} style={{ backgroundColor: Colors.first}}>
            <Form className="p-5">
              <FormGroup controlId="country">
                <FormLabel>Country</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={country}
                  onChange={e => this.setState({ country: e.target.value })}
                  placeholder="Lithuania"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="city">
                <FormLabel>City</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={city}
                  onChange={e => this.setState({ city: e.target.value })}
                  placeholder="Kaunas"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="street">
                <FormLabel>Street</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={street}
                  onChange={e => this.setState({ street: e.target.value })}
                  placeholder="Veiverių g."
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="houseNr">
                <FormLabel>House Nr.</FormLabel>
                <FormControl
                  value={houseNr}
                  onChange={e => this.setState({ houseNr: e.target.value })}
                  type="text"
                  placeholder="53A"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="area">
                <FormLabel>Area</FormLabel>
                <FormControl
                  value={area}
                  onChange={e => this.setState({ area: e.target.value })}
                  type="number"
                  placeholder="50"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="rooms">
                <FormLabel>Rooms</FormLabel>
                <FormControl
                  value={rooms}
                  onChange={e => this.setState({ rooms: e.target.value })}
                  type="number"
                  placeholder="2"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="floor">
                <FormLabel>Floor</FormLabel>
                <FormControl
                  value={floor}
                  onChange={e => this.setState({ floor: e.target.value })}
                  type="number"
                  placeholder="1"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="area">
                <FormLabel>Image URL</FormLabel>
                <FormControl
                  value={imageUrl}
                  onChange={e => this.setState({ imageUrl: e.target.value })}
                  type="text"
                  placeholder="www.imgur.com/img5233"
                  style={{ backgroundColor: Colors.second }}
                />
              </FormGroup>
              <FormGroup controlId="buildYear">
                <FormLabel>Build year</FormLabel>
                <FormControl
                  value={buildYear}
                  onChange={e => this.setState({ buildYear: e.target.value })}
                  type="number"
                  placeholder="19999"
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
        realEstate: state.realEstatesReducer.realEstate
    }
}

const mapDispatchToProps = dispatch => {
  return {
    createRealEstate: (realEstate) => dispatch(createRealEstate(realEstate)),
    updateRealEstate: (realEstate) => dispatch(updateRealEstate(realEstate)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RealEstateEdit));