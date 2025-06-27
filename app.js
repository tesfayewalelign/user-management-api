const express = require('express');

const app = express();
const PORT = 3000;
let users = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});


app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  console.log('POST /users body:', req.body);
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const user = users.find(u => u.id === id); 

  if (user) {
    res.json(user); 
  } else {
    res.status(404).json({ message: 'User not found' }); 
  }
});
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find(u => u.id === id);

  if (user) {
    user.name = name || user.name;  
    user.email = email || user.email; 
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index !== -1) {
    users.splice(index, 1); 
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});





app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));


