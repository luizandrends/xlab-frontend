import React, { useState, useRef, useCallback } from 'react';
import { FiUser, FiMail, FiUserCheck } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, Content, Debtor } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { cpfMask } from '../../../components/CpfMask';
import getValidationErrors from '../../../utils/getValidationError';

interface CreateDebtorFormData {
  name: string;
  email: string;
  cpf: string;
}

const Create: React.FC = () => {
  const [cpf, setCpf] = useState('');

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: CreateDebtorFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string().required('CPF obrigatorio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/debtors/create', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description: 'Este devedor aparecerá na lista de devedores',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'CPF ou e-mail existente.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Header />
      <Content>
        <h1>Registro de devedor</h1>
        <Debtor>
          <Form ref={formRef} onSubmit={handleSubmit}>
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
              value={cpf}
              placeholder="CPF"
              icon={FiUserCheck}
              onChange={({ currentTarget }) => {
                setCpf(cpfMask(currentTarget.value));
              }}
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Debtor>
      </Content>
    </Container>
  );
};

export default Create;
