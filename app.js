const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(__dirname); 

// Import the corrected routes
const urlRoutes = require('./routes/urls');

// Use the correct variable name for mounting routes
app.use('/', urlRoutes);  

app.listen(port, () => {
  console.log(`URL shortener running at http://localhost:${port}`);
});
