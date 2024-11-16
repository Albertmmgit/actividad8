const router = require('express').Router();

const { getAllPosts, createPost, getById, deletePost, getPostAuthor } = require('../../controllers/posts.controller');
const { checkToken, selectPostbyId, postIdExist, authorIdExist } = require('../../utilities/middlewares');



router.get('/', getAllPosts);
router.get('/:postId', postIdExist, getById)
router.get('/posts/:authorId', authorIdExist, getPostAuthor)

router.post('/', checkToken, createPost )

router.delete('/:postId', checkToken, deletePost )

module.exports = router;