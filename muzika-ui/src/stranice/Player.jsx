import React, {useState} from 'react';
import MusicPlayer from "../komponente/MusicPlayer";
import PropTypes from 'prop-types';

import {Col, Row} from "react-bootstrap";

const Player = props => {

    const {songs, currentSong, index, audio, playSong, pauseSong, nextSong, previousSong} = props;

    return (
        <div>
            <h1>Welcome to our music player</h1>
            <p>Enjoy the music!</p>

            <Row>
                <Col md={6}>
                    <MusicPlayer songs={songs} currentSong={currentSong} index={index} playSong={playSong} pauseSong={pauseSong} nextSong={nextSong} previousSong={previousSong} />
                </Col>
                <Col md={6}>
                    { currentSong !== null && (
                        <>
                            <h2>Currently playing</h2>
                            <h3>{currentSong.title}</h3>
                            <p>{currentSong.artist}</p>
                            <p>{currentSong.duration}</p>
                        </>
                    )}
                </Col>
            </Row>

        </div>
    );
};

Player.propTypes = {
    songs: PropTypes.array.isRequired,
    currentSong: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    audio: PropTypes.object,
    playSong: PropTypes.func.isRequired,
    pauseSong: PropTypes.func.isRequired,
    nextSong: PropTypes.func.isRequired,
    previousSong: PropTypes.func.isRequired
};

export default Player;