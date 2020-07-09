import React from 'react';
import { FiUser } from 'react-icons/fi';

import { Container, Content } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <div className="links">
          <span id="debts">Dívidas</span>
          <span>Devedores</span>
        </div>
        <div className="profile">
          <small>Olá, Luiz Andre</small>
          <FiUser size={25} color="#fff" />
        </div>
      </Content>
    </Container>
  );
};

export default Header;
