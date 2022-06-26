import { GET_USERS, GET_PHOTOS } from '../actions/types';

const INTIAL_STATE = {
  users: [],
  photos: {
    data: [],
    total: 0,
  },
};

const dashboardReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload };
    case GET_PHOTOS:
      let photos = {
        data: action.payload.photos,
        total: action.payload.total,
      };
      return { ...state, photos };
    default:
      return { ...state };
  }
};

export default dashboardReducer;
