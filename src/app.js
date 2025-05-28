const express = require('express');

const app = express();


app.get('/user', (req, res) => {
    res.send({name: 'sanjay', mobile: '8527020679'})
})

app.post('/user', (req, res) => {
    res.send("This is the post call")
})

app.delete('/user', (req, res) => {
    res.send("This is the delete call")
})

app.patch('/user', (req, res) => {
    res.send("This is the patch call")
})

app.put('/user', (req, res) => {
    res.send("This is the put call")
})

// app.use('/test', (req, res) => {
//     res.send('Test from the server!')
// })
// app.use('/hello', (req, res) => {
//     res.send('Hello from the server!')
// })

// app.use('/', (req, res) => {
//     console.log("Hello Sanjay")
// })

app.listen(7777, () => {
    console.log('Server is started!')
});