import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import store from "./store/index";

import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Contract from "./containers/Contract/Contract";

import Test from "./containers/Test";
import Page from "./components/Page";
import Home from "./containers/Home";
import MyHub from "./containers/MyHub/MyHub";
import AdDetails from "./components/AdDetails";

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
];

const contracts = [
  {
    id: 1,
    price: 300,
    start: "2020-01-01",
    duration: 12,
    tenant: {
      id: 2,
      firstName: "Julius",
      lastName: "Julaitis"
    },
    realEstate: {
      id: 1,
      street: "Veiverių g.",
      houseNr: "15A",
      area: 45.5,
      rooms: 2,
      floor: 6,
      buildYear: 1999,
      imageUrl: "http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg"
    }
  },
  {
    id: 2,
    price: 300,
    start: "2020-01-01",
    duration: 12,
    tenant: {
      id: 2,
      firstName: "Julius",
      lastName: "Julaitis"
    },
    realEstate: {
      id: 5,
      address: "Vilnius, Juozo gatvė 3"
    }
  },
  {
    id: 3,
    price: 300,
    start: "2020-01-01",
    duration: 12,
    tenant: {
      id: 2,
      firstName: "Julius",
      lastName: "Julaitis"
    },
    realEstate: {
      id: 5,
      address: "Vilnius, Juozo gatvė 3"
    }
  },
  {
    id: 4,
    price: 300,
    start: "2020-01-01",
    duration: 12,
    tenant: {
      id: 2,
      firstName: "Julius",
      lastName: "Julaitis"
    },
    realEstate: {
      id: 5,
      address: "Vilnius, Juozo gatvė 3"
    }
  },
  {
    id: 5,
    price: 300,
    start: "2020-01-01",
    duration: 12,
    tenant: {
      id: 2,
      firstName: "Julius",
      lastName: "Julaitis"
    },
    realEstate: {
      id: 5,
      address: "Vilnius, Juozo gatvė 3"
    }
  },
  {
    id: 6,
    price: 300,
    start: "2020-01-01",
    duration: 12,
    tenant: {
      id: 2,
      firstName: "Julius",
      lastName: "Julaitis"
    },
    realEstate: {
      id: 5,
      address: "Vilnius, Juozo gatvė 3"
    }
  }
];

const realEstates = [
  {
    id: 1,
    street: "Veiverių g.",
    houseNr: "15A",
    area: 45.5,
    rooms: 2,
    floor: 6,
    buildYear: 1999
  },
  {
    id: 2,
    street: "Veiverių g.",
    houseNr: "15A",
    area: 45.5,
    rooms: 2,
    floor: 6,
    buildYear: 1999
  },
  {
    id: 3,
    street: "Veiverių g.",
    houseNr: "15A",
    area: 45.5,
    rooms: 2,
    floor: 6,
    buildYear: 1999
  },
  {
    id: 4,
    street: "Veiverių g.",
    houseNr: "15A",
    area: 45.5,
    rooms: 2,
    floor: 6,
    buildYear: 1999
  },
  {
    id: 5,
    street: "Veiverių g.",
    houseNr: "15A",
    area: 45.5,
    rooms: 2,
    floor: 6,
    buildYear: 1999
  },
  {
    id: 6,
    street: "Veiverių g.",
    houseNr: "15A",
    area: 45.5,
    rooms: 2,
    floor: 6,
    buildYear: 1999
  }
]

export default function App() {
  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <div>
          <Switch>
            <Route exact path={"/login"}><Login></Login></Route>
            <Route exact path={"/register"}><Register></Register></Route>
            <Page>
            <Route exact path={"/"}><Home></Home></Route>
            <Route exact path={"/test"}><Test></Test></Route>
            <Route exact path={"/contract"}> <Contract/> </Route>
            <Route exact path={"/myhub"}><MyHub></MyHub></Route>
            <Route exact path={"/ad"}><AdDetails></AdDetails></Route>
            </Page>
          </Switch>
      </div>
    </Router>

  );
}