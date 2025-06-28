exports.validateUser = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing name' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid or missing email' });
    }
    next();
  };
  
  exports.validateId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
  };
  