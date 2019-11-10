import {
  VuexModule,
  Module,
  getModule,
  MutationAction
} from "vuex-module-decorators";
import store from "@/store";
import actions from "./actions";
import { Profile, User, UserAuth } from "../../types/index";

@Module({
  namespaced: true,
  name: "user",
  store,
  dynamic: true
})
class UserModule extends VuexModule {
  user: User | null = null;
  profile: Profile | null = null;

  @MutationAction({ mutate: ["user"] })
  async login(userAuth: UserAuth) {
    const user = await actions.loginUser(userAuth);
    return { user };
  }

  /** Getters */
  get currentUser() {
    return this.user;
  }
}

export default getModule(UserModule);
