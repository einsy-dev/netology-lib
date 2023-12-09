interface Book {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string[];
}

abstract class BooksRepository {
  getBooks(): void {
    console.log("Abstract class method");
  }
  getBook(id: string): void {
    throw new Error("Method not implemented." + id);
  }
  abstract createBook(book: Book): void;
  abstract updateBook(book: Book): void;
  abstract deleteBook(id: string): void;
}

class Repo extends BooksRepository {
  createBook(book: Book): void {
    throw new Error("Method not implemented." + book);
  }
  updateBook(book: Book): void {
    throw new Error("Method not implemented." + book);
  }
  deleteBook(id: string): void {
    throw new Error("Method not implemented." + id);
  }
}
module.exports = Repo