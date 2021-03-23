const express = require('express');

//there are many projects with several express app but in this one there's only one 
const app = express();
app.get('/', (req, res) => {
    res.send({ hi:'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);