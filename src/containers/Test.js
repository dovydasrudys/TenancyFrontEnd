import React from "react";
import { Colors } from "../Colors";

import { Container, Row, Col } from "react-bootstrap";

import AdvertsBoard from "../components/AdvertsBoard";
import AdsBoard from "../components/AdsBoard";

const adverts = [
    {
        id: 1,
        location: "Kaunas",
        rooms: 2,
        price: 150,
        floor: 1,
        img: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg",
        description: "dfffffsdfdsfjahsdfjkalsdfjsvhfavdka"
    },
    {
        id: 2,
        location: "Klaipėda",
        rooms: 1,
        price: 200,
        floor: 1,
        img: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg",
        description: "dfffffsdfdsfjahsdfjkalsdfjsvhfavdka"
        
    },
    {
        id: 3,
        location: "Šiauliai",
        rooms: 3,
        price: 180,
        floor: 6,
        img: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg",
        description: "dfffffsdfdsfjahsdfjkalsdfjsvhfavdka"
    },
    {
        id: 4,
        location: "Kaunas",
        rooms: 2,
        price: 150,
        floor: 1,
        img: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg",
        description: "dfffffsdfdsfjahsdfjkalsdfjsvhfavdka"
    },
    {
        id: 5,
        location: "Kaunas",
        rooms: 2,
        price: 150,
        floor: 1,
        img: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg",
        description: "dfffffsdfdsfjahsdfjkalsdfjsvhfavdka"
    },
    {
        id: 6,
        location: "Vilnius",
        rooms: 2,
        price: 150,
        floor: 1,
        img: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg",
        description: "dfffffsdfdsfjahsdfjkalsdfjsvhfavdka"
    }
];

export default function Test(props) {

  return (
    <Container>
      <Row>
        <Col lg={6}>
            <AdsBoard
                adverts= {adverts}
                color={Colors.third}
                onRowClick={(id) => console.log(id)}
            >
            </AdsBoard>
        </Col>
      </Row>
    </Container>
  );
}