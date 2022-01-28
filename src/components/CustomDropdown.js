import React, { useContext } from "react";
import Form from "react-bootstrap/Form";

import context from "../Context";

function CustomDropdown({ setSelectValue }) {
  const [state] = useContext(context);

  return (
    <>
      <Form.Label style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        Budget
      </Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setSelectValue(e.target.value)}
        onSelect={(e) => setSelectValue(e.target.value)}
        onFocus={(e) => setSelectValue(e.target.value)}
      >
        {state.map((budget) => (
          <option key={budget.id} value={budget.name}>
            {budget.name}
          </option>
        ))}
      </Form.Select>
    </>
  );
}

export default CustomDropdown;
