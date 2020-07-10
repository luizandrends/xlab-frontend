import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

import Header from '../../components/Header';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Container, SearchContainer, Content } from './styles';

export interface Debtor {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

const Debtors: React.FC = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [search, setSearch] = useState('/debtors/list');
  const [name, setName] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    async function loadDebtors(): Promise<void> {
      try {
        const response = await api.get(search);
        setDebtors(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Devedor nao encontrado',
          description: 'Por favor verifique seus dados',
        });

        setSearch('debtors/list');
      }
    }

    loadDebtors();
  }, [search, addToast]);

  return (
    <Container>
      <Header />
      <SearchContainer>
        <div className="find-debtor">
          <input
            type="text"
            placeholder="Informe o nome do devedor"
            value={name}
            onChange={({ currentTarget }) => {
              setName(currentTarget.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              setSearch(`/debtors/find/${name}`);
            }}
          >
            BUSCAR
          </button>
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
