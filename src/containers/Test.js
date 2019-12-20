import React, { useState } from "react";
import { Colors } from "../Colors";

import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import AdsBoard from "../components/AdsBoard";
import RealEstateCreate from "../containers/RealEstate/RealEstateCreate";
import PaymentsTable from "../components/PaymentsTable";
import FailuresTable from "../components/FailuresTable";

const adverts = [
    {
        id: 1,
        location: "Kaunas",
        rooms: 2,
        price: 150,
        floor: 1,
        img: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg",
        description: "dfffffsdfdsfjahsdfjkalsdfjsvhfavdka sdf sd fsd f hfhgfh f ghfg hserghf dsgfd gdfs gvcb dsfbvs dgfds gdg dsfg sdf gd gd fgdgdf gdf d"
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

const payments = [
    {
        id: 1,
        status: 0,
        issueDate: "2019-12-01",
        services: [
            {
                id: 1,
                description: "Electricity",
                amount: 50
            },
            {
                id: 2,
                description: "Water",
                amount: 50
            },
            {
                id: 3,
                description: "Ethernet",
                amount: 35
            }
        ]
    },
    {
        id: 2,
        status: 1,
        issueDate: "2019-12-01",
        services: [
            {
                id: 1,
                description: "Electricity",
                amount: 50
            },
            {
                id: 2,
                description: "Water",
                amount: 50
            },
            {
                id: 3,
                description: "Ethernet",
                amount: 35
            }
        ]
    },
    {
        id: 3,
        status: 1,
        issueDate: "2019-12-01",
        services: [
            {
                id: 1,
                description: "Electricity",
                amount: 50
            },
            {
                id: 2,
                description: "Water",
                amount: 50
            },
            {
                id: 3,
                description: "Ethernet",
                amount: 35
            }
        ]
    },
    {
        id: 4,
        status: 1,
        issueDate: "2019-12-01",
        services: [
            {
                id: 1,
                description: "Electricity",
                amount: 50
            },
            {
                id: 2,
                description: "Water",
                amount: 50
            },
            {
                id: 3,
                description: "Ethernet",
                amount: 35
            }
        ]
    },
    {
        id: 5,
        status: 1,
        issueDate: "2019-12-01",
        services: [
            {
                id: 1,
                description: "Electricity",
                amount: 50
            },
            {
                id: 2,
                description: "Water",
                amount: 50
            },
            {
                id: 3,
                description: "Ethernet",
                amount: 35
            }
        ]
    },
    {
        id: 6,
        status: 1,
        issueDate: "2019-12-01",
        services: [
            {
                id: 1,
                description: "Electricity",
                amount: 50
            },
            {
                id: 2,
                description: "Water",
                amount: 50
            },
            {
                id: 3,
                description: "Ethernet",
                amount: 35
            }
        ]
    }
];

const failures = [
    {
        id: 1,
        issueDate: "2019-12-01",
        isFixed: 1,
        description: "Fridge broke"
    },
    {
        id: 2,
        issueDate: "2019-12-01",
        isFixed: 1,
        description: "Fridge broke"
    },
    {
        id: 3,
        issueDate: "2019-12-01",
        isFixed: 0,
        description: "Fridge broke"
    },
    {
        id: 4,
        issueDate: "2019-12-01",
        isFixed: 0,
        description: "Fridge broke"
    },
    {
        id: 5,
        issueDate: "2019-12-01",
        isFixed: 1,
        description: "Fridge broke"
    },
    {
        id: 6,
        issueDate: "2019-12-01",
        isFixed: 1,
        description: "Fridge broke fdsfdsfsdfsdsfdscdgdfsgd jfkdfjdjfkdsflaf dskfjlksdjflsdnf,nv;dfioafj dklsjfslj flsjdf sdncvnsldfjk lsjfkl sdfsdnmflskd jfioewj fkldsjflsd"
    },
]

export default function Test(props) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Container>
            <Row>
                <Col lg={6}>
                    <AdsBoard
                        title="Advertisements"
                        adverts={adverts}
                        color={Colors.third}
                        onAdClick={(id) => console.log(id)}
                        primaryColor={Colors.second}
                        secondaryColor={Colors.first}
                    >
                    </AdsBoard>
                </Col>
                <Col lg={6}>
                    <RealEstateCreate
                        primaryColor={Colors.second}
                        secondaryColor={Colors.first}
                    ></RealEstateCreate>
                </Col>
                <Col lg={6} className="my-5">
                    <PaymentsTable
                        title="Payments"
                        payments={payments}
                        primaryColor={Colors.second}
                        secondaryColor={Colors.first}
                        accentColor={Colors.third}
                        withAddButton
                        onAdd={() => console.log("add")}
                        onPay={(id) => setShowModal(true)}
                        editable
                        onEdit={(id) => console.log("edit")}
                        onDelete={(id) => console.log("delete")}
                    ></PaymentsTable>
                </Col>
                <Col lg={6} className="my-5">
                    <FailuresTable
                        title="Failures"
                        failures={failures}
                        primaryColor={Colors.second}
                        secondaryColor={Colors.first}
                        accentColor={Colors.third}
                        withAddButton
                        onAdd={() => console.log("add")}
                        editable
                        onEdit={(id) => console.log("edit")}
                        onDelete={(id) => console.log("delete")}
                    ></FailuresTable>
                </Col>
            </Row>
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>These are you paying options</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                    Paypal
                </Button>
            </Modal.Footer>
        </Modal>
        </>
  );
}