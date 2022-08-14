const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database 
const database = mysql.createConnection({
        host: 'localhost',
        port: '3001',
        user: 'root',
        password: 'Malcolm_01',
        database: 'departments'
    },
    console.log('connected')
);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});