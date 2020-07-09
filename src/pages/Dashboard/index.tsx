import React, { useRef, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiBookmark, FiDollarSign, FiCalendar } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SelecInput from '../../components/SelectInput';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationError';

import { Container, Content } from './styles';

import Header from '../../components/Header';

interface Debtor {
  name: string;
  email: string;
  cpf: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [debtors, setDebtors] = useState<Debtor[]>([]);

  useEffect(() => {
    api.get('/debtors/list').then(response => {
      setDebtors(response.data);
    });
  }, [debtors]);

  return (
    <Container>
      <Header />
      <Content>
        <h1>Cadastro de dívidas</h1>
        <Form
          ref={formRef}
          onSubmit={() => {
            console.log('submit');
          }}
        >
          <SelecInput
            name="select-user"
            value={debtors}
            placeholder="Selecione o usuario"
          />
          <Input name="debtor" icon={FiUser} placeholder="Devedor" />
          <Input
            name="reason"
            icon={FiBookmark}
            type="password"
            placeholder="Motivo"
          />
          <Input
            name="value"
            icon={FiDollarSign}
            type="password"
            placeholder="Valor"
          />
          <Input
            name="date"
            icon={FiCalendar}
            type="password"
            placeholder="Data"
          />
          <div className="buttons">
            <Button type="submit">Registrar devedor</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default Dashboard;
