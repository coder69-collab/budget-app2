import Modal from "react-bootstrap/Modal";
import React, { useState, useContext } from "react";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import context from "../Context";
import CustomDropdown from "./CustomDropdown";
import ReasableModal from "./ReasableModal";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export default function ExpenseComponent({ show, setShow }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectValue, setSelectValue] = useState("");

  const [state, dispatch] = useContext(context);

  const handleClose = () => setShow(false);

  function addExpense() {
    dispatch({
      type: "addExpense",
      value: {
        id: getRandomIntInclusive(0, 10000),
        description,
        amount,
        selectValue,
      },
    });

    setDescription("");
    setAmount(0);
    console.log(state);
  }

  return (
    <>
      <ReasableModal title={"New Expense"} show={show} setShow={setShow}>
        <Modal.Body>
          <Form.Label htmlFor="Description">Description</Form.Label>
          <Form.Control
            type="Text"
            id="Description"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <Form.Label htmlFor="Amount" style={{ paddingTop: "1rem" }}>
            Amount
          </Form.Label>
          <Form.Control
            type="Number"
            id="Amount"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            min={1}
          />
          <CustomDropdown setSelectValue={setSelectValue} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={addExpense}
            disabled={
              description.length &&
              amount.length &&
              parseInt(amount) > 0 &&
              selectValue.length
                ? false
                : true
            }
          >
            Add
          </Button>
        </Modal.Footer>
      </ReasableModal>
    </>
  );
}
