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
  abstract getBooks(): Promise<Book[]>;
  abstract getBook(id: string): Promise<Book>;
  abstract createBook(book: Book): Promise<void>;
  abstract updateBook(book: Book): Promise<void>;
  abstract deleteBook(id: string): Promise<void>;
}

module.exports = BooksRepository;
