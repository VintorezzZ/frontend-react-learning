import Book from './data/Book';

export default class ApiService {
  static async fetchBooks() {
    const response = await fetch('http://localhost:80/backend-php-learning/index.php/getBooks');

    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.statusText}`);
    }

    const data = await response.json();

    // преобразуем объекты данных в экземпляры Book
    const book = data.map(item => new Book(item));
    return book;
  }

  static async saveBooks(books) {
    // books - массив объектов {title: string, author: string}

    const response = await fetch('http://localhost:80/backend-php-learning/index.php/saveBooks', {
      method: 'POST',
      body: JSON.stringify({ books }),
    });

    console.log(JSON.stringify({ books }));
    console.log("responce OK: ", response.ok);

    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);
    return result; // { status: 'success' | 'error', message: string }
  }
}