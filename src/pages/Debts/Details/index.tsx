import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  FiEdit2,
  FiCalendar,
  FiDollarSign,
  FiArrowRight,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';

import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, Content, Debt, DebtDetails } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import getValidationErrors from '../../../utils/getValidationError';
import DatePicker from '../../../components/DatePicker';

interface Debtor {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

interface Debt {
  id: string;
  debtor_id: string;
  debt_reason: string;
  date: string;
  value: number;
  debtor: Debtor;
}

const Details: React.FC = () => {
  const [debt, setDebt] = useState<Debt>();
  const [dateInput, setDateInput] = useState<Date>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { debt_id } = useParams();

  const formattedDate = moment(debt?.date).format('DD/MM/YYYY');

  useEffect(() => {
    const handleLoadDebt = async (): Promise<void> => {
      const response = await api.get(`debts/show/${debt_id}`);

      setDebt(response.data);
    };

    handleLoadDebt();
  }, [debt_id]);

  const handleSubmit = useCallback(
    async (data: Debt) => {
      try {
        const debtor_id = debt?.debtor_id;

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          debt_reason: Yup.string(),
          date: Yup.string(),
          value: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { debt_reason, date, value } = data;

        const formData = { debtor_id, debt_reason, date, value };

        await api.put(`/debts/update/${debt_id}`, formData);

        addToast({
          type: 'success',
          title: 'Divida atualizada!',
          description: 'Informações da divida foram atualizadas com sucesso!',
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
            'Ocorreu um erro ao atualizar a dívida, tente novamente.',
        });
      }
    },
    [addToast, debt_id, debt],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Debt>
          <Form
            ref={formRef}
            initialData={{
              debt_reason: debt?.debt_reason,
              date: debt?.date,
              value: debt?.value,
            }}
            onSubmit={handleSubmit}
          >
            <Input
              name="debt_reason"
              type="text"
              placeholder="Motivo"
              icon={FiEdit2}
            />
            <DatePicker
              name="date"
              icon={FiCalendar}
              placeholderText="Data da dívida"
            />
            <Input
              name="value"
              type="number"
              placeholder="Valor"
              icon={FiDollarSign}
            />
            <Button type="submit">Alterar</Button>
          </Form>
        </Debt>
        <h1>Detalhes</h1>
        <DebtDetails>
          <div className="item">
            <div className="debt">
              <strong>{debt?.debt_reason}</strong>
              <span>{debt?.value}</span>
              <small>{formattedDate}</small>
            </div>
            <div className="redirect">
              <strong>{debt?.debtor.name}</strong>
              <Link to={`/debtors/detail/${debt?.debtor.id}`}>
                <FiArrowRight size={22} color="#fff" />
              </Link>
            </div>
          </div>
        </DebtDetails>
      </Content>
    </Container>
  );
};

export default Details;
