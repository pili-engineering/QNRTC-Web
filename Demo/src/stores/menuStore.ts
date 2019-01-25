import { action, observable } from 'mobx';
import { MenuItemProps } from '@material-ui/core/MenuItem';

type AnchorEl = null | HTMLElement | ((element: HTMLElement) => HTMLElement);

export class MenuStore {
  @observable
  public list: MenuItemProps[] = [];

  @observable
  anchorEl?: AnchorEl;

  @action.bound
  public open(anchorEl: AnchorEl, list: MenuItemProps[]) {
    this.anchorEl = anchorEl;
    this.list = list;
  }

  @action.bound
  public close() {
    this.anchorEl = null;
    this.list = [];
  }

}

export default new MenuStore();
