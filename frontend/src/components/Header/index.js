import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content, UserData } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="MeetApp" />
        </Link>
        <UserData>
          <div>
            <strong>Gustavo Lima</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </UserData>
      </Content>
    </Container>
  );
}
