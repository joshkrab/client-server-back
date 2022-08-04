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
	// Data from request to variable:
	const start = req.body.start;
	const finish = req.body.finish;
	const day = req.body.day;

	const sqlSelect = `SELECT * FROM trains WHERE startstation = '${start}' AND finishstation = '${finish}' AND (day1 = '${day}' OR day2 = '${day}' OR day3 = '${day}' OR day4 = '${day}');`;

	db.query(sqlSelect, (err, result) => {
		res.send(result);
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

// Listener
app.listen(3001, () => {
	console.log('Running on port 3001');
});
