let users = [];
let nextId = 1;

export function createUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
}

export function getUsers(req, res) {
  res.json(users);
}
