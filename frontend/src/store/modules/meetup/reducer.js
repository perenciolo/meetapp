import produce from 'immer';

import history from '~/services/history';

const INITIAL_STATE = {
  organizing: [],
  detail: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/GET_ORGANIZING_SUCCESS': {
        draft.organizing = action.payload.data;
        break;
      }
      case '@meetup/DETAIL_MEETUP_BY_ID': {
        draft.detail =
          draft.organizing.filter(item => +item.id === +action.payload.id)[0] ||
          null;

        history.push('/meetup/detail');
        break;
      }
      default:
        break;
    }
  });
}
