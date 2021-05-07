const epxress = require('express');
const router = epxress.Router();
const Blog = require('../models/blogModel');

router.post('/', async (req, res) => {
	try {
		const { title, content } = req.body;
		if (!title || !content) {
			res.status(400).json({ message: 'Enter all the required details' });
			return;
		}
		console.log(req.userId);

		const blog = new Blog({ title, content, writer: req.userId });
		await blog.save();

		res.status(201).json({ message: 'posted successfully' });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Internal error occured, try after some time' });
	}
});

router.get('/', async (req, res) => {
	try {
		const posts = await Blog.find();

		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ message: 'some internal error occured' });
	}
});

router.get('/trending', async (req, res) => {
	try {
		const posts = await Blog.find();

		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ message: 'some internal error occured' });
	}
});

module.exports = router;
