import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Table} from "react-bootstrap";
import instance from "../request/instance";
import { Chart } from "react-google-charts";


const Admin = props => {
    const [message, setMessage] = React.useState('');
    const [playlistItems, setPlaylistItems] = React.useState([]);
    const [url, setUrl] = useState('/paginate');
    const [buttons, setButtons] = useState([]);
    const [refresh, setRefresh] = useState(false);

    React.useEffect(() => {
        instance.get(url)
            .then((response) => {
                setPlaylistItems(response.data.data.data);

                if (buttons.length === 0) {
                    setButtons(response.data.data.links)
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }, [url, refresh]);

    const [chartData, setChartData] = React.useState([]);

    const chartOptions = {
        chart: {
            title: "Number of songs per playlist",
            subtitle: "Bar chart",
        },
    }

    React.useEffect(() => {
        instance.get('/number')
            .then(response => {
                console.log(response.data);

                setChartData([]);
                let data = [["Playlist", "Number of songs"]];

                response.data.data.map(playlist => {
                    data.push([playlist.name, playlist.number_of_items]);
                });

                setChartData(data);

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    return (
        <>
            <h1>Admin panel</h1>
            <p>{message}</p>

            <Container>
                <Row>
                    <Table striped={true} hover={true}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Playlist</th>
                                <th>Song</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playlistItems.map((playlistItem, index) => {
                                    return (
                                        <tr key={playlistItem.id}>
                                            <td>{playlistItem.id}</td>
                                            <td>{playlistItem.playlist_name}</td>
                                            <td>{playlistItem.song_title}</td>
                                            <td><button className="btn btn-danger" onClick={() => {
                                                instance.delete('/playlist-items/' + playlistItem.id)
                                                    .then((response) => {
                                                        console.log(response);
                                                        setMessage('Playlist item deleted');
                                                        setRefresh(!refresh);
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                        setMessage('Error deleting playlist item');
                                                    });
                                            }}>Delete</button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    <hr/>
                    {
                        buttons && (
                            <nav>
                                <ul className="pagination">
                                    {
                                        buttons.map((button, index) => {

                                            if (button.label === "&laquo; Previous") {
                                                button.label = "Previous";
                                            }

                                            if (button.label === "Next &raquo;") {
                                                button.label = "Next";
                                            }

                                            return (
                                                <li key={index} className="page-item">
                                                    <a className="page-link" onClick={() => {
                                                        if (button.url !== null) {
                                                            setUrl(button.url);
                                                        }
                                                    }}><span>{button.label}</span></a>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </nav>
                        )
                    }
                </Row>

                <h1>Graphics</h1>
                <Row>
                    {
                        chartData && (
                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="400px"
                                data={chartData}
                                options={chartOptions}
                            />
                        )
                    }
                </Row>
            </Container>
        </>
    );
};

Admin.propTypes = {
    
};

export default Admin;