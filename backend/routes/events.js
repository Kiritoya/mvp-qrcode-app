const express = require('express');
const router = express.Router();
const db = require('../database');
const QRCode = require('qrcode');

// Créer un événement
router.post('/', (req, res) => {
  const { name } = req.body;
  const date = new Date().toISOString();

  db.run(
    `INSERT INTO events (name, date) VALUES (?, ?)`,
    [name, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const eventId = this.lastID;
      res.json({ id: eventId, name, date });
    }
  );
});

// Générer un QR code pour l'événement
router.get('/:id/qr', async (req, res) => {
  const eventId = req.params.id;
  const url = `https://TON-URL-RENDER.onrender.com/index.html?event_id=${eventId}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(url);
    res.json({ qr: qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
