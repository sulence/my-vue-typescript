import Vue from "vue";
import Vuex from "vuex";
import { IAppState } from "./modules/app";

Vue.use(Vuex);

export interface RootState {
  app: IAppState;
}
export default new Vuex.Store<RootState>({});
