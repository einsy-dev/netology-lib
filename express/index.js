const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const { PORT, MONGO_URL } = require('dotenv').config().parsed;
const User = require('./src/models/User')

// Auth middleware package
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// import routes
const router = require('./src/routes/api');
const appRouter = require('./src/routes/app');
const userRouter = require('./src/routes/api/userRouter');
const port = PORT || 3000;

// Passport files
const verify = (username, password, done) => {
    User.findOne({ name: username }).then((user, err) => {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }

        if (!User.validate(password, user.password)) {
            return done(null, false)
        }

        return done(null, user)
    })
}

const options = {
    usernameField: "name",
    passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    User.findById(id).then((user, err) => {
        if (err) { return cb(err) }
        cb(null, user)
    })
})

const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session())

// Routes

app.use('/app', appRouter);
app.use('/api', router);
app.use('/user', userRouter);
app.use('/', (req, res) => res.redirect('/app'))


const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        await app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log('err' + error);
    }
}

start()
