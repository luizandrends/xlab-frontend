import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import { Container, Content } from './styles';

import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <div className="links">
          <Link to="debts">
            <span id="debts">Dívidas</span>
          </Link>
          <Link to="debtors">
            <span>Devedores</span>
          </Link>
        </div>
        <div className="profile">
          <small>Olá, {user.name}</small>
          <Link to="profile">
            <FiUser size={25} color="#fff" />
          </Link>
        </div>
      </Content>
    </Container>
  );
};

export default Header;
