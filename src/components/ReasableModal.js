import Modal from "react-bootstrap/Modal";
import { Stack } from "react-bootstrap";
import React from "react";
import Button from "./Button";

export default function ReasableModal({
  children,
  setShow,
  show,
  title,
  isButton = false,
  textButton,
  variant,
  size,
  name,
  onAction,
}) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Stack direction="horizontal" gap={5}>
            <Modal.Title>{title}</Modal.Title>
            {isButton ? (
              <Button
                size={size}
                variant={variant}
                textButton={textButton}
                onAction={() => onAction(name)}
              />
            ) : (
              ""
            )}
          </Stack>
        </Modal.Header>
        {children}
      </Modal>
    </>
  );
}
