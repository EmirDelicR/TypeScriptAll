import { getApiData, postApiData } from "@/plugins/axios/api";
import ls from "@/utilities/storage/locale-storage";
import constants from "../../../utilities/constants";

export default {
  async loginUser({ commit }: any, data: any) {
    const response = await postApiData("login/", data);

    if (response.status === 200) {
      const data = response.data;
      commit("setUserToken", data.token);
      commit("setAuthenticated", true);
      ls.setItem(constants.TOKEN, data.token);
      ls.setItem(constants.EXIT_DATE, data.exit_date);
    }

    return response;
  },

  async logoutUser({ commit }: any) {
    const token = ls.getItem(constants.TOKEN);
    const response = await postApiData("logout/", {}, token);

    if (response.status === 200) {
      commit("setUserData", {});
      commit("setUserToken", null);
      commit("setAuthenticated", false);

      ls.removeItem(constants.TOKEN);
    }

    return response;
  },

  async registerUser({ commit }: any, data: any) {
    const response = await postApiData("registration/", data);
    return response;
  }
};
