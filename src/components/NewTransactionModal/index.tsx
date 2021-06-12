import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg'
import { FormEvent, useState } from 'react';
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { Container, TransactionTypeContainer, RadioBox } from "./styles";


interface NewTransactionModal{
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModal){
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const[type, setType] = useState('deposit'); //armazenando o estado dos btns da modal
  
  function handleCreatNewTransaction(event: FormEvent) { //definimos que toda funcao que comecar com handle e pq ela veem atraves de uma acao do usuario
      event.preventDefault(); //prevenindo o funcionamento padrao do html,para nao recarregar a pag quando der submit no form
  
      console.log({
        title, 
        value, 
        category, 
        type,
      })
    }

  return(
     <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      > 
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal"/>
      </button>

      <Container onSubmit={handleCreatNewTransaction}>
        <h2>Cadastrar transação </h2>

        <input placeholder="Titulo"
        value={title}
        onChange={event => setTitle(event.target.value)}//funcao que executa toda vez que um novo texto for digitado dentro do input,e pego os dados e salvo no setTitle 
        />

        <input type="number" placeholder="Valor"
         value={value}
        onChange={event => setValue(Number(event.target.value))}//convertendo o retorno para number, poderiamos usar + no lugar de number 
        />

        <TransactionTypeContainer>
        
          <RadioBox 
            type="button" 
            onClick={() => setType('deposit')} 
            ativo={type === 'deposit'} 
            corAtivo="green" 
            >             
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

            <RadioBox 
            type="button" 
            onClick={() => setType('withdraw')}
            ativo={type === 'withdraw'}
            corAtivo="red" 
            >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input placeholder="Categoria"
        value={category}
        onChange={event => setCategory(event.target.value)}//funcao que executa toda vez que um novo texto for digitado dentro do input,e pego os dados e salvo no setTitle 
        />

      

        <button type="submit">Cadastrar</button>
      </Container>  

      </Modal>
  );
}