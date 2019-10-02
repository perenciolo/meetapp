import { combineReducers } from 'redux';

import auth from '~/store/modules/auth/reducer';
import meetup from '~/store/modules/meetup/reducer';

export default combineReducers({ auth, meetup });
