const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017'
mongoose.connect(url, { useNewUrlParser: true })


mongoose.connection.on('error', err => {   logError(err); });


const db = mongoose.connection
db.once('open', _ => {   console.log('Database connected:', url) })
db.on('error', err => {   console.error('connection error:', err) })


var questionSchema = mongoose.Schema({     question: String,     anwsers: Array, nick: String, rightIndex:String });

var Quest = mongoose.model('Quest', questionSchema);


var testQuest = new Quest ({
	question: "Ile lat ma imba?",
	anwsers: [1,2,3,4],
	nick: "pawlacz",
	rightIndex:"1"

});

testQuest.save(function(err){
	if(err) throw err;
	console.log("SUCCESS")

})


