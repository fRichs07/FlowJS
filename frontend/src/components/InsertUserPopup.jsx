// InsertTagPopup.js
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React from "react";
import {Form} from "react-bootstrap";



function InsertUserPopup({ show, onHide }) {

    const [username, setUsername] = React.useState("");

    const saveUser = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/', // TODO: cambia il routing per il salvataggio
            data: {
                name: username,
            }
        })
            .catch(err => {
                console.log(err) // TODO: Nessun handling di errore se non va a buon fine la richiesta per ora
            })
    }

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveUser();
        setUsername("");
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Inserisci una nuovo utente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNewUser">
                        <Form.Control
                            type="text"
                            placeholder="Inserisci un nome utente"
                            value={username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleSubmit}>Salva</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InsertUserPopup;
