import React from 'react';
import PropTypes from 'prop-types';
import {Container, ListGroup} from "react-bootstrap";
import MusicControls from "./MusicControls";

const MusicPlayer = props => {

    const {songs, currentSong, index, audio, playSong, pauseSong, nextSong, previousSong} = props;
    return (
        <>
            <Container>
            <h1>Click on song to play</h1>
            <hr/>
            <ListGroup as="ol" numbered>
            {
                songs.map((song, index) => {
                    return (
                        <ListGroup.Item onClick={() => {
                            playSong(index);
                        }} as="li">{song.title} ({song.duration})</ListGroup.Item>
                    );
                })
            }
            </ListGroup>

            <MusicControls playSong={playSong} pauseSong={pauseSong} nextSong={nextSong} previousSong={previousSong} index={index} />
            </Container>
        </>
    );
};

MusicPlayer.propTypes = {
    songs: PropTypes.array.isRequired,
    currentSong: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    audio: PropTypes.object,
    playSong: PropTypes.func.isRequired,
    pauseSong: PropTypes.func.isRequired,
    nextSong: PropTypes.func.isRequired,
    previousSong: PropTypes.func.isRequired
};

export default MusicPlayer;