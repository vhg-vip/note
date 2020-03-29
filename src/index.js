import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Container, Row, Col, Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { Event } from './Component/Event/event.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faThermometerThreeQuarters } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            events: [
                {
                    id: 1,
                    time: "7:00",
                    title: "Breakfast",
                    location: "Home",
                    description: ""
                },
                {
                    id: 2,
                    time: "8:30",
                    title: "Go to school",
                    location: "PTIT"
                },
                {
                    id: 3,
                    time: "11:00",
                    title: "Have lunch",
                    location: "Home"
                },
                {
                    id: 4,
                    time: "13:00",
                    title: "Sleeping",
                    location: "",
                    description: ""
                }
            ]
        }
    }
    getInitialState = () => {
        return { showModal: false };
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        this.setState({ showModal: true })
    }

    handleChange = inputName => e => {
        const nextValue = e.target.value;
        this.setState({
            [inputName]: nextValue
        });
        console.log(this.state)
    }

    handleDelete = eventId => {
        const events = this.state.events.filter(e => e.id !== eventId);
        this.setState({ events });
    }

    addEvent = newdata => {
        var newArray = [...this.state.events];
        newArray.push({
            id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
            time: this.state.time,
            title: this.state.title,
            location: this.state.location,
            description: this.state.description
        })
        this.setState({
            events: newArray
        });
        this.setState({
            time: "",
            title: "",
            location: "",
            description: " "
        });
        console.log(newdata);
        console.log(newArray);
    }

    render() {

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md="9">
                            <h2 className="text-uppercase my-3 font-weight-light">Today:</h2>
                            <div id="schedule-items">
                                {this.state.events.map(event => (
                                    <Event
                                        key={event.id}
                                        id={event.id}
                                        time={event.time}
                                        title={event.title}
                                        location={event.location}
                                        description={event.description}
                                        onDelete={this.handleDelete}
                                        newlist={this.addEvent}
                                    />
                                ))}
                            </div>
                            <Row className="mb-4">
                                <Col xl="3" md="6" className="mx-auto text-center">
                                    <Button variant="info" onClick={this.open} >Add Event</Button>
                                    
                                </Col>
                            </Row>
                        </Col>

                        <Col md="3">
                            <h3 className="text-uppercase my-3">Schedule</h3>
                            <h6 className="my-3">
                                It's going to be busy that today. You have{" "}
                                <b>{this.state.events.length} events </b> today.
                            </h6>
                            <h1 className="my-3">
                                <Row>
                                    <Col xs="3" className="text-center">
                                        <FontAwesomeIcon icon={faSun} />
                                    </Col>
                                    <Col xs="9">Sunny</Col>
                                </Row>

                                <Row>
                                    <Col xs="3" className="text-center">
                                        <FontAwesomeIcon icon={faThermometerThreeQuarters} />
                                    </Col>
                                    <Col xs="9">23°C</Col>
                                </Row>
                            </h1>
                            <p>
                                Don't forget your sunglasses. Today will dry and sunny, becoming
                                warm in the afternoon with temperatures of between 20 and 25
                                degrees.
                            </p>
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.showModal} onHide={this.close} >

                    <Modal.Header closeButton>
                        <Modal.Title className="justify-content-center">Add new event</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="mx-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Button className="input-btn" variant="outline-secondary">Time</Button>
                                </InputGroup.Prepend>
                                <FormControl name="time" onChange={this.handleChange("time")}/>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Button className="input-btn" variant="outline-secondary">Title</Button>
                                </InputGroup.Prepend>
                                <FormControl name="title" onChange={this.handleChange("title")}/>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Button className="input-btn" variant="outline-secondary">Location</Button>
                                </InputGroup.Prepend>
                                <FormControl name="location" onChange={this.handleChange("location")}/>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Button className="input-btn" variant="outline-secondary">Description</Button>
                                </InputGroup.Prepend>
                                <FormControl name="description" onChange={this.handleChange("description")}/>
                            </InputGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer className="justify-content-center">
                        <Button className="add-btn" variant="info" onClick={() => { 
                            this.close(); 
                            this.addEvent() 
                        }} >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>


            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
