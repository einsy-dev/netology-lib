import { injectable } from "inversify";
import { Book, IBooksRepository } from "./interfaces";


@injectable()
class BooksRepository extends IBooksRepository {
  getBooks(): void {
   console.log("Method not implemented.");
  }
  getBook(id: string): void {
    console.log("Method not implemented." + id);
  }
  createBook(book: Book): void {
    console.log("Method not implemented." + book);
  }
  updateBook(book: Book): void {
    console.log("Method not implemented." + book);
  }
  deleteBook(id: string): void {
    console.log("Method not implemented." + id);
  }
  
}

export { BooksRepository } 