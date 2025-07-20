import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalAcciones({
  show,
  handleClose,
  modalType,
  selectedPost,
  manageData,
  setManageData,
  handleConfirmAction,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
        {modalType === "edit"
            ? `Editar registro de ${selectedPost?.name}`
            : modalType === "delete"
            ? `¿Seguro que deseas eliminar el registro de ${selectedPost?.name}?`
            : "Ingresa los valores del nuevo post"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         {modalType === "edit" || modalType === "create" ? (
           <>
             <Form.Group className="mb-3">
               <Form.Label>Nombre</Form.Label>
                 <Form.Control
                   type="text"
                    value={manageData.name}
                    onChange={(e) =>
                    setManageData({ ...manageData, name: e.target.value })
                    }
                 />
                 </Form.Group>
                 <Form.Group>
                   <Form.Label>Descripción</Form.Label>
                   <Form.Control
                     type="text"
                     value={manageData.description}
                     onChange={(e) =>
                       setManageData({ ...manageData, description: e.target.value })
                     }
                   />
                  </Form.Group>
            </>
            ) : (
                <p>
                    ¿Estás seguro que deseas eliminar el registro de{" "}
                    <strong>{selectedPost?.name}</strong>?
                </p>
            )}
        </Modal.Body>
      <Modal.Footer>
        <Button className="btn-cancel" onClick={handleClose}>
          Cancelar
        </Button>
        <Button className="btn-custom" onClick={handleConfirmAction}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAcciones;
