import React, { useContext } from "react";
import { Stack } from "react-bootstrap";

import Button from "./Button";

// import state
import context from "../Context";

// import Modal
import ReasableModal from "./ReasableModal";

export default function ViewExpenses({ show, setShow, name }) {
  const [state, dispatch] = useContext(context);

  const list = state.filter((budget) => budget.name === name);

  function deleteExpenseRecord(id, name, amount) {
    dispatch({ type: "deleteExpenseRecord", value: { id, name, amount } });
  }

  function deleteExpenseAllRecords(name) {
    dispatch({ type: "deleteBudgetAllRecord", value: { name } });
  }

  function renderExpenses() {
    return (
      <>
        {list[0].expenses.length ? (
          list[0].expenses.map((expense) => (
            <Stack
              direction="horizontal"
              gap={3}
              style={{ margin: "1rem" }}
              key={expense.id}
            >
              <div>{expense.description}</div>
              <div className=" ms-auto ">{`${expense.amount}$`}</div>
              <div>
                {" "}
                <Button
                  textButton={"-"}
                  variant={"outline-danger"}
                  size={"sm"}
                  onAction={deleteExpenseRecord}
                  id={expense.id}
                  name={name}
                  amount={expense.amount}
                />
              </div>
            </Stack>
          ))
        ) : (
          <div className="no-expense">
            <h5>no expenses have been added yet</h5>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <ReasableModal
        show={show}
        setShow={setShow}
        title={`Expenses -${" "}${name}`}
        isButton={list[0]?.expenses?.length ? true : false}
        textButton={"Delete"}
        variant={"danger"}
        size={"md"}
        name={name}
        onAction={deleteExpenseAllRecords}
      >
        {renderExpenses()}
      </ReasableModal>
    </>
  );
}
