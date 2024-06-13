const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user'); // Assuming the User model is exported correctly
const app = express();
const port = process.env.PORT || 80;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine
app.set('views', './views');
app.set('view engine', 'pug');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/search', (req, res) => {
  res.render('search');
});

// Register User
app.post('/register', async (req, res) => {
  try {
    const { username, password, age, mobile } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hash,
      age,
      mobile
    });

    const result = await newUser.save();
    console.log(result);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering new user.');
  }
});

// Login User
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).redirect('/register');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log('Login successful');
      res.send('Welcome');
    } else {
      res.status(400).send('Invalid password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in.');
  }
});

// Search (placeholder)
app.post('/search', (req, res) => {
  console.log(req.body);
  res.send('Search functionality not implemented yet.');
});

// Start server
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
