import { postApiData } from "@/plugins/axios/api";
import ls from "@/utilities/storage/locale-storage";
import constants from "@/utilities/constants";
import { User, UserAuth } from "../../types/index";

export default {
  async loginUser(data: UserAuth): Promise<User | null> {
    // const response = await postApiData({ url: "/user/login", data: data });
    const response = {
      status: 200,
      data: {
        email: "Test@test.com",
        token: "1234!!!!3211",
        username: "Test User",
        bio: "Some bio",
        image: "Dummy img"
      }
    };
    if (response && response.status === 200) {
      const data = response.data;
      // commit("setUserToken", data.token);
      // commit("setAuthenticated", true);
      ls.setItem(constants.TOKEN, data.token);
      return response.data as User;
    }

    return null;
  }

  // async logoutUser({ commit }: any) {
  //   const token = ls.getItem(constants.TOKEN);
  //   const response = await postApiData("logout/", {}, token);

  //   if (response.status === 200) {
  //     commit("setUserData", {});
  //     commit("setUserToken", null);
  //     commit("setAuthenticated", false);

  //     ls.removeItem(constants.TOKEN);
  //   }

  //   return response;
  // },

  // async registerUser({ commit }: any, data: any) {
  //   const response = await postApiData("registration/", data);
  //   return response;
  // }
};
