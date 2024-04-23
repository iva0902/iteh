import React, {useState} from 'react';
import useForm from "../hooks/useForm";
import instance from "../request/instance";
import {Button, Container, Form} from "react-bootstrap";

const Register = () => {
    const [message, setMessage] = useState('');

    const {formData, handleChange} = useForm({
        email: '',
        password: '',
        name: '',
    });

    const handleRegister = () => {
        instance.post('/register', formData)
            .then((response) => {
                console.log(response);
                setMessage('User registered successfully. Please login');
            })
            .catch((error) => {
                console.log(error);
                setMessage('Invalid credentials');
            });

    }

    return (
        <div>
            <Container>
                <h1>Welcome to register page</h1>
                <p>{message}</p>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="name"  placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" name="email"  placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleRegister}>
                        Register
                    </Button>
                </Form>

            </Container>
        </div>
    );
};

export default Register;