import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import { Container } from './styles';

import {
  detailMeetupById,
  getOrganizingRequest,
} from '~/store/modules/meetup/actions';
import history from '~/services/history';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizingRequest());
  }, [dispatch]);

  const organizing = useSelector(state => state.meetup.organizing);

  const formatTime = date => {
    if (!date) return false;
    return format(parseISO(date), "d 'de' MMMM 'às' HH'h'", { locale: pt });
  };

  const handleDetail = id => {
    dispatch(detailMeetupById(id));
  };

  return (
    <Container>
      <header>
        <h1>Meus Meetups</h1>
        <button type="button" onClick={() => history.push('/meetup/add')}>
          <MdAddCircleOutline size={20} color="#FFF" />
          <span>Novo meetup</span>
        </button>
      </header>
      <main>
        {organizing &&
          organizing.map(event => (
            <button
              key={String(event.id)}
              type="button"
              onClick={() => handleDetail(event.id)}
            >
              <div>{event.name}</div>
              <time>
                <span>{formatTime(event.time)}</span>
                <MdChevronRight size={24} color="#FFF" />
              </time>
            </button>
          ))}
      </main>
    </Container>
  );
}
