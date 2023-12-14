/* eslint-disable @typescript-eslint/no-explicit-any */
import Book from "../models/Book";
import path from "path";
import uuid from "uuid";
import fs from "fs";
import { Request, Response } from "express";
import container from "../inversify/inversify.config";
import { BooksRepository } from "../inversify/entities";
import { IBooksRepository } from "../inversify/interfaces";

class BookController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await Book.find();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const repo = container.get<IBooksRepository>(BooksRepository);
    const book = await repo.getBook(id);
    res.json(book);

    /*  try {
      const data = await Book.findById(id);
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    } */
  }
  async create(req: Request | any, res: Response) {
    const { title, description, authors, fileName } = req.body;
    const { fileCover, fileBook } = req.files;

    if (
      !title ||
      !description ||
      !authors ||
      !fileName ||
      !fileCover ||
      !fileBook
    ) {
      return res.status(400).send({ message: "Please fill in all fields" });
    }

    try {
      const newBook = await new Book({
        title,
        description,
        authors,
        favorite: false,
        fileName,
      });

      const dirPath = path.resolve(
        __dirname,
        "../..",
        `public/images/${newBook._id}`
      );
      fs.mkdirSync(dirPath);

      const book = saveFile(fileBook, dirPath);
      const cover = saveFile(fileCover, dirPath);

      await newBook.set({ fileBook: book, fileCover: cover[0] });
      await newBook.save();

      const data = await Book.find().select("-__v");
      res.render("index", { type: "index", data: data });
    } catch (error) {
      console.error(error);
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      title,
      description,
      authors,
      favorite,
      fileName,
      fileCover,
      fileBook,
    } = req.body;

    if (!title || !description || !authors || !fileName) {
      return res.status(400).send({ message: "Please fill in all fields" });
    }

    try {
      if (fileCover || fileBook) {
        const dirPath = path.resolve(__dirname, "../..", `public/images/${id}`);

        if (fileCover) {
          const cover = saveFile(fileCover, dirPath);
          await Book.findByIdAndUpdate(id, { fileCover: cover[0] });
        }

        if (fileBook) {
          const book = saveFile(fileBook, dirPath);
          await Book.findByIdAndUpdate(id, { fileBook: book });
        }
      }

      await Book.findByIdAndUpdate(id, {
        title,
        description,
        authors,
        favorite,
        fileName,
      });

      const data = await Book.find().select("-__v");
      res.render("index", { type: "index", data: data });
    } catch (error) {
      console.log(error);
    }
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await Book.findByIdAndDelete(id);
      res.status(200).send({ message: "Book deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}

function saveFile(array: any, dirPath: string) {
  const images: string[] = [];
  array.map((file: any) => {
    const fileName = uuid.v4() + ".jpg";
    images.push(fileName);
    fs.writeFileSync(path.join(dirPath, fileName), file.buffer);
  });
  return images;
}

export default new BookController();
