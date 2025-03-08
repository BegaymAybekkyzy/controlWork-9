import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';
import CategoryForm from '../../components/CategoryForm/CategoryForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  deleteCategory,
  fetchAllCategories,
  fetchCategoryById,
} from '../../store/category/categoryThunks.ts';
import { selectCategories, selectLoadingCategory } from '../../store/category/categorySlice.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import CategoryCard from '../../components/CategoryCard/CategoryCard.tsx';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoadingCategory);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const editCategories = (id: string) => {
    dispatch(fetchCategoryById(id));
  };

  const categoryDeletion = async (id: string) => {
    const warning = confirm('Are you sure you want to delete this category?');
    if (warning) {
      await dispatch(deleteCategory(id));
      await dispatch(fetchAllCategories());
    }
  };

  let content: React.ReactNode = 'There are no categories here yet';
  if (loading) {
    content = <div
      style={{ height: "80vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>;
  }

  if(categories.length > 0){
    content = (
      categories.map(category => (
        <CategoryCard
          key={category.id}
          showModal={setShowModal}
          setEditForm={setEditForm}
          category={category}
          categoryDeletion={categoryDeletion}
          categoryToEdit={editCategories} />
      ))
    );
  }

  return (
    <>
      <div className="mb-4">
        <h1>Categories</h1>
        <Button variant="primary" onClick={handleShow}>Add</Button>
      </div>

      <main className="d-flex flex-column gap-3">
        {content}
      </main>

      <ModalWindow
        loading={loading}
        show={showModal}
        handleClose={handleClose}
        children={<CategoryForm isEdit={editForm} loading={loading} setShowModal={setShowModal}/>}
        title="Add Categories"/>
    </>
  );
};

export default Categories;