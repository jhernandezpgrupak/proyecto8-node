const http = require('http');
const express = require('express');
const log = require('./logs/logs');

let notes = [
    {    
        "id" :1,
        "name": "Primer nota"
    },
    {   
        "id" :2,
        "name": "Segunda nota"
    },
    {   
        "id" :3,
        "name": "Tercer nota"
    },
    {   
        "id" :4,
        "name": "Cuarta nota"
    },
    {   
        "id" :5,
        "name": "Quinta nota"
    }
]

const app = express();
app.use(express.json())

app.use(log)

app.get('/', (req, res)=>{
    res.send('<h1>Hola, esto es una API en Node JS</h1>')
}) 

app.get('/api/notes', (req, res, next)=>{
    res.json(notes)
    next()
})

app.get('/api/notes/:id', (req, res)=>{
    const id = req.params.id
    const note = notes.find(note => note.id==id)
    if(!note){
        res.status(404).end()
    }
    res.json({note})
})

app.delete('/api/notes/:id', (req, res) =>{
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id != id)
    res.status(204).end()
})

app.post('/api/notes', (req, res)=>{
    const note = req.body

    if(!note || !note.name){
        return res.status(400).json({
            error : 'note.name is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    
    const newNote = {
        id : maxId + 1,
        name : note.name
    }

    notes = notes.concat(newNote)
    res.status(201).json(newNote)
})
// const app = http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-type':'application/json'})
//     res.end(JSON.stringify(notes)) 
// })

app.use((req, res, next)=>{
    console.log(req.path)
    next();
})

const PORT =5000
app.listen(PORT, ()=>{
    console.log("¡Hola mundo!, ejecuta http://localhost:5000/");
})
