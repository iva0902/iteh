import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import musicForKids from "../slike/musicForKids.jpeg";
import instance from "../request/instance";
const Home = () => {

    const [genre, setGenre] = React.useState([]);
    const [quote, setQuote] = React.useState([]);

    React.useEffect(() => {
        //
        instance.get('https://api.quotable.io/quotes/random')
            .then((response) => {
                console.log(response.data);
                setQuote(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    React.useEffect(() => {
        //add header


        instance.get('https://binaryjazz.us/wp-json/genrenator/v1/genre/1')
            .then((response) => {
                console.log(response.data);
                setGenre(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            <Container>
            <h1>Welcome to</h1>
                <h1 className="text-bg-warning text-black fw-bold">Music for Kids</h1>

            <Row className="mt-5">
                <Col md={6}>
                    <Image src={musicForKids} fluid />
                </Col>
                <Col md={6} className="text-start">
                    <p>Welcome to Music for Kids, where the magic of melodies meets the wonder of childhood! At Music
                        for Kids, we believe in the transformative power of music, especially when it comes to the
                        little ones. Our mission is simple: to provide a safe, fun, and enriching musical experience
                        tailored specifically for children.</p>
                    <p>With Music for Kids, parents can rest assured that their children are accessing a curated selection of age-appropriate tunes, carefully selected to spark joy, stimulate creativity, and foster a lifelong love for music. Whether it's sing-along classics, playful melodies, or soothing lullabies, our extensive library has something for every young music enthusiast.</p>
                    <p>But Music for Kids is more than just a music player; it's a vibrant community where children can explore, learn, and grow through the power of music. Our interactive features encourage active participation, allowing kids to dance, sing, and even create their own musical masterpieces.</p>
                    <p>Safety is our top priority at Music for Kids. Our platform is designed with parental controls and safeguards to ensure a worry-free experience for families. We strive to create a wholesome environment where children can explore the world of music in a secure and nurturing space.</p>
                    <p>Join us on this musical journey and let Music for Kids be your child's companion in discovering the magic of melodies. Together, let's create harmonious moments that will last a lifetime.</p>
                </Col>
            </Row>
                <Row>
                    <h1>Currently hot genre</h1>
                    <h2>{genre}</h2>
                </Row>

                <Row>
                    <h1>Quote of the day</h1>
                    <h2>{quote.content}</h2>
                    <h3>{quote.author}</h3>
                </Row>
            </Container>
        </div>
    );
};

export default Home;