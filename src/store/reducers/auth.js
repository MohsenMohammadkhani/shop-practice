import authActions from "../actions/auth";

const mainState = {
  isUserLoggedIn: false,
  isInit: false,
  userID: null,
  permissionsUser: null,
};

const main = (state = mainState, action) => {
  let newState = state;
  switch (action.type) {
    case authActions.CHECK_USER_LOGIN:
      newState = {
        ...state,
        hasMessage: true,
        typeMessage: action.payload.typeMessage,
        message: action.payload.message,
      };
      break;
  }
  return newState;
};
export default main;
