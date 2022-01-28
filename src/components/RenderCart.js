import React, { useContext } from "react";
import context from "../Context";

import Cart from "./Cart";

export default function RenderCart() {
  const [state] = useContext(context);

  return (
    <>
      {state.map((cart) => (
        <Cart
          key={cart.id}
          name={cart.name}
          maximumSpending={cart.maximumSpending}
          currentSpending={cart.currentSpending}
        />
      ))}
    </>
  );
}
