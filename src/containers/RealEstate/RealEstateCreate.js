import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

export default function RealEstateCreate(props) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNr, setHouseNr] = useState("");
  const [area, setArea] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [floor, setFloor] = useState(1);
  const [buildYear, setBuildYear] = useState(1999);
  const [imageUrl, setImageUrl] = useState("");

  function validateForm() {
    return country.length > 0
      && city.length > 0
      && street.length > 0
      && houseNr.length > 0
      && area > 0
      && rooms > 0
      && buildYear > 0 && buildYear < (Date.now()/1000/60/60/24/365+1970)
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("https://localhost:44318/api/users", {
    }).then(res => {
      console.log(res.data);
    })
  }

  return (
          <Paper elevation={5} style={{ backgroundColor: props.primaryColor }}>
            <Form className="p-5">
              <FormGroup controlId="country">
                <FormLabel>Country</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={country}
                  onChange={e => { setCountry(e.target.value);}}
                  placeholder="Lithuania"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="city">
                <FormLabel>City</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={city}
                  onChange={e => { setCity(e.target.value);}}
                  placeholder="Kaunas"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="street">
                <FormLabel>Street</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={street}
                  onChange={e => { setStreet(e.target.value);}}
                  placeholder="Laisvės al."
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="houseNr">
                <FormLabel>House Nr.</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={houseNr}
                  onChange={e => { setHouseNr(e.target.value);}}
                  placeholder="1"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="area">
                <FormLabel>Area</FormLabel>
                <FormControl
                  autoFocus
                  type="number"
                  value={area}
                  onChange={e => { setArea(e.target.value);}}
                  placeholder="80"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="rooms">
                <FormLabel>Rooms</FormLabel>
                <FormControl
                  value={rooms}
                  onChange={e => { setRooms(e.target.value);}}
                  type="number"
                  placeholder="1"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="floor">
                <FormLabel>Floor</FormLabel>
                <FormControl
                  value={floor}
                  onChange={e => { setFloor(e.target.value);}}
                  type="number"
                  placeholder="1"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="buildYear">
                <FormLabel>Build year</FormLabel>
                <FormControl
                  value={buildYear}
                  onChange={e => { setBuildYear(e.target.value);}}
                  type="number"
                  placeholder="1999"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <FormGroup controlId="imageUrl">
                <FormLabel>Image Url</FormLabel>
                <FormControl
                  value={imageUrl}
                  onChange={e => { setImageUrl(e.target.value);}}
                  type="text"
                  placeholder="www.pictures.com/houses/1"
                  style={{ backgroundColor: props.secondaryColor }}
                />
              </FormGroup>
              <Button disabled={!validateForm()} type="submit" onClick={handleSubmit} style={{marginRight: "16px"}}>
                Submit
              </Button>
              <Button variant="outline-danger" onClick={() => console.log("cancel clicked")}>
                Cancel
              </Button>
            </Form>
          </Paper>
  );
}