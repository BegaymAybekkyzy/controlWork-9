import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { Button, Form } from 'react-bootstrap';
import { selectEditableTransaction } from '../../store/transaction/transactionSlice.ts';
import {
  fetchAllTransactions,
  submitTransaction,
  updateTransaction
} from '../../store/transaction/transactionThunks.ts';
import { selectCategories } from '../../store/category/categorySlice.ts';

interface Props {
  isEdit?: boolean;
  setShowModal: (show: boolean) => void;
  loading: boolean;
}

const initialValues: ITransactionForm = {
  idCategory: '',
  amount: 0,
  date: new Date().toISOString(),
};
const TransactionForm: React.FC<Props> = ({isEdit, setShowModal, loading = false}) => {
  const [form, setForm] = useState<ITransactionForm>(initialValues);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const editTransaction = useAppSelector(selectEditableTransaction);
  const allCategories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editTransaction && isEdit) {
      setForm(editTransaction);
    }
  }, [isEdit, editTransaction]);

  const onSubmitForm =
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isEdit && editTransaction) {
        await dispatch(updateTransaction({...form, id: editTransaction.id}));
      } else {
        await dispatch(submitTransaction(form));
      }
      await dispatch(fetchAllTransactions());
      setForm(initialValues);
      setShowModal(false);
    };

  const onChangeInput =
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const {name, value} = e.target;
      setForm({...form, [name]: value});
    };

  const onChangeSelect =
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const categories =
        allCategories.filter((category) => category.type === e.target.value);
      setCategories(categories);
    };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Select
          name="type"
          required
          disabled={loading}
          onChange={onChangeSelect}>
          <option disabled value="">Select type</option>
          <option value="income">income</option>
          <option value="expense">expense</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="idCategory"
          required
          disabled={loading}
          onChange={onChangeInput}>
          <option disabled value="">Select type</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          min={1}
          name="amount"
          value={form.amount}
          required
          disabled={loading}
          onChange={onChangeInput}/>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>Submit</Button>
    </Form>
  );
};

export default TransactionForm;