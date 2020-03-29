import React from 'react';
import './event.css'
import { Badge } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';


export class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time,
            title: this.props.title,
            location: this.props.location,
            description: this.props.description
        };
    }
    render() {
        return (
            <React.Fragment>
                <div className="media mt-1">
                    <h3 className="time h3 font-weight-bold mr-3">{this.props.time}</h3>
                    <div className="media-body mb-3 mb-lg-3">
                        <Badge variant="danger" className="ml-2 float-right delete-btn" onClick={() => this.props.onDelete(this.props.id)}>-</Badge>
                        <h6 className="title mt-0 font-weight-bold">{this.props.title}</h6>
                        <hr className="my-2"></hr>
                        {this.props.location && (
                            <React.Fragment>
                                <p className="font-smaller mb-0">
                                    <FontAwesomeIcon icon={faLocationArrow}  className="location-icon" />
                                    {this.props.location}
                                </p>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                {this.props.description && (
                    <p className="p-2 mb-4 desc">{this.props.description}</p>
                )}
            </React.Fragment>
        )
    }
}