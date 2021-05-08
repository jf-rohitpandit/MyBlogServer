const epxress = require('express');
const router = epxress.Router();
const Blog = require('../models/blogModel');
const verifyUser = require('../middlewares/authMiddleware');

router.post('/', verifyUser, async (req, res) => {
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
		const posts = await Blog.find().select('-content -writer');

		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ message: 'some internal error occured' });
	}
});

router.get('/trending', async (req, res) => {
	try {
		const posts = await Blog.find().select('-content -writer');

		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ message: 'some internal error occured' });
	}
});

router.get('/post/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		const post = await Blog.findOne({ _id: id });
		res.status(200).json({ post });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some internal error occured!' });
	}
});

module.exports = router;
