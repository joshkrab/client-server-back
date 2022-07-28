const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Create DB in called variable:
const db = mysql.createPool({
	host: 'sql8.freemysqlhosting.net',
	user: 'sql8508851',
	database: 'sql8508851',
	password: 'w3CzAYFZVq',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/post', (req, res) => {
	// Приймаємо данні з запиту, та беремо їх у змінні:
	const start = req.body.start;
	const finish = req.body.finish;
	const day = req.body.day;
	//console.log(req.body);
	const sqlSelect = `SELECT * FROM trains WHERE startstation = '${start}' AND finishstation = '${finish}' AND (day1 = '${day}' OR day2 = '${day}' OR day3 = '${day}' OR day4 = '${day}');`;

	db.query(sqlSelect, (err, result) => {
		//console.log(err);
		res.send(result);
		// console.log(result);
	});
});

app.post('/api/other', (req, res) => {
	const start = req.body.start;
	const finish = req.body.finish;
	const day = req.body.day;

	const sqlSelect = `SELECT * FROM trains WHERE startstation = '${start}' AND finishstation != '${finish}' AND (day1 = '${day}' OR day2 = '${day}' OR day3 = '${day}' OR day4 = '${day}');`;

	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
});

// app.post('/api/insert', (req, res) => {
// 	// Приймаємо данні з запиту, та беремо їх у змінні:
// 	const startstation = req.body.startstation;
// 	const finishstation = req.body.finishstation;
// 	const day = req.body.day;

// 	const sqlInsert = `INSERT INTO trains (startstation, finishstation) VALUES (?, ?);`;

// 	db.query(sqlInsert, [startstation, finishstation], (err, result) => {
// 		console.log(err);
// 		console.log(result);
// 	});
// });

// Listener
app.listen(3001, () => {
	console.log('Running on port 3001');
});
