const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const eventsRoutes = require('./routes/events');
const participantsRoutes = require('./routes/participants');

app.use('/events', eventsRoutes);
app.use('/events', participantsRoutes);

const path = require('path');
// Servir le frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Lancer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

