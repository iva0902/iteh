import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import useForm from "../hooks/useForm";
import instance from "../request/instance";

const Login = () => {

    const [message, setMessage] = useState('');

    const {formData, handleChange} = useForm({
        email: '',
        password: ''
    });

    const handleLogin = () => {
        instance.post('/login', formData)
            .then((response) => {
                console.log(response);
                window.sessionStorage.setItem('token', response.data.data.token);
                window.sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
                window.location.href = '/';
            })
            .catch((error) => {
                console.log(error);
                setMessage('Invalid credentials');
            });

    }

    return (
        <div>
            <Container>
                <h1>Welcome to login page</h1>
                <p>{message}</p>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" name="email"  placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleLogin}>
                        Login
                    </Button>
                </Form>

            </Container>
        </div>
    );
};

export default Login;