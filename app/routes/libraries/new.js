import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class LibrariesNewRoute extends Route {
  @service store;
  @service router;
  model() {
    return this.store.createRecord('library');
  }

  renderTemplate() {
    this.render('libraries/form');
  }
  @action saveLibrary(newLibrary) {
    newLibrary.save().then(() => this.router.transitionTo('libraries'));
  }

  willTransition() {
    this.controllerFor('libraries.new').model.rollbackAttributes();
  }
}
