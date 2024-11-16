const { selectAll, insertPost, selectById, delteById, selectByAuthor } = require("../models/posts.model")

const getAllPosts = async (req, res, next) => {
    try {
        const result = await selectAll()
        res.json(result[0])
    } catch (error) {
        next(error)
    }
}

const getPostAuthor = async (req, res, next) => {
    const {authorId} = req.params
    try {
        const result = await selectByAuthor(authorId)
        res.json(result[0])
    } catch (error) {
        next(error)
    }
}

const createPost = async (req, res, next) => {
    const {idauthors} = req.user
    req.body.author_id = idauthors
    try {
        const [result] = await insertPost(req.body);
        const post = await selectById(result.insertId)
        res.json(post)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    const {postId} = req.params;
    console.log(req.params)
    try {
        const post = await selectById(postId)
        res.json(post)
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    const  {idauthors}  = req.user
    const { postId } = req.params
    const post = await selectById(postId)
    const {title, author_id} = post
    if( idauthors != author_id) {
        return res.status(403).json({message: 'Solo puedes borrar tus posts'})
    }
    try {
        await delteById(postId)
        res.json({message: `El post ${title} ha sido borrado correctamente`})
    } catch (error) {
        next(error)
    }    
} 


module.exports = {
    getAllPosts,
    createPost,
    getById,
    deletePost,
    getPostAuthor
}