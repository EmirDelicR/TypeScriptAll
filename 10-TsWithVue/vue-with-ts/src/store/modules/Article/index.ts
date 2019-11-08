import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import constants from "../../../utilities/constants";

export default {
  state: {
    isUserLoggedIn: false,
    userToken: null,
    userData: {},
    showRegistrationForm: true,
    showSmsPinForm: false,
    showPasswordSetForm: false,
    timer: constants.TIMER,
    isTimer: false,
    userRegisterData: {}
  },
  mutations,
  getters,
  actions
};
