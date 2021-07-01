import { createContext, ReactNode, useContext, useEffect, useState } from 'react' //constext e para compartilhar informacao entre varios componentes
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //tipando,copiando a interface transaction meno o id e o createdAt
// type TransactionInput = Pick<Transaction, 'title' | 'type' | 'category' | 'amount' // copia a tipagem da interface Transaction mas so os que escolhemos

interface TransactionsProviderProps {
  children: ReactNode; //tipando que os filhos do provider sao do tipo ReactNode=qualquer elemento do react  
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
   {} as TransactionsContextData // tem que passar com qual valor ele ira inicializar
  );  

export function TransactionsProvider({children}: TransactionsProviderProps) { //curstomizando o provider
  const [transactions, setTransactions] = useState<Transaction[]>([]);//passando para o useStage a tipagem que ele vai ter

  useEffect(() => {
    api.get('/transactions')      
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {    
   const response = await api.post('/transactions', {
     ...transactionInput, //copiando todos os dados 
     createdAt: new Date() // e adicionando o createdAt
   })
   const { transaction } = response.data;

   setTransactions([
     ...transactions,
     transaction,
   ]);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context;
}