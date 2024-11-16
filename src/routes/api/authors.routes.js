const { registro, getAll, getById, login, update } = require('../../controllers/authors.controller');
const { authorIdExist, checkToken } = require('../../utilities/middlewares');


const router = require('express').Router();

router.get('/', getAll)
router.get('/:authorId', authorIdExist, getById)

router.post('/register', registro)
router.post('/login', login )

router.put('/:authorId', checkToken, authorIdExist, update)



module.exports = router;