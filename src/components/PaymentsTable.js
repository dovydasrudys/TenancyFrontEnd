import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Modal } from 'react-bootstrap';

import { PayPalButton } from 'react-paypal-button'

class PaymentsTable extends Component {
    state = {
        showModal: false,
        payment: {}
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});
    pay = (p) => {
        this.handleShow();
        this.setState({payment: p});
    }

    useStyles = makeStyles({
        expanded: {
            margin: "0 auto"
          }
      });

       paypalOptions = {
        clientId: '12345',
        intent: 'capture'
      }
     
       buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
      }

    data = [
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
        }
    ]

    render() {
        return (
            <>
            <Paper>
            {this.data.map(payment => (
                <ExpansionPanel key={payment.id}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={payment.id}
                    >
                        <Typography>{payment.issueDate}</Typography>
                        <Typography>{payment.status}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Table aria-label="simple table">
                            <TableBody>
                                {payment.services.map(service => (
                                    <TableRow key={service.id}>
                                        <TableCell component="th" scope="row">
                                            #{service.id}
                                        </TableCell>
                                        <TableCell>{service.description}</TableCell>
                                        <TableCell align="right">{service.amount}€</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2} align="right">Sum:</TableCell>
                                    <TableCell align="right">{payment.services.map(service => service.amount).reduce((a, b) => a + b, 0)}€</TableCell>
                                </TableRow>
                                {payment.status ? null :
                                <TableRow>
                                    <TableCell colSpan={3} align="right">
                                        <Button onClick={() => this.pay(payment)}>Pay here</Button>
                                    </TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>
            </ExpansionPanel>))}
                </Paper>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                                <Modal.Title>{this.state.payment.issueDate}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              </>
        );
    }
}

export default PaymentsTable;