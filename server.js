const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 5000;


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'hello@email.fr' && password === 'helloaaa9') {
    req.session.user = { name: 'Sami', email };
    res.json({ name: 'Sami', email });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});