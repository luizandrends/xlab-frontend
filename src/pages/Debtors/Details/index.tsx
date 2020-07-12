import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FiUser, FiMail, FiUserCheck, FiArrowRight } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';

import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, Content, Debtor, Debts } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import getValidationErrors from '../../../utils/getValidationError';

interface DebtorFormData {
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
  const [debtor, setDebtor] = useState<DebtorFormData>();
  const [debts, setDebts] = useState<Debts[]>([]);
  // const [cpf, setCpf] = useState('');

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

      const debtsResponse = response.data.map((debt: Debts) => {
        return {
          id: debt.id,
          debt_reason: debt.debt_reason,
          date: moment(debt.date).format('DD/MM/YYYY'),
          value: debt.value,
        };
      });

      setDebts(debtsResponse);
    };

    handleLoadDebtor();
    handleGetDebtsFromDebtor();
  }, [debtor_id]);

  const handleSubmit = useCallback(
    async (data: DebtorFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().email('Digite um e-mail válido').required(),
          cpf: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.email === '' && data.name === '' && data.cpf === '') {
          addToast({
            type: 'error',
            title: 'Erro na atualização',
            description: 'Preencha os campos para proseguir',
          });

          return;
        }

        const { name, email, cpf } = data;

        const formData = { name, email, cpf };

        await api.put(`/debtors/update/${debtor_id}`, formData);

        addToast({
          type: 'success',
          title: 'Devedir atualizado!',
          description: 'Informações do devedor foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

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
          <Form
            ref={formRef}
            initialData={{
              name: debtor?.name,
              email: debtor?.email,
              cpf: debtor?.cpf,
            }}
            onSubmit={handleSubmit}
          >
            <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Input
              name="cpf"
              type="text"
              placeholder="CPF"
              icon={FiUserCheck}
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
                <div className="redirect">
                  <Link to={`/debts/detail/${debt.id}`}>
                    <FiArrowRight size={22} color="#fff" />
                  </Link>
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
