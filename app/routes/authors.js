import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class AuthorsRoute extends Route {
  model() {
    return this.store.findAll('author');
  }

  @action editAuthor(author) {
    author.isEditing = true;
  }

  @action cancelAuthorEdit(author) {
    author.isEditing = false;
    author.rollbackAttributes();
  }

  @action saveAuthor(author) {
    if (author.isNotValid) {
      return;
    }

    author.isEditing = false;
    author.save();
  }
}
