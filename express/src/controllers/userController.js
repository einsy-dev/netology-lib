class UserController {
    async login(req, res) {
        try {
            res.status(201).send({ id: 1, mail: "test@mail.ru" })
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()