import app from './app';
import dotenv from 'dotenv';

import express from 'express';

dotenv.config();




app.use(express.json());




const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});




