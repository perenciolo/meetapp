import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { getOrganizingSuccess } from './actions';

export function* getOrganizing() {
  const response = yield call(api.get, 'organizing');
  yield put(getOrganizingSuccess(response.data));
}

export function detailFailure() {
  history.push('/dashboard');
}

export function* uploadBanner({ payload }) {
  const { bannerMetadata } = payload;
  const response = yield call(api.post, 'files', {
    file: bannerMetadata,
  });

  put(console.tron.log('hifromsaga', response));
}

export default all([
  takeLatest('@meetup/GET_ORGANIZING_REQUEST', getOrganizing),
  takeLatest('@meetup/DETAIL_MEETUP_FAILURE', detailFailure),
  takeLatest('@meetup/UPLOAD_BANNER_REQUEST', uploadBanner),
]);
