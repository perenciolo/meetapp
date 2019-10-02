import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container } from './styles';

import BannerInput from '~/components/BannerInput';

import { uploadBannerRequest } from '~/store/modules/meetup/actions';

const schema = Yup.object().shape({
  banner: Yup.string(),
  title: Yup.string()
    .min(3)
    .required('Por favor forneça um nome para o meetup'),
  description: Yup.string(),
  time: Yup.date('O meetup precisa ter uma data válida e futura').required(
    'O meetup precisa ter uma data válida e futura'
  ),
  location: Yup.string().required('Por favor forneça a localização do evento'),
});

export default function InsertEditForm() {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.meetup);

  console.tron.log(detail);

  const handleSubmit = data => {
    const { banner } = data;

    if (banner) dispatch(uploadBannerRequest(banner));
  };
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="banner" label="Selecionar Imagem" />
        <Input type="text" name="title" placeholder="Título do Meetup" />
        <Textarea name="description" placeholder="Descrição completa" />
        <Input type="datetime-local" name="time" placeholder="Data do meetup" />
        <Input type="text" name="location" placeholder="Localização" />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#FFF" />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}
