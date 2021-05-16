const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001; //establishes the port
const app = express(); // initializes the server

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //parses the body as json
app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).end();
  }); //returns error 404 is a request not entered is searched

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});