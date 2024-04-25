import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import instance from "../request/instance";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import MusicPlayer from "../komponente/MusicPlayer";
import {CSVLink} from "react-csv";

const MyPlaylists = props => {

    const {songMap, currentSong, index, audio, playSong, pauseSong, nextSong, previousSong, songs, setSongs} = props;
    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const [playlists, setPlaylists] = React.useState([]);
    const [showPlayer, setShowPlayer] = React.useState(false);
    const [currentPlaylist, setCurrentPlaylist] = React.useState(null);
    const [csvData, setCsvData] = React.useState([[ 'Title', 'Artist', 'Duration']]);

    useEffect(() => {
        instance.get('/find-by-user/' + user.id)
            .then(res => {
                console.log(res.data)
                setPlaylists(res.data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (currentPlaylist){
            instance.get('/find-by-playlist/' + currentPlaylist.id)
                .then(res => {
                    let songs = [];
                    let csv = [[ 'Title', 'Artist', 'Duration']];

                    res.data.data.forEach(playlistItem => {
                        songs.push({
                            id: playlistItem.song.id,
                            title: playlistItem.song.title,
                            artist: playlistItem.song.artist,
                            url: songMap.get(playlistItem.song.url),
                            duration: playlistItem.song.duration
                        });
                        csv.push([
                             playlistItem.song.title,
                            playlistItem.song.artist,
                            playlistItem.song.duration
                        ]);
                    });

                    setSongs(songs);
                    setCsvData(csv);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [currentPlaylist]);

    return (
        <>
            <Container>


            <h1>Welcome to your personal playlist manager</h1>
            <p>Enjoy the music!</p>


                <Row>
            {
                !showPlayer && (
                    <>
                        <h2>Your playlists</h2>

                        {
                            playlists && playlists.map(playlist => {
                                return (
                                    <Col key={playlist.id} md={3}>
                                        <Card  style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title>{playlist.name}</Card.Title>
                                                <Card.Text>
                                                    {playlist.description}
                                                </Card.Text>
                                                <Button onClick={() => {
                                                    setCurrentPlaylist(playlist);
                                                    setShowPlayer(true);
                                                }} variant="primary">Play the songs</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </>
                )
            }
            </Row>

                <Row>
                    {
                        showPlayer && (
                            <>
                                <hr/>
                                <CSVLink data={csvData}>Download me</CSVLink>
                                <hr/>
                                <Col md={6}>
                                    <MusicPlayer songs={songs} currentSong={currentSong} index={index} playSong={playSong}
                                                 pauseSong={pauseSong} nextSong={nextSong} previousSong={previousSong}/>
                                </Col>
                                <Col md={6}>
                                    {currentSong !== null && (
                                        <>
                                            <h2>Currently playing</h2>
                                            <h3>{currentSong.title}</h3>
                                            <p>{currentSong.artist}</p>
                                            <p>{currentSong.duration} seconds</p>
                                            <Button onClick={() => {
                                                setShowPlayer(false)
                                            }}>Back to playlists</Button>

                                        </>
                                    )}
                                </Col>
                            </>
                        )
                    }
                </Row>
            </Container>
        </>
    );
};

MyPlaylists.propTypes = {
    songMap: PropTypes.object.isRequired,
    currentSong: PropTypes.object,
    index: PropTypes.number.isRequired,
    audio: PropTypes.object,
    playSong: PropTypes.func.isRequired,
    pauseSong: PropTypes.func.isRequired,
    nextSong: PropTypes.func.isRequired,
    previousSong: PropTypes.func.isRequired,
    songs: PropTypes.array.isRequired,
    setSongs: PropTypes.func.isRequired
};

export default MyPlaylists;