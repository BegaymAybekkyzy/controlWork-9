import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../app/hooks.ts';
import { categoryAdd } from '../../store/transaction/transactionSlice.ts';

interface Props {
  transaction: ITransaction,
  category: ICategory | undefined,
  transactionDelete: (id: string) => void,
  showModal: (value: boolean) => void;
  setEditForm:(value: boolean) => void;
  transactionEdit:(id: string) => void;
}

const TransactionCard: React.FC<Props> =
  ({transaction, category, transactionDelete, showModal, transactionEdit, setEditForm}) => {
  const dispatch = useAppDispatch();
  const editingTransaction = () => {
    showModal(true);
    setEditForm(true);
    transactionEdit(transaction.id);
    if (category) {
      dispatch(categoryAdd(category));
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col>{dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}</Col>
          <Col>{category ? category.name : 'No Category'}</Col>
          <Col>{category.type}</Col>
          <Col>{transaction.amount} KGS</Col>
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