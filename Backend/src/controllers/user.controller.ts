
import { Request, Response } from 'express';
import { pool } from '../config/db';
import { ResultSetHeader } from 'mysql2';
import { RowDataPacket } from 'mysql2';
import { User } from '../models/user.model';
import { isValidId } from '../validation/user.validation';
import { isEmailValid, isPasswordStrong, areFieldsValid } from '../validation/user.validation';

export const createUser = async (req: Request, res: Response): Promise<void> => {

    const { name, email, password } = req.body;
    if (!areFieldsValid(name, email, password)) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
     if (!isEmailValid(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }

    if (!isPasswordStrong(password)) {
        res.status(400).json({ error: 'Weak password. Must meet complexity rules.' });
        return;
    }

   
    try {
         
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        res.status(201).json({
            id: result.insertId, 
            name,
            email
        });

    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Database Error' });
    }
};
export const getUsers=async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, name, email FROM users'
        );

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database Error' });
    }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  if (!isValidId(id)) {
        res.status(400).json({ error: 'Invalid user ID. Must be a positive number.' });
        return;
    }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(rows[0]);
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database Error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        await pool.query(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]
        );
        res.json({ message: 'User Updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database Error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database Error' });
    }
};
