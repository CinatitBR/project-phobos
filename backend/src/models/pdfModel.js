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
    const sqlPersonal = `
      SELECT pdf.*, pdf_tag.tag_name
      FROM pdf 
      INNER JOIN pdf_tag
        ON pdf.tag_id = pdf_tag.id
      WHERE pdf.user_id = ?
    `

    const sqlAdded = `
      SELECT * FROM pdf 
      INNER JOIN pdf_tag
        ON pdf.tag_id = pdf_tag.id
      WHERE pdf.id IN (SELECT pdf_id FROM added_public_pdf WHERE user_id = ${userId})
    ` 

    const [personalFiles, fields] = await db.query(sqlPersonal, userId)
    const [addedFiles, fields1] = await db.query(sqlAdded, userId)

    const files = [...personalFiles, ...addedFiles]

    return files
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

    const sqlFiles = `
      SELECT pdf.id, pdf.filename, pdf.title, pdf.size, pdf.stars, 
      user.username AS author, user.id AS authorId, 
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

    const sqlTotal = `
      SELECT COUNT(*) AS total FROM pdf
      WHERE is_public IS TRUE
    `

    const [files, fields1] = await db.query(sqlFiles)
    const [total, fields2] = await db.query(sqlTotal)

    return { files, total: total[0].total }
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

const search = async (keyword, limit, offset) => {
  try {
    const sqlFiles = `
      SELECT pdf.*, page.id, page.number AS page_number, 
      SUBSTRING(body, 1, LEAST(char_length(body), 400)) AS text
      FROM page
      INNER JOIN pdf
      ON page.pdf_id = pdf.id
      WHERE MATCH(body) AGAINST(?) 
      LIMIT ${limit} OFFSET ${offset} 
    `

    const sqlTotal = `
      SELECT COUNT(*) AS total FROM page
      WHERE MATCH(body) AGAINST(?)
    `

    const [files, fields1] = await db.query(sqlFiles, keyword)
    const [total, fields2] = await db.query(sqlTotal, keyword)

    return { files, total: total[0].total }
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