const { emit } = require('nodemon')
const pool = require('../config/dbBlog')

 function selectAll() {
    const result =  pool.query('select * from authors')
    return result
}

async function selectById(authorID) {
    const author = await pool.query('select * from authors where idauthors = ?', [authorID])
    return author
}

async function selectByEmail(email) {
    const [result] = await pool.query('select * from authors where email = ?', [email])
    if(result.length === 0 ) return null
    return result[0]
}


async function insertAuthor({name, email, image, password}) {
    const [response] = await pool.query('insert into authors (name, email, image, password) values(?,?,?,?)', [name, email, image, password ]);
    return response.insertId
}

async function updateAuthorById(author_id, {name, email, image, password}) {
    const response = await pool.query('update authors set name = ?, email = ?, image = ?, password = ? where idauthors = ?', [name, email, image, password, author_id])
    return response
}


module.exports = {
    insertAuthor,
    selectAll,
    selectById,
    selectByEmail,
    updateAuthorById
    
}