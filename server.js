const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());


const mockUser = {
  email: 'hello@email.fr',
  password: 'helloaaa9',
  name: 'John Doe'
};


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    res.json({
      email: mockUser.email,
      name: mockUser.name
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});