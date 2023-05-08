import { set } from '@ember/object';
import Model, { attr, hasMany } from '@ember-data/model';
import { empty } from '@ember/object/computed';
import Faker from 'faker';

export default class AuthorModel extends Model {
  @attr('string') name;
  @hasMany books;

  @empty('name') isNotValid;

  randomize() {
    set(this, 'name', Faker.name.findName());

    return this;
  }
}
