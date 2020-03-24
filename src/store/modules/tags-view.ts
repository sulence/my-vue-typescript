import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { Route } from "vue-router";
import store from "@/store";

export interface ITagView extends Partial<Route> {
  title?: string;
}

export interface ITagsViewState {
  visitedViews: ITagView[];
  cachedViews: (string | undefined)[];
}

@Module({ dynamic: true, store, name: "tagsView" })
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = [];
  public cachedViews: (string | undefined)[] = [];

  @Mutation
  private ADD_VISITED_VIEW(view: ITagView) {
    if (this.visitedViews.some(v => v.path === view.path)) return;
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    );
  }

  @Mutation
  private ADD_CACHED_VIEW(view: ITagView) {
    const name = view.name || "";
    if (this.cachedViews.includes(name)) return;
    if (!view.meta.noCache) {
      this.cachedViews.push(name);
    }
  }

  @Mutation
  private DEL_VISITED_VIEW(view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(view: ITagView) {
    const name = view.name || "";
    const index = this.cachedViews.indexOf(name);
    index > -1 && this.cachedViews.splice(index, 1);
  }

  @Action
  public addVisitedView(view: ITagView) {
    this.ADD_VISITED_VIEW(view);
  }
  @Action
  public addView(view: ITagView) {
    this.ADD_VISITED_VIEW(view);
    this.ADD_CACHED_VIEW(view);
  }
  @Action
  public delView(view: ITagView) {
    this.DEL_VISITED_VIEW(view);
    this.DEL_CACHED_VIEW(view);
  }
}

export const TagsViewModule = getModule(TagsView);
