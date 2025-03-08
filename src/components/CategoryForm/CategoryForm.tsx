import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchAllCategories, submitCategory, updateCategory } from '../../store/category/categoryThunks.ts';
import { selectEditableCategory } from '../../store/category/categorySlice.ts';

interface Props {
  isEdit?: boolean;
  setShowModal: (value: boolean) => void;
  loading: boolean;
}

const initialValues:ICategoryForm = {
  type: '',
  name: '',
};
const CategoryForm: React.FC<Props> = ({isEdit = false, setShowModal, loading}) => {
  const [form, setForm] = useState<ICategoryForm>(initialValues);
  const editCategory = useAppSelector(selectEditableCategory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(editCategory && isEdit) {
      setForm(editCategory);
    }
  }, [isEdit, editCategory]);

  const onSubmitForm =
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isEdit && editCategory) {
        await dispatch(updateCategory({ ...form, id: editCategory.id}));
      } else {
        await dispatch(submitCategory(form));
      }
      await dispatch(fetchAllCategories());
      setForm(initialValues);
      setShowModal(false);
    };

  const onChangeInput =
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
      const {name, value} = e.target;
      setForm({...form, [name]: value});
    };

  return (
    <Form onSubmit={onSubmitForm}>
      <h3>{isEdit? "Edit" : "Add"}</h3>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Select
          name="type"
          required
          value={form.type}
          disabled={loading}
          onChange={onChangeInput}>
          <option disabled value="">Select type</option>
          <option value="income">income</option>
          <option value="expense">expense</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          required
          disabled={loading}
          onChange={onChangeInput}/>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>Submit</Button>
    </Form>
  );
};

export default CategoryForm;