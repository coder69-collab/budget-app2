import React, { useState } from "react";

import { Stack, Button, Col, Row } from "react-bootstrap";

// my components
import BudgetModalComponent from "./Modal";
import ExpenseModalComponent from "./ExpenseModal";

const CartHeader = () => {
  const [showBudget, setShowBudget] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  const handleShowExpense = () => setShowExpense(true);
  const handleShow = () => setShowBudget(true);

  return (
    <>
      <Row className="justify-content-center">
        <Stack direction="horizontal" gap={2}>
          <Col xl={6} lg={8} sm={3} md={4}>
            <h1 className="header" style={{ paddingRight: "0.5rem" }}>
              Budget
            </h1>
          </Col>

          <Col lg={2} sm={3} md={3} xl={2}>
            <Button onClick={handleShow}>Add Budget</Button>
          </Col>

          <Col lg={2} sm={3} md={3} xl={2}>
            <Button variant="outline-primary" onClick={handleShowExpense}>
              Add Expense
            </Button>
          </Col>
        </Stack>
      </Row>
      <BudgetModalComponent show={showBudget} setShow={setShowBudget} />
      <ExpenseModalComponent show={showExpense} setShow={setShowExpense} />
    </>
  );
};

export default CartHeader;
