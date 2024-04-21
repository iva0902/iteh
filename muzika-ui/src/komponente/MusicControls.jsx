import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Row} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";


const MusicControls = props => {
    const {playSong, pauseSong, nextSong, previousSong, index} = props;
    return (
        <>
            <Row className="mt-3">
                <Col md={1}>
                    <Button className="btn btn-dark " onClick={() => {
                        previousSong();
                    }}><FaArrowLeft /></Button>
                </Col>
                <Col md={1}>
                <Button className="btn btn-success" onClick={() => {
                        playSong(index);
                }}><FaPlay /></Button>
                </Col>
                <Col md={1}>
                <Button className="btn btn-danger" onClick={() => {
                        pauseSong();
                }}><FaPause /></Button>
                </Col>
                <Col md={1}>
                <Button className="btn btn-dark " onClick={() => {
                        nextSong();
                }}><FaArrowRight /></Button>
                </Col>
            </Row>
        </>
    );
};

MusicControls.propTypes = {
    playSong: PropTypes.func.isRequired,
    pauseSong: PropTypes.func.isRequired,
    nextSong: PropTypes.func.isRequired,
    previousSong: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default MusicControls;