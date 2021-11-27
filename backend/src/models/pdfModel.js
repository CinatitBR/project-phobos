import db from '../db.js'

const create = async ({ userId, filename, title, tagId, size, isPublic }) => {
  try {
    const sql = `
      INSERT INTO pdf (user_id, filename, title, tag_id, size, is_public)
      VALUES (?, ?, ?, ?, ?, ?)
    `

    const [results, fields] = await db.query(sql, [userId, filename, title, tagId, size, isPublic])

    // Return inserted id
    return results.insertId
  } 
  catch (e) {
    throw new Error(e)
  }
}

const findAll = async (userId) => {
  try {
    const sql = `
      SELECT pdf.id, pdf.filename, pdf.title, pdf.size, pdf.is_public, pdf.stars, 
        pdf_tag.tag_name
      FROM pdf 
      INNER JOIN pdf_tag
        ON pdf.tag_id = pdf_tag.id
      WHERE pdf.user_id = ?
    `

    const [rows, fields] = await db.query(sql, userId)

    return rows
  } catch(e) {
    throw new Error(e)
  }
}

const findByFilename = async (filename) => {
  const sql = `
    SELECT * FROM pdf
    WHERE filename = ?
  `

  try {
    const [rows, fields] = await db.query(sql, filename)

    return rows[0]
  }
  catch (e) {
    throw new Error(e)
  }
}

const findPublic = async (index, userId) => {
  try {
    const limit = 20
    const offset = (index - 1) * limit

    const sql = `
      SELECT pdf.id, pdf.filename, pdf.title, pdf.size, pdf.stars, 
      user.username AS author, 
      pdf_tag.tag_name,
      (SELECT COUNT(*) FROM added_public_pdf
        WHERE user_id = ${userId}
          AND pdf_id = pdf.id
        ) AS is_added,
      (SELECT COUNT(*) FROM public_pdf_like WHERE user_id = ${userId} AND pdf_id = pdf.id) AS is_liked
      FROM pdf
      INNER JOIN user
        ON pdf.user_id = user.id
      INNER JOIN pdf_tag
        ON pdf.tag_id = pdf_tag.id
      WHERE is_public IS TRUE
      LIMIT ${limit}
      OFFSET ${offset}
    `

    const [rows, fields] = await db.query(sql)

    return rows
  } catch(e) {
    throw new Error(e)
  }
}

const checkUserOwner = async (pdfId, userId) => {
  try {
    const sql = `
      SELECT * FROM pdf 
      WHERE id = ?
      AND user_id = ?
    `

    const [rows, fields] = await db.query(sql, [pdfId, userId])

    return rows[0]
  }
  catch(e) {
    throw new Error(e)
  }
}

const search = async (keyword) => {
  const sql = `
    SELECT page.id, pdf.title as pdf_title, pdf.filename as filename, page.number, 
    SUBSTRING(body, 1, LEAST(char_length(body), 400)) as text
    FROM page
    INNER JOIN pdf
    ON page.pdf_id = pdf.id
    WHERE MATCH(body) AGAINST(?)  
  `

  try {
    const [rows, fields] = await db.query(sql, keyword)

    return rows
  }
  catch(e) {
    throw new Error(e)
  }
}

const destroy = async (pdfId) => {
  try {
    const sql = `
      START TRANSACTION;

      DELETE FROM page
      WHERE pdf_id = ${pdfId};

      DELETE FROM public_pdf_like
      WHERE pdf_id = ${pdfId};
      
      DELETE FROM pdf 
      WHERE id = ${pdfId};
      
      COMMIT;
    `

    await db.query(sql)

    return
  }
  catch (e) {
    throw new Error(e)
  }
}

// pdf_tag (table)
const createTag = async (userId, tagName) => {
  try {
    const sql = `
      INSERT INTO pdf_tag (user_id, tag_name)
      VALUES (?, ?)
    `

    const [results, fields] = await db.query(sql, [userId, tagName])

    // Return tag id
    return results.insertId
  } 
  catch (e) {
    throw new Error(e)
  }
}

const findTagById = async id => {
  try {
    const sql = `
      SELECT tag_name FROM pdf_tag
      WHERE id = ?
    `

    const [rows, fields] = await db.query(sql, id)

    return rows[0]
  }
  catch (e) {
    throw new Error(e)
  }
}

const findAllTag = async userId => {
  try {
    const sql = `
      SELECT * FROM pdf_tag 
      WHERE user_id = ?
    `

    const [rows, fields] = await db.query(sql, userId)

    return rows
  }
  catch (e) {
    throw new Error(e)
  }
}

const stars = async (action, pdfId, userId) => {
  // Get connection from pool
  const conn = await db.getConnection()

  try {
    const sign = action === 'like' ? '+' : '-'

    const sqlLike = `
      INSERT INTO public_pdf_like (user_id, pdf_id)
      VALUES (?, ?)
    `

    const sqlUnlike = `
      DELETE FROM public_pdf_like
      WHERE user_id = ?
      AND pdf_id = ?
    `

    const sqlStars = `
      UPDATE pdf
      SET stars = stars ${sign} 1
      WHERE id = ?
    `

    // Start transaction
    await conn.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED')
    await conn.beginTransaction()

    // Update public_pdf_like
    if (action === 'like') 
      await conn.query(sqlLike, [userId, pdfId])
    else if (action === 'unlike') 
      await conn.query(sqlUnlike, [userId, pdfId])

    // Update stars field
    await conn.query(sqlStars, pdfId)

    // Finish transaction
    await conn.commit()

    return 
  }
  catch (e) {
    // Rollback transaction
    conn.rollback()

    throw new Error(e)
  }
}

const addToLibrary = async (pdfId, userId) => {
  try {
    const sql = `
      INSERT INTO added_public_pdf (pdf_id, user_id)
      VALUES (?, ?)
    `

    await db.query(sql, [pdfId, userId])
  }
  catch (e) {
    throw new Error(e)
  }
}

const removeFromLibrary = async (pdfId, userId) => {
  try {
    const sql = `
      DELETE FROM added_public_pdf
      WHERE pdf_id = ?
      AND user_id = ?
    `

    await db.query(sql, [pdfId, userId])
  }
  catch (e) {
    throw new Error(e)
  }
}

const pdfModel = { 
  create, 
  findAll,
  findByFilename, 
  search,
  destroy,
  createTag,
  findAllTag,
  findTagById,
  findPublic,
  stars,
  checkUserOwner,
  addToLibrary,
  removeFromLibrary
}

export default pdfModel