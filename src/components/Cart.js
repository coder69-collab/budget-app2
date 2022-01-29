import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

import ViewExpenses from "./ViewExpenses";

import ExpenseComponent from "./ExpenseModalCart";
import context from "../Context";

const Cart = ({ name, currentSpending, maximumSpending }) => {
  const [showExpenses, setShowExpenses] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expensePercentage, setExpensePercentage] = useState(0);
  const [expensePercentageColor, setExpensePercentageColor] = useState("");

  const [state, dispatch] = useContext(context);

  const handleShowExpenses = () => setShowExpenses(true);
  const handleShowAddExpenses = () => setShowAddExpense(true);

  useEffect(() => {
    const calculatedPercentageExpense = Math.ceil(
      (parseInt(currentSpending) * 100) / parseInt(maximumSpending)
    );

    if (calculatedPercentageExpense >= 50 && calculatedPercentageExpense < 100)
      setExpensePercentageColor("warning");

    if (calculatedPercentageExpense > 50 && calculatedPercentageExpense >= 100)
      setExpensePercentageColor("danger");

    if (calculatedPercentageExpense < 50) setExpensePercentageColor("");

    setExpensePercentage(calculatedPercentageExpense);
  }, [currentSpending, maximumSpending]);

  return (
    <>
      <Card style={{ width: "24rem", marginBottom: "1rem" }}>
        <Card.Body>
          <Stack direction="horizontal" gap={5}>
            <Card.Title>{name}</Card.Title>
            <Card.Title>
              {" "}
              {currentSpending}$/{maximumSpending}$
            </Card.Title>
          </Stack>

          <div style={{ marginBottom: "1rem" }}>
            <ProgressBar
              now={expensePercentage}
              variant={expensePercentageColor}
            />
          </div>

          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-primary"
              onClick={handleShowAddExpenses}
              size="sm"
            >
              Add Expense
            </Button>
            <Button
              variant="outline-primary"
              onClick={handleShowExpenses}
              size="sm"
            >
              View Expenses
            </Button>
            <Button
              variant="outline-danger"
              onClick={() =>
                dispatch({ type: "deleteBudget", value: { name } })
              }
              size="sm"
            >
              Delete Budget
            </Button>
            <ViewExpenses
              show={showExpenses}
              setShow={setShowExpenses}
              name={name}
            />
            <ExpenseComponent
              show={showAddExpense}
              setShow={setShowAddExpense}
              name={name}
            />
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cart;
