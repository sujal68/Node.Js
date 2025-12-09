const express = require('express');
const path = require('path');
const PORT = 6800;
const app = express();

let Task = [
    {
        Id: 1,
        Todaytask: "Exercise In 6:30pm.",
        TaskDetails: "Do 30 minutes of cardio and strength training.",
        StartTime: "18:00",
        EndTime: "19:00"
    },
    {
        Id: 2,
        Todaytask: "Grocery Shopping",
        TaskDetails: "Buy vegetables, fruits, and dairy products.",
        StartTime: "10:00",
        EndTime: "11:30"
    },
    {
        Id: 3,
        Todaytask: "Read a Book",
        TaskDetails: "Finish reading 'The Alchemist' by Paulo Coelho.",
        StartTime: "20:00",
        EndTime: "21:00"
    }
]
let id = 2;

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));


app.post('/AddTask', (req, res) => {
    const task = req.body;
    task.Id = id;
    id++;
    Task.push(task);
    res.redirect('/');
})

app.get('/delete', (req, res) => {
    let TaskId = req.query.id;
    Task = Task.filter((Task) => Task.Id != TaskId)
    res.redirect('/');
})

app.post('/Edit', (req, res) => {
    Task = Task.map((task) => {
        if (task.Id == req.body.Id) {
            return req.body;
        } else {
            return task;
        }

    })
    res.redirect('/');
})

app.get('/update', (req, res) => {
    const task = Task.find((task) => task.Id == req.query.id)
    res.render('EditPage', { task })
})

app.get('/check', (req, res) => {
    let TaskId = req.query.id;

    Task = Task.map((task) => {
        if (task.Id == TaskId) {
            task.completed = !task.completed;
        }
        return task;
    });


    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('home', {
        Task,
    });
})

app.listen(PORT, (error) => {
    if (error) {
        console.log("Server Is Not Started....", error);
        return false;
    }
    console.log("Server Are Connected Is this Port https://localhost:6800 😄");
})