import React, { useReducer } from "react";
//import "react-bootstrap/dist/react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

// import context and dispatch
import BudgetContext from "./Context";

// my components

import CardHeader from "./components/Cart-header";
import RenderCart from "./components/RenderCart";

function budgetReducer(state, action) {
  switch (action.type) {
    case "addBudget":
      const verifyIfBudgetAlreadyExist = state.find(
        (budget) => budget.name === action.value.name
      );
      if (verifyIfBudgetAlreadyExist) return state;

      const newState = state.concat([action.value]);
      return newState;

    case "addExpense":
      const newStateBudget = state.map((budget) => {
        if (
          budget.name === action.value.selectValue &&
          budget.description !== action.value.description
        ) {
          budget.expenses.push(action.value);
          budget.currentSpending =
            parseInt(budget.currentSpending) + parseInt(action.value.amount);
        }

        return budget;
      });

      return newStateBudget;

    case "deleteExpenseRecord":
      const filteredList = state.map((budget) => {
        if (budget.name === action.value.name) {
          const newExpensesList = budget.expenses.filter(
            (expense) => expense.id !== action.value.id
          );
          budget.expenses = newExpensesList;
          budget.currentSpending = budget.currentSpending - action.value.amount;
        }
        return budget;
      });

      return filteredList;

    case "deleteBudgetAllRecord":
      const updatedList = state.map((budget) => {
        if (budget.name === action.value.name) {
          budget.expenses = [];
          budget.currentSpending = 0;
        }

        return budget;
      });
      return updatedList;
    default:
      throw new Error("invalid");
  }
}

function App() {
  const initialState = [];

  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <>
      <BudgetContext.Provider value={[state, dispatch]}>
        <Container style={{ marginBottom: "1rem", marginTop: "0.5rem" }}>
          <CardHeader />
        </Container>

        <Container>
          <Row>
            {" "}
            <Col md={5} lg={6}>
              <RenderCart />
            </Col>
          </Row>
        </Container>
      </BudgetContext.Provider>
    </>
  );
}

export default App;
