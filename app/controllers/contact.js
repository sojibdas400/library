import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContactController extends Controller {
  @tracked responseMessage = '';
  @action sendMessage(newContactMessage) {
    event.preventDefault();
    newContactMessage.save().then(() => {
      this.responseMessage = true;
    });
  }
}
