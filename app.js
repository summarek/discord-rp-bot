const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const url = 'mongodb://127.0.0.1:27017'

mongoose.connect(url, { useNewUrlParser: true })


mongoose.connection.on('error', err => {   logError(err); });

const db = mongoose.connection
db.once('open', _ => {   console.log('Database connected:', url) })
db.on('error', err => {   console.error('connection error:', err) })

var questionSchema = mongoose.Schema({     question: String,     answers: Array, nick: String, rightIndex:Number });

var Quest = mongoose.model('Quest', questionSchema);

app.listen(3000);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/people', async (req, res) => {
	res.send(await Quest.find())
})

app.post('/new-question', async (req, res) => {
    	console.log("????")
	console.log(req.body);
	
	var testQuest = await new Quest({
        	nick: req.body.nick,
		question: req.body.question,
		answers: [req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4],
		rightIndex: parseInt(req.body.rightIndex) -1,
		
	});

	testQuest.save(function(err){         if(err) throw err;         console.log("SUCCESS")  })
	res.send("Twoje pytanie zostało dodane do bazy danych! Aby dodać kolejne wróć na http://167.71.34.32/ !")

});

