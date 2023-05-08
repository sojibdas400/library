import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class LibrariesIndexRoute extends Route {
  model() {
    return this.store.findAll('library');
  }

  @action deleteLibrary(library) {
    let confirmation = confirm('are you sure?');
    if (confirmation) {
      library.destroyRecord();
    }
  }
}
