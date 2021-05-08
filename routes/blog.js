const epxress = require('express');
const router = epxress.Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blogModel');
const Likes = require('../models/likeModel');
const verifyUser = require('../middlewares/authMiddleware');
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/', verifyUser, async (req, res) => {
	try {
		const { title, content } = req.body;
		if (!title || !content) {
			res.status(400).json({ message: 'Enter all the required details' });
			return;
		}

		const blog = new Blog({ title, content, writer: req.userId });
		await blog.save();

		const like = new Likes({ postId: blog._id });
		await like.save();

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
		const posts = await Blog.find()
			.select('-content -writer')
			.sort({ createdAt: -1 });

		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ message: 'some internal error occured' });
	}
});

router.get('/trending', async (req, res) => {
	try {
		const posts = await Blog.find()
			.select('-content -writer')
			.sort({ views: -1 });

		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ message: 'some internal error occured' });
	}
});

router.get('/post/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Blog.findOne({ _id: id });

		res.status(200).json({ post });

		post.views++;
		await post.save();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some internal error occured!' });
	}
});

//route for handling likes
router.get('/like/:id', async (req, res) => {
	try {
		let userId;
		if (req.headers['authorization']) {
			const token = req.headers['authorization'].split(' ')[1];
			userId = jwt.verify(token, 'test').userId;
		}

		const { id } = req.params;

		const likes = await Likes.findOne({ postId: id });
		let liked = false;

		const likedArray = likes.users.map((id) => JSON.stringify(id));

		if (userId) {
			const found = likedArray.find((user) => user == JSON.stringify(userId));
			if (found) {
				liked = true;
			}
		}

		res.status(200).json({ likeCount: likes.users.length, liked: liked });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some internal error occured!' });
	}
});

router.post('/like/:id', verifyUser, async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.userId;
		const likes = await Likes.findOne({ postId: id });

		let liked = false;
		const likedArray = likes.users.map((id) => JSON.stringify(id));

		const found = likedArray.find((user) => user == JSON.stringify(userId));

		if (found) {
			liked = false;
			likes.users.pull(new ObjectId(userId));
			console.log(likes);
		} else {
			liked = true;
			likes.users.push(userId);
		}

		console.log(liked);

		await likes.save();
		res.status(200).json({ likeCount: likes.users.length, liked: liked });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some internal error occured!' });
	}
});

module.exports = router;
