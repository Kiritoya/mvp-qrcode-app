const express = require('express');
const router = express.Router();
const db = require('../database');
const { v4: uuidv4 } = require('uuid');

// Enregistrer un participant
router.post('/:id/participants', (req, res) => {
  const eventId = req.params.id;
  const { birth_year, gender } = req.body;
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  db.run(
    `INSERT INTO participants (id, event_id, birth_year, gender, timestamp) VALUES (?, ?, ?, ?, ?)`,
    [id, eventId, birth_year, gender, timestamp],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, eventId });
    }
  );
});

// Récupérer les stats de l'événement
router.get('/:id/stats', (req, res) => {
  const eventId = req.params.id;

  db.all(
    `SELECT birth_year FROM participants WHERE event_id = ?`,
    [eventId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      const total = rows.length;
      const avgAge =
        total > 0
          ? 2026 - rows.reduce((sum, r) => sum + r.birth_year, 0) / total
          : 0;

      res.json({ total, avgAge });
    }
  );
});

module.exports = router;
