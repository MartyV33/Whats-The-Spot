const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/nature-trails-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes

app.get('/', (req, res) => {
    res.render('index');
});


// Starting the server
const PORT = process.env.PORT || 1650;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

