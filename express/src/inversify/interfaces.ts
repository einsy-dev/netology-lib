import { injectable } from "inversify";

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

@injectable()
abstract class IBooksRepository {
  abstract getBooks(): void;
  abstract getBook(id: string): void;
  abstract createBook(book: Book): void;
  abstract updateBook(book: Book): void;
  abstract deleteBook(id: string): void;
}

export { IBooksRepository, Book };
