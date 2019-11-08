export default {
  setAuthenticated(state: any, isLoggedIn: any) {
    state.isUserLoggedIn = isLoggedIn;
  },

  setUserToken(state: any, token: any) {
    state.userToken = token;
  },

  setUserData(state: any, userData: any) {
    state.userData = userData;
  }
};
