const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const port = process.env.PORT || 9090;

const app = express();


app.use(express.json())
app.use(cors());


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tempToDo",
});


app.post('/getinfo', (req, res) => {
    res.json({ message: "Hello world!" })
    // console.log(req);
})

app.get('/todo/getdata', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.release();
        if (err) {
            console.log(err);
        }
        else {
            // console.log(req);
            connection.query('SELECT * FROM sampleToDo order by createdOn', (error, tasks) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(tasks);
                    res.json(tasks);
                }
            })
        }
    })
})

app.get('/todo/getdata/low', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.release();
        if (err) {
            console.log(err);
        }
        else {
            // console.log(req);
            connection.query('SELECT * FROM sampleToDo where priority like "low" order by createdOn', (error, tasks) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(tasks);
                    res.json(tasks);
                }
            })
        }
    })
})

app.get('/todo/getdata/medium', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.release();
        if (err) {
            console.log(err);
        }
        else {
            // console.log(req);
            connection.query('SELECT * FROM sampleToDo where priority like "medium" order by createdOn', (error, tasks) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(tasks);
                    res.json(tasks);
                }
            })
        }
    })
})

app.get('/todo/getdata/high', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.release();
        if (err) {
            console.log(err);
        }
        else {
            // console.log(req);
            connection.query('SELECT * FROM sampleToDo where priority like "high" order by createdOn', (error, tasks) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(tasks);

                    res.json(tasks);
                }
            })
        }
    })
})

app.post('/todo/delete', (req, res) => {
    pool.getConnection((error, connection) => {
        connection.release();
        if (error) {
            console.log(error);
        }
        else {
            console.log(req.body.id);
            let query = 'delete from sampleToDo where id=' + req.body.id;
            connection.query(query, (err, response) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(response);
                    res.json({ msg: "response" });
                }

            })
        }
    })
})

app.post('/added', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }
        else {
            var { taskName, status, priority, dueDate } = req.body;
            let statusIndication = (status == 'Completed') ? '#28C940' : (status == 'Incomplete') ? '#FF5F57' : '#FFBD2E';
            let createdOn = new Date();
            let opacity = '0.5';
            pool.query(
                'INSERT INTO sampleToDo (taskName, status, statusIndication, priority, createdOn, dueDate, opacity) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [taskName, status, statusIndication, priority, createdOn, dueDate, opacity],
                (error, results) => {
                    if (error) throw error;
                    res.send('Task added successfully!');
                }
            );
        }
    })
});























app.listen(port, () => console.log('listening port - ', port));