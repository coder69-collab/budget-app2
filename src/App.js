import React, { useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

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

      localStorage.setItem("state", JSON.stringify(newState));

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

      localStorage.setItem("state", JSON.stringify(newStateBudget));

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

      localStorage.setItem("state", JSON.stringify(filteredList));

      return filteredList;

    case "deleteBudgetAllRecord":
      const updatedList = state.map((budget) => {
        if (budget.name === action.value.name) {
          budget.expenses = [];
          budget.currentSpending = 0;
        }

        return budget;
      });

      localStorage.setItem("state", JSON.stringify(updatedList));

      return updatedList;

    case "initialState":
      const persistedData = [...JSON.parse(localStorage.getItem("state"))];
      return persistedData;

    case "deleteBudget":
      const filteredNewState = state.filter(
        (budget) => budget.name !== action.value.name
      );

      localStorage.setItem("state", JSON.stringify(filteredNewState));

      return filteredNewState;

    default:
      throw new Error("invalid");
  }
}

function App() {
  const initialState = [];

  const [state, dispatch] = useReducer(budgetReducer, initialState);

  useEffect(() => {
    dispatch({ type: "initialState" });
  }, []);

  return (
    <>
      <BudgetContext.Provider value={[state, dispatch]}>
        <Container style={{ marginBottom: "1rem", marginTop: "0.5rem" }}>
          <CardHeader />
        </Container>

        <Container>
          <Row>
            {" "}
            <RenderCart />
          </Row>
        </Container>
      </BudgetContext.Provider>
    </>
  );
}

export default App;
