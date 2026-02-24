const express = require('express')
const app = express()
app.get('/',(req, res)=>{
    res.send ('hello word')
});

app.get('/say:moma', (req, res) => {
    res.send ('ELO MOMAA!!')
});

app.get('/say:greeting', (req, res) => {
    const { greeting } = req.params;
    res.send(greeting);
});
app.listen(3000)
