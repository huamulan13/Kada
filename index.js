const express = require('express')
const app = express()
app.get('/',(req, res)=>{
    res.send ('hello word')
});

app.get('/mima', (req, res) => {
    res.status(401).send('Gak boleh masuk! ELO BUKAN MOMAA!!');
});

app.get('/say:moma', (req, res) => {
    res.send ('ELO MOMAA!!')
});

app.get('/say:greeting', (req, res) => {
    const { greeting } = req.params;
    res.send(greeting);
});
app.listen(3000)
