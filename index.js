const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/api/health', (req, res) => {
    res.send('It is alive!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));