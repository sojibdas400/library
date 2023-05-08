import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AdminSeederController extends Controller {
  genearateLibraries(volume) {
    this.genearateLibrariesInProgress = true;
    const counter = parseInt(volume);
    let savedLibraries = [];

    for (let i = 0; i < counter; i++) {
      savedLibraries.push(this._savedRandomLibrary());
    }

    all(savedLibraries).then(() => {
      this.genearateLibrariesInProgress = false;
      this.libDone = true;
    });
  }

  deleteLibraries() {
    this.deleteLibrariesInProgress = true;
    this._destroyAll(this.libraries).then(() => {
      this.libDelDone = true;
      this.deleteLibrariesInProgress = false;
    });
  }

  generateBooksAndAuthors(volume) {
    this.generateBooksInProgress = true;

    const counter = parseInt(volume);
    let booksWithAuthors = [];

    for (let i = 0; i < counter; i++) {
      const books = this._saveRandomAuthor().then((newAuthor) =>
        this._generateSomeBooks(newAuthor)
      );
      booksWithAuthors.push(books);
    }
    all(booksWithAuthors).then(() => {
      this.authDone = true;
      this.generateBooksInProgress = false;
    });
  }

  deleteBooksAndAuthors() {
    this.deleteBooksInProgress = true;

    const authors = this.authors;
    const books = this.books;

    this._destroyAll(authors)
      .then(() => this._destroyAll(books))
      .then(() => {
        this.authDelDone = true;
        this.deleteBooksInProgress = false;
      });
  }

  _savedRandomLibrary() {
    return this.store.createRecord('library').randomize().save();
  }

  _generateRandomAuthor() {
    return this.store.createRecord('author').randomize().save();
  }

  _generateSomeBooks(author) {
    const bookCounter = Faker.random.number(10);
    let books = [];

    for (let i = 0; i < bookCounter; i++) {
      const library = this._selectRandomLibrary();

      const bookPromise = this.store
        .createRecord('book')
        .randomize(author, library)
        .save()
        .then(() => author.save())
        .then(() => library && library.save());
      books.push(bookPromise);
    }
  }

  _selectRandomLibrary() {
    const libraries = this.libraries;
    const size = libraries.length;
    const randomItem = Faker.random().number(size - 1);

    return libraries.objectAt(randomItem);
  }

  _destroyAll(records) {
    const recordAreDestroying = records.map((item) => item.destroyRecord());

    return all(recordAreDestroying);
  }
}
