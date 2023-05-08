import Component from '@glimmer/component';
import { gte, not, or } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const MAX_VALUE = 100;

export default class SeederBlockComponent extends Component {
  @tracked counter = null;

  @gte('counter', MAX_VALUE) isCounterValid;
  @not('isCounterValid') isCounterNotValid;

  placeholder = `Max ${MAX_VALUE}`;
  @tracked generateReady = false;
  @tracked deleteReady = false;
  @tracked generateInProgress = false;
  @tracked deleteInProgress = false;

  @or('isCounterNotValid', 'generateInProgress', 'deleteInProgress')
  generateIsDisabled;
  @or('generateInProgress', 'deleteInProgress') deleteIsDisabled;

  @action generateAction() {
    if (this.isCounterNotValid) {
      this.sendAction('generateAction', this.counter);
    }
  }

  @action deleteAction() {
    this.sendAction('deleteAction');
  }
}
