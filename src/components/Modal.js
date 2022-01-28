import Modal from "react-bootstrap/Modal";
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import context from "../Context";

export default function ModalComponent({ show, setShow }) {
  const [name, setName] = useState("");
  const [maximumSpending, setMaximumSpending] = useState(0);

  const [state, dispatch] = useContext(context);

  const addBudget = () => {
    dispatch({
      type: "addBudget",

      value: {
        id: !state.length ? 1 : state[state.length - 1].id + 1,
        name,
        maximumSpending:
          maximumSpending < 0 ? Math.abs(maximumSpending) : maximumSpending,
        currentSpending: 0,
        expenses: [],
      },
    });

    // clear inputs
    setName("");
    setMaximumSpending("");
  };

  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="Name">Name</Form.Label>
          <Form.Control
            type="Text"
            id="Name"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <Form.Label htmlFor="Name" style={{ paddingTop: "1rem" }}>
            maximumSpending
          </Form.Label>
          <Form.Control
            type="Number"
            id="maximumSpending"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setMaximumSpending(e.target.value)}
            value={maximumSpending}
            min={1}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={addBudget}
            disabled={
              name.length &&
              maximumSpending.length &&
              parseInt(maximumSpending) > 0
                ? false
                : true
            }
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
