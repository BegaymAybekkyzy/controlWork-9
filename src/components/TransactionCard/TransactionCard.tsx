import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';

interface Props {
  transaction: ITransaction,
  category: ICategory | undefined,
  transactionDelete: (id: string) => void,
  showModal: (value: boolean) => void;

}

const TransactionCard: React.FC<Props> = ({transaction, category, transactionDelete, showModal}) => {
  const editingTransaction = () => {
    showModal(true);
  };


  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col>{dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}</Col>
          <Col>{category ? category.name : 'No Category'}</Col>
          <Col>
            <Button
              variant="outline-primary"
              onClick={editingTransaction}
            >Edit</Button>
            <Button
              variant="outline-danger"
              onClick={() => transactionDelete(transaction.id)}
              className="ms-3"
            >Delete</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TransactionCard;