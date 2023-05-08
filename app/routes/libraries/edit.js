import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LibrariesEditRoute extends Route {
  @service store;
  @service router;

  model(params) {
    return this.store.findRecord('library', params.library_id);
  }

  @action saveLibrary(library) {
    library.save().then(() => this.router.transitionTo('libraries'));
  }

  renderTemplate() {
    this.render('libraries/form');
  }

  @action willTransition(transition) {
    const model = this.controllerFor('libraries.edit').model;
    if (model.hasDirtyAttributes) {
      const confirmation = confirm(
        "Your changes haven't saved yet. Would you like to leave this form?"
      );
      confirmation ? model.rollbackAttributes() : transition.abort();
    }
  }
}
