import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model} from 'miragejs';
import { App } from './App';

createServer({ 

  models: { //banco de dados do mirage
    transaction: Model,
  },

  seeds(server) { //funcao do mirage para deixar daods pre cadastrados
    server.db.loadData({
      transactions: [
      {
        id: 1,
        title: 'Freela',
        type: 'deposit',
        category: 'Dev',
        amount: 6000,
        createdAt: new Date('2021-02-26 15:00:00'),
      },
      {
        id: 2,
        title: 'Aluguel',
         type: 'withdraw',
        category: 'Mensais',
        amount: 8000,
        createdAt: new Date('2021-02-28 15:00:00'),
      }
    
      ]
    })    
  }, 


  routes()  {
    this.namespace = 'api';//api que mencionei no fetch na index da transactonTable

    this.get('/transactions', () => { //quando houver uma requisicao de busca/listagem para a rota transactions,o get retorna
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => { // o post grava as informacoes
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)//schema e um banco de dados interno do miragejs
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);