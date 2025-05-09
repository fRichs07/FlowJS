// InsertTagPopup.js
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React from "react";
import {Form} from "react-bootstrap";



function InsertTagPopup({ show, onHide }) {

    const [tag_name, setTagName] = React.useState("");

    const saveTag = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/tags/', // TODO: cambia il routing per il salvataggio
            data: {
                name: tag_name,
            }
        })
            .catch(err => {
                console.log(err) // TODO: Nessun handling di errore se non va a buon fine la richiesta per ora
            })
    }

    const handleInputChange = (e) => {
        setTagName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveTag();
        setTagName("");
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Inserisci una nuovo tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNewTag">
                        <Form.Control
                            type="text"
                            placeholder="Inserisci un tag"
                            value={tag_name}
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

export default InsertTagPopup;
