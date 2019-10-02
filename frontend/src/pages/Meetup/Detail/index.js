import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import {
  MdModeEdit,
  MdDeleteForever,
  MdEvent,
  MdLocationOn,
} from 'react-icons/md';

import { Container, Banner, Footer, Button, ButtonSecondary } from './styles';

import { detailMeetupFailure } from '~/store/modules/meetup/actions';
import history from '~/services/history';

export default function Detail() {
  const dispatch = useDispatch();

  const detail = useSelector(state => state.meetup.detail);
  if (!detail) {
    dispatch(detailMeetupFailure());
    return null;
  }

  const { time } = detail;

  const date = () => format(parseISO(time), "d 'de' MMMM 'às' H'h'");

  return (
    detail && (
      <Container>
        <header>
          <h1>{detail.name}</h1>
          <div>
            <ButtonSecondary
              type="button"
              onClick={() => history.push('/meetup/edit')}
            >
              <MdModeEdit size={20} color="#FFF" />
              <span>Editar</span>
            </ButtonSecondary>
            <Button type="button">
              <MdDeleteForever size={20} color="#FFF" />
              <span>Cancelar</span>
            </Button>
          </div>
        </header>
        {detail.banner && detail.banner.url && (
          <Banner>
            <img src={detail.banner.url} alt={detail.banner.name} />
          </Banner>
        )}

        <p>{detail.description}</p>

        <Footer>
          <time>
            <MdEvent size={20} color="#FFF" />
            <span>{date()}</span>
          </time>
          <div>
            <MdLocationOn size={20} color="#FFF" />
            <span>{detail.location}</span>
          </div>
        </Footer>

        <div>{console.tron.log(detail)}</div>
      </Container>
    )
  );
}
