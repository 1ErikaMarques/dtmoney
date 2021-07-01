import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";



export function TransactionsTable() {
  const { transactions } = useTransactions(); //transactionsContext recebe dois valores,entao tem que escolher qual deles quer receber, nesse caso so queremos o {transactions}

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>         
            {transactions.map(transaction => { //smp que usar o map tem que passar uma key para o primeiro filho,tem que ser uma informaçao unica
              return (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td className={transaction.type}>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',//estilo moeda
                    currency: 'BRL' //o tipo da moeda
                  }).format(transaction.amount)} 
                  </td> 
                  <td>{transaction.category}</td>
                  <td>
                  {new Intl.DateTimeFormat('pt-BR').format( //intl e uma api do js
                    new Date (transaction.createdAt)
                    )} 
                  
                  </td>
                </tr>
              )
            })} 
        </tbody>
      </table>
    </Container>
  );
}