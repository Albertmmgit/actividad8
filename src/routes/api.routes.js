const router = require('express').Router();

router.use('/posts', require('./api/posts.routes'))
router.use('/authors', require('./api/authors.routes'))

module.exports = router