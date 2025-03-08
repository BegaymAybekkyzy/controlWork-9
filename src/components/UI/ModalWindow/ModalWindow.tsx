import React from 'react';
import { Modal } from 'react-bootstrap';
import Loader from '../Loader/Loader.tsx';

interface Props {
  title: string;
  children?: React.ReactNode;
  handleClose: () => void;
  show: boolean;
  loading: boolean;
}

const ModalWindow: React.FC<Props> = (
  {title = "Modal title", children, handleClose, show = false, loading}) => {

  let content: React.ReactNode = <p></p>;
  if(loading) content = <Loader />;
  if(!loading && children) content = children;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
};

export default ModalWindow;