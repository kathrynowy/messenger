import { observable } from 'mobx';


class MenuStore {
  @observable show: boolean;

  constructor() {
    this.show = true;
  }
}

export default new MenuStore();