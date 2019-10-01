import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { signUpRequest, signInRequest } from '~/store/modules/auth/actions';

export default function Sign(props) {
  const {
    location: { pathname },
  } = props;
  const dispatch = useDispatch();
  const isSignUp = pathname && pathname === '/register';
  const shape = {
    email: Yup.string()
      .email('Insira um email válido')
      .required('O email é obrigatório.'),
    password: Yup.string().required('A senha é obrigatória'),
  };

  if (isSignUp) {
    shape.name = Yup.string().required('Por favor forneça seu nome completo.');
    shape.password = Yup.string()
      .min(6)
      .required('A senha é obrigatória');
  }

  const schema = Yup.object().shape(shape);

  function handleSubmit({ name, email, password }) {
    if (name) {
      return dispatch(signUpRequest(name, email, password));
    }
    return dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        {isSignUp && (
          <Input type="text" name="name" placeholder="Seu nome completo" />
        )}
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="password" name="password" placeholder="Sua senha" />
        <button type="submit">{!isSignUp ? 'Acessar' : 'Registrar'}</button>
        {isSignUp ? (
          <Link to="/">Fazer login</Link>
        ) : (
          <Link to="/register">Criar conta gratuita</Link>
        )}
      </Form>
    </>
  );
}

Sign.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Sign.defaultProps = {
  location: {},
};
