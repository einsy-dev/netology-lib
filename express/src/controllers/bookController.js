const Book = require('../models/Book');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const zip = require('express-zip');

class BookController {
    async getAll(_, res) {
        try {
            const data = await Book.find();
            res.status(200).send(data);
        } catch (error) {
            console.log(error)
        }
    }
    async getById(req, res) {
        const { id } = req.params
        try {
            const data = await Book.findById(id);
            res.status(200).send(data);
        } catch (error) {
            console.log(error)
        }
    }
    async create(req, res) {
        const { title, description, authors, fileName } = req.body;
        const { fileCover, fileBook } = req.files;

        if (!title || !description || !authors || !fileName || !fileCover || !fileBook) {
            return res.status(400).send({ message: 'Please fill in all fields' });
        }

        function saveFile(array, dirPath) {
            const images = [];
            array.map(file => {
                const fileName = uuid.v4() + ".jpg";
                images.push(fileName);
                fs.writeFileSync(path.join(dirPath, fileName), file.buffer);
            });
            return images;
        }

        try {
            const newBook = await new Book({ title, description, authors, favorite: false, fileName });

            const dirPath = path.resolve(__dirname, '../..', `public/images/${newBook._id}`);
            fs.mkdirSync(dirPath);

            const book = saveFile(fileBook, dirPath);
            const cover = saveFile(fileCover, dirPath);

            await newBook.set({ fileBook: book, fileCover: cover[0] });
            await newBook.save();

            const data = await Book.find().select('-__v');
            res.render('index', { type: 'index', data: data });

        } catch (error) {
            console.error(error);
        }
    }
    async update(req, res) {
        const { id } = req.params
        const { title, description, authors, favorite, fileName, fileCover, fileBook } = req.body

        if (!title || !description || !authors || !fileName) {
            return res.status(400).send({ message: 'Please fill in all fields' });
        }

        try {
            if (fileCover || fileBook) {
                const dirPath = path.resolve(__dirname, '../..', `public/images/${id}`);

                if (fileCover) {
                    const cover = saveFile(fileCover, dirPath);
                    await Book.findByIdAndUpdate(id, { fileCover: cover[0] });
                }

                if (fileBook) {
                    const book = saveFile(fileBook, dirPath);
                    await Book.findByIdAndUpdate(id, { fileBook: book });
                }
            }

            await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileName });

            const data = await Book.find().select('-__v');
            res.render('index', { type: 'index', data: data });
        } catch (error) {
            console.log(error)
        }
    }
    async delete(req, res) {
        const { id } = req.params
        try {
            await Book.findByIdAndDelete(id);
            res.status(200).send({ message: 'Book deleted' });
        } catch (error) {
            console.log(error)
        }
    }

    async download(req, res) {
        const { id } = req.params;

        try {
            const book = await Book.findById(id);
            const files = book.fileBook.map(el => ({
                path: path.resolve(__dirname, '..', `public/images/${id}/${el}`),
                name: el
            }));

            res.set('Content-Type', 'application/zip');
            res.set('Content-Disposition', `attachment; filename=${id}.zip`);

            res.zip(files, `${id}.zip`, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Files sent successfully');
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new BookController()
