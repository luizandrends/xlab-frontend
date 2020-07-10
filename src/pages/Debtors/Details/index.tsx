import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FiUser, FiMail, FiUserCheck } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';

import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, Content, Debtor, Debts } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { cpfMask } from '../../../components/CpfMask';

interface Debtor {
  name: string;
  email: string;
  cpf: string;
}

interface Debts {
  id: string;
  debt_reason: string;
  date: string;
  value: number;
}

const Details: React.FC = () => {
  const [debtor, setDebtor] = useState<Debtor>();
  const [debts, setDebts] = useState<Debts[]>([]);
  const [cpf, setCpf] = useState('');

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { debtor_id } = useParams();

  useEffect(() => {
    const handleLoadDebtor = async (): Promise<void> => {
      const response = await api.get(`debtors/show/${debtor_id}`);

      setDebtor(response.data);
    };

    const handleGetDebtsFromDebtor = async (): Promise<void> => {
      const response = await api.get(`debts/list/debtor/${debtor_id}`);

      setDebts(response.data);
    };

    handleLoadDebtor();
    handleGetDebtsFromDebtor();
  }, [debtor_id]);

  const handleSubmit = useCallback(
    async (data: Debtor) => {
      try {
        await api.put(`/debtors/update/${debtor_id}`, data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Informações do devedor foram atualizadas com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o devedor, tente novamente.',
        });
      }
    },
    [addToast, debtor_id],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Debtor>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              placeholder={debtor?.name}
              icon={FiUser}
            />
            <Input
              name="email"
              type="email"
              placeholder={debtor?.email}
              icon={FiMail}
            />
            <Input
              name="cpf"
              type="text"
              value={cpf}
              placeholder={debtor?.cpf}
              icon={FiUserCheck}
              onChange={({ currentTarget }) => {
                setCpf(cpfMask(currentTarget.value));
              }}
            />
            <Button type="submit">Alterar</Button>
          </Form>
        </Debtor>
        <h1>Dividas</h1>
        <Debts>
          {debts.length === 0 ? (
            <div className="without-debt">
              <small>Nenhuma divida encontrada no nome de {debtor?.name}</small>
            </div>
          ) : (
            debts.map(debt => (
              <div className="item" key={debt.id}>
                <div className="debt">
                  <strong>{debt.debt_reason}</strong>
                  <span>{debt.value}</span>
                  <small>{debt.date}</small>
                </div>
              </div>
            ))
          )}
        </Debts>
      </Content>
    </Container>
  );
};

export default Details;
