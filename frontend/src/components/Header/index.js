import React from 'react';
import { useDispatch } from 'react-redux';

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
        <img src={logo} alt="MeetApp" />
        <UserData>
          <div>
            <strong>Gustavo Lima</strong>
            <button type="button">Meu perfil</button>
          </div>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </UserData>
      </Content>
    </Container>
  );
}
