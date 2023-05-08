import Model, { attr } from '@ember-data/model';
import { match, gte, and, not } from '@ember/object/computed';

export default class ContactModel extends Model {
  @attr('string') email;
  @attr('string') message;

  @match('email', /^.+@.+\..+$/) isValidEmail;
  @gte('message.length', 5) isMessageLongEnough;
  @and('message.length', 'isMessageLongEnough') isValid;
  @not('isValid') isNotValid;
}
