const pool = require("../config/dbBlog");

function selectAll() {
    return pool.query(
        'select * from posts inner join authors on posts.author_id = authors.idauthors group by posts.idposts')
}

function selectByAuthor(authorId) {
    return pool.query('select * from posts inner join authors on posts.author_id = authors.idauthors where posts.author_id = ? group by posts.idposts ', [authorId])
}

async function selectById(postId) {
    const [post] = await pool.query('select * from posts inner join authors on posts.author_id = authors.idauthors where posts.idposts = ?', [postId])
    return post[0]
}

function insertPost({title, description, category, author_id}) {
    return pool.query('insert into posts (title, description, category, author_id) values (?, ?, ?, ?)',[title, description, category, author_id])
}

function delteById(postId) {
    return pool.query('delete from posts where idposts = ?', [postId])
}


module.exports = {
    selectAll,
    insertPost,
    selectById,
    delteById,
    selectByAuthor
}