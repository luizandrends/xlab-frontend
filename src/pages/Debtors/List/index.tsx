import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash, FiArrowRight } from 'react-icons/fi';

import Header from '../../../components/Header';

import api from '../../../services/api';

import Button from '../../../components/Button';

import { useToast } from '../../../hooks/toast';

import { Container, SearchContainer, Content } from './styles';

export interface Debtor {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

const List: React.FC = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [search, setSearch] = useState('/debtors/list');
  const [name, setName] = useState('');

  const { addToast } = useToast();

  const handleDeleteDebtor = async (id: string): Promise<void> => {
    const alert = window.confirm(
      'Tem certeza que deseja deletar este devedor?',
    );

    if (alert === true) {
      try {
        await api.delete(`/debtors/delete/${id}`);

        addToast({
          type: 'success',
          title: 'Devedor deletado com sucesso',
          description: '',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Devedor com dívidas em ativo',
          description: 'Para deletar este devedor, delete suas dividas',
        });
      }
    }
  };

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
            placeholder="Informe o nome completo do devedor"
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
          {debtors.length === 0 ? (
            <div className="without-debtor">
              <span>Você ainda não cadastrou nenhum devedor</span>
              <Link to="/create/debtors">
                <Button type="submit">Cadastrar</Button>
              </Link>
            </div>
          ) : (
            debtors.map(debtor => (
              <div className="item" key={debtor.id}>
                <div className="debtor">
                  <strong>{debtor.name}</strong>
                  <span>{debtor.email}</span>
                  <small>{debtor.cpf}</small>
                </div>
                <div className="options">
                  <button
                    type="submit"
                    onClick={() => {
                      handleDeleteDebtor(debtor.id);
                    }}
                  >
                    <FiTrash size={22} color="#fff" />
                  </button>
                  <Link to={`/debtors/detail/${debtor.id}`}>
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

export default List;
