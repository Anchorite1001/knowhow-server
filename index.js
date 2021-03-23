const express = require('express');

//there are many projects with several express app but in this one there's only one 
const app = express();
app.get('/', (req, res) => {
    res.send({ hi:'there' });
});

app.listen(5000);