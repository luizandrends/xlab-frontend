import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiBookmark, FiDollarSign, FiCalendar } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SelecInput from '../../components/SelectInput';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import DatePicker from '../../components/DatePicker';
import getValidationErrors from '../../utils/getValidationError';

interface Debtor {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

interface CreateDebtFormData {
  debtor_id: string;
  debt_reason: string;
  date: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [debtorsArray, setDebtorsArray] = useState<Debtor[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    const loadDebtors = async (): Promise<void> => {
      const response = await api.get('/debtors/list');

      const debtorsName = response.data.map((debtor: Debtor) => {
        return {
          value: debtor.id,
          label: debtor.name,
        };
      });

      setDebtorsArray(debtorsName);
      setDebtors(response.data);
    };

    loadDebtors();
  }, [debtors]);

  const handleSubmit = useCallback(
    async (data: CreateDebtFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          debtor_id: Yup.string().required('Nome do debtor obrigatorio'),
          debt_reason: Yup.string().required('Motivo obrigatorio'),
          date: Yup.string().required('Data obrigatoria'),
          value: Yup.number().required('Valor obrigatorio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { debtor_id, debt_reason, date, value } = data;

        const formData = {
          debtor_id,
          debt_reason,
          date,
          value,
        };
        await api.post('/debts/create', formData);

        addToast({
          type: 'success',
          title: 'Dívida criada com sucesso',
          description: '',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Header />
      <Content>
        <h1>Cadastro de dívidas</h1>
        <Form
          ref={formRef}
          initialData={{
            select: debtorsArray,
          }}
          onSubmit={handleSubmit}
        >
          <SelecInput
            name="debtor_id"
            options={debtorsArray}
            placeholder="Selecione o devedor"
          />
          <hr />
          <Input
            name="debt_reason"
            icon={FiBookmark}
            type="text"
            placeholder="Motivo"
          />
          <Input
            name="value"
            icon={FiDollarSign}
            type="number"
            placeholder="Valor"
          />
          <div className="custom-date-picker-wrapper">
            <DatePicker
              name="date"
              icon={FiCalendar}
              placeholderText="Data da dívida"
            />
          </div>
          <div className="buttons">
            <Button type="submit">Salvar</Button>
            <Link to="/create/debtors">
              <Button type="submit">Criar devedor</Button>
            </Link>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default Dashboard;
