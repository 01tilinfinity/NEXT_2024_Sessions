const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
console.log(process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

app.post('/api/guestbook', async (req, res) => {
    const { name, message, password } = req.body;
    try {
        const lastEntry = await pool.query('SELECT message FROM guestbook ORDER BY id DESC LIMIT 1');
        const lastChar = lastEntry.rows.length > 0 ? lastEntry.rows[0].message.slice(-1) : null;

        if (lastChar && message[0] !== lastChar) {
            return res.status(400).json({ error: '끝말잇기 규칙에 맞지 않습니다.' });
        }

        const result = await pool.query(
            'INSERT INTO guestbook (name, message, password) VALUES ($1, $2, $3) RETURNING *',
            [name, message, password]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/guestbook', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/guestbook/:id', async (req, res) => {
    const { id } = req.params;
    const { message, password } = req.body;
    try {
        const result = await pool.query('SELECT password FROM guestbook WHERE id=$1', [id]);
        if (result.rows.length > 0 && result.rows[0].password === password) {
            const updateResult = await pool.query(
                'UPDATE guestbook SET message = $1 WHERE id = $2 RETURNING id,name,message,created_at',
                [message, id]
            );
            res.json(updateResult.rows[0]);
        } else {
            res.status(403).json({ error: '비밀번호가 일치하지 않습니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/guestbook/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const result = await pool.query('SELECT password FROM guestbook WHERE id = $1', [id]);
        if (result.rows.length > 0 && result.rows[0].password === password) {
            await pool.query('DELETE FROM guestbook WHERE id = $1', [id]);
            res.json({ message: '삭제되었습니다.' });
        } else {
            res.status(403).json({ error: '비밀번호가 일치하지 않습니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
