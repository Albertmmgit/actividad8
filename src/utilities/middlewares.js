const jwt = require('jsonwebtoken');
const { selectById: selectAuthorById } = require('../models/authors.model');
const { selectById: selectPostbyId } = require('../models/posts.model')

const authorIdExist = async (req, res, next) => {
    const { authorId} = req.params;
    if(isNaN(authorId)) {
        return res.status(400).json({message: 'El valor del Id debe ser numerico'})
    }
    const author = await selectAuthorById(authorId)
    if(!author) {
        return res.status(404).json({message: 'El Id introducido no existe en la base de datos'})
    }
    next()
}

const postIdExist = async (req, res, next) => {
    const { postId} = req.params;
    if(isNaN(postId)) {
        return res.status(400).json({message: 'El valor del Id debe ser numerico'})
    }
    const post = await selectPostbyId(postId)
    if(!post) {
        return res.status(404).json({message: 'El Id introducido no existe en la base de datos'})
    }
    next()
}

const checkToken = async (req, res, next) => {
    if(!req.headers['authorization']) {
        return res.status(403).json({message: 'Falta la cabezera Authorization'})
    }
    const token = req.headers['authorization']
    let data
    try {
        data = jwt.verify(token, 'actividad8');
    } catch (error) {
        res.status(403).json({message: 'El token no es correcto'})
    }
    const [user] = await selectAuthorById(data.userId);
    if(!user) {
        return res.status(403).json({message: 'Usuario inexistente'})
    }
     
    req.user = user[0]

    next()
}

module.exports = {
    checkToken,
    authorIdExist,
    postIdExist

}