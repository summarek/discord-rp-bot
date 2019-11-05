const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Question = require('./Question');
const cors = require('cors')
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.get('/', async (req, res) => {
    try {
        const questions = await Question.find()
        res.send(questions)
    } catch (error) {
        console.log(error);
        
    }
})

app.post('/new-question', async (req, res) => {
    console.log(req.body);
	
	const que = new Question({
        nick: req.body.nick,
		question: req.body.question,
		answers: [req.body.answer1,req.body.answer2,req.body.answer3,req.body.answer4],
		rightIndex: req.body.rightIndex -1,
	});
	try {
		const SavedPost = await que.save();
		res.json(SavedPost);
	} catch (error) {
		console.log(error);
	}
});

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
	console.log('CONNECTED!');
});

app.listen(3000);
