import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

export function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate(); // Hook de React Router para redireccionar

    const loginHandler = (ev: React.FormEvent) => {
        ev.preventDefault();
        
        // Validación de credenciales
        if (username === "admin" && password === "12345") {
            // Si las credenciales son correctas, redirige a la página principal
            navigate("/home");  // Redirige a /home
        } else {
            // Si las credenciales son incorrectas, muestra un mensaje o realiza alguna acción
            alert("Credenciales incorrectas");
        }
    };

    return (
        <Container className="shadow bg-danger mt-3">
            <Row>
                <Col>
                    <Card className="mt-3 mb-3">
                        <CardBody>
                            <Form onSubmit={loginHandler}>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label for="exampleEmail" className="mr-sm-2">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="something@pokemon.cool"
                                        onChange={(ev) => setUsername(ev.currentTarget.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label for="examplePassword" className="mr-sm-2">
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="Gotta Catch ’Em All!"
                                        onChange={(ev) => setPassword(ev.currentTarget.value)}
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
