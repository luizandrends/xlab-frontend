import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

import Header from '../../components/Header';

import api from '../../services/api';

import { Container, SearchContainer, Content } from './styles';

interface Debtor {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

const Debtors: React.FC = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);

  useEffect(() => {
    api.get('/debtors/list').then(response => {
      setDebtors(response.data);
    });
  }, [debtors]);

  return (
    <Container>
      <Header />
      <SearchContainer>
        <h1>Lista de Devedores</h1>
        <div className="find-debtor">
          <input type="text" placeholder="Informe o nome do devedor" />
          <button type="submit">BUSCAR</button>
        </div>
      </SearchContainer>
      <Content>
        <div className="list-container">
          {debtors.map(debtor => (
            <div className="item" key={debtor.id}>
              <div className="debtor">
                <strong>{debtor.name}</strong>
                <span>{debtor.email}</span>
                <small>{debtor.cpf}</small>
              </div>
              <div className="options">
                <FiEdit size={22} color="#fff" />
                <FiTrash size={22} color="#fff" />
                <button type="submit">Detalhes</button>
              </div>
            </div>
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default Debtors;
