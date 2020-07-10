import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash, FiArrowRight } from 'react-icons/fi';

import Header from '../../components/Header';

import api from '../../services/api';

import { Container, SearchContainer, Content } from './styles';

import { Debtor } from '../Debtors/List';

interface Debt {
  id: string;
  debtor_id: string;
  debt_reason: string;
  date: string;
  value: number;
  debtor: Debtor;
}

const Debts: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    api.get('/debts/list').then(response => {
      setDebts(response.data);
    });
  }, [debts]);

  return (
    <Container>
      <Header />
      <SearchContainer>
        <h1>Lista de dividas</h1>
        <div className="find-debt">
          <input type="text" placeholder="Informe o nome da divida" />
          <button type="submit">BUSCAR</button>
        </div>
      </SearchContainer>
      <Content>
        <div className="list-container">
          {debts.map(debt => (
            <div className="item" key={debt.id}>
              <div className="debt">
                <strong>{debt.debt_reason}</strong>
                <span>{debt.date}</span>
                <small>{debt.value}</small>
              </div>
              <div className="debtor">
                <strong>{debt.debtor.name}</strong>
                <span>{debt.debtor.email}</span>
                <small>{debt.debtor.cpf}</small>
              </div>
              <div className="options">
                <FiEdit size={22} color="#fff" />
                <FiTrash size={22} color="#fff" />
                <FiArrowRight size={22} color="#fff" />
              </div>
            </div>
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default Debts;
