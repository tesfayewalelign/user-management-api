import { Request, Response } from 'express';
import { pool } from '../config/db';

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const [result]: any = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database Error' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database Error' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
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
