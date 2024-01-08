const router = require('express').Router();
const apiRoutes = require('./api');

// in order to access api folder, need to add /api to base server url
//ie http://localhost:3001/api

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;