const express= require('express');
const app=express();
const port = 3000;

app.use(express.json());
let users = [];
let nextId = 1;
app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
  });
   

  app.get('/users', (req, res) => {
    res.json(users);
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
  app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
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
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
           