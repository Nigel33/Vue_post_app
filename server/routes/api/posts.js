const express = require('express');
const mongodb = require('mongodb');
const uri = "mongodb+srv://Nigel33:Nigel1991!@cluster0-ktndn.mongodb.net/test?retryWrites=true&w=majority"
const router = express.Router();

router.get('/', async (req, res) => {	
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date(),
	});

	res.status(201).send();
});

router.delete('/:id', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

async function loadPostsCollection() {
	client = await mongodb.MongoClient.connect(uri, {
		useNewUrlParser: true,
	});

	return client.db('test').collection('posts');
}


// function loadPostsCollection() {
// 	return db.collection('posts');
// }



module.exports = router; 