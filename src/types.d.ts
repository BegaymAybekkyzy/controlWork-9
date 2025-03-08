interface ICategoryForm {
  type: string;
  name: string;
}

interface ICategoryAPI {
  [id: string]: CategoryForm;
}

interface ICategory extends ICategoryForm{
  id: string;
}

interface ITransactionForm {
  idCategory: string;
  amount: number;
  date: string;
}

interface ITransactionAPI {
  [id: string]: TransactionForm;
}

interface ITransaction extends ITransactionForm{
  id: string;
}