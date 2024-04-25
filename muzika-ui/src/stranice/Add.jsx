import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Form, Row} from "react-bootstrap";
import useForm from "../hooks/useForm";
import instance from "../request/instance";

const Add = props => {
    const {songs} = props;

    const [message, setMessage] = React.useState('');

    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const [playlists, setPlaylists] = React.useState([]);
    const [forceUpdate, setForceUpdate] = React.useState(false);

    React.useEffect(() => {
        instance.get('/playlists')
            .then((response) => {
                setPlaylists(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [forceUpdate]);

    const {formData, handleChange} = useForm({
        name: '',
        description: '',
        song: '',
        playlist: ''
    });

    const handleInsert = () => {
        let data = {
            name: formData.name,
            description: formData.description,
            user_id: user.id
        }

        instance.post('/playlists', data)
            .then((response) => {
                console.log(response);
                setMessage('Playlist inserted');
                setForceUpdate(!forceUpdate);
            })
            .catch((error) => {
                console.log(error);
                setMessage('Error inserting playlist');
            });
    }

    const insertSongToPlaylist = () => {
        let data = {
            playlist_id: formData.playlist,
            song_id: formData.song
        }

        instance.post('/playlist-items', data)
            .then((response) => {
                console.log(response);
                setMessage('Song added to playlist');
            })
            .catch((error) => {
                console.log(error);
                setMessage('Error adding song to playlist');
            });
    }



    return (
        <>
            <h1>Add your playlist and songs to it</h1>
            <p>{message}</p>
            <Container>
            <Row>
                <Col md={6}>
                    <h2>Add playlist</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Playlist name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="name"
                                          placeholder="Enter playlist name"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Playlist description</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="description"
                                          placeholder="Enter playlist description"/>
                        </Form.Group>
                        <hr/>
                        <button type="button" onClick={handleInsert} className="btn btn-primary">Insert playlist
                        </button>
                    </Form>
                </Col>

                <Col md={6}>
                    <h2>Add song to playlist</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Playlist</Form.Label>
                            <Form.Control as="select" name="playlist" onChange={handleChange}>
                                {
                                    playlists && playlists.map(playlist => {
                                        return (
                                            <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                                        );
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Song</Form.Label>
                            <Form.Control as="select" name="song" onChange={handleChange}>
                                {
                                    songs && songs.map(song => {
                                        return (
                                            <option key={song.id} value={song.id}>{song.title}</option>
                                        );
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <hr/>
                        <button type="button" onClick={insertSongToPlaylist} className="btn btn-primary">Add song to playlist</button>
                    </Form>
                </Col>
            </Row>
            </Container>
        </>
    );
};

Add.propTypes = {
    songs: PropTypes.array.isRequired,
};

export default Add;