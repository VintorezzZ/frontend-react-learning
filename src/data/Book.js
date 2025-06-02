export default class Book {
  title;
  author;
  id;

  constructor({ title, author, id }) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  getTitle() {
    return `${this.title}`;
  }

  getAuthorName() {
    return `${this.author}`;
  }

  getId() {
    return `${this.id}`;
  }
}