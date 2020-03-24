/* eslint-disable @typescript-eslint/interface-name-prefix */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";

import { setLanguage } from "@/utils/cookies";

import store from "@/store";

export enum DeviceType {
  Mobile,
  Desktop
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  size: string;
}
@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule {
  public sidebar = {
    opened: true,
    withoutAnimation: false
  };
  public device = DeviceType.Desktop;
  public language = "zh";
  public size = "medium";

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
    // if (this.sidebar.opened) {
    //   setSidebarStatus("opened");
    // } else {
    //   setSidebarStatus("closed");
    // }
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
    // setSidebarStatus('closed')
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size;
    // setSize(this.size);
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language;
    setLanguage(this.language);
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation);
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation);
  }

  @Action
  public SetSize(size: string) {
    this.SET_SIZE(size);
  }

  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language);
  }
}

export const AppModule = getModule(App);
