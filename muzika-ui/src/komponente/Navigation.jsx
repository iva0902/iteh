import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigation = () => {

    const token = window.sessionStorage.getItem('token');
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const isAdmin = user && user.role === 'admin';

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" >
                <Container>
                    <Navbar.Brand href="#home">Music for Kids</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About us</Nav.Link>
                        <Nav.Link href="/player">Music Player</Nav.Link>

                        {!token && (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        )}

                        {
                            token && (
                                <>
                                    <Nav.Link href="/playlists">My playlists</Nav.Link>
                                    <Nav.Link href="/add">Add playlist</Nav.Link>
                                    {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
                                    <Nav.Link onClick={() => {
                                        window.sessionStorage.removeItem('token');
                                        window.sessionStorage.removeItem('user');
                                        window.location.href = '/';

                                    }}>Logout</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;