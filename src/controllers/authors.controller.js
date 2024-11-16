const bcrypt = require('bcryptjs')

const { insertAuthor, selectAll, selectById, selectByEmail, updateAuthorById } = require("../models/authors.model");
const { token } = require('../utilities/helpers');

// Example controller
const getAll = async (req, res, next) => {
    const authors = await selectAll()
        res.json(authors[0])
}

const getById = async (req, res, next) => {
    const { authorId } = req.params
    try {
        const [author] = await selectById(authorId)
        res.json(author)
    } catch (error) {
        next(error)
    }
}

const registro = async (req, res, next) => {
    
    req.body.password = await bcrypt.hash(req.body.password, 8);
    try {
        const author = await insertAuthor(req.body)
        res.json(`El autor ${req.body.name} ha sido creado correctamente`)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    // Comprobar que el mail existe
    const user = await selectByEmail(email)
    if(!user) {
        return res.status(401).json({message: 'Error en email y/o contraseña'})
    }
    // Comprobar que el password es correcto
    const same = await bcrypt.compare(password, user.password)
    if(!same) {
        return res.status(401).json({message: 'Error en email y/o contraseña'})
    }
    res.json({
        message: 'Login correcto',
        token: token(user)
    })
}

const update = async (req, res, next) => {
    const {authorId} = req.params
    req.body.password = await bcrypt.hash(req.body.password, 8);
    try {
        await updateAuthorById(authorId, req.body)
        const [author] = await selectById(authorId)
        res.json(author)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    registro,
    getById,
    login,
    update
}