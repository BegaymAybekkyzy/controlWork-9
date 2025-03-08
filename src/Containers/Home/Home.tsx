
import { NavLink } from 'react-router-dom';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllTransactions, selectLoadingTransaction } from '../../store/transaction/transactionSlice.ts';
import { Button } from 'react-bootstrap';
import {
  deleteTransaction,
  fetchAllTransactions,
  updateTransaction
} from '../../store/transaction/transactionThunks.ts';
import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';
import { fetchAllCategories } from '../../store/category/categoryThunks.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import TransactionCard from '../../components/TransactionCard/TransactionCard.tsx';
import { selectCategories } from '../../store/category/categorySlice.ts';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const loading = useAppSelector(selectLoadingTransaction);
  const transactions = useAppSelector(selectAllTransactions);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const transactionDeletion = async (id: string) => {
    const warning = confirm(`Are you sure you want to delete this transaction?`);
    if (warning) {
      await dispatch(deleteTransaction(id));
      await  dispatch(fetchAllTransactions());
    }
  };

  const editTransaction = async (transaction: ITransaction) => {
    await dispatch(updateTransaction(transaction));
  };

  let content = <p>there's nothing here yet.</p>;
  if (loading) content = <Loader />;
  if (transactions.length > 0) {
    content = (
      transactions.map((transaction) => {
        const category =
          categories.find((cat) => cat.id === transaction.idCategory);
        return (
          <TransactionCard
            showModal = {setShowModal}
            transactionDelete={transactionDeletion}
            key={transaction.id}
            editTransaction={editTransaction}
            transaction={transaction}
            category={category}
          />
        );
      })
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-sm-between mb-4">
        <NavLink to="/categories" className="d-block">categories</NavLink>
        <Button variant="primary" className="d-block" onClick={handleShow}>Add</Button>
      </div>
      <main>
        {content}
      </main>


     <ModalWindow
       handleClose={handleClose}
       loading={loading}
       show={showModal}
       children={<TransactionForm setShowModal={setShowModal} loading={loading} />}
       title={"ggg"}/>
    </div>
  );
};

export default Home;