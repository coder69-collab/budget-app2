import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import context from "../Context";

import Cart from "./Cart";

export default function RenderCart() {
  const [state] = useContext(context);

  return (
    <>
      {state.map((cart) => (
        <Col key={cart.id}>
          <Cart
            name={cart.name}
            maximumSpending={cart.maximumSpending}
            currentSpending={cart.currentSpending}
          />
        </Col>
      ))}
    </>
  );
}
