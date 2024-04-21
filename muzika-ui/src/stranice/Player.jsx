import React, {useState} from 'react';
import MusicPlayer from "../komponente/MusicPlayer";
import buciBu from "../pesme/buciBu.mp3";
import imaJednoPile from "../pesme/imaJednoPile.mp3";
import kadSiSrecan from "../pesme/kadSiSrecan.mp3";
import majmunskiPles from "../pesme/majmunskiPles.mp3";
import maliParadajz from "../pesme/maliParadajz.mp3";
import najlepsaMamaNaSvetu from "../pesme/najlepsaMamaNaSvetu.mp3";
import {Col, Row} from "react-bootstrap";

const Player = () => {

    //id, title, artist, url, duration
    const songs = [
        {
            id: 1,
            title: "Buci Bu",
            artist: "Decije pesme 1",
            url: buciBu,
            duration: 200
        },
        {
            id: 2,
            title: "Ima jedno pile",
            artist: "Decije pesme 2",
            url: imaJednoPile,
            duration: 240
        },
        {
            id: 3,
            title: "Kad si srecan",
            artist: "Decije pesme 3",
            url: kadSiSrecan,
            duration: 180
        },
        {
            id: 4,
            title: "Majmunski ples",
            artist: "Decije pesme 4",
            url: majmunskiPles,
            duration: 220
        },
        {
            id: 5,
            title: "Mali paradajz",
            artist: "Decije pesme 5",
            url: maliParadajz,
            duration: 210
        }
        ,
        {
            id: 6,
            title: "Najlepsa mama na svetu",
            artist: "Decije pesme 6",
            url: najlepsaMamaNaSvetu,
            duration: 210
        }
    ];

    const [currentSong, setCurrentSong] = useState(null);
    const [index, setIndex] = useState(0);
    const [audio, setAudio] = useState(null);

    const playSong = (index) => {
        if(audio){
            audio.pause();
        }
        setIndex(index);
        setCurrentSong(songs[index]);
        let audioNew = new Audio(songs[index].url);
        setAudio(audioNew);
        audioNew.play();
    }

    const pauseSong = () => {
        if (audio){
            audio.pause();
        }
    }

    const nextSong = () => {
        if (index + 1 < songs.length){
            playSong(index + 1);
        }else {
            playSong(0);
        }
    }

    const previousSong = () => {
        if (index - 1 >= 0){
            playSong(index - 1);
        }else {
            playSong(songs.length - 1);
        }
    }


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

export default Player;