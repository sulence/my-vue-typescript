import { Component, Vue, Watch } from "vue-property-decorator";
import { DeviceType, AppModule } from "@/store/modules/app";

@Component({
  name: "ResizeMixin"
})
export default class extends Vue {
  get device() {
    return AppModule.device;
  }

  get sidebar() {
    return AppModule.sidebar;
  }

  @Watch("$route")
  private onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      AppModule.CloseSideBar(false);
    }
  }
}
