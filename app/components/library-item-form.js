import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LibraryItemFormComponent extends Component {
  handleClick = this.args?.handleClick;

  @action buttonClicked(param) {
    this.handleClick(param);
  }
}
