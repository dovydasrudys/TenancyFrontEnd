import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';

import { Container, Row, Col, Button} from "react-bootstrap";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class FailuresTable extends Component {
    state = {
        rowsPerPage: 5,
        page: 1
    }

    handleFirstPageButtonClick = () => {
        this.setState({
            page: 1
        })
    };

    handleBackButtonClick = () => {
        this.setState({
            page: this.state.page - 1
        })
    };

    handleNextButtonClick = () => {
        this.setState({
            page: this.state.page + 1
        })
    };

    handleLastPageButtonClick = () => {
        this.setState({
            page: Math.ceil(this.props.failures.length / this.state.rowsPerPage)
        })
    };

    handleClose = () => this.setState({ showModal: false });
    handleShow = () => this.setState({ showModal: true });

    render() {
        const { rowsPerPage, page } = this.state;
        return (
            <>
                <Paper elevation={5} style={{ backgroundColor: this.props.primaryColor }}>
                    <Container>
                        <Row noGutters className="justify-content-center">
                            <Col>
                                <Typography style={{ marginTop: "8px" }} align="center" variant="h4">{this.props.title}</Typography>
                            </Col>
                            {this.props.withAddButton ?
                            <Col xs={1}>
                                <IconButton
                                    onClick={this.props.onAdd}
                                    aria-label="add failure"

                                >
                                    <AddIcon />
                                </IconButton>
                            </Col>
                            : null}
                        </Row>
                        <Row noGutters>
                            <Col>
                                {(this.state.rowsPerPage > 0
                                    ? this.props.failures.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                    : this.props.failures
                                ).map(failure => (
                                    <ExpansionPanel key={failure.id} style={{ backgroundColor: (failure.isFixed ? this.props.secondaryColor : this.props.accentColor) }}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id={failure.id}
                                        >
                                            <Typography style={{width: "100%"}} align="center">{failure.issueDate.slice(0,10)}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Container>
                                                <Row>
                                                <Typography style={{wordWrap: "break-word"}}>{failure.description}</Typography>
                                                </Row>
                                                <Row style={{textAlign: "right"}}>
                                                    {this.props.editable ?
                                                        <>
                                                            <Col>
                                                                <Button className="mx-1" variant="warning" onClick={() => this.props.onEdit(failure)}>Edit</Button>
                                                            
                                                                <Button className="mx-1" variant="danger" onClick={() => this.props.onDelete(failure)}>Delete</Button>
                                                            </Col>
                                                        </>
                                                        :
                                                        null}
                                                </Row>
                                            </Container>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>))}
                            </Col>
                        </Row>
                        <Row className="justify-content-center align-items-center">
                            {this.paginator()}
                        </Row>
                    </Container>
                </Paper>
            </>
        );
    }

    paginator() {
        return (
            <>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={this.state.page === 1}
                    aria-label="first page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={this.state.page === 1}
                    aria-label="previous page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant="h6">{this.state.page}</Typography>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={this.state.page >= Math.ceil(this.props.failures.length / this.state.rowsPerPage)}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={this.state.page >= Math.ceil(this.props.failures.length / this.state.rowsPerPage)}
                    aria-label="last page"
                >
                    <LastPageIcon />
                </IconButton>
            </>
        );
    }
}

export default FailuresTable;