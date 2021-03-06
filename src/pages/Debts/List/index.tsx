import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash, FiArrowRight } from 'react-icons/fi';

import Header from '../../../components/Header';

import api from '../../../services/api';

import Button from '../../../components/Button';

import { useToast } from '../../../hooks/toast';

import { Container, SearchContainer, Content } from './styles';

import { Debtor } from '../../Debtors/List';

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
  const [search, setSearch] = useState('/debts/list');
  const [name, setName] = useState('');

  const { addToast } = useToast();

  const handleDeleteDebt = async (id: string): Promise<void> => {
    const alert = window.confirm('Tem certeza que deseja deletar esta dívida?');

    if (alert === true) {
      await api.delete(`/debts/delete/${id}`);

      addToast({
        type: 'success',
        title: 'Dívida deletada com sucesso',
        description: '',
      });
    }
  };

  useEffect(() => {
    async function loadDebts(): Promise<void> {
      try {
        const response = await api.get(search);
        setDebts(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Devedor nao encontrado',
          description: 'Por favor verifique seus dados',
        });

        setSearch('/debts/list');
      }
    }

    loadDebts();
  }, [search, addToast]);

  return (
    <Container>
      <Header />
      <SearchContainer>
        <div className="find-debt">
          <input
            type="text"
            value={name}
            placeholder="Informe o nome da divida"
            onChange={({ currentTarget }) => {
              setName(currentTarget.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              setSearch(`/debts/find/${name}`);
            }}
          >
            BUSCAR
          </button>
        </div>
      </SearchContainer>
      <Content>
        <div className="list-container">
          {debts.length === 0 ? (
            <div className="without-debt">
              <span>Você ainda não cadastrou nenhuma dívida</span>
              <Link to="/dashboard">
                <Button type="submit">Cadastrar</Button>
              </Link>
            </div>
          ) : (
            debts.map(debt => (
              <div className="item" key={debt.id}>
                <div className="debt">
                  <strong>{debt.debt_reason}</strong>
                  <span>{debt.debtor.name}</span>
                  <small>{debt.value} R$</small>
                </div>
                <div className="options">
                  <button
                    onClick={() => {
                      handleDeleteDebt(debt.id);
                    }}
                    type="submit"
                  >
                    <FiTrash size={22} color="#fff" />
                  </button>
                  <Link to={`/debts/detail/${debt.id}`}>
                    <FiArrowRight size={22} color="#fff" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </Content>
    </Container>
  );
};

export default Debts;
