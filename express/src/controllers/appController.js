const Book = require('../models/Book');


class AppController {
    async main(req, res) {
        const { type } = req.params
        try {
            if (type === 'view') {
                const { id } = req.params
                const data = await Book.findById(id).select('-__v');
                res.render('index', { type: 'view', data: data });
            }
            else if (type === 'create') {
                res.render('index', { type: 'create' });
            }
            else if (type === 'update') {
                const { id } = req.params
                const data = await Book.findById(id).select('-__v');
                res.render('index', { type: 'update', data: data });
            }
            else {
                const data = await Book.find().select('-__v');
                res.render('index', { type: 'index', data: data });
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AppController()    