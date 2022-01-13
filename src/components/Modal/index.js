import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CustomModal = ({ title, handleClose, handleAction }) => {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminación de {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Esta seguro de eliminar este registro!</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleAction}>
          Eliminar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
