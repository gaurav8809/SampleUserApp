import InitialState from '../InitialState/general';
import {SET_USERS, SET_SELECTED_USER} from '../Constants/StoreContants';

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return (state = {
        ...state,
        users: action.payload,
      });
    case SET_SELECTED_USER:
      return (state = {
        ...state,
        selectedUser: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;
