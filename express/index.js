const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { parsed: { PORT, MONGO_URL } } = require('dotenv').config();

const app = express();
const router = require('./src/routes/api');
const appRouter = require('./src/routes/app');
const port = PORT || 3000;




app.use(express.json());
app.use('/api', router);

app.use('/app', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use('/', appRouter)



const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        await app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()