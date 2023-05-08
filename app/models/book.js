import Model, { attr, belongsTo } from '@ember-data/model';

export default class BookModel extends Model {
  @attr('string') title;
  @attr('date') releaseYear;
  @belongsTo library;
  @belongsTo author;

  randomize(author, library) {
    this.title = this._bookTitle();
    this.author = author;
    this.releaseYear = this._randomYear();
    this.library = library;

    return this;
  }

  _bookTitle() {
    return `${Faker.commerce.productName()} Cookbook`;
  }

  _randomYear() {
    return new Date(this._getRandomArbitrary(1900, 2015).toPrecision(4));
  }

  _getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
