import React from "react";
import { Button } from "react-bootstrap";

export default function ReusableButton({
  textButton,
  variant,
  size,
  onAction,
  id,
  name,
  amount,
}) {
  return (
    <>
      <Button
        variant={`${variant}`}
        size={`${size}`}
        onClick={() => onAction(id, name, amount)}
      >
        {textButton}
      </Button>
    </>
  );
}
